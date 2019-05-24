import request from '@/utils/request'


/**
 * 获取当前用户信息
 * @param {Number} 所在社团id
 * @description 将token放入请求头的Authorization字段
 */
export const getUserInfo = (corid) => {
  return request({
    method: 'GET',
    url: '/user/info',
    params:{
      corid
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

/**
 * 删除头像
 * @param {Number} id fileId
 * @param {*} url 头像的url
 */
export const deleteAvatar = (id, url) => {
  return request({
    url: '',
    method: 'POST',
    params: {
      id,
      url
    }
  })
}