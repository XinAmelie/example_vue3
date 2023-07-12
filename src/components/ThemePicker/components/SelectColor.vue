<template>
<!--  弹出弹窗-->
<!--  :model-value单向绑定-->
  <!-- v-bind:model-value（单向的）和v-model的作用类似都是数据绑定。 父组件绑定了modelValue，那么子组件就不可以再用v-model了
    :model-value = 'modelValue'-->
  <el-dialog
    :title="$t('msg.universal.title')"
    :model-value = 'modelValue'
    @close = "closed"
    width="22%"
  >
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker
        v-model="mColor"
        :predefine="predefineColors"
      >
      </el-color-picker>

    </div>

    <div class="footer bot">
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="comfirm">{{
            $t('msg.universal.confirm')
          }}</el-button>
      </span>

    </div>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

defineProps({
  // modelValue其实是父组件中的v-model绑定的那个数据的变量
  modelValue: {
    type: Boolean,
    required: true
  }
})

// 接收到父组件传值后,声明事件defineEmits
const emits = defineEmits(['update:modelValue'])
// 触发事件
const closed = () => {
  // emits告诉父组件，事件要发生变化
  emits('update:modelValue', false)
}

const store = useStore()
// 默认色值
const mColor = ref(store.getters.mainColor)

const comfirm = async () => {
  const newStyle = await generateNewStyle(mColor.value)
  writeNewStyle(newStyle)
  // 上边定义的closed是为了confirm使用的

  store.commit('theme/setMainColor', mColor.value)
  closed()
}

// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

</script>

<style scoped>
.content {
  text-align: center;

.title {
  margin-bottom: 12px;
}

}
.footer{
  margin-top: 20px;
  text-align: end;
}
</style>
