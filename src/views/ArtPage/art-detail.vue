
  <template>
    <div class="article-ranking-container">
      <el-card>
        <el-table ref="tableRef" :data="tableData" border>
          <el-table-column
            label="排名"
            prop="ranking"
          >
          </el-table-column>

          <el-table-column
            label="标题"
            prop="title"
          ></el-table-column>

          <el-table-column
            label="作者"
            prop="author"
          ></el-table-column>

          <el-table-column
            label="发布时间"
            prop="publicDate"
          >
            <!--            // v-slot 一行的所有数据  只有el-table绑定了data的时候，才可以用row-->
            <template #default="{row}">
              {{ $filters.relativeTime(row.publicDate) }}
            </template>
          </el-table-column>

          <el-table-column
            label="内容简介"
            prop="desc"
          ></el-table-column>

          <el-table-column label="操作">
<!--            获取一行的数据-->
            <template #default = "{row}">
              <el-button type="primary" plain @click="onShowclick(row)">查看</el-button>
              <el-button type="success" plain>删除</el-button>
            </template>

          </el-table-column>

        </el-table>
      </el-card>
    </div>
  </template>

<script setup>
import { getArticleList } from '@/api/article'
import { ref, onActivated, onMounted } from 'vue'
import { initSortable, tableRef } from '@/views/ArtPage/sortable'
import { useRouter } from 'vue-router'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

// 获取数据的方法
const getListData = async () => {
  const result = await getArticleList({
    pageindex: page.value,
    pagesize: size.value
  })
  console.log(result.data)
  tableData.value = result.data.retlist
  total.value = result.data.total
}
getListData()

// 处理数据不重新加载的问题 activated 在组件挂载时也会调用，就是主动的去刷新数据
onActivated(getListData)

// 初始化Stortable
// 加载组件的时候
onMounted(
  () => {
    initSortable()
  }
)

const router = useRouter()
// 查看详情
const onShowclick = (row) => {
  console.log(row)
  router.push(`artdetail/${row.id}`)
}

</script>

<style scoped lang="scss">

.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

   :deep(.el-table__row) {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}

:deep(.sortable-ghost){
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}

</style>
