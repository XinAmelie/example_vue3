<template>
  <el-dropdown
    trigger="click"
    @command="handleSetLanguage"
    class="international"
  >
<!--  @command    是dropdown的点击事件  -->
    <div>
      <el-tooltip
        :effect="effect"
        content="国际化"
        placement="bottom"
      >
      <!--        //显示图标-->
       <el-icon><Reading /></el-icon>
      </el-tooltip>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
<!--        如果lanuage === 'zh'，那么不可点击> -->
        <el-dropdown-item :disabled="lanuage === 'zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="lanuage === 'en'" command="en">English</el-dropdown-item>
        <!--<el-dropdown-item divided>Action 5</el-dropdown-item>-->
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { Reading } from '@element-plus/icons'

const store = useStore()

const lanuage = computed(() => store.getters.lanuage)

// 父组件传过来的语言选择
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个；== -1说明不在effect值的中；如果在['dark', 'light']没有找到value，就不允许指定
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})

// 切换语言的方法
const i18n = useI18n() // 仅组件使用useI18n

// lang是指el-dropdown-item中command设置的值，它可以作为参数。
const handleSetLanguage = (lang) => {
  // 修改locael的值
  i18n.locale.value = lang
  // 修改store的值
  store.commit('app/setLanuage', lang)
  // 提示 根据不同的locale去切换语言提示
  // js中不需要$ i18n.t()   非组件使用i18n.global.t()例如js文件
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}

</script>

<style scoped>

</style>
