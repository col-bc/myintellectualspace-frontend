import { defineStore } from 'pinia'
import axios from 'axios'


export const useStore = defineStore('main', {
  state: () => ({
    user: {},
    token: '',
    isLoggedIn: false,
    lastFetch: new Date(1970, 0, 1),
  }),
  getters: {
    isLoggedIn: state => state.token !== '',
    getUserData: state => state.user,
    getToken: state => state.token,
    isDataStale: state => new Date() - state.lastFetch > 60000,
    posts: state => state.getUserData.post_ids,
    bearerToken: state => `Bearer ${state.token}`
  },
  actions: {
    setUserData(payload) {
      this.user = payload
      this.lastFetch = new Date()
    },
    async fetchUserData(force = false) {
      if (this.isDataStale || force) {
        const response = await axios.get("http://localhost:5000/api/user/", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        if (response.status === 401) {
          this.logout()
          return false
        }
        this.setUserData(response.data);
        this.lastFetch = new Date();
        return true
      }
    },
    setToken(payload) {
      this.token = payload
      this.fetchUserData(true)
    },
    addPost(payload) {
      this.user.post_ids.push(payload)
    },
    logout() {
      this.token = ''
      this.user = {}
      this.lastFetch = new Date(1970, 0, 1)
    }
  },

  persist: true,
})
