import request from '@/utils/request'
// import { parseStrEmpty } from "@/utils/kxiot";

// 查询用户列表
export function listCustom(query) {
  return request({
    url: '/system/custom/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getCustom(id) {
  return request({
    url: '/system/custom/' + id,
    method: 'get'
  })
}

// 新增用户
export function addCustom(data) {
  return request({
    url: '/system/custom',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateCustom(data) {
  return request({
    url: '/system/custom',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delCustom(id) {
  return request({
    url: '/system/custom/' + id,
    method: 'delete'
  })
}
