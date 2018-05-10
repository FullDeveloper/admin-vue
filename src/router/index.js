import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: '首页',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard'
    }]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: '系统管理',
    meta: { title: '系统管理', icon: 'example' },
    // 嵌套路由
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/system/user/UserList'),
        meta: { title: '用户管理', icon: 'table' }
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/system/role/RoleList'),
        meta: { title: '角色管理', icon: 'tree' }
      },
      {
        path: 'menu',
        name: '菜单管理',
        component: () => import('@/views/system/menu/MenuList'),
        meta: { title: '菜单管理', icon: 'tree' }
      },
      {
        path: 'department',
        name: '部门管理',
        component: () => import('@/views/system/department'),
        meta: { title: '部门管理', icon: 'tree' }
      },
      {
        path: 'dict',
        name: '字典管理',
        component: () => import('@/views/system/dict'),
        meta: { title: '字典管理', icon: 'tree' }
      },
      {
        path: 'operationLog',
        name: '业务日志',
        component: () => import('@/views/system/operationLog'),
        meta: { title: '业务日志', icon: 'tree' }
      },
      {
        path: 'tree',
        name: '登录日志',
        component: () => import('@/views/tree/index'),
        meta: { title: '登录日志', icon: 'tree' }
      },
      {
        path: 'tree',
        name: '监控管理',
        component: () => import('@/views/tree/index'),
        meta: { title: '监控管理', icon: 'tree' }
      },
      {
        path: 'notice',
        name: '通知管理',
        component: () => import('@/views/system/notice'),
        meta: { title: '通知管理', icon: 'tree' }
      },
      {
        path: 'generator',
        name: '代码生成',
        component: () => import('@/views/system/generator/GeneratorList'),
        meta: { title: '代码生成', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    meta: { title: '微服务管理', icon: 'tree' },
    children: [
      {
        path: 'index',
        name: '服务权限管理',
        component: () => import('@/views/form/index'),
        meta: { title: '服务权限管理', icon: 'form' }
      },
      {
        path: 'index',
        name: '服务接口文档',
        component: () => import('@/views/form/index'),
        meta: { title: '服务接口文档', icon: 'form' }
      },
      {
        path: 'index',
        name: '网关路由管理',
        component: () => import('@/views/form/index'),
        meta: { title: '网关路由管理', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

