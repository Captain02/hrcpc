import request from '@/utils/request'

/**
 * 获取院系、系别信息，若想查询所有的院系 类型id为 1，要是想查询某个学院下的系，typeid=null(不填)，parentid等于学院id
 * @param {*} typeId 类型id   
 * @param {*} parentValue 父类id    
 */
export const getCollegeInfo = (typeId, parentValue) => {
  return request({
    baseURL: 'http://140.143.201.244:8081/HBO/',
    method: 'GET',
    url: '/getselectes',
    params: {
      typeId,
      parentValue
    }
  })
}

/**
 * 获取当前用户信息
 * @description 将token放入请求头的Authorization字段
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/user/info'
  })
}

/**
 * 获取用户列表
 * @param {Number} pn 页码
 * @param {Number} size 每页大小
 * @param {String} sidx 排序字段
 * @param {String} order 排序方式，如：asc、desc
 * @param {String} username 用户名
 */
export const getUsers = ({pn, size, sidx , order , username}) => {
  return request({
    url: '/user/list',
    method: 'GET',
    params: {
      pn,
      size,
      sidx,
      order,
      username
    }
  })
}

/**
 * 获取单个用户信息
 * @param {Number} userId 
 */
export const getUser = (userId) => {
  return request({
    url: `/user/info/${userId}`,
    method: 'GET'
  })
}


/**
 * 修改密码
 * @param {String} password 
 * @param {String} newPassword 
 */
export const changePwd = (password, newPassword) => {
  return request({
    url: '/user/password',
    method: 'POST',
    params: {
      password,
      newPassword
    }
  })
}

/**
 * 添加社团用户
 * @param {Number} corid 
 * @param {Number} fileId 头像的id    // out
 * @param {String} username 用户名
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
export const addUser = (corid, username, gender, persionnum, password, email, mobile, wechart, QQ, descs, college, collegetie) => {
  return request({
    url: '/user/save',
    method: 'POST',
    params: {
      corid,
      username,
      gender,
      persionnum,
      password,
      email,
      mobile,
      wechart,
      QQ,
      descs,
      college,
      collegetie
    }
  })
}

/**
 * 修改用户信息
 * @param {*} corid 
 * @param {*} userId 
 * @param {*} username 
 * @param {*} gender 
 * @param {*} persionnum 
 * @param {*} email 
 * @param {*} mobile 
 * @param {*} wechart 
 * @param {*} QQ 
 * @param {*} descs 
 * @param {*} college 
 * @param {*} collegetie 
 */
export const updateUser = ( corid, userId, username, gender, persionnum, email, mobile, wechart, QQ, descs, college, collegetie) => {
  return request({
    url: '/user/update',
    method: 'POST',
    params: {
      corid,
      userId,
      username,
      gender,
      persionnum,
      email,
      mobile,
      wechart,
      QQ,
      descs,
      college,
      collegetie
    }
  })
}

/**
 * 删除社团用户
 * @param {Array} userIds 
 */
export const deleteUsers = (userIds) => {
  userIds = userIds.join(',')
  return request({
    url: '/user/delete',
    method: 'POST',
    params: {
      userIds
    }
  })
}