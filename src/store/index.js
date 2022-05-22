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
    getPosts: state => state.getUserData.post_ids,
    bearerToken: state => `Bearer ${state.token}`
  },
  actions: {
    setUserData(payload) {
      this.user = payload
      this.lastFetch = new Date()
    },
    async fetchUserData(force = false) {
      var self = this;
      if (force || this.isDataStale) {
        await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${this.token}`, },
        }).then((res) => {
          self.setUserData(res.data);
          self.lastFetch = new Date();
          return res.data;
        }).catch((err) => {
          if (err.response.status === 401) {
            this.logout()
            return null
          }
        })
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
