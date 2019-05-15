import request from '@/utils/request'

/**
 * 社团部门列表
 * @param {*} corid 
 * @param {*} deptName 
 * @param {*} currPage 
 * @param {*} pageSize 
 */
export const getDeparts = (corId, {deptName, currPage, pageSize}) => {
  return request({
    url: '/dept/list',
    method:'GET',
    params: {
      corId,
      deptName,
      currPage,
      pageSize
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
    url: 'POST',
    url: '/dept/add',
    params: {
      corId,
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
    url: '/dept/delete',
    method: 'GET',
    params: {
      deptId
    }
  })
}