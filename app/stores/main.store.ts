import { defineStore } from 'pinia'
import store from 'store2'

export const useMainStore = defineStore('main', {
  state: () => ({
    data: store.get('main_store') || {}
  }),

  actions: {
    setData(value: any) {
      this.data = value
      store.set('main_store', value)
    },

    clear() {
      this.data = {}
      store.remove('main_store')
    }
  }
})