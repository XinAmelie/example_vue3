const whiteList = ['/login', '404', 'import', '401']

export function isTags (path) {
  // 一个函数内处理的结果可以使用return 返回，path对应的tag可以被保存
  return !whiteList.includes(path)
}
