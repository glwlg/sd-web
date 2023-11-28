import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import Img2Img from './components/Img2Img.vue'
import Text2Img from './components/Text2Img.vue'
import WordDiff from './components/WordDiff.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/img2img', component: Img2Img },
    { path: '/text2img', component: Text2Img },
    { path: '/worddiff', component: WordDiff }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router