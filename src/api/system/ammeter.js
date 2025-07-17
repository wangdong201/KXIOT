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


// 电表信息
export function getlooking(data){
  return request({
    url: '/system/ammeter/looking',
    method: 'get',
     params: data,
  })
}


// 表格刷新
export function getnewmess(data){
  return request({
    url: '/system/ammeter/newmess',
    method: 'get',
     params: data,
  })
}

// 电压
export function getvoltage(data){
  return request({
    url: '/system/ammeter/dy',
    method: 'get',
     params: data,
  })
}

// 电流
export function getcurrent(data){
  return request({
    url: '/system/ammeter/dl',
    method: 'get',
     params: data,
  })
}

// 功率
export function getpower(data){
  return request({
    url: '/system/ammeter/gl',
    method: 'get',
     params: data,
  })
}


// 功率因数
export function getpowerfactor(data){
  return request({
    url: '/system/ammeter/glys',
    method: 'get',
     params: data,
  })
}

// 关电
export function getClosePower(data){
  return request({
    url: '/system/ammeter/close',
    method: 'get',
    params: data,
  })
}

// 开电
export function getOpenPower(data){
  return request({
    url: '/system/ammeter/open',
    method: 'get',
    params: data,
  })
}

// 解除手动
export function getUnmanualOff(data){
  return request({
    url: '/system/ammeter/off',
    method: 'get',
    params: data,
  })
}

// 立即抄表
export function getNowMeter(data){
  return request({
    url: '/system/ammeter/chaobiao',
    method: 'get',
    params: data,
  })
}

// 手动录入底数
export function postManualInput(data){
  return request({
    url: '/system/ammeter/sdlr',
    method: 'post',
    data: data,
  })
}





