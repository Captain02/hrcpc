import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'
import qs from 'querystring'
/**
 * 申请社团
 * @param {String} corname 社团名称
 * @param {String} corleading 社团负责人
 * @param {String} cortercher 领导老师
 * @param {String} corworkspace 工作地点
 * @param {Number} corcollege 所属院系
 * @param {Array} corcrowd 面向人群
 * @param {String} corscale 社团规模
 */
export const apply = (corName, corleading, corTercher, corWorkspace, corCollege, corcrowd, corscale) => {
  console.log(corcrowd)
  return request({
    url: '/corporation/add',
    method: 'POST',
    transformRequest: [function (data) {
      data.corcrowd = data.corcrowd.join(',')
      return qs.stringify(data)
    }],
    data: {
      corName,
      corleading,
      corTercher,
      corWorkspace,
      corCollege,
      corcrowd,
      corscale
    }
  })
}


/**
 * 更新社团信息
 * @param {*} corName 
 * @param {*} corleading 
 * @param {*} corTercher 
 * @param {*} corWorkspace 
 * @param {*} corCollege 
 * @param {*} corscale 
 * @param {Array} corcrowd 面向人群
 * @param {*} descs 
 */
export const update = (corName, corleading, corTercher, corWorkspace, corCollege, corcrowd, corscale, descs) => {
  
  return request({
    url: '/corporation/update',
    method: 'POST',
    transformRequest: [function (data) {
      data.corcrowd = data.corcrowd.join(',')
      return qs.stringify(data)
    }],
    data: {
      corid: getCorId(),
      corName,
      corleading,
      corTercher,
      corWorkspace,
      corCollege,
      corcrowd,
      corscale,
      descs
    }
  })
}


/**
 * 获取社团信息
 * @param {Number} corid 社团id
 */
export const getCorporation = () => {
  return request({
    url: '/corporation/selectByCorId',
    method: 'GET',
    params: {
      corid: getCorId()
    }
  })
} 


/**
 * 根据用户名获取用户
 * @param {String} username 
 */
export const getUserByUserName = (username) => {
  return request({
    url: '/user/getusersByusernameAndcor',
    method: 'GET',
    params: {
      corid: getCorId(),
      username
    }
  })
}


/**
 * 获取社团纳新二维码列表
 * @param {*} pageSize 
 * @param {*} currPage 
 */
export const getQRCodeList = (currPage, pageSize) => {
  return request({
    url: '/corporation/qqCodeFileList',
    method: 'GET',
    params: {
      corId: getCorId(),
      pageSize,
      currPage
    }
  })
}

/**
 * 删除纳新二维码
 * @param {Number} id 图片id
 * @param {String} path 图片的路径
 */
export const deleteQRCode = (id, path) => {
  return request({
    url: '/corporation/delQqCodeFile',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      id,
      path
    }
  })
}



export const getNotices = (currPage, pageSize) => {
  const data = {
    data: [
      {
        noticid: 1,
        notictop: '浙江最大皮革厂江南皮革厂倒闭了！！',
        createtime: '2019-08-10',
        notictuserid: 1,
        notictusername: '黄鹤',
        noticteduser: [
          { noticteduserid: 2, notictedusername: '张三' },
          { noticteduserid: 3, notictedusername: '李四' },
          { noticteduserid: 4, notictedusername: '王五' },
          { noticteduserid: 5, notictedusername: '虾老六' },
          { noticteduserid: 6, notictedusername: '蟹老八' },
          { noticteduserid: 7, notictedusername: '尼古拉斯' },
          { noticteduserid: 8, notictedusername: '赵四' },
          { noticteduserid: 9, notictedusername: '刘能' },
          { noticteduserid: 10, notictedusername: '谢广坤' },
          { noticteduserid: 12, notictedusername: '王大拿' },
          { noticteduserid: 11, notictedusername: '铁憨憨' },
          { noticteduserid: 13, notictedusername: '找大胆' }
        ]
      }
    ]
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 100)
  })
  return request({
    url: '',
    method: 'GET',
    params: {
      currPage,
      pageSize
    }
  })
}


export const getNotice = (noticid) => {
  let data = {
    data: {
      noticid: 1,
      notictop: '浙江最大皮革厂江南皮革厂倒闭了！！',
      noticcontent: '浙江温州 浙江温州 江南皮革厂倒闭了浙江温州 最大皮革厂 江南皮革厂倒闭了bai王八蛋王八蛋黄鹤老板吃喝嫖赌吃喝嫖赌编欠下了欠下了3.5亿 带着他的小姨子跑了我们没有没有没有办法办法 拿着钱包抵工资工资原价都是100多 200多 300多的钱包 统统20块自20块20块统统20块 统统统统统统20块黄鹤王八蛋 王八蛋黄鹤 你不是你不是你不是人100多 200多 300多的钱包 统统20块统统20块黄鹤王八蛋 王八蛋黄鹤 你不是你不是你不是人我们辛辛苦苦干了 辛辛苦苦给你给你干了大半年你你你不发不发工资工资 你还我还我血汗钱',
      createtime: '2019-08-10',
      notictuserid: 1,
      notictusername: '黄鹤',
      noticteduser: [
        { noticteduserid: 2, notictedusername: '张三' },
        { noticteduserid: 3, notictedusername: '李四' },
        { noticteduserid: 4, notictedusername: '王五' },
        { noticteduserid: 5, notictedusername: '虾老六' },
        { noticteduserid: 6, notictedusername: '蟹老八' },
        { noticteduserid: 7, notictedusername: '尼古拉斯' },
        { noticteduserid: 8, notictedusername: '赵四' },
        { noticteduserid: 9, notictedusername: '刘能' },
        { noticteduserid: 10, notictedusername: '谢广坤' },
        { noticteduserid: 12, notictedusername: '王大拿' },
        { noticteduserid: 11, notictedusername: '铁憨憨' },
        { noticteduserid: 13, notictedusername: '找大胆' }
      ]
    }
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 100)
  })
  return request({
    url: ''
  })
}