import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/admin/role/page',
    method: 'get',
    params
  })
}

export function createRole(data) {
  return request({
    url: '/admin/role/insert',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/admin/role/update/' + data.id,
    method: 'put',
    data
  })
}

export function deleteRole(data) {
  return request({
    url: '/admin/role/remove/' + data.id,
    method: 'delete'
  })
}
