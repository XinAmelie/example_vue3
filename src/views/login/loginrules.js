// 校验密码
const vaildatorPwd = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码长度不成小于6位数'))
    } else {
      callback() // 通过
    }
  }
}

export { vaildatorPwd }
