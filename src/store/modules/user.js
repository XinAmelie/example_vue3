import { login } from '@/api/sys'
import { ElMessage } from 'element-plus'
// import md5 from 'md5'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'

export default {
  namespaced: true,
  state () {
    return {
      // ||当前值为false则继续，为true则返回此值
      token: getItem(TOKEN) || ''
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setItem(TOKEN, token)
    }
  },
  actions: {
    login (context, userInfo) {
      const { username, pwd } = userInfo
      return new Promise((resolve, reject) => {
        login({
          account: username,
          // pwd: md5(pwd)
          password: pwd
        })
          .then(res => {
            resolve(res)
            this.commit('user/setToken', res.data.result.token)
            ElMessage({
              type: 'success',
              message: '欢迎' + res.data.result.account + '登录',
              showClose: true,
              grouping: true
            })
            router.push('/')
          })
          .catch(err => {
            reject(err)
            console.log(err)
            ElMessage({
              type: 'error',
              message: err.response.data.message,
              showClose: true,
              grouping: true
            })
          })
      })
    }
  }
}
