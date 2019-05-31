import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'


/**
 * 获取当前用户信息
 * @description 将token放入请求头的Authorization字段
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/user/info',
    params:{
      corid: getCorId()
    }
  })
}

/**
 * 修改密码
 * @param {Number} id
 * @param {String} username
 * @param {String} password 
 * @param {String} newPassword 
 */
export const changePwd = ( id, username, password, newPassword) => {
  return request({
    url: '/user/password',
    method: 'POST',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return qs.stringify(data)
    }],
    data: {
      corid: getCorId(),
      id,
      username,
      password,
      newPassword
    }
  })
}

/**
 * 删除头像
 * @param {Number} id fileId
 * @param {*} url 头像的url
 */
export const deleteAvatar = (id, url) => {
  return request({
    url: '',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      id,
      url
    }
  })
}