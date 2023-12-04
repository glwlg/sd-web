import {createApp} from 'vue'
import {
    // create naive ui
    create,
    // component
    NConfigProvider,
    NLayout,
    NText,
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
    NSelect,
    NDialog,
    NSlider,
    NTooltip,
    NCheckbox,
    NForm,
    NFormItem,
    NMessageProvider,
    NPageHeader,
    NAvatar,
    NUpload
} from 'naive-ui'
import router from './router.js'
import './style.css'
import App from './App.vue'

const naive = create({
    components: [
        NConfigProvider,
        NLayout,
        NText,
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
        NSelect,
        NDialog,
        NSlider,
        NTooltip,
        NCheckbox,
        NForm,
        NFormItem,
        NMessageProvider,
        NPageHeader,
        NAvatar,
        NUpload]
})

createApp(App).use(naive).use(router).mount('#app')

