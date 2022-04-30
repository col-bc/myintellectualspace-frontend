import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/store'

const routes = [
  //Landing Page
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },

  //ProfileHome
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile/ProfileHomeView.vue'),
    beforeEnter: (to, from, next) => {
      let store = useStore()
      if (store.isLoggedIn) {
        return next()
      }
      return next({ name: 'login' })
    }
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
      store.$reset();
      next({ name: 'home', query: { logout: true } })
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
