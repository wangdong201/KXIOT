import request from '@/utils/request'

// 查询房间列表
export function listRoom(query) {
  return request({
    url: '/system/room/list',
    method: 'get',
    params: query
  })
}

// 查询房间详细
export function getRoom(id) {
  return request({
    url: '/system/room/' + id,
    method: 'get'
  })
}

// 新增房间
export function addRoom(data) {
  return request({
    url: '/system/room',
    method: 'post',
    data: data
  })
}

// 修改房间
export function updateRoom(data) {
  return request({
    url: '/system/room',
    method: 'put',
    data: data
  })
}

// 删除房间
export function delRoom(id) {
  return request({
    url: '/system/room/' + id,
    method: 'delete'
  })
}

// /system/room/buildinfo1
export function getBuildInfo1(data) {
  return request({
    url: '/system/room/buildinfo1',
    method: 'get',
    params: data
  })
}

// /system/room/buildinfo
export function getBuildInfo(data) {
  return request({
    url: '/system/room/buildinfo',
    method: 'get',
    params: data
  })
}
