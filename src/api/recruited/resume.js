import request from '@/utils/request'

/**
 * 获取简历列表
 * @param {*} corId 
 * @param {*} name 
 * @param {*} persionNum 
 * @param {*} status 
 * @param {*} currPage 
 * @param {*} pageSize 
 */
export const getResumes = (corId, { name, persionNum, status, currPage, pageSize }) => {
  return request({
    baseURL: 'http://192.168.137.182:8081/HBO/sys',
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