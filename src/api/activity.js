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
 * 添加评论
 * @param {Number} userid 
 * @param {Number} parentid 该评论的上级评论
 * @param {Number} topicid 评论的活动id
 * @param {String} repliescontent 评论的内容
 * @param {Number} repliesuserid 被回复人的id
 */
export const addComment = (userid, parentid, topicid, repliescontent, repliesuserid) => {
  return request({
    url: '/activity/replies',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      userid,
      parentid,
      topicid,
      repliescontent,
      repliesuserid
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

/**
 * 添加社团活动
 * @param {String} actName 活动名称
 * @param {Number || ''} deptid 发布部门 若选择deptid为部门id若没选择则为''
 * @param {String} actLeader 负责人学号
 * @param {String} actStartTime 活动开始时间
 * @param {*} actEndTime  活动结束时间
 * @param {Number} images 上传图片后的id
 * @param {*} videoid 上传视频后的id
 * @param {Array || ''} croWdPeople 面向人群数组，若没选择则为''
 * @param {String} profile 简介
 * @param {Number} enclosureid 上传附件的id
 * @param {String} actdetails 活动详情
 * @param {Array} processNodes 活动流程
 */
export const addActivity = (actName, deptid, actLeader, actStartTime, actEndTime, images, videoid, croWdPeople, profile, enclosureid, actdetails, processNodes) => {
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
      enclosureid,
      actdetails,
      processNodes
    }
  })
}


/**
 * 更新社团活动信息
 * @param {Number} actId 活动id
 * @param {String} actName 活动名称
 * @param {Number || ''} deptid 发布部门 若选择deptid为部门id若没选择则为''
 * @param {String} actLeader 负责人学号
 * @param {String} actStartTime 活动开始时间
 * @param {*} actEndTime  活动结束时间
 * @param {Number} images 上传图片后的id
 * @param {*} videoid 上传视频后的id
 * @param {Array || ''} croWdPeople 面向人群数组，若没选择则为''
 * @param {String} profile 简介
 * @param {Number} enclosureid 上传附件的id
 * @param {String} actdetails 活动详情
 * @param {Array} processNodes 活动流程 
 */
export const updateActivity = (actId, actName, deptid, actLeader, actStartTime, actEndTime, images, videoid, croWdPeople, profile, enclosureid, actdetails, processNodes) => {
  return request({
    url: '/activity/updateAct',
    method: 'POST',
    transformRequest: [function (data) {
      data.croWdPeople = data.croWdPeople.join(',')
      data.processNodes = data.processNodes.join(',')
      return qs.stringify(data)
    }],
    data: {
      actCorId: getCorId(),
      actId,
      actName,
      deptid,
      actLeader,
      actStartTime,
      actEndTime,
      images,
      videoid,
      croWdPeople,
      profile,
      enclosureid,
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
export const getActivitys = (corid, actName = '', isAct = 1, crowdids = [], currPage = 1, pageSize = 5) => {
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
 * 根据活动id获取该活动的qq群二维码
 * @param {*} actid 
 */
export const getQQFileCode = (actid) => {
  return request({
    url: '/activity/getActQQfile',
    params: {
      actid
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

