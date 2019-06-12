import request from '@/utils/request'
import qs from 'querystring'

/**
 * 获取图片验证码
 */
export const getCaptcha = () => {
  return request({
    url: '/user/kaptcha.jpg',
    method: 'GET'
  })
}

/**
 * 根据学号查找用户信息
 * @param {String} username 
 * @param {String} key 
 * @param {String} captcha 验证码
 */
export const getUserByUsername = (username, key, captcha) => {
  return request({
    url: '/user/getUserInfo',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      username,
      key,
      captcha
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
 * @param {String} verCode 
 */
export const checkVerCode = (username, verCode) => {
  return request({
    url: '/user/checkVerCode',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
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