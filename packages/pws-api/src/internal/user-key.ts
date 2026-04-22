import type {
  EncryptionManager,
  PsrContainerItem,
  PsrDataRight,
  PsrGuid,
  PsrOrganisationUnitUser,
  PsrSeal,
  PsrUserKey,
} from '@kmuip/pws-types'
import { asArray, GUID_EMPTY, isEncryptedContainerItem, isHistoryData } from './data-helpers.js'
import { runtimeEnums } from './enums.js'
import { fromBase64, toBase64 } from './utils.js'

type MultiFactorServiceClientLike = {
  getCurrentUserRightKey(): Promise<unknown>
}

type RuntimeApiUserContext = {
  currentUser: PsrOrganisationUnitUser | null
}

type SealAccess = {
  breakSeal(sealId: PsrGuid): Promise<PsrSeal>
  getSealOpenType(
    seal: PsrSeal,
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    includeHistory: boolean,
  ): Promise<number>
  hasRelease(seal: PsrSeal, legitimateId: PsrGuid): Promise<boolean>
}

type RightAccess = {
  getLegitimateDataRights(
    dataId: PsrGuid,
    includeChildren: boolean,
    inherit: boolean,
  ): Promise<PsrDataRight[]>
  getLegitimateDataRight(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    rightType: number,
  ): Promise<PsrDataRight>
}

type RoleAccess = {
  getUserRoles(userId: PsrGuid): Promise<Array<{ Id: PsrGuid }>>
}

type DataBindingAccess = {
  getDataBindingsByData(dataId: PsrGuid, entityObjectType: number): Promise<unknown[]>
}

type DataRightKeyResult = {
  dataId: PsrGuid
  legitimateId: PsrGuid
  key: string
}

function findMatchingPrivateKey(keys: PsrUserKey[] | null, legitimateId: PsrGuid) {
  return keys?.find((entry) => entry.id === legitimateId) ?? null
}

export class RuntimeUserKeyManager {
  keys: PsrUserKey[] | null = null

  constructor(
    private readonly api: RuntimeApiUserContext,
    private readonly sealManager: SealAccess,
    private readonly rightManager: RightAccess,
    private readonly roleManager: RoleAccess,
    private readonly encryptionManager: EncryptionManager,
    private readonly dataBindingManager: DataBindingAccess,
    private readonly multiFactorServiceClient: MultiFactorServiceClientLike,
    private readonly getContainerItemWithSecretValue: (
      itemId: PsrGuid,
      reason: string,
    ) => Promise<PsrContainerItem>,
  ) {}

  encryptDataRightKey(publicKey: string, key: string | Uint8Array | null) {
    return key ? this.encryptionManager.encryptWithPublicKey(publicKey, key) : null
  }

  async decryptContainerItem(item: PsrContainerItem, reason: string) {
    if (!isEncryptedContainerItem(item)) {
      return ''
    }

    let itemId: PsrGuid | null = item.Id
    if (isHistoryData(item)) {
      const binding = asArray(
        await this.dataBindingManager.getDataBindingsByData(
          itemId,
          runtimeEnums.PsrEntityObjectType.EntityObjectTypeContainerItem,
        ),
      )[0] as { ParentDataId?: PsrGuid | null } | undefined
      itemId = binding?.ParentDataId ?? null
      if (!itemId) {
        throw new Error(String(runtimeEnums.PsrApiExceptionCode.RightNoKey))
      }
    }

    const rights = asArray(await this.rightManager.getLegitimateDataRights(itemId, false, false))
    if (rights.length === 0) {
      throw new Error(String(runtimeEnums.PsrApiExceptionCode.RightNoKey))
    }

    let itemKey = await this.decryptDirectRightKey(rights)
    if (!itemKey) {
      const sealedKeys = await Promise.all(
        rights
          .filter((right) => !!right.SealId)
          .map((right) => this.decryptDataRightWithSeal(item, right)),
      )
      itemKey = sealedKeys.find((candidate) => !!candidate) ?? null
    }

    if (!itemKey) {
      throw new Error(String(runtimeEnums.PsrApiExceptionCode.RightNoKey))
    }

    const secretItem = await this.getContainerItemWithSecretValue(item.Id, reason)
    return secretItem?.Value
      ? this.encryptionManager.decryptContainerItem(itemKey, fromBase64(secretItem.Value))
      : ''
  }

  async encryptContainerItem(item: PsrContainerItem, plaintext: string) {
    const normalizedPlaintext = typeof plaintext === 'string' ? plaintext : ''
    const publicKey = item.PublicKey ? fromBase64(item.PublicKey) : null
    const encryptionResult = await this.encryptionManager.encryptContainerItem(
      publicKey,
      normalizedPlaintext,
      async () => {
        if (item.Id === GUID_EMPTY) {
          return null
        }

        const rights = asArray(
          await this.rightManager.getLegitimateDataRights(item.Id, false, false),
        )
        const directKey = await this.decryptDirectRightKey(rights)
        if (directKey) {
          return directKey
        }

        const currentUserId = this.api.currentUser?.Id
        if (!currentUserId) {
          return null
        }

        for (const right of rights.filter((candidate) => !!candidate.SealId)) {
          const seal = await this.sealManager.breakSeal(right.SealId!)
          const openType = await this.sealManager.getSealOpenType(
            seal,
            item.Id,
            currentUserId,
            false,
          )
          if (openType !== runtimeEnums.PsrSealOpenType.BrokenByUser) {
            throw new Error(String(runtimeEnums.PsrApiExceptionCode.SealNotBrokenCurrently))
          }

          const key = await this.decryptSealProtectedRightKey([right], seal, currentUserId)
          if (key) {
            return key
          }
        }

        return null
      },
    )

    item.Value = toBase64(this.toBinaryString(encryptionResult.encryptedValue))
    if (encryptionResult.privateKey) {
      item.PublicKey = toBase64(this.toBinaryString(encryptionResult.publicKey ?? ''))
    }

    return encryptionResult.privateKey
  }

  async initializeUserKeys(currentUserPrivateKey: string) {
    if (this.keys) {
      return
    }

    const currentUserId = this.api.currentUser?.Id
    if (!currentUserId) {
      throw new Error('Current user is not available')
    }

    this.keys = []

    const [encryptedCurrentUserRightKey, roles] = await Promise.all([
      this.multiFactorServiceClient.getCurrentUserRightKey(),
      this.roleManager.getUserRoles(currentUserId),
    ])

    const decryptedCurrentUserRightKey = await this.encryptionManager.decrypt(
      currentUserPrivateKey,
      fromBase64(String(encryptedCurrentUserRightKey)),
    )
    const normalizedCurrentUserKey = this.toBinaryString(decryptedCurrentUserRightKey)
    const roleRights = await Promise.all(
      asArray(roles).map((role) =>
        this.rightManager.getLegitimateDataRight(
          role.Id,
          currentUserId,
          runtimeEnums.PsrRights.RightRead,
        ),
      ),
    )

    this.keys.push({ id: currentUserId, privateKey: normalizedCurrentUserKey })

    await Promise.all(
      asArray(roleRights)
        .filter((right): right is PsrDataRight => !!right?.RightKey)
        .map(async (right) => {
          const decryptedRoleKey = await this.encryptionManager.decrypt(
            normalizedCurrentUserKey,
            fromBase64(String(right.RightKey)),
          )
          this.keys?.push({
            id: right.DataId,
            privateKey: this.toBinaryString(decryptedRoleKey),
          })
        }),
    )
  }

  async encryptRightKeysAndReturn(
    item: Pick<PsrContainerItem, 'Id'>,
    privateKey: string | Uint8Array,
  ) {
    const results: DataRightKeyResult[] = []
    const normalizedPrivateKey = this.toBinaryString(privateKey)
    for (const right of asArray(
      await this.rightManager.getLegitimateDataRights(item.Id, false, false),
    )) {
      if (!right.LegitimatePublicKey) {
        continue
      }

      const encrypted = await this.encryptionManager.encryptWithPublicKey(
        fromBase64(right.LegitimatePublicKey),
        normalizedPrivateKey,
      )
      results.push({
        dataId: item.Id,
        legitimateId: right.LegitimateId,
        key: toBase64(this.toBinaryString(encrypted)),
      })
    }

    return results
  }

  decryptDataRight(right: PsrDataRight | null | undefined) {
    if (!right?.RightKey) {
      return null
    }

    const matchingKey = findMatchingPrivateKey(this.keys, right.LegitimateId)
    if (!matchingKey) {
      return null
    }

    return this.encryptionManager.decrypt(
      matchingKey.privateKey,
      fromBase64(String(right.RightKey)),
    )
  }

  async decryptDataRightWithSeal(data: { Id: PsrGuid }, right: PsrDataRight) {
    const currentUserId = this.api.currentUser?.Id
    if (!currentUserId || !right.SealId) {
      return null
    }

    const seal = await this.sealManager.breakSeal(right.SealId)
    const openType = await this.sealManager.getSealOpenType(seal, data.Id, currentUserId, false)
    if (openType === runtimeEnums.PsrSealOpenType.BrokenExpired) {
      throw new Error('The seal release is expired')
    }

    const hasRelease = await this.sealManager.hasRelease(seal, currentUserId)
    return hasRelease ? this.decryptSealProtectedRightKey([right], seal, currentUserId) : null
  }

  getUserKeys() {
    return [...(this.keys ?? [])].map((entry) => ({ id: entry.id, privateKey: entry.privateKey }))
  }

  setUserKeys(userKeys: PsrUserKey[] | null | undefined) {
    this.keys = userKeys ? [...userKeys] : []
  }

  private async decryptDirectRightKey(rights: PsrDataRight[]) {
    if (!this.keys?.length) {
      return null
    }

    const directRight = rights.find(
      (right) =>
        !!right.RightKey &&
        !right.SealId &&
        !!findMatchingPrivateKey(this.keys, right.LegitimateId),
    )
    if (!directRight) {
      return null
    }

    const matchingKey = findMatchingPrivateKey(this.keys, directRight.LegitimateId)
    return matchingKey
      ? this.encryptionManager.decrypt(
          matchingKey.privateKey,
          fromBase64(String(directRight.RightKey)),
        )
      : null
  }

  private async decryptSealProtectedRightKey(
    rights: PsrDataRight[],
    seal: PsrSeal,
    legitimateId: PsrGuid,
  ) {
    if (!rights.length || !seal || !this.keys?.length) {
      return null
    }

    const sealKeyCarrier = asArray(
      (seal as Record<string, unknown>).Keys as
        | Iterable<Record<string, unknown>>
        | Record<string, unknown>[]
        | null,
    ).find((candidate) =>
      asArray(
        candidate.KeyReleases as
          | Iterable<Record<string, unknown>>
          | Record<string, unknown>[]
          | null,
      ).some(
        (release) =>
          !!release.LegitimateSealKey &&
          !!findMatchingPrivateKey(this.keys, String(release.LegitimateId)),
      ),
    )

    if (!sealKeyCarrier) {
      return null
    }

    const release = asArray(
      sealKeyCarrier.KeyReleases as
        | Iterable<Record<string, unknown>>
        | Record<string, unknown>[]
        | null,
    ).find(
      (candidate) =>
        !!candidate.LegitimateSealKey && String(candidate.LegitimateId) === String(legitimateId),
    )
    if (!release) {
      return null
    }

    const matchingKey = findMatchingPrivateKey(this.keys, String(release.LegitimateId))
    const right = rights.find(
      (candidate) =>
        !!candidate.RightKey &&
        String(candidate.SealId) === String(seal.Id) &&
        !!findMatchingPrivateKey(this.keys, candidate.LegitimateId),
    )

    if (!matchingKey || !right?.RightKey) {
      return null
    }

    try {
      const decryptedSealKey = await this.encryptionManager.decrypt(
        matchingKey.privateKey,
        fromBase64(String(release.LegitimateSealKey)),
      )
      return this.encryptionManager.decrypt(
        this.toBinaryString(decryptedSealKey),
        fromBase64(String(right.RightKey)),
      )
    } catch {
      return null
    }
  }

  private toBinaryString(value: string | Uint8Array | null) {
    if (value == null) {
      return ''
    }

    return typeof value === 'string' ? value : Buffer.from(value).toString('binary')
  }
}
