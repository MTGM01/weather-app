import { createRouter, createWebHistory } from 'vue-router'
import Weather from '../components/Weather.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'weatherPage',
      component: Weather
    }
  ]
})

export default router