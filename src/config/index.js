
export default {
  install(Vue) {
    Vue.prototype.$constants = {
      BASE_URL: 'http://www.btzmpro.com',
      PORT: ':8081',
      ROOT_DIR: '/HBO/sys/',
      BASE_API: 'http://www.btzmpro.com:8081/HBO/sys/'
    }
  }
}
