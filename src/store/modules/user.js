import { login, logout, getInfo,getStaffProfileInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: localStorage.getItem('name') || '',
  staffName:'', // 企业的个人姓名
  staffAvatar: localStorage.getItem('staffAvatar') || '', // 企业的个人头像
  realAvatar: localStorage.getItem('realAvatar') || '', // 用户端的个人头像
  role: '',
  navbarMessagePrompt: false, // 消息提示
  unreadTotal: null, // 及时通讯消息数
  notificationTotal: null, // 系统通知消息数
  sidebar_show: false
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_staffName: (state, staffName) => {
    state.staffName = staffName
  },
  SET_staffAvatar: (state, staffAvatar) => {
    state.staffAvatar = staffAvatar
  },
  SET_realAvatar: (state, realAvatar) => {
    state.realAvatar = realAvatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  mutations_SET_navbarMessagePrompt: (state, role) => {
    state.navbarMessagePrompt = role
  },
  set_unreadTotal: (state, num) =>{
    state.unreadTotal = num
  },
  set_notificationTotal: (state, num) =>{
    state.notificationTotal = num
  },
  set_sidebarShow: (state, sidebar) =>{
    state.sidebar_show = sidebar
  },
}

const actions = {

  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar} = data
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //  企业端个人信息
  getStaffProfileInfo({ commit, state }){
    return new Promise((resolve, reject) => {
      getStaffProfileInfo({}).then(response => {
        const { data } = response
        // localStorage.setItem('userInfo',JSON.stringify(data))
        const { staff_name, avatar,role_desc } = data
        commit('SET_staffName', staff_name)
        commit('SET_staffAvatar', avatar)
        commit('SET_ROLE', role_desc)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_staffName', '')
        commit('SET_staffAvatar', '')
        commit('SET_ROLE', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', '')
      removeToken()
      resolve()
    })
  },
  SET_TOKEN({ commit }, data) {
    commit('SET_TOKEN', data);
  },
  set_realAvatar({ commit }, data) {
    commit('SET_realAvatar', data);
  },
  SET_NAME({ commit }, data) {
    commit('SET_NAME', data);
  },
  SET_staffName({ commit }, data) {
    commit('SET_staffName', data);
  },
  SET_staffAvatar({ commit }, data) {
    commit('SET_staffAvatar', data);
  },
  SET_ROLE({ commit }, data) {
    commit('SET_ROLE', data);
  },
  actions_navbarMessagePrompt({ commit }, data) {
    commit('mutations_SET_navbarMessagePrompt', data);
  },
  actions_unreadTotal({ commit }, data) {
    commit('set_unreadTotal', data);
  },
  actions_notificationTotal({ commit }, data){
    commit('set_notificationTotal', data)
  },
  actions_sidebarShow({ commit }, data) {
    commit('set_sidebarShow', data);
  },
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

