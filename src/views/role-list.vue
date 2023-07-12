<template>
  <div class="app_root">
<!--    注释不行吗？你妹的-->
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>

      <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
      />
    </el-row>

  </div>

</template>

<script>
export default {
  name: 'role-list'
}
</script>

<style scoped>

</style>
