import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'
import qs from 'querystring'


/**
 * 添加通知公告
 * @param {*} title 
 * @param {*} publishUser 
 * @param {*} receiveUserIds 
 * @param {*} content 
 */
export const addNotice = (title, publishUser, receiveUserIds, content) => {
  return request({
    url:'/notic/add',
    method: 'POST',
    transformRequest: [function (data) {
      data.receiveUserIds = data.receiveUserIds.join(',')
      return qs.stringify(data)
    }],
    data: {
      corId: getCorId(),
      title,
      publishUser,
      receiveUserIds,
      content
    }
  })
}

/**
 * 通知公告栏目获取通知公告列表
 * @param {*} title 
 * @param {*} publishUser 
 * @param {*} receiveUser 
 * @param {*} startTime 
 * @param {*} endTime 
 * @param {*} currPage 
 * @param {*} pageSize 
 */
export const getNotices = (title, publishUser, receiveUser, startTime, endTime, currPage, pageSize) => {
  return request({
    url: '/notic/list',
    method: 'GET',
    params: {
      corId: getCorId(),
      title,
      publishUser,
      receiveUser,
      startTime,
      endTime,
      currPage,
      pageSize
    }
  })
}


/**
 * 首页中通知公告列表
 * @param {Number} receiveUserId 登录人的id
 * @param {Number} currPage 
 * @param {Number} pageSize 
 */
export const getNoticesInHome = (receiveUserId, currPage, pageSize) => {
  return request({
    url: '/notic/homelist',
    method: 'GET',
    params: {
      corId: getCorId(),
      receiveUserId,
      currPage,
      pageSize
    }
  })
}

/**
 * 获取单条通知公告
 * @param {Number} id 
 */
export const getNotice = (id) => {
  return request({
    url: `/notic/${id}`,
    method: 'GET'
  })
}