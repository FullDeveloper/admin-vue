<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <!--页面左侧菜单-->
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <!--包含面包屑 当前路由提示信息、左侧菜单打开关闭的判断-->
      <navbar></navbar>
      <!--选项卡-->
      <tags-view></tags-view>
      <!--页面主体-->
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
