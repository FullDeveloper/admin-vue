<template>
  <!--<section> 标签定义文档中的节 比如章节、页眉、页脚或文档中的其他部分。-->
  <section class="app-main">
    <!--transition Vue只有在插入，更新或者移除DOM元素时才会应用过渡效果
      当需要插入或者删除封装成过渡元素的元素时，vue将做如下事情：

          1.查找目标元素是否有CSS过渡或者动画，如果有就在适当的时候进行处理；

          2.如果过渡组件设置了JavaScript钩子函数，vue会在相应阶段调用钩子函数；

          3.如果以上两者都没有，DOM操作（插入或者删除）就在下一帧立即执行。

      out-in：当前元素先进行过渡，完成之后新元素过渡进入。
    -->
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
