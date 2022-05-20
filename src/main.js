import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


import 'flowbite'
import '@/assets/font/Poppins.css'

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
