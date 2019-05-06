import request from '@/utils/request'


/**
 * 获取角色列表
 * @param {Number} page 页码
 * @param {Number} limit 每页大小
 * @param {String} sidx 排序字段
 * @param {String} order 排序方式，如：asc、desc
 * @param {String} roleName 角色名
 */
export const getRoles = ({page, limit, sidx, order = 'desc', roleName}) => {
  return request({
    url: '/role/list',
    method: 'GET',
    params: {
      page,
      limit,
      sidx,
      order,
      roleName
    }
  })
}

/**
 * 获取当前用户所拥有的角色
 * @description 通过请求头的author来获取
 */
export const getUserRoles = () => {
  return request({
    url: '/role/select',
    method: 'GET'
  })
}

/**
 * 获取单个角色信息
 * @param {Number} roleId 
 */
export const getRole = (roleId) => {
  return request({
    url: '/role/info',
    method: 'GET',
    params: {
      roleId
    }
  })
}



export const addRole = () => {
  return request({
    url: '/role/save',
    method: 'POST',
    params: {

    }
  })
}

export const updateRole = () => {
  return request({
    url: '/role/update',
    method: 'POST',
    params: {

    }
  })
}


export const deleteRoles = () => {
  return request({
    url: '/role/delete',
    method: 'POST',
    params: {

    }
  })
}