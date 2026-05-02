// app/stores/list.store.ts
import { defineStore } from 'pinia'
import type { ShopData } from '../dts/shop.dts'

export const useShopStore = defineStore('shop', {
  state: () => ({
    items: [] as ShopData[],
    loading: false as boolean,
    error: null as string | null,
  }),

  actions: {
    /** 一覧取得: GET /api/lambda/shops */
    async fetchShops() {
      this.loading = true
      this.error = null
      try {
        const res = await $fetch<ShopData[]>('/api/lambda/shops')
        this.items = res
      } catch (e: any) {
        console.error('fetchShops error', e)
        this.error =
          e?.data?.message ??
          e?.message ??
          'Failed to fetch shops'
        throw e
      } finally {
        this.loading = false
      }
    },

    /** 新規作成: POST /api/lambda/shops */
    async createShop(payload: Omit<ShopData, 'id'>) {
      this.loading = true
      this.error = null
      try {

        const body: ShopData = { ...payload }

        const created = await $fetch<ShopData>('/api/lambda/shops', {
          method: 'POST',
          body,
        })

        this.items.push(created)
        return created
      } catch (e: any) {
        console.error('createShop error', e)
        this.error =
          e?.data?.message ??
          e?.message ??
          'Failed to create shop'
        throw e
      } finally {
        this.loading = false
      }
    },

    /** 更新: PUT /api/lambda/shops  （パスに id つけない） */
    async updateShop(payload: ShopData) {
      this.loading = true
      this.error = null
      try {
        const updated = await $fetch<ShopData>('/api/lambda/shops', {
          method: 'PUT',
          body: payload,
        })

        const idx = this.items.findIndex((i) => i.id === updated.id)
        if (idx >= 0) {
          this.items.splice(idx, 1, updated)
        } else {
          this.items.push(updated)
        }

        console.log('updated', updated)
        return updated
      } catch (e: any) {
        console.error('updateShop error', e)
        this.error =
          e?.data?.message ??
          e?.message ??
          'Failed to update shop'
        throw e
      } finally {
        this.loading = false
      }
    },

    /** 削除: DELETE /api/lambda/shops/:id */
    async deleteShop(id: number) {
      this.loading = true
      this.error = null
      try {
        await $fetch(`/api/lambda/shops/${id}`, {
          method: 'DELETE',
        })

        const idx = this.items.findIndex((i) => i.id === id)
        if (idx >= 0) this.items.splice(idx, 1)
      } catch (e: any) {
        console.error('deleteShop error', e)
        this.error =
          e?.data?.message ??
          e?.message ??
          'Failed to delete shop'
        throw e
      } finally {
        this.loading = false
      }
    },
  },
})