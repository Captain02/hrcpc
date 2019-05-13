import Vue from 'vue'
/**
 * 格式化时间
 * @param {Date} time 时间 
 * @param {String} cFormat 格式
 * @return 格式化后的时间
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 根据prop属性查找父组件
 * @param {Component} vm 组件
 * @param {Object} prop 属性
 * @returns vm
 */
export function findComponentByProp(vm, prop) {
  let res = null
  let parent = vm.$parent
  while(parent){
    if(parent[prop] !== undefined){
      res = parent
      break
    }
    parent = parent.$parent
  }
  return res
}

/**
 * 代理
 * @param {Object} prop 
 */
export function proxyProp(prop) {
  //使用Proxy可以拦截对象的动态生成的属性
  return new Proxy(prop, {
    set(target, key, value) {
      if (prop[key] !== value) {
        Vue.set(prop, key, value);
      }
      return Reflect.set(target, key, value)
    }
  })
}