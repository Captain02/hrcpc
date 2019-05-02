const app = {
  state: {
    isCollapse: false,  //侧边导航是否折叠
    tagsList: [],       //打开的标签页，同时用于缓存
  },
  mutations: {
    //toggleCollapse
    TOGGLE_COLLAPSE(state, status) {
      state.isCollapse = status
    },
    //setTagsList
    SET_TAGS(state, list) {
      state.tagsList = list
    }
  }
}

export default app