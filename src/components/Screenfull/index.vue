<template>
    <div @click="onToggle">
      <el-tooltip
        :effect="effect"
        content="切换显示模式"
        placement="bottom"
      >
        <el-icon>
          <!--        ?号表达式是true吗？-->
          <component :is="isFullscreen?SwitchButton:FullScreen"></component>
        </el-icon>
      </el-tooltip>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FullScreen, SwitchButton } from '@element-plus/icons'
import screenfull from 'screenfull'

// 是否全屏
const isFullscreen = ref(false)

// 触发事件
const onToggle = () => {
  // 全屏切换
  screenfull.toggle()
}

// 监听screenfull的变化;为了去改变isFullscreen的值
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// on 绑定监听
onMounted(() => {
  // name和事件
  screenfull.on('change', change)
})
// off：取消绑定
onUnmounted(() => {
  // name和事件
  screenfull.off('change', change)
})

</script>

<style scoped>

</style>
