import type { PsrApi, PsrGuid } from '@kmuip/pws-api'

export class FavoritesResource {
  constructor(private readonly raw: PsrApi) {}

  async add(dataId: PsrGuid) {
    await this.raw.tagManager.addDataFavorite(dataId)
  }

  async remove(dataId: PsrGuid) {
    await this.raw.tagManager.removeDataFavorite(dataId)
  }
}
