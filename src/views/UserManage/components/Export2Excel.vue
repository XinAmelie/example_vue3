<template>
  <el-dialog
    title="导出文件"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      placeholder="请输入导出的表"
      v-model="excelName"
    >

    </el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">关闭对话框</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">
            确定
          </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { getUserManageAllList } from '@/api/user-manager'
import { USER_RELATIONS } from '@/views/UserManage/components/Export2ExcelConstants'

defineProps({
  // modelValue其实是父组件中的v-model绑定的那个数据的变量
  modelValue: {
    type: Boolean,
    required: true
  }
})

// 对外暴露事件的名字
// 使用 defineEmits 声明事件（也就是父级页面上添加的 @监听事件
const emits = defineEmits(['update:modelValue'])

/**
 * 关闭
 */
const closed = () => {
  // 希望父组件中'update:modelValue', 变为false
  emits('update:modelValue', false)
}

const loading = ref(false)

/**
 * 导出按钮点击事件
 */
const onConfirm = async () => {
  loading.value = true
  const allUser = (await getUserManageAllList()).data.result
  console.log(allUser)
  // 导入工具包；动态的导入，也就是懒加载
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelName.value,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
  })

  closed()
}

// 转换获取到的数据; // 该方法负责将数组转化成二维数组
// 当我们使用export_json_excell的时候，我们传递的data数据，他必须是一个二维数组.
const formatJson = (headers, rows) => {
  // map() 方法按照原始数组元素顺序依次处理元素。
  return rows.map(item => {
    // Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，
    // 数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致。
    // Object.keys(headers)把对照表转换为数据 item就是处理后的对照表
    // console.log(item)
    // item  {username: '丁洋', mobile: 17687276717, role: '测试', openTime: '1998-98-98 05-5-16-16'}
    return Object.keys(headers).map(key => {
      // item当前的节点，就是行里面的 {}对象    [{},{}]
      // console.log(key)
      // console.log(item[headers[key]])

      // key 是中文的。     headers[key]取得是英文的。 item[英文的]取的就是中文的。
      return item[headers[key]]
    })
  })
}

// 默认的文件名
const excelName = ref('员工表')

</script>

<style scoped>

</style>
