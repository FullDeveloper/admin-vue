import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/admin/operationLog/page',
    method: 'get',
    params
  })
}

export function addObj(data) {
  return request({
    url: '/admin/operationLog/insert',
    method: 'post',
    data
  })
}

export function getObj(id) {
  return request({
    url: '/admin/operationLog/find/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/operationLog/remove/' + id,
    method: 'delete'
  })
}

export function putObj(id, data) {
  return request({
    url: '/admin/operationLog/update/' + id,
    method: 'put',
    data
  })
}
