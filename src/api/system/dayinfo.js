import request from '@/utils/request'

// 查询日时间列表
export function listDayinfo(query) {
  return request({
    url: '/system/dayinfo/list',
    method: 'get',
    params: query
  })
}

// 查询日时间详细
export function getDayinfo(id) {
  return request({
    url: '/system/dayinfo/' + id,
    method: 'get'
  })
}

// 新增日时间
export function addDayinfo(data) {
  return request({
    url: '/system/dayinfo',
    method: 'post',
    data: data
  })
}

// 修改日时间
export function updateDayinfo(data) {
  return request({
    url: '/system/dayinfo',
    method: 'put',
    data: data
  })
}

// 删除日时间
export function delDayinfo(id) {
  return request({
    url: '/system/dayinfo/' + id,
    method: 'delete'
  })
}
