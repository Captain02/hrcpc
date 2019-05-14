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
 * 删除社团部门
 * @param {Array} ids 
 */
export const deleteDeparts = (deptId) => {
  deptId = deptId.join(',')
  return request({
    baseURL: 'http://192.168.137.182:8081/HBO/sys',
    url: '/dept/delete',
    method: 'GET',
    params: {
      deptId
    }
  })
}