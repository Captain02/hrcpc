import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  modules: {
    app,
    user
  }
})