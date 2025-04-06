import request from '@/utils/request'

// 缴费报表查询
export function list(query) {
  return request({
    url: '/monitor/jiaofei/list',
    method: 'get',
    params: query
  })
}

// 管理员数据
export function userlist() {
  return request({
    url: '/monitor/jiaofei/userlist',
    method: 'get',
  })
}

// 缴费记录
export function paylist(query) {
  return request({
    url: '/monitor/jiaofei/paylist',
    method: 'get',
    params: query
  })
}

// /monitor/jiaofei/changestate

// deptId   state

// 缴费权限变更
export function jiaoFeiChangeState(data) {
  return request({
    url: '/monitor/jiaofei/changestate',
    method: 'post',
    data: data
  })
}

