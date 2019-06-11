import request from '@/utils/request'
import qs from 'querystring'

/**
 * 根据学号查找用户信息
 * @param {String} username 
 */
export const getUserByUsername = (username) => {
  return request({
    url: '/user/getUserInfo',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      username
    }
  })
}

/**
 * 发送验证码
 * @param {String} username 学号
 * @param {Number} type 0: 邮箱 1：手机号
 * @param {String} checkway 发送验证码的方式
 */
export const getVerCode = (username, type, checkway) => {
  return request({
    url: '/user/sendVerCode',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      username,
      type,
      checkway
    }
  })
}

/**
 * 检查验证码是否正确
 * @param {String} username 
 * @param {String} token 
 * @param {String} verCode 
 */
export const checkVerCode = (username, token, verCode) => {
  return request({
    url: '/user/checkVerCode',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    headers: {'Authorization': token},
    data: {
      username,
      verCode
    }
  })
}

/**
 * 重置密码 
 * @param {String} username 
 * @param {String} password 
 */
export const resetPassword = (username, password) => {
  return request({
    url: '/user/resetPwd',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      username,
      password
    }
  })
}