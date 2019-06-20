import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'
import qs from 'querystring'


/**
 * 获取单个活动信息
 * @param {Number} actid 
 */
export const getActivity = (actid) => {
  return request({
    url: '/activity/getActivity',
    method: 'GET',
    params: {
      actid
    }
  })
}

/**
 * 获取活动的评论信息
 * @param {Number} topicid 活动的id
 */
export const getComments = (topicid) => {
  return request({
    url: '/activity/getReplies',
    method: 'GET',
    params: {
      topicid
    }
  })
}

/**
 * 评论点赞
 * @param {Number} userid 
 * @param {Number} repliesid 
 * @param {Number} type
 */
export const changeCommentLike = (userid, repliesid, type) => {
  return request({
    url: '/activity/repliesLike',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      userid,
      repliesid,
      type
    }
  })
}

export const addActivity = (actName, deptid, actLeader, actStartTime, actEndTime, images, videoid, croWdPeople, profile, enclosure, actdetails, processNodes) => {
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
      deptid,
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
 * 查看参加活动的用户
 * @param {Number} actid 
 * @param {String} name 
 * @param {String} username 
 * @param {Number} currPage
 * @param {Number} pageSize
 */
export const getUsersByActId = (actid, name, username, currPage, pageSize) => {
  return request({
    url: '/activity/getUserByActId',
    method: 'GET',
    params: {
      actid,
      name,
      username,
      currPage,
      pageSize
    }
  })
}

/**
 * 活动图表统计
 * @param {Number} actid 
 */
export const getActCharts = (actid) => {
  return request({
    url: '/activity/getActCharts',
    method: 'GET',
    params: {
      actid
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

/***
 * 获取社团的所有部门
 */
export const getDepts = () => {
  return request({
    url: '/dept/getDepts',
    method: 'GET',
    params: {
      corid: getCorId()
    }
  })
}

/**
 * 更改活动流程状态
 * @param {Number} type 新的状态值
 * @param {Number} proid 单步流程id
 */
export const changeProcessState = (actState) => {
  // console.log(JSON.stringify(actState))
  return request({
    url: '/activity/changeProcess',
    method: 'POST',
    data: actState
  })
}

/**
 * 更改点赞状态
 * @param {Number} type 新的状态值
 * @param {Number} userid 点赞用户的id
 * @param {Number} topicid 活动id
 */
export const changeLike = (type, userid, topicid) => {
  return request({
    url: '/activity/isLike',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      type,
      userid,
      topicid
    }
  })
}
/**
 * 更改收藏状态
 * @param {Number} type 新的状态值
 * @param {Number} userid 收藏用户的id
 * @param {Number} topicid 活动id
 */
export const changeCollect = (type, userid, topicid) => {
  return request({
    url: '/activity/isCollection',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      type,
      userid,
      topicid
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

