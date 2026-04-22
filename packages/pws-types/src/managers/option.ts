import { PsrByteArray, PsrDateIsoString, PsrGuid } from '../base'
import type { PsrOption, PsrData } from '../data'
import { PsrOptionGroup } from '../enum-constants'

export type OptionManager = {
  getOption(name: string, data: PsrData): Promise<PsrOption | null>
  getOptions(groups: PsrOptionGroup[], data: PsrData): Promise<PsrOption[]>
  updateStringOption(
    name: string,
    category: string,
    group: PsrOptionGroup,
    value: string,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  updatePasswordOption(
    name: string,
    category: string,
    group: PsrOptionGroup,
    value: string,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  updateGlobalEncryptedOption(
    name: string,
    category: string,
    group: PsrOptionGroup,
    value: PsrByteArray,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  updateIntegerOption(
    name: string,
    category: string,
    group: PsrOptionGroup,
    value: number,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  updateDoubleoption(
    name: string,
    category: string,
    group: PsrOptionGroup,
    value: number,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  updateDateTimeOption(
    name: string,
    category: string,
    group: PsrOptionGroup,
    value: PsrDateIsoString,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  updateBooleanOption(
    name: string,
    category: string,
    group: PsrOptionGroup,
    value: boolean,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  updateListOption(
    name: string,
    category: string,
    group: PsrOptionGroup,
    value: string,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  updateFileOption(
    name: string,
    category: string,
    group: PsrOptionGroup,
    value: string,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  updateFolderOption(
    name: string,
    category: string,
    group: PsrOptionGroup,
    value: string,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  updateTimeOption(
    name: string,
    category: string,
    group: PsrOptionGroup,
    value: number,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  updateIntegerExtOption(
    name: string,
    category: string,
    group: PsrOptionGroup,
    value: number,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  updateDoubleExtOption(
    name: string,
    category: string,
    group: PsrOptionGroup,
    value: number,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  updateCollectionOption(
    name: string,
    collection: string,
    value: string,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  deleteOption(name: string, dataId: PsrGuid | null): Promise<void> | void
  deleteCollectionOption(
    name: string,
    collection: string,
    dataId: PsrGuid | null,
  ): Promise<void> | void
  deleteDataOptions(groups: PsrOptionGroup[], dataId: PsrGuid): Promise<void> | void
}
