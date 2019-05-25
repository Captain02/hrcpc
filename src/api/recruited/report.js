import request from '@/utils/request'

/**
 * 获取报表数据
 * @param {Number} corId 
 * @param {Number} status 
 */
export const getCharts = (corId, status) => {
  return request({
    url: '/resume/chart',
    method: 'POST',
    params: {
      corId,
      status
    }
  })
}