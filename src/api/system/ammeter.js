import request from '@/utils/request'

// 查询电列表
export function listAmmeter(query) {
  return request({
    url: '/system/ammeter/list',
    method: 'get',
    params: query
  })
}

// 查询电详细
export function getAmmeter(id) {
  return request({
    url: '/system/ammeter/' + id,
    method: 'get'
  })
}

// 新增电
export function addAmmeter(data) {
  return request({
    url: '/system/ammeter',
    method: 'post',
    data: data
  })
}

// 修改电
export function updateAmmeter(data) {
  return request({
    url: '/system/ammeter',
    method: 'put',
    data: data
  })
}

// 删除电
export function delAmmeter(id) {
  return request({
    url: '/system/ammeter/' + id,
    method: 'delete'
  })
}

export function jianzhutreelist(id) {
  return request({
    url: '/system/ammeter/bulidinfo/' + id,
    method: 'get'
  })
}

export function roominfotreelist(id) {
  return request({
    url: '/system/ammeter/roominfo/' + id,
    method: 'get'
  })
}


// 读电量
export function dbdslist(id) {
  return request({
    url: '/system/ammeter/dbds',
    method: 'get',
    params: { id },
  });
}

// 读多功能
export function dglxxlist(id) {
  return request({
    url: '/system/ammeter/dglxx',
    method: 'get',
    params: { id },
  });
}

export function postjfpay(data){
  return request({
    url: '/system/ammeter/pay',
    method: 'post',
    data: data,
  })
}

