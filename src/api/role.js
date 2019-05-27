import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'

/**
 * 获取社团的角色列表
 * @param {Number} corId 社团id
 * @param {String} roleName 角色名
 * @param {Number} currPage 当前页
 * @param {Number} pageSize 每页的大小
 * 
 */
export function getRoles({ roleName, currPage, pageSize } = {}){
  return request({
    url: '/role/list',
    method: 'POST',
    params: {
      corId: getCorId(),
      roleName,
      currPage,
      pageSize
    }
  })
}

/**
 * 根据id获取单个角色信息
 * @param {Number} roleId 
 */
export const getRole = (roleId) => {
  return request({
    url: '/role/selectRoleById',
    method: 'GET',
    params: {
      roleId
    }
  })
}


/**
 * 添加社团角色
 * @param {Number} corId 
 * @param {String} roleName 
 * @param {String} remark 备注信息
 */
export const addRole = ({roleName, remark}) => {
  return request({
    url: '/role/save',
    method: 'POST',
    params: {
      corId: getCorId(),
      roleName,
      remark
    }
  })
}

/**
 * 更新角色基本信息
 * @param {Number} roleId 
 * @param {String} roleName 
 * @param {String} remark 
 */
export const updateRole = (roleId, roleName, remark) => {
  return request({
    url: '/role/update',
    method: 'POST',
    params: {
      roleId,
      roleName,
      remark
    }
  })
}


/**
 * 删除角色
 * @param {Array} roleIds 
 */
export const deleteRoles = (roleIds) => {
  roleIds = roleIds.join(',')
  return request({
    url: '/role/delete',
    method: 'GET',
    params: {
      roleId: roleIds
    }
  })
}

/**
 * 根据角色id获取该角色所拥有的权限
 * @param {Number} roleid 
 */
export const getRolePremit = (roleid) => {
  return request({
    url: '/user/getUserPermission',
    method: 'GET',
    params: {
      roleid
    }
  })
}

/**
 * 更新角色权限
 * @param {Number} isRolePermission 
 * @param {Number} role_id 
 * @param {Number} menu_id 
 */
export const updateRolePremit = (isRolePermission, role_id, menu_id) => {
  isRolePermission = Number(isRolePermission)
  return request({
    url: '/role/updateRolePermission',
    method: 'POST',
    params: {
      isRolePermission,
      role_id,
      menu_id
    }
  })
}