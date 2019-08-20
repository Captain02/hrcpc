import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'
import qs from 'querystring'

/**
 * 获取用户列表
 * @param {String} corid 社团id  cookie获取
 * @param {Number} pn 页码
 * @param {Number} size 每页大小
 * @param {String} sidx 排序字段
 * @param {String} order 排序方式，如：asc、desc
 * @param {String} name 用户姓名
 * @param {String} username 学号
 */
export const getUsers = ({page, size, name, username} = {}) => {
  return request({
    url: '/user/list',
    method: 'GET',
    params: {
      corid: getCorId(),
      page,
      size,
      name,
      username
    }
  })
}

/**
 * 获取单个用户信息
 * @param {Number} id 
 * @param {Number} corid cookie获取
 */
export const getUser = (id) => {
  return request({
    url: `/user/infoById/`,
    method: 'GET',
    params: {
      id,
      corid: getCorId()
    }
  })
}

/**
 * 查询成员是否已经加入该社团
 * @param {String} username 
 */
export const hasUserInCor = (username) => {
  return request({
    url: '/user/getCheckUserCor',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      corid: getCorId(),
      username
    }
  })
}

/**
 * 添加社团用户
 * @param {Number} corid   cookie获取
 * @param {String} name 姓名
 * @param {String} username 学号
 * @param {String} gender 性别
 * @param {String} persionnum 学号
 * @param {String} password 密码
 * @param {String} email 
 * @param {String} mobile 
 * @param {String} wechart 
 * @param {String} QQ 
 * @param {String} descs 自我描述
 * @param {String} college 院系
 * @param {String} collegetie 系别
 * 
 */
export const addUser = (name, username, gender, persionnum, password, email, mobile, wechart, qq, descs, college, collegetie) => {
  return request({
    url: '/user/save',
    method: 'POST',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return qs.stringify(data)
    }],
    data: {
      corid: getCorId(),
      name,
      username,
      gender,
      persionnum,
      password,
      email,
      mobile,
      wechart,
      qq,
      descs,
      college,
      collegetie
    }
  })
}

/**
 * 修改用户信息
 * @param {Number} userId 用户id
 * @param {String} name 用户姓名
 * @param {String} gender 性别
 * @param {String} email 邮箱
 * @param {String} mobile 手机号
 * @param {String} wechart 微信
 * @param {String} qq qq
 * @param {String} descs 自我描述
 * @param {String} college 院系
 * @param {String} collegetie 专业
 */
export const updateUser = ( userId, name, gender, college, collegetie, mobile, wechart, qq, email, descs) => {
  return request({
    url: '/user/update',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      userId,
      name,
      gender,
      college,
      collegetie,
      mobile,
      wechart,
      qq,
      email,
      descs
    }
  })
}

/**
 * 删除社团用户
 * @param {Array} userIds 
 * @param {Number} corid  cookie获取
 */
export const deleteUsers = (userIds) => {
  userIds = userIds.join(',')
  return request({
    url: '/user/delete',
    method: 'POST',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return qs.stringify(data)
    }],
    data: {
      userIds,
      corid: getCorId()
    }
  })
}


/**
 * 修改用户部门信息
 * @param {Number} user_id 
 * @param {Number} dept_id 
 * @param {Number} corid 
 */
export const updateUserDepart = (user_id, dept_id) => {
  return request({
    method: 'POST',
    url: '/user/updataUserDept',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return qs.stringify(data)
    }],
    data: {
      user_id,
      dept_id,
      corid: getCorId()
    }
  })
}

export const updateUserRole = (isRole, user_id, role_id) => {
  isRole = Number(isRole)
  return request({
    url: '/user/updateUserRole',
    method: 'POST',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return qs.stringify(data)
    }],
    data: {
      corid: getCorId(),
      isRole,
      user_id,
      role_id
    }
  })
}


/**
 * 个人中心模块更新个人信息
 * @param {Number} userId 
 * @param {String} name 
 * @param {String} gender 
 * @param {String} college 
 * @param {String} collegetie 
 * @param {String} mobile 
 * @param {String} wechart 
 * @param {String} qq 
 * @param {String} email 
 * @param {String} descs 
 */
export const updateUserInfo = (userId, name, gender, college, collegetie, mobile, wechart, qq, email, descs) => {
  return request({
    url: '/user/updatePersionInfo',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      userId,
      name,
      gender,
      college,
      collegetie,
      mobile,
      wechart,
      qq,
      email,
      descs
    }
  })
}