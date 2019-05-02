import request from '@/utils/request'

export const info = () => {
  return request({
    method: 'GET',
    url: '/user/info'
  })
}