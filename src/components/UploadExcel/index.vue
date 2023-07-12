<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

<!--    input是隐藏域-->
  <!-- @change 在输入框发生变化且失去焦点后触发。-->
    <input ref="excelUploadInput"
           type="file"
           class="excel-upload-input"
           accept=".xlsx, .xls"
           @change="handleChange"
            />

    <div class="drop"
     @drop.stop.prevent="handleDrop"
     @dragover.stop.prevent="handleDragover"
     @dragenter.stop.prevent="handleDragover"
    >
      <el-icon><UploadFilled /></el-icon>
      <span>{{$t('msg.uploadExcel.filed')}}</span>
    </div>

  </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons'
import { ref, defineProps } from 'vue'
import { getHeaderRow, isExcel } from './utils'
import { ElMessage } from 'element-plus'

// 导入excell的解析包
import XLSX from 'xlsx'

const props = defineProps({
  // 上传前回调,用户还未上传文件
  beforeUpload: Function,
  // 成功回调，用户已经上传了文件
  onSuccess: Function
})

const loading = ref(false)
const excelUploadInput = ref(null)
const handleUpload = () => {
  excelUploadInput.value.click()
}

// e是$event事件
const handleChange = (e) => {
  // 监听用户选择文件的事件
  const files = e.target.files
  // 获取用户的文件
  const rawFiles = files[0]
  // console.log(rawFiles)
  if (!rawFiles) return
  upload(rawFiles)
}

// 拖拽上传
/**
 * 拖拽文本释放时触发
 */
const handleDrop = (e) => {
  // 上传中
  if (loading.value) return
  // 获取文件对象
  const files = e.dataTransfer.files

  /**
  *  // test !== num*  test与num类型相同，其值也相同,　非运算肯定是false
  *
  **/

  if (files.length !== 1) {
    ElMessage.error('必须要一个文件')
  } else {
    const rawFile = files[0]
    // 判断文件是不是excell的文件
    if (!isExcel(rawFile)) {
      ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
      return
    }
    upload(rawFile)
  }
}

/**
 * 拖拽悬停时触发
 */
const handleDragover = e => {
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = 'copy'
}

/*
* 触发上传事件
* */
const upload = rawFiles => {
  excelUploadInput.value.value = null

  // 如果没有指定上传前回调的话;就是没有取消。都会执行读取数据的操作
  //! props.beforeUpload 因为用户没有指定上传前的回调，所以说是只要判断beforeUpload在props中不存在即可
  if (!props.beforeUpload) {
    readerData(rawFiles)
    return
  }

  // 如果指定了上传前回调，那么只有返回 true 才会执行后续操作；就是用户的取消操作
  // 用户上传事件的返回值
  const before = props.beforeUpload(rawFiles)
  // 如果为真就去解析excell的文件
  if (before) {
    readerData(rawFiles)
  }
}

/**
 * 读取数据（异步）Promise
 * Promise，译为承诺，是异步编程的一种解决方案，比传统的解决方案（回调函数）更加合理和更加强大
 * 执行这个函数我们得到了一个Promise对象。可以在想用的地方 then和catch；这就是提前执行，获取数据。在想用的地方随意的调用
 */

const readerData = rawFile => {
  loading.value = true
  return new Promise((resolve, reject) => {
    // FileReader异步读取文件
    const reader = new FileReader()
    // 该事件在读取操作完成时触发
    reader.onload = e => {
      // 1. 获取解析后的数据
      const data = e.target.result
      // 2. 利用xlsx对数据进行解析  opts配置对象
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格（sheet的名称）
      const firstSheetName = workbook.SheetNames[0]
      // 4. 获取第一张sheet表的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体,转化为json的格式
      const results = XLSX.utils.sheet_to_json(worksheet)

      // 7. 向父组件传入解析之后的数据
      generateData({ header, results })
      // 8.处理loadding
      loading.value = false
      // 9. 异步完成
      resolve()
    }

    // 先读取，再利用onload去解析；注意写的顺序就是读取在下，onload解析在上面
    reader.readAsArrayBuffer(rawFile)
  })
}
/**
 * 根据导入内容，生成数据
 * excelData是一个对象
 */
const generateData = (excelData) => {
  // props.onSuccess,指明是父组件中的onSuccess的函数，onSuccess回调；props.onSuccess(excelData) ,向父组件传递数据
  props.onSuccess && props.onSuccess(excelData)
}

</script>

<style scoped lang="scss">

.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}

</style>
