import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/admin/user/page',
    method: 'get',
    params
  })
}
