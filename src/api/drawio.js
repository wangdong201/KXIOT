import request from '@/utils/request'

export function getSvg(){
  return request({
    url: '/getsvg',
    method: 'get',
  })
}

export function postSvg(data){
  return request({
    url: '/psvg',
    method: 'post',
    data: data,
  })
}
