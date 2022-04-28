import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  persist: true,

  state: () => ({
    user: null
  }),
  getters: {
  },
  actions: {
  }
})
