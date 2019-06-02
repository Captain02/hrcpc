import store from '@/store'

/**
 * 
 * @param {Array} values 按钮显示所需要的权限
 */
export const checkPermission = (values) => {
  if(Array.isArray(values) && values.length){
    if(store.state.user.permits.length){
      let permits = store.state.user.permits
      return permits.some((item) => {
        return values.includes(item)
      })
    }else{
      return false
    }
  }else{
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}