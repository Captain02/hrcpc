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
  // return request({
  //   baseURL: 'http://192.168.137.182:8081/HBO/sys',
  //   url: '/resume/manage',
  //   method: 'POST',
  //   params: {
  //     corId,
  //     name,
  //     persionNum,
  //     status,
  //     currPage,
  //     pageSize
  //   }
  // })
  return new Promise((resolve) => {
    let data =  {
              code: 0,
              msg: '',
              data: [{
                user_id: 1,
                filepath: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558150989185&di=09547cdfd738e25280ec62fbcc7ce5b5&imgtype=0&src=http%3A%2F%2Fsrc.pcsoft.com.cn%2Fd%2Ffile%2Fandroid%2Fgame%2Fjsby%2F2016-11-15%2Fd247390106fe6895586635494b5c0a07.png',
                name: '赵国真',
                create_time: '2019-5-1 18:20:05',
                username: '123456456',
                gender: '男',
                email: '45641214@qq.com',
                persionnum: '201631000036',
                mobile: '13011756073',
                college: '信息管理学院',
                collegetie: '网站建设' ,
                QQ: '937774837',
                wechart: 'ad1324545645',
                status: 1
              },
              {
                user_id: 2,
                filepath: 'http://pic29.nipic.com/20130520/9920517_140701014301_2.jpg',
                name: '赵国贾',
                create_time: '2019-4-15 22:14:12',
                username: '456786455',
                gender: '男',
                email: 'add254545@qq.com',
                persionnum: '20170005235',
                mobile: '1234879788',
                college: '经济管理学院',
                collegetie: '国际经济与贸易（跨境电子商务方向）春考' ,
                QQ: '937774837',
                wechart: 'ad1324545645',
                status: 2
              },
              {
                user_id: 3,
                filepath: 'http://5b0988e595225.cdn.sohucs.com/images/20170724/ad28da0d658b43aba84ce91df9cacdad.jpeg',
                name: '赵国',
                create_time: '2018-8-5 22:14:12',
                username: 'sfs54534',
                gender: '女',
                email: '556565qe2@qq.com',
                persionnum: '20170005235',
                mobile: '1234879788',
                college: '信息管理学院',
                collegetie: '嵌入式系统开发与应用方向' ,
                QQ: '937774837',
                wechart: 'ad1324545645',
                status: 3
              }],
              count: {
                total: '5',
                '1': '10',
                '2': '3',
                '3': '4',
                '4': '8',
                '5': '12'
              },
              page: {
                totalCount: 3
              }
        }
    setTimeout(() => {
      resolve(data)
    }, 1500)
  })
}


/**
 * 根据id获取简历信息
 * @param {Number} resumeId 
 */
export const getResume = (resumeId) => {
  // return request({
  //   baseURL: 'http://192.168.137.182:8081/HBO/sys',
  //   url: `/resume/${resumeId}`,
  //   method: 'GET',
  // })
  return new Promise((resolve) => {
    let data = {
      code: 0,
      msg: '',
      data: [
        {
          id: 1,
          filepath: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558150989185&di=09547cdfd738e25280ec62fbcc7ce5b5&imgtype=0&src=http%3A%2F%2Fsrc.pcsoft.com.cn%2Fd%2Ffile%2Fandroid%2Fgame%2Fjsby%2F2016-11-15%2Fd247390106fe6895586635494b5c0a07.png',
          create_time: '2019-5-1 18:20:05',
          username: '123456456',
          name: '赵国真',
          gender: '男',
          persionnum: '201631000036',
          mobile: '13011756073',
          email: '45641214@qq.com',
          college: '信息管理学院',
          collegetie: '网站建设' ,
          QQ: '937774837',
          wechart: 'ad1324545645',
          status: 1,
          descs: '<p>离开家大立科技</p>'
        }
      ]
    }
    setTimeout(() => {
      resolve(data)
    },0)
  })
}

/**
 * 修改简历状态
 * @param {Number} resumeId 
 * @param {Number} status 
 */
export const editResume = (resumeId, status) => {
  return request({
    baseURL: 'http://192.168.137.182:8081/HBO/sys',
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
    baseURL: 'http://192.168.137.182:8081/HBO/sys',
    url: '/resume/delete',
    method: 'POST',
    params: {
      resumeId
    }
  })
}