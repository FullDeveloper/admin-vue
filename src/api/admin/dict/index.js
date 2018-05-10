import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/admin/dict/page',
    method: 'get',
    params
  })
}

export function addObj(data) {
  return request({
    url: '/admin/dict/insert',
    method: 'post',
    data
  })
}

export function getObj(id) {
  return request({
    url: '/admin/dict/find/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/dict/remove/' + id,
    method: 'delete'
  })
}

export function putObj(id, data) {
  return request({
    url: '/admin/dict/update/' + id,
    method: 'put',
    data
  })
}
