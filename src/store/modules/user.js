import { login as loginApi } from '@/api/login'
const user = {
  state: {
    token: null,
    userName: '',
    roles: []
  },
  mutations: {
    SET_TOKEN(state, t){
      state.token = t
    },
    SET_USERNAME(state, username) {
      state.userName = username
    },
    SET_ROLES(state, roles) {
      state.roles = roles
    }
  },
  actions: {
    Login({commit}, userInfo){
      let userName = userInfo.userName.trim()
      let team = userInfo.team
      return new Promise((resolve, reject) => {
        loginApi(userName, userInfo.password, team).then((result) => {
          commit('SET_TOKEN', '123456')
          resolve(result)
        }).catch((err) => {
          console.log('actions err', err)
          reject(err)
        })
      })
    },
    LogOut({commit}) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        resolve()
      })
    }
  }
}

export default user