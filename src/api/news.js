import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'
import qs from 'querystring'


/**
 * 获取新闻列表
 * @param {String} title 新闻标题
 * @param {Number} currPage
 * @param {Number} pageSize
 */
export const getNews = (title = '', currPage = 1, pageSize = 5) => {
  return request({
    method: 'GET',
    url: '/news/list',
    params: {
      corid: getCorId(),
      title,
      currPage,
      pageSize
    }
  })
}

/**
 * 添加新闻
 * @param {Number} releaseuser 发布人的id
 * @param {Number} deptId 发布部门id
 * @param {String} title 
 * @param {String} content 新闻内容
 */
export const addNews = (releaseuser, deptId, title, content) => {
  return request({
    method: 'POST',
    url: '/news/add',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      corId: getCorId(),
      releaseuser,
      deptId,
      title,
      content
    }
  })
}

/**
 * 根据id获取单条新闻
 * @param {Number} id 
 */
export const getNewsByid = (id) => {
  return request({
    method: 'GET',
    url: '/news/getNews',
    params: {
      id
    }
  })
}


/**
 * 修改新闻
 * @param {Number} newsId 
 * @param {Number} deptId 发布部门id
 * @param {String} title 
 * @param {String} content 
 */
export const editNews = (newsId, deptId, title, content) => {
  return request({
    method: 'POST',
    url: '/news/updateNews',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      corid: getCorId(),
      newsId,
      deptId,
      title,
      content
    }
  })
}

/**
 * 删除新闻
 * @param {Number} id 
 */
export const deleteNews = (id) => {
  return request({
    method: 'POST',
    url: '/news/delete',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      id
    }
  })
}

/**
 * 更改点赞状态
 * @param {Number} type 新的状态值
 * @param {Number} userid 点赞用户的id
 * @param {Number} topicid 新闻id
 */
export const changeLike = (type, userid, topicid) => {
  return request({
    url: '/news/likeTopic',
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
 * 获取新闻的评论信息
 * @param {Number} topicid 新闻的id
 * @param {Number} currPage 
 * @param {Number} pageSize
 */
export const getComments = (topicid, currPage = 1, pageSize = 10) => {
  return request({
    url: '/news/getNewsReplice',
    method: 'GET',
    params: {
      topicid,
      currPage,
      pageSize
    }
  })
}



/**
 * 添加评论
 * @param {Number} userid 
 * @param {Number} parentid 该评论的上级评论
 * @param {Number} topicid 评论的新闻id
 * @param {String} repliescontent 评论的内容
 * @param {Number} repliesuserid 被回复人的id
 */
export const addComment = (userid, parentid, topicid, repliescontent, repliesuserid) => {
  return request({
    url: '/news/replies',
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
    url: '/news/likereplies',
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