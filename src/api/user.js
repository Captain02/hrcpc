import request from '@/utils/request'

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
 * @param {Number} page 页码
 * @param {Number} limit 每页大小
 * @param {String} sidx 排序字段
 * @param {String} order 排序方式，如：asc、desc
 * @param {String} username 用户名
 */
export const getUsers = ({page, limit, sidx = 'username', order = 'desc', username}) => {
  return request({
    url: '/user/list',
    method: 'GET',
    params: {
      page,
      limit,
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
    url: '/user/info',
    method: 'GET',
    params: {
      userId
    }
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

export const addUser = () => {
  return request({
    url: '/user/save',
    method: 'POST',
    params: {

    }
  })
}

export const updateUser = () => {
  return request({
    url: '/user/update',
    method: 'POST',
    params: {

    }
  })
}


export const deleteUsers = () => {
  return request({
    url: '/user/delete',
    method: 'POST',
    params: {

    }
  })
}