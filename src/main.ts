import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// lang i18n
// import locale from 'element-ui/lib/locale/lang/en' 
import './utils/rem'

import '@/styles/index.scss' // global css

import App from './App.vue';
// const App = require('./App')
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import axios from '@/axios/index';

// 引入弹窗拖拽一方法
import '@/utils/dialogDrag'


// ==============  引入视频直播  ↓   ================
// import VueVideoPlayer from 'vue-video-player'
// 使用视频直播组件
// Vue.use(VueVideoPlayer)

// 引入视频直播样式 
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
// ==============  引入视频直播  ↑  ================

// ==============  引入 实时通讯  ↓   ================
import GoEasy from 'goeasy';
const goEasy = GoEasy.getInstance({
  host:'hangzhou.goeasy.io', //新加坡host：singapore.goeasy.io
  appkey: "BC-6c3e503436f7436e9f2804567d3d75cd", //替换为您的应用appkey
  modules: ['im']//根据需要，传入'im’或‘pubsub’，或数组方式同时传入
});
// 建议在main.js里初始化全局的GoEasy对象
Vue.prototype.GoEasy = GoEasy;
Vue.prototype.goEasy = goEasy;
// ==============  引入 实时通讯   ↑  ================

// ==============  引入 腾讯云 实时音视频  ↓   ================
import VueCompositionAPI from '@vue/composition-api';
Vue.use(VueCompositionAPI)
// ==============  引入 腾讯云 实时音视频  ↑  ================

Vue.prototype.globalData = {
  currentUser: null
};

// 引入图片预览
import vPreviewImage from 'v-preview-image';
Vue.use(vPreviewImage)

Vue.prototype.$axios = axios;

import { Loading } from 'element-ui';
Vue.prototype.$Loading = Loading;

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想使用中文版，按以下声明
Vue.use(ElementUI)

// 跨组件通信 全局事件总线
Vue.prototype.$bus = new Vue(); // 安装总线


Vue.prototype.$getViewportSize = function() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  }
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  data: function(){ // 全局样式
    return {
      positionItems: {}, // 职位中心选中的信息
    }
  },
  render: h => h(App)
})
