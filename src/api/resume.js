import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'
import qs from 'querystring'

/**
 * 获取简历列表
 * @param {String} name 
 * @param {String} persionNum 
 * @param {Number} status 
 * @param {Number} currPage 
 * @param {Number} pageSize 
 */
export const getResumes = ({ name, persionNum, status, currPage, pageSize }) => {
  return request({
    url: '/resume/manage',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      corId: getCorId(),
      name,
      persionNum,
      status,
      currPage,
      pageSize
    }
  })
}


/**
 * 根据id获取简历信息
 * @param {Number} resumeId 
 */
export const getResume = (resumeId) => {
  return request({
    url: `/resume/${resumeId}`,
    method: 'GET',
  })
}

/**
 * 修改简历状态
 * @param {Number} userid 
 * @param {Number} status 
 */
export const editResume = (userid, status) => {
  return request({
    url: '/resume/edit',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      corid: getCorId(),
      userid,
      status
    }
  })
}

/**
 * 删除简历信息
 * @param {Number} userid 
 */
export const deleteResume = (userid) => {
  return request({
    url: '/resume/delete',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      corid: getCorId(),
      userid
    }
  })
}