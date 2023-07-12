import axios from 'axios'
// import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 响应拦截器和请求拦截器     可以帮助剥离data
// 响应拦截器
// service.interceptors.response.use(
//   response => {
//     const { success, message, data } = response.data
//     //   要根据success的成功与否决定下面的操作
//     if (success) {
//       return data
//     } else {
//       // 业务错误
//       ElMessage.error(message) // 提示错误消息,进入错误的回调
//       return Promise.reject(new Error(message))
//     }
//   },
//   error => {
//     // TODO: 将来处理 token 超时问题
//     ElMessage.error(error.message) // 提示错误信息
//     return Promise.reject(error)
//   }
// )
// instance.interceptors.request.use(config => {
//   // 拦截业务逻辑
//   // 进行请求配置的修改
//   // 如果本地又token就在头部携带
//   // 1. 获取用户信息对象
//   const { profile } = store.state.user
//   // 2. 判断是否有token
//   if (profile.token) {
//     // 3. 设置token
//     config.headers.Authorization = `Bearer ${profile.token}`
//   }
//   return config
// }, err => {
//   return Promise.reject(err)
// })
//
// // res => res.data  取出data数据，将来调用接口的时候直接拿到的就是后台的数据
// instance.interceptors.response.use(res => res.data, err => {
//   // 401 状态码，进入该函数
//   if (err.response && err.response.status === 401) {
//     // 1. 清空无效用户信息
//     // 2. 跳转到登录页
//     // 3. 跳转需要传参（当前路由地址）给登录页码
//     store.commit('user/setUser', {})
//     // 当前路由地址
//     // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
//     // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
//     const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
//     // encodeURIComponent 转换uri编码，防止解析地址出问题
//     router.push('/login?redirectUrl=' + fullPath)
//   }
//   return Promise.reject(err)
// })

// 调试专用
// const host = 'https://apipc-xiaotuxian-front.itheima.net'
// export const login = (account, password) => {
//   axios.post(`${host}/login`, {
//     account,
//     password
//
//   }).then(res => {
//     console.log('获取的返回值:' + res.data.result.nickname)
//     router.push('/')
//     // ElMessage.success('欢迎' + res.data.result.nickname + '登录')
//     // ElMessage({
//     //   showClose: true,
//     //   // res.data 请求
//     //   message: '欢迎' + res.data.result.nickname + '登录',
//     //   type: 'success'
//     // })
//     localStorage.setItem('islogin', 'yes')
//   }).catch((err) => {
//     // err.response 返回数据
//     // ElMessage.error(err.response.data.message)
//     console.log(err.response)
//   })
// }

export default instance
