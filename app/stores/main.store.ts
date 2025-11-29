import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    data: this.get('main_store') || {}
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