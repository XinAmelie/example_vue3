import { createI18n } from 'vue-i18n'
import zhLocale from '../i18n/lang/zh'
import enLocale from '../i18n/lang/en'
import store from '@/store'

const messages = {
  en: {
    msg: {
      // 映射或者说是解构
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }

}

// const i18n = createI18n({
//   globalInjection: true, // 全域注入，讓你在 <template> 可以使用 $t
//   legacy: false, // 讓你可以在 composition API 中使用
//   messages,
//   locale: 'zh-tw'
//   fallbackLocale: 'en-us'
// })

// 语言变量，初始en
// const locale = 'zh'
function getLanguage () {
  //   // 如果store存在 并且 store.getters也存在 并且store.getters.lanuage也存在，就返回值store.getters.lanuage
  return store && store.getters && store.getters.lanuage
}

// 初始化i18n实例
const i18n = createI18n({
  // 使用组合APi必须为false
  legacy: false,
  // 全局使用t函数
  globalInjection: true, // 全域注入，讓你在 <template> 可以使用 $t
  locale: getLanguage(),
  messages
})
export default i18n
