import { defineStore } from 'pinia'
import type { ShopData } from '~/dts/shop.dts'

type Kind = 'random' | 'round'

type StoredMainState = {
  kind: Kind | null
  shop: ShopData | null
}

export const useMainStore = defineStore('main', {
  state: (): StoredMainState & { loading: boolean; error: string | null } => ({
    kind: null,
    shop: null,
    loading: false,
    error: null,
  }),

  actions: {
    hydrateFromStorage() {
      if (!process.client) return

      const raw = localStorage.getItem('main_store')
      if (!raw) return

      try {
        const saved = JSON.parse(raw) as StoredMainState
        this.kind = saved.kind
        this.shop = saved.shop
      } catch (e) {
        console.error('failed to parse main_store from localStorage', e)
      }
    },

    saveToStorage() {
      if (!process.client) return

      const payload: StoredMainState = {
        kind: this.kind,
        shop: this.shop,
      }
      localStorage.setItem('main_store', JSON.stringify(payload))
    },

    /** 共通の API 呼び出しロジック */
    async fetchShop(kind: Kind) {
      this.loading = true
      this.error = null

      try {
        // 👇 ここを「Nuxt の API」にするだけ
        const data = await $fetch<ShopData>(`/api/lambda/${kind}`)

        this.kind = kind
        this.shop = data
        this.saveToStorage()

        return data
      } catch (e: any) {
        console.error('fetchShop error', e)
        this.error = e?.message ?? 'API error'
        throw e
      } finally {
        this.loading = false
      }
    },

    async fetchRandom() {
      return this.fetchShop('random')
    },

    async fetchRound() {
      return this.fetchShop('round')
    },

    clear() {
      this.kind = null
      this.shop = null
      this.loading = false
      this.error = null

      if (process.client) {
        localStorage.removeItem('main_store')
      }
    },
  },
})