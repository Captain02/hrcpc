import request from '@/utils/request'

/**
 * 社团部门列表
 * @param {*} corid 
 * @param {*} deptName 
 * @param {*} currPage 
 * @param {*} pageSize 
 */
export const getDeparts = (corId, { currPage, pageSize }) => {
  return request({
    baseURL:'http://192.168.137.182:8081/HBO/sys',
    url: '/dept/list',
    method:'GET',
    params: {
      corId,
      // deptName,
      currPage,
      pageSize
    }
  })
}

/**
 * 根据部门id获取部门信息
 * 
 * @param {*} deptId 部门id
 */
export const getDepart = (deptId) => {
  return request({
    baseURL:'http://192.168.137.182:8081/HBO/sys',
    url: '/dept/selectDeptById',
    method:'GET',
    params: {
      deptId
    }
  })
}
/**
 * 添加社团部门
 * @param {Number} corId 
 * @param {String} name 
 * @param {Number} parentId 
 */
export const addDepart = (corId, {name, parentId}) => {
  return request({
    baseURL:'http://192.168.137.182:8081/HBO/sys',
    url: '/dept/save',
    method: 'POST',
    params: {
      corId,
      name,
      parentId
    }
  })
}

/**
 * 修改部门信息
 * @param {Number} deptId 
 * @param {String} name 
 * @param {Number} parentId 
 */
export const editDepart = ({ deptId, name, parentId}) => {
  return request({
    baseURL:'http://192.168.137.182:8081/HBO/sys',
    url: '/dept/update',
    method: 'POST',
    params: {
      deptId,
      name,
      parentId
    }
  })
}

/**
 * 删除社团部门
 * @param {Array} ids 
 */
export const deleteDeparts = (deptId) => {
  deptId = deptId.join(',')
  return request({
    baseURL:'http://192.168.137.182:8081/HBO/sys',
    url: '/dept/delete',
    method: 'GET',
    params: {
      deptId
    }
  })
}