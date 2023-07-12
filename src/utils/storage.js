// 存储数据
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    // 利用json把object类型的value转换为字符串
    // JSON.stringify()可以把一个 JavaScript（key: "value"） 对象序列化为一个 JSON 字符串。
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据

export const getItem = (key) => {
  const data = window.localStorage.getItem(key)

  try {
    // 我们可以使用 JSON.parse() 方法将数据转换为 js 对象。就是属性名不带“”
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 删除某个数据

export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

// 删除所有的数据
export const removeAllItem = (key) => {
  window.localStorage.clear()
}
