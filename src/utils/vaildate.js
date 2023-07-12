export function isExternal (path) {
  // 固定的写法.test(path)
  return /^(https?:|mailto:|tel:)/.test(path)
}
