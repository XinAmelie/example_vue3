import { createStore } from 'vuex'
import user from './modules/user.js'
import getters from './getters'
import app from './modules/app.js'
import theme from '@/store/modules/theme'

export default createStore({
  getters, // 快捷访问的作用
  modules: {
    user,
    app,
    theme
  }
})
