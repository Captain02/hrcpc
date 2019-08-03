import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'
import qs from 'querystring'

/**
 * 获取报表数据
 * @param {Number} status 
 */
export const getCharts = (status) => {
  return request({
    url: '/resume/chart',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      corId: getCorId(),
      status
    }
  })
}