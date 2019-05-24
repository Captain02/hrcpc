import request from '@/utils/request'

/**
 * 获取简历列表
 * @param {Number} corId 
 * @param {String} name 
 * @param {String} persionNum 
 * @param {Number} status 
 * @param {Number} currPage 
 * @param {Number} pageSize 
 */
export const getResumes = (corId, { name, persionNum, status, currPage, pageSize }) => {
  return request({
    url: '/resume/manage',
    method: 'POST',
    params: {
      corId,
      name,
      persionNum,
      status,
      currPage,
      pageSize
    }
  })
}


/**
 * 根据id获取简历信息
 * @param {Number} resumeId 
 */
export const getResume = (resumeId) => {
  return request({
    url: `/resume/${resumeId}`,
    method: 'GET',
  })
}

/**
 * 修改简历状态
 * @param {Number} resumeId 
 * @param {Number} status 
 */
export const editResume = (resumeId, status) => {
  return request({
    url: '/resume/edit',
    method: 'POST',
    params: {
      resumeId,
      status
    }
  })
}

/**
 * 删除简历信息
 * @param {Number} resumeId 
 */
export const deleteResume = (resumeId) => {
  return request({
    url: '/resume/delete',
    method: 'POST',
    params: {
      resumeId
    }
  })
}