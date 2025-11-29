import { defineStore } from 'pinia'

export type Shop = {
  id: string
  name: string
  catergory: string
  Subcatergory: string
  count: number
}

export const useShopStore = defineStore('shop', {
  state: () => ({
    items: [] as Shop[],
    loading: false as boolean,
    error: null as string | null,
  }),
  actions: {
    async fetchShops() {
      this.loading = true
      this.error = null
      try {
        // 実APIは未実装のためコメントアウト
        // const res = await $fetch<Shop[]>('/api/shops')
        // this.items = res

        // ダミーデータ
        const res: Shop[] = [
          { id: '1', name: 'Shop A', catergory: 'restaurant', Subcatergory: 'ramen', count: 1 },
          { id: '2', name: 'Shop B', catergory: 'cafe', Subcatergory: 'coffee', count: 2 },
          { id: '3', name: 'Shop C', catergory: 'bar', Subcatergory: 'beer', count: 3 },
        ]
        this.items = res
      } catch (e: any) {
        this.error = e?.message ?? 'Failed to fetch shops (dummy)'
      } finally {
        this.loading = false
      }
    },
    async updateShop(payload: Shop) {
      this.loading = true
      this.error = null
      try {
        const updated = await $fetch<Shop>(`/api/shops/${payload.id}`, {
          method: 'PUT',
          body: payload,
        })
        const idx = this.items.findIndex(i => i.id === updated.id)
        if (idx >= 0) this.items.splice(idx, 1, updated)
        else this.items.push(updated)
        return updated
      } catch (e: any) {
        this.error = e?.message ?? 'Failed to update shop'
        throw e
      } finally {
        this.loading = false
      }
    },
  },
})