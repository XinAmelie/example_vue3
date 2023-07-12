<template>
  <BackGround></BackGround>
  <el-card class="box-card">
    <h3 class="t_title">{{$t('msg.login.title')}}</h3>
    <el-form
    :model = 'inputForm'
    :rules="loginrules"
    ref = 'loginFromRef'
    >
      <el-form-item label-width="70px" label="用户名" prop="username">
          <el-input placeholder="请输入账号"
                    size="large"
                    type="text"
                    show-word-limit
                    maxlength="11"
                    v-model="inputForm.username"
                    :prefix-icon="Avatar"

          />
      </el-form-item>
      <el-form-item label-width="70px" label="密&nbsp;&nbsp;&nbsp;&nbsp;码" prop="pwd" maxlength="11">
        <el-input placeholder="请输入密码"
                  size="large"
                  show-password
                  type="password"
                  v-model="inputForm.pwd"
                  :prefix-icon="Lock"
        />
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="handleLogin" :loading="loading" >{{$t('msg.login.loginBtn')}}</el-button>
        <el-button @click="reset" type="success">重置</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script setup>

import { Avatar, Lock } from '@element-plus/icons'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import BackGround from '@/components/BackGround/index'
// import { login } from '@/utils/request'

// 表单验证  el-form  :model=loginform和:rules=loginrules  el-form-item => prop = loginform
import { vaildatorPwd } from '@/views/login/loginrules'
// 校验规则

// zhousg 123456

// 数据源 ref定义
const inputForm = reactive({
  username: 'zhousg',
  pwd: '123456'

})
const loginrules = reactive({
  username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
  // validator自定义校验vaildatorPwd()是一个函数
  pwd: [{ required: true, trigger: 'blur', validator: vaildatorPwd() }]

})

// 重置数据
const reset = () => {
  inputForm.username = ''
  inputForm.pwd = ''
}

// 处理登陆
const loading = ref(false)
const loginFromRef = ref(null)
const store = useStore()
const handleLogin = () => {
  loginFromRef.value.validate(valid => {
    if (!valid) return

    loading.value = true
    // reactive不用value,天坑啊!!!
    store
      .dispatch('user/login', inputForm)
      .then((res) => {
        loading.value = false
        console.log(res.data)
        // TODO: 登录后操作
      })
      .catch(err => {
        console.log(err.response.data)
        loading.value = false
      })
  })
}

// const handleLogin = () => {
//   login(inputForm.username, inputForm.pwd)
// }
//
// // const submit = () => {
// //   console.log('点我提交')
// //
// //   login(ruleForm.account, ruleForm.pwd)
// // }

</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.box-card{
  width: 400px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -200px;
  margin-left: -200px;
  text-align: center;
  background-image: linear-gradient(to left bottom, #ea3d1f 0%, #1cde8e 100%);

}

// 深度选择器，也就是父元素定位子元素
:deep(.el-card__body){
    position: relative;
    top: 50%;
    margin-top: -180px;
}

.t_title{
  top: 20px;
  padding-bottom: 50px;
  color: white;
}
:deep(.el-form-item__content){
    justify-content: flex-start;
}

:deep(.el-input--large){
  width: 250px;
}
.btn{
  align-items: center;
  left: 50%;
  position: absolute;
  margin-left: -66px;
}

:deep(.el-form-item__label){
color: white;
  font-weight:bold;
}

</style>
