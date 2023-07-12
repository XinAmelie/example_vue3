<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box">

    </div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { useStore } from 'vuex'
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from '@/views/ArtPage/Edit/common'

const props = defineProps({
  title: {

    required: true,
    type: String

  },
  // detail，打印detail可知，是把接口的信息获取到的
  detail: {
    type: Object
  }
})

// 向父组件通报事件
const emits = defineEmits(['onSuccess'])

// Editor实例；声明两个变量

let mkEditor
let el

onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

const store = useStore()
const initEditor = () => {
  mkEditor = new MkEditor({
    el,
    height: '500px',
    // 样式，竖向的展示
    previewStyle: 'vertical',
    language: store.getters.lanuage === 'zh' ? 'zh-CN' : 'en'
  })
  // 渲染编辑器
  mkEditor.getMarkdown()
}

watchSwitchLang(() => {
  if (!el) return
  // mkEditor.getHTML()获取用户输入的内容； el就是渲染区
  const htmlStr = mkEditor.getHTML()
  // 把mkEditor清理掉(把中文状态下的mkEdit给销毁)
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})

// 点击事件
const onSubmitClick = async () => {
  // 如果当前props包含detail,且包含id数据;我们认为是编辑的操作
  console.log(props.detail)
  if (props.detail && props.detail.id) {
    await editArticle({
      id: props.detail.id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    // 调用接口
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }
  // 发起请求后，重置编辑器
  mkEditor.reset()
  // 向父组件汇报事件
  emits('onSuccess')
}

// 编辑相关的监听

watch(() => props.detail,
  val => {
    if (val && val.content) {
      mkEditor.setHTML(val.content)
    }
  },
  {
    immediate: true
  }

)

</script>

<style scoped lang="scss">
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}

</style>
