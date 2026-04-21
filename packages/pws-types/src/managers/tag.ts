import { PsrGuid } from '../base'
import type { PsrListFilter, PsrTag, PsrTagGlobalUsageInfo, PsrDataTag } from '../data'

export type TagManager = {
  getTags(filter: PsrListFilter): Promise<Iterable<PsrTag>>
  addDataFavorite(dataId: PsrGuid): Promise<void> | void
  removeDataFavorite(dataId: PsrGuid): Promise<void> | void
  getTagListFilter(defaultFilter: boolean): Promise<PsrListFilter>
  addTag(tag: PsrTag, hexColor: string): Promise<PsrTag>
  updateTag(tag: PsrTag, hexColor: string): Promise<PsrTag>
  deleteTag(tag: PsrTag): Promise<void> | void
  getTagGlobalUsageInfos(take: number): Promise<PsrTagGlobalUsageInfo[]>
  setDataTags(dataTags: PsrDataTag[], dataId: PsrGuid): Promise<void> | void
}
