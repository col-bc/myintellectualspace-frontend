import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  persist: true,

  state: () => ({
    userId: null,
    firstName: null,
    lastName: null,
    occupation: null,
    email: null,
    token: null,
    bio: null,
    website: null,
    interests: null,
    privacy: null,
    educationLevel: null,
    organizationName: null,
    yearsInBusiness: null,
    accountType: null,
    updatedAt: null,
    // posts
    // comments
    // friends
    tasks: [],
  }),
  getters: {
    isLoggedIn: state => {
      return state.token != null && state.useId != null
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
  },
  actions: {
    logout: () => {
      // Clear the token and expiration from the store
      this.token = null
      this.tokenExpiration = null
    },
    setToken: (token) => this.token = token,
    setUserData: (userData) => {
      this.userId = userData.userId
      this.firstName = userData.firstName
      this.lastName = userData.lastName
      this.occupation = userData.occupation
      this.email = userData.email
      this.token = userData.token
      this.bio = userData.bio
      this.website = userData.website
      this.interests = userData.interests
      this.privacy = userData.privacy
      this.educationLevel = userData.educationLevel
      this.organizationName = userData.organizationName
      this.yearsInBusiness = userData.yearsInBusiness
      this.accountType = userData.accountType
      this.updatedAt = userData.updatedAt
    },
    completeTas: (taskName) => {
      this.tasks.push(taskName)
    },
  }
})
