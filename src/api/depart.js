import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'
import qs from 'querystring'

/**
 * 社团部门列表
 * @param {Number} corid cookie获取
 */
export const getDeparts = () => {
  return request({
    url: '/dept/list',
    method:'GET',
    params: {
      corId: getCorId()
    }
  })
}

/**
 * 根据部门id获取部门信息
 * 
 * @param {Number} deptId 部门id
 */
export const getDepart = (deptId) => {
  return request({
    // baseURL:'http://192.168.137.182:8081/HBO/sys',
    url: '/dept/selectDeptById',
    method:'GET',
    params: {
      deptId
    }
  })
}
/**
 * 添加社团部门
 * @param {Number} corId cookie获取
 * @param {String} name 
 * @param {Number} parentId 
 */
export const addDepart = ({name, parentId}) => {
  return request({
    // baseURL:'http://192.168.137.182:8081/HBO/sys',
    url: '/dept/save',
    method: 'POST',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return qs.stringify(data)
    }],
    data: {
      corId: getCorId(),
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
    // baseURL:'http://192.168.137.182:8081/HBO/sys',
    url: '/dept/update',
    method: 'POST',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return qs.stringify(data)
    }],
    data: {
      deptId,
      name,
      parentId
    }
  })
}

/**
 * 删除社团部门
 * @param {Array} deptId 
 */
export const deleteDeparts = (deptId) => {
  deptId = deptId.join(',')
  return request({
    // baseURL:'http://192.168.137.182:8081/HBO/sys',
    url: '/dept/delete',
    method: 'GET',
    params: {
      deptId
    }
  })
}