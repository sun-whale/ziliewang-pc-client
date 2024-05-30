const state = {
  suer_TUStatusInfo: {}, //人才端 腾讯云 音视频状态
  TUStatusInfo: {}, //企业端 腾讯云 音视频状态
}

const mutations = {
  // 2、
  SET_userTUStatusInfo: (state, realAvatar) => {
    state.suer_TUStatusInfo = realAvatar
  },
  SET_TUStatusInfo: (state, realAvatar) => {
    state.TUStatusInfo = realAvatar
  },
 
}

const actions = {
  // 1、
  SET_userTUStatusInfo({ commit }, data) {
    commit('SET_userTUStatusInfo', data);
  },
  SET_TUStatusInfo({ commit }, data) {
    commit('SET_TUStatusInfo', data);
  },
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

