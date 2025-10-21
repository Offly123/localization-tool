import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/routes/HomeView/HomeView.vue'
import AboutView from '@/routes/AboutView/AboutView.vue'
import NotFound from '@/routes/NotFound/NotFound.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/:pathMatch(.*)*', component: NotFound }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router