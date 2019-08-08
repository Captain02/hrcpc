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
export const apply = (corName, corleading, corTercher, corWorkspace, corCollege, corscale) => {
  return request({
    url: '/corporation/add',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      corName,
      corleading,
      corTercher,
      corWorkspace,
      corCollege,
      corscale
    }
  })
}


/**
 * 更新社团信息
 * @param {*} corName 
 * @param {*} corleading 
 * @param {*} corTercher 
 * @param {*} corWorkspace 
 * @param {*} corCollege 
 * @param {*} corscale 
 * @param {*} descs 
 */
export const update = (corName, corleading, corTercher, corWorkspace, corCollege, corscale, descs) => {
  return request({
    url: '/corporation/update',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      corid: getCorId(),
      corName,
      corleading,
      corTercher,
      corWorkspace,
      corCollege,
      corscale,
      descs
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


/**
 * 根据用户名获取用户
 * @param {String} username 
 */
export const getUserByUserName = (username) => {
  return request({
    url: '/user/getusersByusernameAndcor',
    method: 'GET',
    params: {
      corid: getCorId(),
      username
    }
  })
}


/**
 * 获取社团纳新二维码列表
 * @param {*} pageSize 
 * @param {*} currPage 
 */
export const getQRCodeList = (currPage, pageSize) => {
  return request({
    url: '/corporation/qqCodeFileList',
    method: 'GET',
    params: {
      corId: getCorId(),
      pageSize,
      currPage
    }
  })
}

/**
 * 删除纳新二维码
 * @param {Number} id 图片id
 * @param {String} path 图片的路径
 */
export const deleteQRCode = (id, path) => {
  return request({
    url: '/corporation/delQqCodeFile',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      id,
      path
    }
  })
}