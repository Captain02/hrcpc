import request from '@/utils/request'

/**
 * 获取院系、系别信息，若想查询所有的院系 类型id为 1，要是想查询某个学院下的系，typeid=null(不填)，parentid等于学院id
 * @param {Number} typeId 类型id   
 * @param {Number} parentValue 父类id    
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
 * 获取社团的所有权限（菜单栏）信息
 */
export const getPremits = () => {
  return request({
    url: '/menu/menuList',
    method: 'POST'
  })
}

export const codeMap = (Id) => {
  return request({
    url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2a89e726a1bf0142&redirect_uri=http%3A%2F%2Fwww.yuezhonghao.cn%2FHBO%2Fwechart%2FOAuth&response_type=code&scope=snsapi_base&state=${Id}#wechat_redirect`,
    method: 'POST'
  })
}