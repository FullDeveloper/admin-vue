import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/admin/fileInfo/page',
    method: 'get',
    params
  })
}

export function addObj(data) {
  return request({
    url: '/admin/fileInfo/insert',
    method: 'post',
    data
  })
}

export function getObj(id) {
  return request({
    url: '/admin/fileInfo/find/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/fileInfo/remove/' + id,
    method: 'delete'
  })
}

export function putObj(id, data) {
  return request({
    url: '/admin/fileInfo/update/' + id,
    method: 'put',
    data
  })
}
