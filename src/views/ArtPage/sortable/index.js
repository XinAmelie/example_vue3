import { ref } from 'vue'
import Sortable from 'sortablejs'

// 排序相关
export const tableRef = ref(null)

/**
 * 初始化排序
 */
export const initSortable = () => {
  // 设置拖拽效果
  const elem = tableRef.value.$el.querySelectorAll(
    '.el-table__body > tbody'
  )[0]
  // 1. 要拖拽的元素
  // 2. 配置对象
  Sortable.create(elem, {
    // 拖拽时类名,直接在样式中写就可以了
    ghostClass: 'sortable-ghost',
    // 拖拽结束的回调方法
    onEnd () {

    }
  })
}
