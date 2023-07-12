<template>
      <div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="$t('msg.navbar.guide')"
          placement="bottom-end"
        >
          <el-icon id ='guide-start' ><QuestionFilled @click="onClick" /></el-icon>
        </el-tooltip>

      </div>
</template>

<script setup>
import { QuestionFilled } from '@element-plus/icons'
import { onMounted } from 'vue'
import Driver from 'driver.js'
import { useI18n } from 'vue-i18n'
// 样式
import 'driver.js/dist/driver.min.css'
// 导入步骤steps
import steps from '@/components/Guide/steps'

// js中使用i18n国际化
const i18n = useI18n()

let driver = null
onMounted(() => {
  // driver轮子
  driver = new Driver({
    // 禁止关闭蒙版关闭(就是除了高亮以外的区域)
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})

const onClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}

</script>

<style scoped>

</style>
