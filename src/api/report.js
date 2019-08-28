import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'

/**
 * 获取报表数据
 * @param {Number} status 
 */
export const getCharts = (status) => {
  return request({
    url: '/resume/chart',
    method: 'GET',
    params: {
      corId: getCorId(),
      status
    }
  })
}