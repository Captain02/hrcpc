import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'
import qs from 'querystring'

/**
 * 获取院系、系别信息，若想查询所有的院系 类型id为 1，要是想查询某个学院下的系，typeid=null(不填)，parentid等于学院id
 * @param {Number} typeId 类型id   
 * @param {Number} parentValue 父类id    
 */
export const getCollegeInfo = (typeId, parentValue) => {
  return request({
    method: 'GET',
    url: '/comm/getselectes',
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


/**
 * 根据社团id获取社团的信息--二维码
 */
export const getCorporationInfo = (corid) => {
  return request({
    url: '/corporation/selectByCorIdForQR',
    method: 'GET',
    params: {
      corid
    }
  })
}


/**
 * 注册并加入社团
 * @param {Number} corid 社团id ！不要直接读取cookie里的，因为该接口在未登录的状态下调用
 * @param {Number} openid 
 * @param {String} username 学号
 * @param {String} name 
 * @param {String} gender 
 * @param {String} password 
 * @param {String} college 
 * @param {String} collegetie 
 * @param {String} email 
 * @param {String} mobile 
 * @param {String} wechart 
 * @param {String} QQ 
 * @param {String} descs 
 */
export const register = (corid, type, openid, username, name, gender, password, college, collegetie, email, mobile, wechart, QQ, descs) => {
  return request({
    url: '/user/QRSave',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      corid,
      type,
      openid,
      username,
      name,
      gender,
      password,
      college,
      collegetie,
      email,
      mobile,
      wechart,
      QQ,
      descs
    }
  })
}

/***
 * 获取社团的所有部门
 */
export const getDepts = () => {
  return request({
    url: '/dept/getDepts',
    method: 'GET',
    params: {
      corid: getCorId()
    }
  })
}

/**
 * 根据学号判断是否注册
 * @param {String} username 
 */
export const hasRegister = (username) => {
  return request({
    url: '/user/selectCountByUserName',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      username
    }
  })
}


