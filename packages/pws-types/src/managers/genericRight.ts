import type { PsrData, PsrDataRight } from '../data'

export type GenericRightManager = {
  saveRights(
    datas: PsrData[],
    rights: PsrDataRight[],
    inherit: boolean,
    overwrite: boolean,
    ignoreDatabaseAdmins: boolean,
  ): Promise<void> | void
}
