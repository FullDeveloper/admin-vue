import request from '@/utils/request'

export function fetchTreeList(params) {
  return request({
    url: '/admin/menu/treeMenu',
    method: 'get',
    params
  })
}

export function createMenu(data) {
  return request({
    url: '/admin/menu/insert',
    method: 'post',
    data
  })
}

export function fetchTreeNode() {
  return request({
    url: '/admin/menu/treeNode',
    method: 'get'
  })
}

export function updateMenu(data) {
  return request({
    url: '/admin/menu/update/' + data.id,
    method: 'put',
    data
  })
}
