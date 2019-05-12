import Cookies from 'js-cookie'

const TOKENKEY = 'authToken'
const CORID = 'corid'

export function getToken() {
  return Cookies.get(TOKENKEY)
}

export function setToken(token) {
  return Cookies.set(TOKENKEY, token)
}

export function removeToken() {
  return Cookies.remove(TOKENKEY)
}

/**
 * 社团id
 */
export function getCorId() {
  return Cookies.get(CORID)
}

export function setCorId(id) {
  return Cookies.set(CORID, id)
}

export function removeCorId() {
  return Cookies.remove(CORID)
}