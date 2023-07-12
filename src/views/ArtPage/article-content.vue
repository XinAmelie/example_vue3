<template>
  <div class="article-detail-container">
      <!--    标题-->
    <h2 class="title">{{detail.title}}</h2>
    <!--    头部-->
    <div class="header">
      <span class="author">
        {{$t('msg.article.author')}}: {{detail.author}}
      </span>
      <span class="time">
        时间: {{ $filters.relativeTime(detail.publicDate) }}
      </span>
      <span>
          <el-button type="success" class="edit" @click="onEditClick">编辑</el-button>
      </span>

    </div>
    <!-- 内容区域 -->
    <div class="content" v-html="detail.content">

    </div>

  </div>

</template>

<script setup>
import { articleDetail } from '@/api/article'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
// 获取数据

const route = useRoute()
const articleId = route.params.id
const detail = ref({})
// async和await关键字让我们可以用一种更简洁的方式写出基于Promise的异步行为
const getaritcledetail = async () => {
  detail.value = await articleDetail(articleId)
  detail.value = detail.value.data.result
  console.log(detail.value)
}
getaritcledetail()

const router = useRouter()
// 编辑按钮的点击事件
const onEditClick = (row) => {
  router.push(`/art/artcreate/editor/${articleId}`)
}

</script>

<style scoped lang="scss">
.article-detail-container {
  .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
  }
  .header {
    padding: 26px 0;
    .author {
      font-size: 14px;
      color: #555666;
      margin-right: 20px;
    }
    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }
    .edit {
      float: right;
    }
  }
  .content {
    font-size: 14px;
    padding: 20px 0;
    border-top: 1px solid #d4d4d4;
  }
}

</style>
