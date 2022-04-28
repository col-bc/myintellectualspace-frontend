import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  persist: true,

  state: () => ({
    userId: null,
    email: null,
    token: null,
    tokenExpiration: null,
  }),
  getters: {
    isLoggedIn: state => {
      // Returns true if the token is valid and has not expired
      // return !!state.token && new Date(state.tokenExpiration) > new Date()
      return state.token != null
    },
    userId: state => state.userId,
    email: state => state.email,
    token: state => state.token,
    tokenExpiration: state => state.tokenExpiration,
  },
  actions: {
    logout: () => {
      // Clear the token and expiration from the store
      this.token = null
      this.tokenExpiration = null
    },
    setUser: (state, userId, email, token, tokenExpiration) => {
      // Set user's data to the store 
      state.userId = userId
      state.email = email
      state.token = token
      state.tokenExpiration = tokenExpiration
    },
    setToken: (state, token) => state.token = token,
  }
})
