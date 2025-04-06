import request from '@/utils/request'

// 查询采集器列表
export function listDgateway(query) {
  return request({
    url: '/system/dgateway/list',
    method: 'get',
    params: query
  })
}

// 查询采集器详细
export function getDgateway(id) {
  return request({
    url: '/system/dgateway/' + id,
    method: 'get'
  })
}

// 新增采集器
export function addDgateway(data) {
  return request({
    url: '/system/dgateway',
    method: 'post',
    data: data
  })
}

// 修改采集器
export function updateDgateway(data) {
  return request({
    url: '/system/dgateway',
    method: 'put',
    data: data
  })
}

// 删除采集器
export function delDgateway(id) {
  return request({
    url: '/system/dgateway/' + id,
    method: 'delete'
  })
}
