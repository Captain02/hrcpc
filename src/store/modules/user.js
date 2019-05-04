import { login as loginApi, getToken as getTokenApi } from '@/api/login'
import { getUserInfo as getUserInfoApi } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/cookie'

const user = {
  state: {
    token: getToken(),
    expires: 0,
    userId: null,         // 用户ID
    userName: '',         // 用户名
    createTime: null,     // 该用户的创建时间
    email: '',            // 邮箱
    mobile: '',           // 手机号
    deptId: null,         // 所在社团id
    deptName: '',         // 所在社团名称
    roles: [],            // 该用户所拥有的角色
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
    
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
    SET_USERNAME(state, username) {
      state.userName = username
    },
    SET_ROLES(state, roles) {
      state.roles = roles
    },
    SET_OTHERS(state, { createTime, email, mobile, deptId, deptName, avatar }) {
      state.createTime = createTime
      state.email = email
      state.mobile = mobile
      state.deptId = deptId
      state.deptName = deptName
      // state.avatar = avatar
    },

  },
  actions: {
    Login({commit}, userInfo){
      let userName = userInfo.userName.trim()
      let team = userInfo.team
      return new Promise((resolve, reject) => {
        loginApi(userName, userInfo.password, team).then((result) => {
          // 设置token
          commit('SET_TOKEN', result.token)
          // 设置过期时间：跳转路由时会判断如果当前时间大于SET_EXPIRES(也就是自获取到token后28分钟之后)就会重新请求后端的接口获取一个新的token，
          commit('SET_EXPIRES', new Date().getTime() + 4 * 60 * 1000)
          // 写入cookie
          setToken(result.token)
          resolve(result)
        }).catch((err) => {
          // console.log('actions err', err)
          reject(err)
        })
      })
    },
    GetUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        getUserInfoApi().then((result) => {
          let { user } = result
          commit('SET_USERID', user.userId)
          commit('SET_USERNAME', user.username)
          commit('SET_ROLES', user.roleIdList)
          commit('SET_OTHERS', user)
          resolve()
        }).catch((err) => {
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