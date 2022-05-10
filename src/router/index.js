import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/store'

const routes = [
  //Landing Page
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },

  //Social Hub Home
  {
    path: '/social-hub',
    name: 'profile',
    component: () => import('@/views/Profile/ProfileHomeView.vue'),
    beforeEnter: (to, from, next) => {
      // Check if user is logged in and fetch data if so
      let store = useStore()
      if (store.isLoggedIn) {
        if (store.fetchUserData()) {
          return next()
        }
        next({ name: 'login' })
      }
      return next({ name: 'login' })
    }
  },
  //Social Hub Settings
  {
    path: '/profile/edit',
    name: 'edit-profile',
    component: () => import('@/views/Profile/EditProfileView.vue'),
    beforeEnter: (to, from, next) => {
      let store = useStore()
      if (store.isLoggedIn) {
        return next()
      }
      return next({ name: 'login' })
    }
  },

  //Meetings home
  {
    path: '/meetings',
    name: 'meetings',
    component: () => import('@/views/Meetings/MeetingsHomeView.vue'),
    beforeEnter: (to, from, next) => {
      let store = useStore()
      if (store.isLoggedIn) {
        return next()
      }
      return next({ name: 'login' })
    }
  },
  // Host meeting
  {
    path: '/meetings/host/:meetingId/:meetingTitle/:meetingJWT',
    name: 'host-meeting',
    component: () => import('@/views/Meetings/HostMeetingView.vue'),
    beforeEnter: (to, from, next) => {
      let store = useStore()
      if (store.isLoggedIn) {
        return next()
      }
      return next({ name: 'login' })
    },
  },

  //Register Page
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Auth/RegisterView.vue')
  },
  //Login Page
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Auth/LoginView.vue'),
    beforeEnter: (to, from, next) => {
      // Bypass login if already logged in
      let store = useStore()
      if (store.isLoggedIn) {
        return next({ name: 'profile' })
      }
      return next()
    }
  },
  //Logout
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      // Clear the token and expiration from the store
      let store = useStore();
      store.logout();
      next({ name: 'home', query: { logout: true } })
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
