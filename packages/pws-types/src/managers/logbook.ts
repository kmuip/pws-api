import { PsrGuid } from '../base'
import type { PsrListFilter, PsrLogbook } from '../data'
import { PsrEntityObjectType, PsrLogbookEvent } from '../enum-constants'

export type LogbookManager = {
  getLogbookEntries(filter: PsrListFilter): Promise<Iterable<PsrLogbook>>
  addLogbookEntries(logbookEvent: PsrLogbookEvent, dataIds: PsrGuid[], dataType: PsrEntityObjectType, info: string): Promise<void> | void
  getSingleLogbookEntry(logbookEntryId: PsrGuid): Promise<PsrLogbook>
  getLogbookListFilter(defaultFilter: boolean): Promise<PsrListFilter>
  getLogbookCount(filter: PsrListFilter): Promise<number>
}
