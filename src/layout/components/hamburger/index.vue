<template>
  <div class="hamburger-container" @click="toggleClick">
    <el-icon>
      <component :is="icon"></component>
    </el-icon>

<!--    <el-icon><Plus></Plus></el-icon>-->

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Plus, Minus } from '@element-plus/icons'

const store = useStore()
const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}

const icon = computed(() => {
  return store.state.app.sidebarOpened ? Plus : Minus
})

</script>

<style scoped>
.hamburger-container {
  padding: 0 16px;

}

</style>
