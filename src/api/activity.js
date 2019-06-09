import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'
import qs from 'querystring'



export const addActivity = (actName, actLeader, actStartTime, actEndTime, images, videoid, croWdPeople, profile, enclosure, actdetails, processNodes) => {
  return request({
    url: '/activity/add',
    method: 'POST',
    transformRequest: [function (data) {
      data.croWdPeople = data.croWdPeople.join(',')
      data.processNodes = data.processNodes.join(',')
      return qs.stringify(data)
    }],
    data: {
      actCorId: getCorId(),
      actName,
      actLeader,
      actStartTime,
      actEndTime,
      images,
      videoid,
      croWdPeople,
      profile,
      enclosure,
      actdetails,
      processNodes
    }
  })
}

/**
 * 获取活动列表
 * @param {Number} corid 社团id，不能从cookie里取，因为可能会搜索所有社团的活动信息
 * @param {String} actName 活动名称
 * @param {Number} isAct 是否有效
 * @param {Array} crowdids 面向人群数组
 * @param {Number} pageSize 每页大小
 * @param {Number} currPage 当前页
 */
export const getActivitys = (corid, actName, isAct, crowdids, currPage, pageSize) => {
  crowdids = crowdids.join(',')
  return request({
    url: '/activity/list',
    method: 'GET',
    params: {
      corid,
      actName,
      isAct,
      crowdids,
      currPage,
      pageSize
    }
  })
}

/**
 * 获取活动负责人
 * @param {String} name 
 */
export const getUsersByName = (name) => {
  return request({
    url: '/user/getUsersByName',
    method: 'GET',
    params: {
      corid: getCorId(),
      name
    }
  })
}

/**
 * 更改活动流程状态
 * @param {Number} type 新的状态值
 * @param {Number} proid 单步流程id
 */
export const changeProcessState = (type, proid) => {
  return request({
    url: '/activity/changeProcess',
    method: 'POST',
    // transformRequest: [function (data) {
    //   return qs.stringify(data)
    // }],
    data: {
      actState: [
        { proid: 1, type: 1 },
        { proid: 2, type: 1 },
        { proid: 3, type: 1 },
        { proid: 4, type: 0 }
      ]
    }
  })
}


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

