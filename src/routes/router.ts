import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/routes/HomeView/HomeView.vue'
import AboutView from '@/routes/AboutView/AboutView.vue'
import NotFound from '@/routes/NotFound/NotFound.vue'
import AppView from '@/routes/AppView/AppView.vue'
import PersonalizationView from '@/routes/PersonalizationView/PersonalizationView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/app', component: AppView },
    { path: '/personalization', component: PersonalizationView },
    { path: '/:pathMatch(.*)*', component: NotFound }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router