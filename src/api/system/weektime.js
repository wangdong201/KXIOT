import request from '@/utils/request'

// 查询定时时间列表
export function listWeektime(query) {
  return request({
    url: '/system/weektime/list',
    method: 'get',
    params: query
  })
}

// 查询定时时间详细
export function getWeektime(id) {
  return request({
    url: '/system/weektime/' + id,
    method: 'get'
  })
}

// 新增定时时间
export function addWeektime(data) {
  return request({
    url: '/system/weektime',
    method: 'post',
    data: data
  })
}

// 修改定时时间
export function updateWeektime(data) {
  return request({
    url: '/system/weektime',
    method: 'put',
    data: data
  })
}

// 删除定时时间
export function delWeektime(id) {
  return request({
    url: '/system/weektime/' + id,
    method: 'delete'
  })
}


export function yhutimelist() {
  return request({
    url: '/daylist' ,
    method: 'get',
  })
}
