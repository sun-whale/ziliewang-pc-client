import request from '@/utils/request'
import axios from '@/axios/index'


export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}


// 企业端查询个人信息
export function getStaffProfileInfo(data) {
  return axios({
    url: '/api/staff/profile',
    method: 'POST',
    data
  })
}