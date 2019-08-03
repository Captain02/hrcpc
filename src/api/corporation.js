import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'
import qs from 'querystring'

/**
 * 申请社团
 * @param {String} corname 社团名称
 * @param {String} corleading 社团负责人
 * @param {String} cortercher 领导老师
 * @param {String} corworkspace 工作地点
 * @param {Number} corcollege 所属院系
 * @param {String} corscale 社团规模
 */
export const apply = (corname, corleading, cortercher, corworkspace, corcollege, corscale) => {
  return request({
    url: '/corporation/add',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      corname,
      corleading,
      cortercher,
      corworkspace,
      corcollege,
      corscale
    }
  })
}


/**
 * 获取社团信息
 * @param {Number} corid 社团id
 */
export const getCorporation = () => {
  return request({
    url: '/corporation/selectByCorId',
    method: 'GET',
    params: {
      corid: getCorId()
    }
  })
} 
