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
 * 根据id获取单个角色信息
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

/**
 * 根据角色id获取该角色所拥有的权限
 * @param {Number} roleid 
 */
export const getRolePremit = (roleid) => {
  // return request({
  //   url: 'user/getUserPermission',
  //   method: 'GET',
  //   params: {
  //     roleid
  //   }
  // })
  return new Promise((resolve) => {
    let data = {
      code: 0,
      msg: '',
      data: [
        {
          "menuId": 1,
          "parentId": 0,
          "parentName": null,
          "name": "organize",
          "url": "/organize",
          "perms": null,
          "type": 0,
          "icon": "organize",
          "orderNum": 0,
          "open": null,
          "list": null,
          "hidden": null,
          "title": "组织管理",
          "redirect": "/organize/user",
          "alwaysShow": null,
          "useCache": null,
          "query": null
        },
        {
          "menuId": 2,
          "parentId": 1,
          "parentName": "organize",
          "name": "user",
          "url": "user",
          "perms": null,
          "type": 1,
          "icon": "",
          "orderNum": 1,
          "open": null,
          "list": null,
          "hidden": null,
          "title": "社团成员",
          "redirect": null,
          "alwaysShow": null,
          "useCache": null,
          "query": null
        },
        {
          "menuId": 6,
          "parentId": 2,
          "parentName": "user",
          "name": "add-user",
          "url": "",
          "perms": null,
          "type": 2,
          "icon": "",
          "orderNum": 1,
          "open": null,
          "list": null,
          "hidden": null,
          "title": "添加成员",
          "redirect": null,
          "alwaysShow": null,
          "useCache": null,
          "query": null
        },
      ]
    }
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

/**
 * 获取社团的所有权限信息
 */
export const getPremits = () => {
  // return request({
  //   url: '',
  //   method: 'GET',
  //   params: {

  //   }
  // })
  return new Promise((resolve) => {
    let data = {
      code: 0,
      msg: '',
      page: {
        totalCount: 4
      },
      data: [
        {
          "menuId": 1,
          "parentId": 0,
          "parentName": null,
          "name": "organize",
          "url": "/organize",
          "perms": null,
          "type": 0,
          "icon": "organize",
          "orderNum": 0,
          "open": null,
          "list": null,
          "hidden": null,
          "title": "组织管理",
          "redirect": "/organize/user",
          "alwaysShow": null,
          "useCache": null,
          "query": null
        },
        {
          "menuId": 2,
          "parentId": 1,
          "parentName": "organize",
          "name": "user",
          "url": "user",
          "perms": null,
          "type": 1,
          "icon": "",
          "orderNum": 1,
          "open": null,
          "list": null,
          "hidden": null,
          "title": "社团成员",
          "redirect": null,
          "alwaysShow": null,
          "useCache": null,
          "query": null
        },
        {
          "menuId": 6,
          "parentId": 2,
          "parentName": "user",
          "name": "add-user",
          "url": "",
          "perms": null,
          "type": 2,
          "icon": "",
          "orderNum": 1,
          "open": null,
          "list": null,
          "hidden": null,
          "title": "添加成员",
          "redirect": null,
          "alwaysShow": null,
          "useCache": null,
          "query": null
        },
        {
          "menuId": 7,
          "parentId": 2,
          "parentName": "user",
          "name": "edit-user-info",
          "url": "",
          "perms": null,
          "type": 2,
          "icon": "",
          "orderNum": 1,
          "open": null,
          "list": null,
          "hidden": null,
          "title": "修改成员",
          "redirect": null,
          "alwaysShow": null,
          "useCache": null,
          "query": null
        },
        {
          "menuId": 8,
          "parentId": 2,
          "parentName": "user",
          "name": "delete-user",
          "url": "",
          "perms": null,
          "type": 2,
          "icon": "",
          "orderNum": 1,
          "open": null,
          "list": null,
          "hidden": null,
          "title": "删除成员",
          "redirect": null,
          "alwaysShow": null,
          "useCache": null,
          "query": null
        },
        {
          "menuId": 3,
          "parentId": 1,
          "parentName": "organize",
          "name": "depart",
          "url": "depart",
          "perms": null,
          "type": 1,
          "icon": "",
          "orderNum": 2,
          "open": null,
          "list": null,
          "hidden": null,
          "title": "部门管理",
          "redirect": null,
          "alwaysShow": null,
          "useCache": null,
          "query": null
        },
        {
          "menuId": 9,
          "parentId": 3,
          "parentName": "depart",
          "name": "add-depart",
          "url": "",
          "perms": null,
          "type": 2,
          "icon": "",
          "orderNum": 1,
          "open": null,
          "list": null,
          "hidden": null,
          "title": "添加部门",
          "redirect": null,
          "alwaysShow": null,
          "useCache": null,
          "query": null
        },
        {
          "menuId": 11,
          "parentId": 3,
          "parentName": "depart",
          "name": "delete-depart",
          "url": "",
          "perms": null,
          "type": 2,
          "icon": "",
          "orderNum": 1,
          "open": null,
          "list": null,
          "hidden": null,
          "title": "删除部门",
          "redirect": null,
          "alwaysShow": null,
          "useCache": null,
          "query": null
        },
        {
          "menuId": 10,
          "parentId": 3,
          "parentName": "depart",
          "name": "edit-depart",
          "url": "",
          "perms": null,
          "type": 2,
          "icon": "",
          "orderNum": 1,
          "open": null,
          "list": null,
          "hidden": null,
          "title": "修改部门",
          "redirect": null,
          "alwaysShow": null,
          "useCache": null,
          "query": null
        },
        {
          "menuId": 5,
          "parentId": 1,
          "parentName": "organize",
          "name": "role",
          "url": "role",
          "perms": null,
          "type": 1,
          "icon": "",
          "orderNum": 4,
          "open": null,
          "list": null,
          "hidden": null,
          "title": "角色管理",
          "redirect": null,
          "alwaysShow": null,
          "useCache": null,
          "query": null
        },
        {
          alwaysShow: null,
          hidden: null,
          icon: "recruited",
          list: null,
          menuId: 57,
          name: "recruited",
          open: null,
          orderNum: null,
          parentId: 0,
          parentName: null,
          perms: null,
          query: null,
          redirect: "/recruited/resume",
          title: "纳新管理",
          type: 0,
          url: "/recruited",
          useCache: null,
        },
        {
          alwaysShow: null,
          hidden: null,
          icon: null,
          list: null,
          menuId: 59,
          name: "resume-list",
          open: null,
          orderNum: null,
          parentId: 57,
          parentName: null,
          perms: null,
          query: null,
          redirect: null,
          title: "纳新信息",
          type: 1,
          url: "resume",
          useCache: null,
        },
        {
          alwaysShow: null,
          hidden: null,
          icon: null,
          list: null,
          menuId: 60,
          name: "edit-resume",
          open: null,
          orderNum: null,
          parentId: 59,
          parentName: null,
          perms: null,
          query: null,
          redirect: null,
          title: "修改简历",
          type: 2,
          url: "",
          useCache: null,
        },
        {
          alwaysShow: null,
          hidden: null,
          icon: null,
          list: null,
          menuId: 61,
          name: "delete-resume",
          open: null,
          orderNum: null,
          parentId: 59,
          parentName: null,
          perms: null,
          query: null,
          redirect: null,
          title: "删除简历",
          type: 2,
          url: "",
          useCache: null,
        }
      ]
    }
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}