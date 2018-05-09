import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/admin/dept/page',
    method: 'get',
    params
  })
}

export function addObj(data) {
  return request({
    url: '/admin/dept/insert',
    method: 'post',
    data
  })
}

export function getObj(id) {
  return request({
    url: '/admin/dept/find/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/dept/remove/' + id,
    method: 'delete'
  })
}

export function putObj(id, data) {
  return request({
    url: '/admin/dept/update/' + id,
    method: 'put',
    data
  })
}
