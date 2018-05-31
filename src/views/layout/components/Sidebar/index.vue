<template>
  <scroll-bar>
    <!--
      el-menu:
        collapse: 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
        default-active	当前激活菜单的 index
        show-timeout: 展开 sub-menu 的延时
        active-text-color: 当前激活菜单的文字颜色（仅支持 hex 格式）	默认#409EFF
    -->
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="menus"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import { getUserPermissions } from '@/api/user'
import store from '@/store'

export default {
  components: { SidebarItem, ScrollBar },
  data() {
    return {
      menus: []
    }
  },
  created() {
    getUserPermissions(store.getters.username)
      .then(response => {
        console.log('routers==>', this.$router.options.routes)
        console.log('res=>', response)
        const obj = {
          path: '',
          redirect: 'dashboard',
          name: '首页',
          children: [{
            meta: { title: '首页', icon: 'example' },
            path: 'dashboard',
            name: 'dashboard'
          }]
        }
        this.menus = response.data
        this.menus.splice(0, 0, obj)
      })
      .catch(error => {
        console.log(error)
      })
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      /* console.log(this.$router.options.routes)
      console.log(this.$router.options.routes[2].children.length === 1) // 子节点长度为1
      console.log(!this.$router.options.routes[2].children[0].children) // 子节点下面没有子节点
      console.log(!this.$router.options.routes[2].alwaysShow) // 总是显示 */
      console.log('username==>', store.getters.username)
      console.log('routers==>', this.$router.options.routes)
      // return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
