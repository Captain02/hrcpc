import { login as loginApi, getToken as getTokenApi } from '@/api/login'
import { getUserInfo as getUserInfoApi, getUserPermits as getUserPermitsApi } from '@/api/account'
import { getToken, setToken, removeToken, getCorId, setCorId } from '@/utils/cookie'

const user = {
  state: {
    token: getToken(),
    expires: 0,           // token过期时间
    userId: null,         // 用户ID
    corid: getCorId(),    // 所在社团ID
    name: '',             // 姓名
    userName: '',         // 用户名
    permits: [],          // 用户所拥有的权限
    avatar: '',
    gender: '',
    depart: '',
    mobile: ''
    
  },
  mutations: {
    SET_TOKEN(state, t){
      state.token = t
    },
    SET_EXPIRES(state, newTime) {
      state.expires = newTime
    },
    SET_USERID(state, id) {
      state.userId = id
    },
    SET_CORID(state, id) {
      state.corid = id
    },
    SET_USERNAME(state, username) {
      state.userName = username
    },
    SET_NAME(state, name) {
      state.name = name
    },
    SET_USERPERMITS(state, permits) {
      state.permits = permits
    },
    SET_AVATAR(state, avatar) {
      state.avatar = avatar
    },
    SET_GENDER(state, gender) {
      state.gender = gender
    },
    SET_DEPART(state, depart) {
      state.depart = depart
    },
    SET_MOBILE(state, mobile) {
      state.mobile = mobile
    }
  },
  actions: {
    Login({commit}, userInfo){
      let userName = userInfo.userName.trim()
      let team = userInfo.team
      return new Promise((resolve, reject) => {
        loginApi(userName, userInfo.password, team).then((result) => {
          // 设置token
          commit('SET_TOKEN', result.token)
          // 存储用户所在社团的id
          commit('SET_CORID', result.corId)
          // 设置过期时间：跳转路由时会判断如果当前时间大于SET_EXPIRES(也就是自获取到token后28分钟之后)就会重新请求后端的接口获取一个新的token，
          commit('SET_EXPIRES', new Date().getTime() + 4 * 60 * 1000)
          // 写入cookie
          setToken(result.token)
          setCorId(result.corId)
          resolve(result)
        }).catch((err) => {
          // console.log('actions err', err)
          reject(err)
        })
      })
    },
    GetUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        getUserInfoApi()
        .then((result) => {
          let { user } = result
          commit('SET_USERID', user.user_id)
          commit('SET_USERNAME', user.username)
          commit('SET_NAME', user.name)
          commit('SET_AVATAR', user.filepath)
          commit('SET_GENDER', user.gender)
          commit('SET_DEPART', user.depts && user.depts.length ? user.depts[0].name : '')
          commit('SET_MOBILE', user.mobile)

          // 获取用户权限
          return getUserPermitsApi(user.user_id)  
        })
        .then((result) => {
          let { data } = result
          commit('SET_USERPERMITS', data)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    GetToken({commit}) {
      // console.log('获取新的token')
      return new Promise((resolve) => {
        getTokenApi().then((result) => {
          // console.log(result)
          commit('SET_TOKEN', result.token)
          commit('SET_EXPIRES', new Date().getTime() + 4 * 60 * 1000)
          // 写入cookie
          setToken(result.token)
          resolve()
        })
      })
    },
    LogOut({commit}) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        // 清除cookie中存储的token
        removeToken()
        resolve()
      })
    }
  }
}

export default user