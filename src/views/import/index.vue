<template>
  <UploadExcel :onSuccess = "onSuccess"></UploadExcel>
</template>

<script setup>
import UploadExcel from '../../components/UploadExcel/index'
import { on } from 'screenfull'

const onSuccess = (excelData) => {
  // 如果成功的打印了，就说明是成功的解析了excell的数据
  console.log(excelData)
}

</script>

<style scoped>

</style>
