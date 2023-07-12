<template>
  <div class="navbar">
<!--    汉堡按钮-->
    <hamburger  class="hamburger-container"/>
    <Breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
<!--      引导图标-->
      <Guide class="right-menu-item hover-effect"></Guide>
      <!--   全屏部分   -->
      <screenfull class="right-menu-item hover-effect"></screenfull>
    <!-- 语言切换部分-->
      <ThemeSelect class="right-menu-item hover-effect"></ThemeSelect>
      <LangSelect class="right-menu-item hover-effect"></LangSelect>
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <div class="block">
            <el-avatar :size="40" :src="circleUrl.circleUrl" />
            <el-icon><Setting /></el-icon>
          </div>

        </div>

        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{$t('msg.navbar.home')}} </el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>{{$t('msg.navbar.course')}}</el-dropdown-item>
            </a>
            <el-dropdown-item divided>
              {{$t('msg.navbar.logout')}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import hamburger from '../components/hamburger/index'
import Breadcrumb from '@/components/Breadcrumb'
import { reactive } from 'vue'
import LangSelect from '@/components/LangSelect'
import { Setting } from '@element-plus/icons'
import ThemeSelect from '@/components/ThemeSelect'
import screenfull from '@/components/Screenfull'
import Guide from '@/components/Guide/index'

// el-avata实现本地图片作为头像
import imghead from '@/assets/R-C.jpg'

const circleUrl = reactive({
  circleUrl: imghead
  // https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png
})

</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  // 盒子阴影
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    :deep(.avatar-container)  {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }

    :deep(.right-menu-item)  {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }

  }
}

.breadcrumb-container{
  float: left;
}

</style>
