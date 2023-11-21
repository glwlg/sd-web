import { createApp } from 'vue'
import {
    // create naive ui
    create,
    // component
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutFooter,
    NImage,
    NGrid,
    NGridItem,
    NCard,
    NSpin,
    NSpace,
    NDivider,
    NButton,
    NInput,
    NModal,
    NInputNumber,
    NSlider,
    NTooltip,
    NUpload
} from 'naive-ui'
import router from './router.js'
import './style.css'
import App from './App.vue'

const naive = create({
    components: [
        NLayout,
        NLayoutHeader,
        NLayoutSider,
        NLayoutFooter,
        NImage,
        NGrid,
        NGridItem,
        NCard,
        NSpin,
        NSpace,
        NDivider,
        NButton,
        NInput,
        NModal,
        NInputNumber,
        NSlider,
        NTooltip,
        NUpload]
})

createApp(App).use(naive).use(router).mount('#app')

