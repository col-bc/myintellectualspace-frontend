import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/store'

const routes = [
  //Index Page
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },

  // Social Routes
  // #############

  //Social Hub Home
  {
    path: '/social',
    name: 'social',
    component: () => import('@/views/Profile/ProfileIndex.vue'),
    beforeEnter: (to, from, next) => {
      // Check if user is logged in and fetch data if so
      let store = useStore()
      store.fetchUserData({ force: true })
      if (to.name === 'social') return next({ name: 'social-details' })
      if (store.isLoggedIn) return next()
      else return next({ name: 'login' })
    },
    children: [
      //Profile Details
      {
        path: '',
        name: 'social-details',
        component: () => import('@/views/Profile/ProfileDetails.vue')
      },
      //Profile feed
      {
        path: 'feed',
        name: 'social-feed',
        component: () => import('@/views/Profile/ProfileFeed.vue')
      },
      //New Post
      {
        path: 'post',
        name: 'social-post',
        component: () => import('@/views/Profile/ProfileNewPost.vue')
      },
    ],
  },

  /// #################
  //    Meeting Routes
  /// #################

  //Meetings home
  {
    path: '/meetings',
    name: 'meetings',
    component: () => import('@/views/Meetings/MeetingsHomeView.vue'),
    beforeEnter: (to, from, next) => {
      let store = useStore()
      if (store.isLoggedIn) return next()
      else return next({ name: 'login' })
    }
  },
  // Host meeting
  {
    path: '/meetings/host/:meetingId/:meetingTitle/:meetingJWT',
    name: 'host-meeting',
    component: () => import('@/views/Meetings/HostMeetingView.vue'),
    beforeEnter: (to, from, next) => {
      let store = useStore()
      if (store.isLoggedIn) return next()
      else return next({ name: 'login' })
    },
  },
  // Join meeting by meetingId and meetingJWT
  {
    path: '/meetings/join/:meetingId/:meetingJWT',
    name: 'join-meeting',
    component: () => import('@/views/Meetings/ParticipantMeetingView.vue'),
    beforeEnter: (to, from, next) => {
      let store = useStore()
      if (store.isLoggedIn) return next()
      else return next({ name: 'login' })
    },
  },

  // #################
  //   Auth Routes
  // #################

  //Register
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Auth/RegisterView.vue')
  },
  //Login
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Auth/LoginView.vue'),
    beforeEnter: (to, from, next) => {
      // Bypass login if already logged in
      let store = useStore()
      if (store.isLoggedIn) return next({ name: 'social-details' })
      else return next()
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
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/Errors/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
