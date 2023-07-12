<template>
  <div class="tags-view-container">
    <router-link
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :style="{
          backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
          borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
        }"
      v-for="(tag, index) in $store.getters.tagsViewList"
      :key="tag.fullPath"
      :to="{ path: tag.fullPath }"
      @contextmenu.prevent="openMenu($event, index)"
    >
<!-- @contextmenu.prevent="openMenu($event, index)" 右键触发事件 -->
      {{ tag.meta.title }}
      <el-icon class="close" v-show="!isActive(tag)">
        <Close  @click.prevent.stop="onCloseClick(index)"></Close>
      </el-icon>
    </router-link>
    <ContextMenu  v-show="visible" :style="myStyle" :index="selectIndex"></ContextMenu>
  </div>
</template>

<script setup>
import { Close } from '@element-plus/icons'
import { useRoute } from 'vue-router'
import { reactive, ref, watch } from 'vue'
import ContextMenu from '../../components/tagsView/ContextMenu'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()
console.log(route.path)
/**
 * 是否被选中
 */
const isActive = tag => {
  return tag.path === route.path
}

/**
 * 关闭 tag 的点击事件
 */

// index是指的是本身
const onCloseClick = index => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index
  }
  )
}
const selectIndex = ref(0)
const visible = ref(false)
const myStyle = reactive({
  left: 0,
  top: 0
})
// 鼠标右键
const openMenu = (e, index) => {
  const { x, y } = e
  myStyle.left = x + 'px'
  myStyle.top = y + 'px'
  visible.value = true
  selectIndex.value = index
}

// 关闭contentMenu
const closeMenu = () => {
  visible.value = false
}
// val其实就是visible
watch(visible, val => {
  if (val) {
    // addEventListener() 方法用于向指定元素添加事件句柄。
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

</script>

<style lang="scss" scoped>
.tags-view-container {
height: 34px;
width: 100%;
background: #fff;
border-bottom: 1px solid #d8dce5;
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
.tags-view-item {
display: inline-block;
position: relative;
cursor: pointer;
height: 26px;
line-height: 26px;
border: 1px solid #d8dce5;
color: #495060;
background: #fff;
padding: 0 8px;
font-size: 12px;
margin-left: 5px;
margin-top: 4px;
&:first-of-type {
margin-left: 15px;
}
&:last-of-type {
margin-right: 15px;
}
&.active {
color: #fff;

//  & 表示在嵌套层次中回溯一层，即
//  &:before相当于.box:before
//  &:after相当于.box:after
//  :before和:after是CSS中的伪元素，在这里分别表示为在使用box类的元素前面和后面插入指定内容
  // /* CSS3 语法 */
  //element::before { 样式 }
&::before {
content: '';
background: #fff;
display: inline-block;
width: 8px;
height: 8px;
border-radius: 50%;
position: relative;
margin-right: 4px;
}
}
// close 按钮
.close{
position: relative;
top: 5px;
width: 10px;
height: 12px;
line-height: 10px;
vertical-align: 2px;
border-radius: 50%;
text-align: center;
transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
transform-origin: 100% 50%;
&:before {
transform: scale(0.6);
display: inline-block;
vertical-align: -3px;
}
&:hover {
background-color: #b4bccc;
color: #ffffff;
}
}

}
}
</style>
