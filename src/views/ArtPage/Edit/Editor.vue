<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import E from 'wangeditor'
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import i18next from 'i18next'
import { useStore } from 'vuex'
import { commitArticle, editArticle } from '@/views/ArtPage/Edit/common'

const store = useStore()

const props = defineProps({
  title: {
    required: true,
    type: String
  },
  detail: {
    type: Object
  }
})

const emits = defineEmits(['onSuccess'])

// 初始化wangeditor

let editor
let el
// 初始化wangEditor
const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  // 国际化处理

  editor.config.lang = store.getters.lanuage === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next

  // create()的创建方法
  editor.create()
}

onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})

const onSubmitClick = async () => {
  if (props.title && props.detail.id) {
    await editArticle({
      id: props.detail.id,
      title: props.title,
      // editor.txt自带接口；editor.txt.html()  editor.txt.text()
      content: editor.txt.html()
    })
  } else {
    await commitArticle({
      title: props.title,
      // editor.txt自带接口；editor.txt.html()  editor.txt.text()
      content: editor.txt.html()
    })
  }
  editor.txt.html('')
  // 向父组件回传事件
  emits('onSuccess')
}

// 服务端数据回显
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor.txt.html(val.content)
    }
  },
  {
    immediate: true
  }

)

</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
