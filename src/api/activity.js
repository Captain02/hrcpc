import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'
import qs from 'querystring'


/**
 * 删除文件
 * @param {Number} id 
 * @param {String} filePath 
 */
export const deleteFile = (id, filePath) => {
  return request({
    url: '/activity/deleteActImage',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      id,
      filePath
    }
  })
}

