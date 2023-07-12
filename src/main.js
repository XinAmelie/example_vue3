import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import i18n from '@/i18n'
// 导入全局样式
import '@/styles/index.scss'
// 导入路由鉴权
import './permission'

// 导入mock
import '@/mock'
// filters
import installFilter from '@/filters'

const app = createApp(App)

installElementPlus(app)
// 挂载全局属性
installFilter(app)

// 注册i18n
app.use(store).use(router).use(i18n).mount('#app')
