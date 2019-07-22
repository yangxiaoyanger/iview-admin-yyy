import axios from '@/libs/api.request'
import { serviceName } from '@/config'
const moduleName = '/systemuser'
export const queryForPage = () => {
  return axios.request({
    url: serviceName + moduleName + '/queryForList',
    method: 'post'
  })
}
export const queryForList = () => {
  return axios.request({
    url: serviceName + moduleName + '/queryForList',
    method: 'post'
  })
}
export const saveItem = () => {
  return axios.request({
    url: serviceName + moduleName + '/saveItem',
    method: 'post'
  })
}
export const updateItem = () => {
  return axios.request({
    url: serviceName + moduleName + '/updateItem',
    method: 'post'
  })
}
export const getItem = () => {
  return axios.request({
    url: serviceName + moduleName + '/getItem',
    method: 'get'
  })
}
export const deleteItems = () => {
  return axios.request({
    url: serviceName + moduleName + '/deleteItems',
    method: 'post'
  })
}
export const exportExcel = () => {
  return serviceName + moduleName + '/exportExcel'
}
export const exportPdf = () => {
  return serviceName + moduleName + '/exportPdf'
}
