import request from '@/utils/request'

// 查询用电属性列表
export function listDsxing(query) {
  return request({
    url: '/system/dsxing/list',
    method: 'get',
    params: query
  })
}

// 查询用电属性详细
export function getDsxing(id) {
  return request({
    url: '/system/dsxing/' + id,
    method: 'get'
  })
}

// 新增用电属性
export function addDsxing(data) {
  return request({
    url: '/system/dsxing',
    method: 'post',
    data: data
  })
}

// 修改用电属性
export function updateDsxing(data) {
  return request({
    url: '/system/dsxing',
    method: 'put',
    data: data
  })
}

// 删除用电属性
export function delDsxing(id) {
  return request({
    url: '/system/dsxing/' + id,
    method: 'delete'
  })
}


