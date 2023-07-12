<template>
<!--  处理外部图标aria-hidden 把 aria-hidden="true" 加到元素上会把该元素和它的所有子元素从可访问性树上移除。
这样做可以通过隐藏下列内容来提升使用辅助技术的用户体验：-->
  <div
    v-if="isExternal"
    :style="StyleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="classname"
  />
  <svg v-else class="svg-icon" :class="classname" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>

</template>

<script setup>
import { defineProps, computed } from 'vue'
import { isExternal as External } from '@/utils/vaildate'
// defineProps({})  类似 props: {} 父类的组件传值
const props = defineProps({
  // 图标icons
  icon: {
    type: String,
    required: true
  },
  // 图标的name
  classname: {
    type: String,
    default: ''

  }

})

// 判断当前的图标是否为第三方图标
const isExternal = computed(() => {
  External(props.icon)
})

// 外部图标样式
const StyleExternalIcon = computed(() => ({
  // 固定的样式处理语句;{}中是返回的对象需要用（）包裹
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`

}))

// 内部图标 {}可以省略只有一行return的时候
const iconName = computed(() => `#icon-${props.icon}`)

</script>

<style scoped lang="scss">

.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}

</style>
