import request from '@/utils/request'
import { getCorId } from '@/utils/cookie'
import qs from 'querystring'


/**
 * 添加通知公告
 * @param {*} title 
 * @param {*} publishUser 
 * @param {*} receiveUserIds 
 * @param {*} content 
 */
export const addNotice = (title, publishUser, receiveUserIds, content) => {
  return request({
    url:'/notic/add',
    method: 'POST',
    transformRequest: [function (data) {
      data.receiveUserIds = data.receiveUserIds.join(',')
      return qs.stringify(data)
    }],
    data: {
      corId: getCorId(),
      title,
      publishUser,
      receiveUserIds,
      content
    }
  })
}

/**
 * 通知公告栏目获取通知公告列表
 * @param {*} title 
 * @param {*} publishUser 
 * @param {*} receiveUser 
 * @param {*} startTime 
 * @param {*} endTime 
 * @param {*} currPage 
 * @param {*} pageSize 
 */
export const getNotices = (title, publishUser, receiveUser, startTime, endTime, currPage, pageSize) => {
  return request({
    url: '/notic/list',
    method: 'GET',
    params: {
      corId: getCorId(),
      title,
      publishUser,
      receiveUser,
      startTime,
      endTime,
      currPage,
      pageSize
    }
  })
}


/**
 * 首页中通知公告列表
 * @param {String} username 
 * @param {Number} currPage 
 * @param {Number} pageSize 
 */
export const getNoticesInHome = (username, currPage, pageSize ) => {
  return request({
    url: '/notic/homelist',
    method: 'GET',
    params: {
      username,
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