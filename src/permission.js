// #前置路由守卫

import router from '@/router'
import store from '@/store'

// 定义白名单，用户无权限也可以进去的页面
const whitlist = ['/login']

router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    // 存在 token ， store.state.user.token进入主页   getter快捷访问
    if (to.path === '/login') {
      next('/')
    } else {
      // 其他页面就正常跳转
      next()
    }
  } else {
    // indexOf()方法：返回指定字符串值在字符串中的位置，如果没有找到返回-1，该方法区分大小写
    if (whitlist.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
