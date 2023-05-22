import App from './App.vue'
import { router } from '@/router/index'
import '@/styles/index.scss'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())

app.use(router)
app.mount('#app')
