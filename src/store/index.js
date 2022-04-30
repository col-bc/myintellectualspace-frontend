import { defineStore } from 'pinia'
// import axios from 'axios'

export const useStore = defineStore('main', {
  state: () => {
    return {
      userId: -1,
      firstName: '',
      lastName: '',
      occupation: '',
      email: '',
      token: '',
      bio: '',
      website: '',
      interests: '',
      privacy: '',
      educationLevel: '',
      organizationName: '',
      yearsInBusiness: '',
      accountType: '',
      updatedAt: new Date(),
      latestFetch: new Date(),
      postIds: [],
      commentIds: [],
      likeIds: [],
      tasks: [],
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.token !== ''
    },
    getData: state => {
      return {
        userId: state.userId,
        firstName: state.firstName,
        lastName: state.lastName,
        occupation: state.occupation,
        email: state.email,
        token: state.token,
        bio: state.bio,
        website: state.website,
        interests: state.interests,
        privacy: state.privacy,
        educationLevel: state.educationLevel,
        organizationName: state.organizationName,
        yearsInBusiness: state.yearsInBusiness,
        accountType: state.accountType,
        updatedAt: state.updatedAt,
        latestFetch: state.latestFetch,
        postIds: state.postIds,
        commentIds: state.commentIds,
        likeIds: state.likeIds,
        tasks: state.tasks,
      }
    },
    getLatestFetch: state => state.latestFetch,
    isDataOutdated: state => {
      return (new Date() - state.latestFetch) > (1000 * 60 * 60 * 24)
    },
    getUserId: state => state.userId,
    getFirstName: state => state.firstName,
    getLastName: state => state.lastName,
    getOccupation: state => state.occupation,
    getEmail: state => state.email,
    getToken: state => state.token,
    getBio: state => state.bio,
    getWebsite: state => state.website,
    getInterests: state => state.interests,
    getPrivacy: state => state.privacy,
    getEducationLevel: state => state.educationLevel,
    getOrganizationName: state => state.organizationName,
    getYearsInBusiness: state => state.yearsInBusiness,
    getAccountType: state => state.accountType,
    getUpdatedAt: state => state.updatedAt,
    getTasks: state => state.tasks,
    getPostIds: state => state.postIds,
    getCommentIds: state => state.commentIds,
    getLikeIds: state => state.likeIds,
  },
  actions: {
    login(payload) {
      console.log(payload)
    },
    logout: () => {
      // Clear the token and expiration from the store
      this.token = null
      this.tokenExpiration = null
    },
    completeTas: (taskName) => {
      this.tasks.push(taskName)
    },
  },
  persist: true,
})
