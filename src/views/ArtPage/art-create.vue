<template>
  <div class="article-create">
    <el-card>
<!--    clearable是输入框小X的图标-->
        <el-input
        class="title-input"
        placeholder="标题区域"
        v-model="title"
        maxlength="20"
        clearable
        >

        </el-input>

      <el-tabs v-model="activeName">
        <el-tab-pane label="markdown" name="markdown">
          <markdown :title = "title" @onSuccess = "onSuccess" :detail = "detail" ></markdown>
        </el-tab-pane>

        <el-tab-pane label="editor" name="editor">
          <editor :title = "title" @onSuccess = "onSuccess" :detail = "detail" ></editor>
        </el-tab-pane>

        <el-tab-pane label="xmind" name="xmind">
          <jsmind></jsmind>
        </el-tab-pane>

      </el-tabs>

    </el-card>

  </div>
</template>

<script setup>

import editor from '@/views/ArtPage/Edit/Editor'
import markdown from '@/views/ArtPage/Edit/Markdown'
import { useRoute } from 'vue-router'
import { articleDetail } from '@/api/article'
import jsmind from '@/views/ArtPage/Edit/jsmind'

import { ref } from 'vue'

const title = ref('')
const activeName = ref('markdown')

const onSuccess = () => {
  title.value = ''
}

// 获取文章的内容
const route = useRoute()
const articleId = route.params.id
const detail = ref({})
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  // 标题赋值
  detail.value = detail.value.data.result
  title.value = detail.value.title
}
if (articleId) {
  getArticleDetail()
}

</script>

<style scoped lang="scss">
.title-input {
  margin-bottom: 30px;
}
</style>
