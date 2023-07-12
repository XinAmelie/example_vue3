<template>
    <div class="bg" ref="bg">

    </div>
</template>

<script setup>
import CanvasNet from 'canvas-nest.js'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'
const config = {
  opacity: 0.7,
  color: '18,156,255',
  count: 200,
  pointColor: '255,0,0',
  zIndex: 0
}

const bg = ref(null)

onMounted(() => {
  getCurrentInstance().cn = new CanvasNet(bg.value, config)
  console.log('模板加载，组件生效')
})
onBeforeUnmount(() => {
  getCurrentInstance().cn.destroy()
  console.log('模板消失，组件销毁')
})

</script>

<style scoped lang="scss">
$bg_size:100vm;
.bg{
  width: $bg_size;
  height: 100vh;
  background-image: url("~@/assets/star.jpg");

}

</style>
