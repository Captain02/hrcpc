import request from '@/utils/request'

/**
 * 获取院系、系别信息，若想查询所有的院系 类型id为 1，要是想查询某个学院下的系，typeid=null(不填)，parentid等于学院id
 * @param {*} typeId 类型id   
 * @param {*} parentValue 父类id    
 */
export const getCollegeInfo = (typeId, parentValue) => {
  return request({
    baseURL: 'http://140.143.201.244:8081/HBO/sys/comm/',
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
 * 获取用户列表
 * @param {String} corid 社团id
 * @param {Number} pn 页码
 * @param {Number} size 每页大小
 * @param {String} sidx 排序字段
 * @param {String} order 排序方式，如：asc、desc
 * @param {String} username 用户名
 */
export const getUsers = (corid, {page, size, sidx , order , username}) => {
  return request({
    url: '/user/list',
    method: 'GET',
    params: {
      corid,
      page,
      size,
      sidx,
      order,
      username
    }
  })
}

/**
 * 获取单个用户信息
 * @param {Number} id 
 * @param {Number} corid 
 */
export const getUser = (id, corid) => {
  return request({
    url: `/user/infoById/`,
    method: 'GET',
    params: {
      id,
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
 * 添加社团用户
 * @param {Number} corid 
 * @param {String} name 姓名
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
export const addUser = (corid, name, username, gender, persionnum, password, email, mobile, wechart, QQ, descs, college, collegetie) => {
  return request({
    url: '/user/save',
    method: 'POST',
    params: {
      corid,
      name,
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
export const updateUser = ( userId, name, gender, email, mobile, wechart, qq, descs, college, collegetie) => {
  return request({
    url: '/user/update',
    method: 'POST',
    params: {
      userId,
      name,
      gender,
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