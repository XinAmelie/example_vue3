// 处理时间和相对时间

import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'

const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  return dayjs(val).format(format)
}

// 相对时间
dayjs.extend(rt)

function relativeTime (val) {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  // to方法是处理相对时间的，要先加载dayjs的时间插件 此处的dayjs()是方法，不是对象dayjs
  return dayjs().to(dayjs(val)) // dayjs(val)当前时间，相对于的时间dayjs.to（）
}

export default app => {
  app.config.globalProperties.$filters = {
    // 全局属性
    dateFilter,
    relativeTime
  }
}
