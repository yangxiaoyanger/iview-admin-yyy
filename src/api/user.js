import axios from '@/libs/api.request'

export const getPublicKey = () => {
  return axios.request({
    url: '/api/system/login/getPublicKey',
    method: 'get'
  })
}
export const login = (key) => {
  return axios.request({
    url: '/api/system/login/login',
    params: {
      key: key
    },
    method: 'POST'
  })
}

export const getIndexParam = () => {
  return axios.request({
    url: '/api/system/index/getIndexParam',
    method: 'get'
  })
}
export const getUserInfo = (token) => {
  console.log(tocken)
  return axios.request({
    url: '/api/system/login/login',
    params: {
      token
    },
    method: 'get'
  })
}
export const getNav = () => {
  console.log('getNav axios')
  return axios.request({
    // url: '/api/system/index/getNav',
    url: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/getNav',
    method: 'get'
  })
}
export const logout = (token) => {
  return axios.request({
    url: '/logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: '/message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: '/message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: '/message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: '/message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: '/message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: '/message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
