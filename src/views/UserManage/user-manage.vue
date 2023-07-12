<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcelClick"> {{ $t('msg.excel.importExcel') }}</el-button>
        <el-button type="success" @click="onToExcelClick">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>

    <ExporttoExcel v-model="exportToExcelVisible"></ExporttoExcel>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ExporttoExcel from './components/Export2Excel'
import { ref } from 'vue'

const router = useRouter()
const onImportExcelClick = () => {
  router.push('/user/import')
}

const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}
</script>

<style scoped lang="scss">
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
}

</style>
