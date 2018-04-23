<template>
  <!--Breadcrumb 面包屑 separator分隔符 默认值 /-->
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <!--vue transition-group 列表过渡 -->
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  // 要在组件来回切换的时候做点事情 利用watch 来监听$route 的变化
  // to表示的是你要去的那个组件  from 表示的是你从哪个组件过来的 它们是两个对象.
  watch: {
    $route(tom, form) {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      // 当整个vue-router 注入到根实例后，在组件的内部，可以通过this.$route 来获取到 router 实例
      // $route.matched数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      console.log(matched)
      if (first && first.name !== 'dashboard') {
        console.log(1)
        // 函数的返回值为Array类型，返回由当前数组和任何其他项组合而成的新数组。
        // concat()方法并不会更改Array对象本身，其本身并不会添加对应的元素，只有函数的返回值才是添加元素后的新数组
        // 拼接(合并)一个数组
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
