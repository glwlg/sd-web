import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import Img2Img from './components/Img2Img.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/img2img', component: Img2Img }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router