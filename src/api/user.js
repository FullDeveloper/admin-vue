import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/admin/user/page',
    method: 'get',
    params
  })
}

export function createUser(data) {
  return request({
    url: '/admin/user/newUserInsert',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/admin/user/update/' + data.id,
    method: 'put',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/admin/user/remove/' + data.id,
    method: 'delete'
  })
}
