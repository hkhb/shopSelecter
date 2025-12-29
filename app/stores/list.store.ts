import { defineStore } from 'pinia'
import { type ShopData } from '../dts/shop.dts'

export const useShopStore = defineStore('shop', {
  state: () => ({
    items: [] as ShopData[],
    loading: false as boolean,
    error: null as string | null,
  }),
  actions: {
    async fetchShops() {
      this.loading = true
      this.error = null
      try {
        const res = await $fetch<ShopData[]>('/api/shops')
        this.items = res
        this.items = res
      } catch (e: any) {
        this.error = e?.message
      } finally {
        this.loading = false
      }
    },
    async createShop(payload: ShopData) {
      this.loading = true
      this.error = null
      try {
        const newId =
      this.items.length > 0
        ? Math.max(...this.items.map((i) => i.id)) + 1
        : 1
        const create = await $fetch<ShopData>(`/api/shops}`, {
          method: 'POST',
          body: payload,
        })
        this.items.push(payload)
        return payload
      } catch (e: any) {
        this.error = e?.message ?? 'Failed to update shop'
        throw e
      } finally {
        this.loading = false
      }
    },
    async updateShop(payload: ShopData) {
      this.loading = true
      this.error = null
      try {
        const updated = await $fetch<ShopData>(`/api/shops/${payload.id}`, {
          method: 'PUT',
          body: payload,
        })
        const idx = this.items.findIndex(i => i.id === updated.id)
        if (idx >= 0) this.items.splice(idx, 1, updated)
        else this.items.push(updated)
      console.log('updated', updated)
        return updated
      } catch (e: any) {
        this.error = e?.message ?? 'Failed to update shop'
        throw e
      } finally {
        this.loading = false
      }
    },
    async deleteShop(id: number) {
      this.loading = true
      this.error = null
      try {
        await $fetch(`/api/shops/${id}`, {
          method: 'DELETE',
        })
        const idx = this.items.findIndex(i => i.id === id)
        if (idx >= 0) this.items.splice(idx, 1)
      } catch (e: any) {
        this.error = e?.message ?? 'Failed to delete shop'
        throw e
      } finally {
        this.loading = false
      }
    },
  },
})