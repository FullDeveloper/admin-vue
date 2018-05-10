import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/admin/notice/page',
    method: 'get',
    params
  })
}

export function addObj(data) {
  return request({
    url: '/admin/notice/insert',
    method: 'post',
    data
  })
}

export function getObj(id) {
  return request({
    url: '/admin/notice/find/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/notice/remove/' + id,
    method: 'delete'
  })
}

export function putObj(id, data) {
  return request({
    url: '/admin/notice/update/' + id,
    method: 'put',
    data
  })
}
