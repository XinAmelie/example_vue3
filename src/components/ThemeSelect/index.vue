<template>
<!--  //  v-bind="$attrs"当我们使用这个组件的时候，父组件指定的属性，会被v-bind="$attrs"（el-dropdown）继承-->
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    @command="handleSetTheme"
    class="theme"
  >

<!--    图标以及tooltip-->

    <div>
      <el-tooltip :content="$t('msg.bavBar.themeChange')" >
        <el-icon><Sunny /></el-icon>
      </el-tooltip>

    </div>

<!--    menu-->
    <template #dropdown>
      <el-dropdown-menu>
        <!--        如果lanuage === 'zh'，那么不可点击> -->
        <el-dropdown-item  command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>

  </el-dropdown>

<!--  弹出层-->
  <div class="">
    <SelectColor v-model="selectColorVisible"></SelectColor>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { Sunny } from '@element-plus/icons'
import SelectColor from '../ThemePicker/components/SelectColor'
// dialog声明

const selectColorVisible = ref(false)

const handleSetTheme = (command) => {
  selectColorVisible.value = true
}

</script>

<style scoped>

</style>
