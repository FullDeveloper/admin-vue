import request from '@/utils/request'

export function fetchTableList(params) {
  return request({
    url: '/admin/generator/page',
    method: 'get',
    params
  })
}

export function generatorCode(data) {
  return request({
    url: '/admin/generator/code',
    method: 'post',
    data
  })
}
