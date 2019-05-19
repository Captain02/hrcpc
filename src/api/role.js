import request from '@/utils/request'


/**
 * 获取社团的角色列表
 * @param {Number} corId 社团id
 * @param {String} roleName 角色名
 * @param {Number} currPage 当前页
 * @param {Number} pageSize 每页的大小
 * 
 */
export const getRoles = (corId, {roleName, currPage, pageSize}) => {
  // return request({
  //   baseURL: 'http://192.168.137.182:8081/HBO/sys',
  //   url: '/role/list',
  //   method: 'GET',
  //   params: {
  //     corId,
  //     roleName,
  //     currPage,
  //     pageSize
  //   }
  // })
  return new Promise((resolve) => {
    let data = { 
      code: 0,
      msg: '',
      page: {
        totalCount: 3
      },
      data: [
        {role_id: 1, role_name: '超级管理员', create_time: '2019-5-14 18:20:36', remark: 'big boss', menu_list: [
          {menu_id: 1, title: '添加用户'},
          {menu_id: 2, title: '删除用户'},
          {menu_id: 3, title: '修改用户'},
          {menu_id: 4, title: '添加部门'},
          {menu_id: 5, title: '删除部门'},
          {menu_id: 6, title: '修改部门'}
        ]},
        {role_id: 2, role_name: '管理员', create_time: '2019-6-4 17:20:36', remark: '管理者', menu_list: [
          {menu_id: 1, title: '添加用户'},
          {menu_id: 2, title: '删除用户'},
          {menu_id: 3, title: '修改用户'}
        ]},
        {role_id: 3, role_name: '扫地僧', create_time: '2019-5-4 19:20:36', remark: '很厉害的角色', menu_list: [
          {menu_id: 4, title: '添加部门'},
          {menu_id: 5, title: '删除部门'},
          {menu_id: 6, title: '修改部门'}
        ]}
      ]
    }
    setTimeout(() => {
      resolve(data)
    }, 1500)
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


/**
 * 添加社团角色
 * @param {Number} corId 
 * @param {String} roleName 
 * @param {Number} deptId 
 */
export const addRole = (corId, {roleName, deptId}) => {
  return request({
    baseURL: 'http://192.168.137.182:8081/HBO/sys',
    url: '/role/save',
    method: 'POST',
    params: {
      corId,
      roleName,
      deptId
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