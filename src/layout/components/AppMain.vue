<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }"  >
<!--        带有切换动画，并具备组件缓存的-->
<!--       接收 prop 的默认插槽，并解构 -->
<!-- 使用动态过渡名称 https://router.vuejs.org/zh/guide/advanced/transitions.html#%E5%9F%BA%E4%BA%8E%E8%B7%AF%E7%94%B1%E7%9A%84%E5%8A%A8%E6%80%81%E8%BF%87%E6%B8%A1 -->
<!--  mode out-in 先出去，再进来     in-out    -->
      <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <component :is="Component"  :key="route.path" />
          </keep-alive>

      </transition>
    </router-view>

  </div>

</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags'
import { useStore } from 'vuex'

// 获取title
const getTitle = route => {
  let title = ''

  if (!route.meta) {
    const pathArr = route.path.split('/')
    // arr是变量名，调用length方法获得数组的长度，也就是数组里有几个元素。最后得到的一个数，然后这个数减1。
    // 长度减1的话，也就是最大的下标，因为数组下标从0开始。比如1-3-5-7-9，5个元素，长度为5，最大的下标就是5－1＝4。
    title = pathArr[pathArr.length - 1]
  } else {
    console.log(route.path)
    title = route.meta.title
    // console.log(title)
  }
  return title
}

const route = useRoute()
const store = useStore()
watch(route, (to, from) => {
  console.log(to)
  // 不是所有的路由都会被保留
  if (!isTags(to.path)) return
  const {
    fullPath,
    meta,
    name,
    params,
    path,
    query
  } = to
  store.commit('app/addTagsViewList',
    {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
},

{
  immediate: true
}
)

</script>

<style lang="scss" scoped>
.app-main {
  //100vh 浏览器可视区域的高度
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden; //清除浮动
  padding: 104px 20px 20px 20px;

  // border-box 告诉浏览器：你想要设置的边框和内边距的值是包含在 width 内的。也就是说，如果你将一个元素的 width 设为 100px，那么这 100px 会包含它的 border 和 padding，
  // 内容区的实际宽度是 width 减去 (border + padding) 的值。
  // 大多数情况下，这使得我们更容易地设定一个元素的宽高。
  box-sizing: border-box;
}

</style>
