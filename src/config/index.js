
export default {
  install(Vue) {
    Vue.prototype.$constants = {
      BASE_URL: 'https://www.btzmpro.com',
      PORT: ':8081',
      ROOT_DIR: '/HBO/sys/',
      BASE_API: 'https://www.btzmpro.com:8081/HBO/sys/'
    }
  }
}
