import axios from '@/libs/api.request'
import config from '../../config'
const serviceName = config.serviceName.API_PLATFORM
const moduleName = '/systemrole'
export const queryForPage = params => {
  return axios.request({
    url: serviceName + moduleName + '/queryForPage',
    data: params,
    method: 'post'
  })
}
export const queryForList = params => {
  return axios.request({
    url: serviceName + moduleName + '/queryForList',
    data: params,
    method: 'post'
  })
}
export const saveItem = params => {
  return axios.request({
    url: serviceName + moduleName + '/saveItem',
    data: params,
    method: 'post'
  })
}
export const updateItem = params => {
  return axios.request({
    url: serviceName + moduleName + '/updateItem',
    data: params,
    method: 'post'
  })
}
export const getItem = params => {
  return axios.request({
    url: serviceName + moduleName + '/getItem',
    data: params,
    method: 'get'
  })
}
export const deleteItems = params => {
  return axios.request({
    url: serviceName + moduleName + '/deleteItems',
    data: {
      strChecked: params
    },
    method: 'post'
  })
}
export const exportExcel = () => {
  return serviceName + moduleName + '/exportExcel'
}
export const exportPdf = () => {
  return serviceName + moduleName + '/exportPdf'
}
