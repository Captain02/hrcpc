import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'

/**
 * 获取相册列表
 * @param {当前页} currPage 
 * @param {每页显示记录数} pageSize 
 * 
 */
export function getImgList(currPage, pageSize) {
  return request({
    url: '/img/list',
    method: 'get',
    params: {
      corId: getCorId(),
      currPage,
      pageSize
    }
  })
}
/**
 * 批量文件上传
 * @param picture formdata 
 */
export function pushImgs(picture){
  return request({
    url: '/img/batch',
    method: 'POST',
    data: {
      corId: getCorId(),
      picture
    }
  })
}

/**
 * 图片删除
 * @param  param0 
 */
export function delPicture(id, url){
  return request({
    url: '/img/del',
    method: 'POST',
    params: {
      id,
      url
    }
  })
}
/**
 * 单个文件上传
 * @param  param0 
 */
export function saveImg(picture){
  return request({
    url: '/img/save',
    method: 'POST',
    data: {
      corid: getCorId(),
      picture
    }
  })
}
