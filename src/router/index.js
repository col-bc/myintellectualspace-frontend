import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  //Landing Page
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },

  //Register Page
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Auth/RegisterView.vue')
    // TODO: before each, redirect if logged in
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
