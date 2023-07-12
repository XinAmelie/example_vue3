<template>
  <el-breadcrumb :separator-icon='ArrowRight' class="breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item :to="{ path: item.path }" v-for="(item) in BreadcrumData" :key="item.path"><span class="t_right">{{item.meta.title}}</span></el-breadcrumb-item>

    </transition-group>

    <!--    不可点击的状态-->
<!--    <el-breadcrumb-item>-->
<!--      <span class="no-redireced">-->
<!--        promotion detail-->
<!--      </span>-->

<!--    </el-breadcrumb-item>-->
  </el-breadcrumb>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons'
import { ref, watch } from 'vue'
// 路由的信息 useRouter（跳转）, useRoute（获取路由参数,也就是返回当前路由的上下路由或者父亲的路由信息）
// routes.matched 包含当前路由的所有嵌套路径片段的路由记录
// 添加一个监听的事件,监听路由的变化

const routes = useRoute()
// 响应式数据

const BreadcrumData = ref([])
const getBreadcrumdate = () => {
  BreadcrumData.value = routes.matched
  // console.log(routes.matched)
}
// 监听
watch(routes, () => {
  getBreadcrumdate()
},
{
  immediate: true
})

</script>

<style scoped>
.breadcrumb{
/*//display 的一种常见用法：inline-block 用于水平而不是垂直地显示列表项。*/
display: inline-block;
font-size: 14px;
line-height: 50px;
margin-left: 8px;

}

.no-redireced{
  color:  #97a8be;
  cursor: text;
}

</style>
