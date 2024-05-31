<template>
  <div class="app-wrapper">
    <!-- <div class="ad-box">
      <img src="../assets/image/ad-bg3.png" alt="" class="ad-img"/>
      <div class="ad-content-box">
        <div class="content-pagebox">
          <ul class="ad-content-ul-6">
            <li style="font-size: 20px;"><span>AI Agent</span></li>
          </ul>
          <ul class="ad-content-ul-7">
            <li style="padding-top: 15px;"><span>工作&nbsp;&nbsp;学习&nbsp;&nbsp;分享</span></li>
            <li style="padding-top: 12px;"><span>职场社交</span></li>
            <li style="padding-top: 12px;"><span>打通专属人脉圈</span></li>
          </ul>
          <ul class="ad-content-ul-8">
            <li style=""><span>就上</span><span style="font-size:24px;color: #fff;">自猎网</span></li>
            <li style="padding-top: 10px;"><span>轻松搞定</span></li>
          </ul>
        </div>
      </div>
    </div> -->
    <div :class="classObj" class="app-wrapper">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar />
        </div>
        <app-main />
        <Footer />
      </div>


      <!-- 聊天弹窗 开始-->
      <VueDragResize :style="`z-index:${zInfex_0};`" dragHandle=".VueDragResize-title-box" :isActive="true" :parentW="parentW" :parentLimitation="true" :parentH="parentH" :w="width" :h="height" :minw="minw" :minh="minh" :x='left' :y='top' @dragstop="onDragstop" @resizing="resize" @dragging="resize" v-if="is_VueDragResize">
        <div class="VueDragResize-centent-box">
          <div class="VueDragResize-title-box">
            <div class="title"><span>我的沟通</span></div>
            <div class="icon-box">
              <!-- <img src="../assets/image/icon-minificationpng.png" alt="缩小"  @click="clickMinificationpngBtn"> -->
              <img src="../assets/image/icon-close.png" alt="关闭" @click="clickCloseBtn"/>
            </div>
          </div>
          <div class="navbaerMag-content-box">
            <buddyChart :title_show="title_show" :infoData="infoData" :laiyuan="laiyuan" :width="width" :height="height - 50"  is_pop="is_pop" ref="chat" />
          </div>
        </div>
      </VueDragResize>
      <!-- 聊天弹窗 结束-->

      <!-- 音视频聊天窗 -->
      <div class="TUICallKit-box" :class="show_TUICallKit ? 'show-TUICallKit' : '' ">
        <TUICallKit 
          :allowedMinimized="true" 
          :allowedFullScreen="true"
          :beforeCalling="beforeCalling"
          :afterCalling="afterCalling"
          :statusChanged="handleStatusChanged"
        />
      </div>
    </div>
  </div>

</template>

<script>
import Footer from '../components/footer/index'
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import buddyChart from '../views/bossSide/components/mag/buddyChart.vue';
import VueDragResize from 'vue-drag-resize';
import { TUICallKit, TUICallKitServer,videoResolution, TUICallType, STATUS } from "@tencentcloud/call-uikit-vue2.6";
// import * as GenerateTestUserSig from "../debug/GenerateTestUserSig-es";
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Footer,
    buddyChart,
    VueDragResize,
    TUICallKit
  },
  data(){
    return {
      unreadAmount: null,
      currentUser: null,
      avatar: '',
      name:'',
      // 聊天弹窗
      width: 0,
      height: 0,
      minw: 516,
      minh: 340,
      parentH: 0,
      parentW: 0,
      top: 40,
      left: 500,
      zInfex_0: 99,
      is_VueDragResize: false,
      title_show: '',
      laiyuan:'is_nav',
      is_pop:'pop',
      infoData: {},
      show_TUICallKit: false,
      // 腾讯云 SDKAppID、userSig 的获取参考下面步骤
    
      // 主叫的 userID
      userID: 'c_' + localStorage.getItem('staffUid'),    
      // 被叫的 userID
      callUserID: '',
      // videoResolution: videoResolution, // 设置分辨率
      TUICallKit_type: 0
    }
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  watch:{
    '$store.state.staffAvatar'(newVal){
        this.avatar = newVal;
        this.$forceUpdate();// 更新数据
    },
    '$store.state.staffName'(newVal){
        this.name = newVal;
        this.$forceUpdate();// 更新数据
    },
  },
  mounted(){
    // 组件间通信
    this.$bus.$on('receiveParams', this.receiveParams);
    // 组件间通信
    this.$bus.$on('clickYqms', this.clickYqms);

    // 腾讯云-- 语音、视频
    this.$bus.$on('clickCall', this.clickCall);
    // 设置分辨率
    // this.videoResolution = videoResolution;
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.parentH = getViewportSize.height; // 组件范围
    this.parentW = getViewportSize.width; // 组件范围
    this.width = Number(getViewportSize.width)/2; // 可拖动div 宽
    this.left = Number(getViewportSize.width)/2 - Number(this.width)/2;
    this.height = Number(getViewportSize.height - 60); // 可拖动div 高度
    this.currentUser = {
      id: 'c_' + localStorage.getItem('staffUid'),
      uid: localStorage.getItem('staffUid'),
      name: this.$store.state.user.staffName,
      avatar: this.$store.state.user.staffAvatar,
    }
    if (this.goEasy.getConnectionStatus() === 'disconnected') {
      this.connectGoEasy();  //连接goeasy
    }
    this.listenConversationUpdate(); //监听会话列表变化
    this.loadConversations(); //加载会话列表

    // 腾讯云 音视频 初始化 ↓
    this.Init();
  },
   beforeDestroy() {
    this.goEasy.im.off(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.setUnreadNumber);
    //断开连接
    this.goEasy.disconnect({
      onSuccess: function(){
        console.log("断开连接成功.")
      },
      onFailed: function(error){
        console.log("断开连接失败, code:"+error.code+ ",error:"+error.content);
      }
    });
  },
  methods: {

    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    connectGoEasy() {
      let that = this;
      that.goEasy.connect({
        id: that.currentUser.id,
        data: {
          uid: localStorage.getItem('staffUid'),
          name: that.currentUser.name,
          avatar: that.currentUser.avatar,
          tag:'company'
        },
        onSuccess: function () { 
          console.log("G连接成功:" + that.currentUser.id) 
        },
        onFailed: function (error) {
          console.log("连接失败, code:" + error.code + ",error:" + error.content);
        },
        onProgress: function (attempts) { 
          console.log("连接或自动重连中", attempts);
        }
      });
      
    },
    listenConversationUpdate() {
      // 监听会话列表变化
      this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.setUnreadNumber);
    },
    //加载会话列表
    loadConversations() {
      this.goEasy.im.latestConversations({
        onSuccess: (result) => {
          let content = result.content;
          this.setUnreadNumber(content);
        },
        onFailed: (error) => {
          console.log('获取最新会话失败, code:' + error.code + 'content:' + error.content);
        },
      });
    },
    // 获取消息数量
    setUnreadNumber(content) {
      this.unreadAmount = content.unreadTotal;
    },
    receiveParams(params){
      console.log(params)
      // '接收到的参数:' params
      this.laiyuan = params.laiyuan?params.laiyuan:'';
      if(params.type){
        this.title_show = params.type //searchTalent 是搜索人才页
      }
      if(params.is_clickMinificationpngBtn){  // 表示点击的 右侧浮动按钮
        this.is_clickMinificationpngBtn = false;
      }else{
        this.infoData = params.infoData;
        this.is_VueDragResize = false;
        this.$nextTick(function () {
          this.is_VueDragResize = true;
        });
      }
      // this.zInfex_0 = 99;
      // this.top = 56;
    },
    // 拖拽时可以确定元素位置
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    onDragstop(newRect) {
      
     
    },
    // 点击关闭
    clickCloseBtn(){
      this.is_VueDragResize = false;
    },
    // 点击缩小--按钮
    clickMinificationpngBtn(){
      this.zInfex_0 = -1;
      this.top = -800;
      this.$bus.$emit('clickSidebar',{ is_clickMinificationpngBtn:true } );
    },
    // 接收监听通讯 点击邀请面试按钮
    clickYqms(){
      console.log('yqmsVisible')
      this.yqmsVisible = true;
    },
   

    // 腾讯云 音视频  相关api ↓
    // 初始化
    async Init() {
      try {
        await this.$axios.post('/api/thirdparty/list',{
          tag:'tencent_cloud_im'
        }).then( res =>{
          if(res.code == 0){
            const userSig = atob(res.data.user_sig);
            let SDKAppID = atob(res.data.sdk_appid);
            TUICallKitServer.init({
              SDKAppID: Number(SDKAppID),
              userID: this.userID,
              userSig,
              // tim: this.tim     // 如果工程中已有 tim 实例，需在此处传入
            });
            console.log('初始化成功');
          }else{
            console.log(res.msg)
          }
        })
      } catch (error) {
        alert(`${error}`);
      }
    },
    // 语音、视频通话
    async clickCall(e) {
      try {
        this.show_TUICallKit = true;
        this.TUICallKit_type = e.type;
        // 1v1 video call
        await TUICallKitServer.call({ 
            userID: e.to.id,
            type: e.type == 1? TUICallType.AUDIO_CALL: TUICallType.VIDEO_CALL, //1、语音通话(TUICallType.AUDIO_CALL )、2、视频通话(TUICallType.VIDEO_CALL )
          });
      } catch (error) {
        alert(`${error}`);
      }
    },
    // 拨打电话前与收到通话邀请前会执行此函数
    beforeCalling(type, error) {
      console.log("拨打电话前与收到通话邀请前会执行此函数:", type, error);
    },
    // 结束通话后会执行此函数
    afterCalling() {
      console.log("结束通话后会执行此函数: afterCalling");
      this.show_TUICallKit = false;
    },
    // 组件抛出的事件，当通话状态发生变化时，会触发该事件
    handleStatusChanged(args) {
      console.log(args)
      const { oldStatus, newStatus } = args;
      // type:1 正在语音； 2、正在视频；3、通话结束；4、视频结束;5、发起呼叫；6、呼叫失败
      if(newStatus === STATUS.BE_INVITED){
        // 收到通话邀请
        console.log('收到通话邀请:',STATUS.BE_INVITED);
        this.show_TUICallKit = true;
      }
      if (oldStatus === STATUS.IDLE && newStatus === STATUS.DIALING_C2C) {
        // 正在 1v1 呼叫
        console.log('正在 1v1 呼叫:',STATUS.DIALING_C2C);
        let text = '';
        if(this.TUICallKit_type == 1){
          text = '发起语音通话...'
        }
        if(this.TUICallKit_type == 2){
          text = '发起视频通话...'
        }
        this.TUICallKitInfo({to: this.to,type: 5,text });

      }
      if (oldStatus === STATUS.DIALING_C2C && newStatus === STATUS.IDLE) {
        console.log('呼叫未接通')
        this.show_TUICallKit = false;
        this.TUICallKitInfo({to: this.to,type: 6,text: '呼叫未接通' });
      }
      if (oldStatus === STATUS.DIALING_C2C && newStatus === STATUS.CALLING_C2C_AUDIO) {
        // 正在 1v1 语音通话；
        console.log('正在 1v1 语音通话:',STATUS.CALLING_C2C_AUDIO);
      }
      if (oldStatus === STATUS.CALLING_C2C_AUDIO && newStatus === STATUS.IDLE) {
        // 语音通话结束；
        console.log('语音通话结束');
        this.show_TUICallKit = false;
        let text = '';
        if(this.TUICallKit_type == 1){
          text = '语音通话未接通'
        }
        if(this.TUICallKit_type == 2){
          text = '视频通话未接通'
        }
        this.TUICallKitInfo({to: this.to,type: 3,text });
      }
      if (oldStatus === STATUS.DIALING_C2C && newStatus === STATUS.CALLING_C2C_VIDEO) {
        // 正在 1v1 视频通话
        console.log('正在 1v1 视频通话:',STATUS.CALLING_C2C_VIDEO);
      }
      if (oldStatus === STATUS.CALLING_C2C_VIDEO && newStatus === STATUS.IDLE) {
        // 语音通话结束；
        console.log('视频通话结束');
        this.show_TUICallKit = false;
        this.TUICallKitInfo({to: this.to,type: 4,text: '视频结束' });
      }
      
    },
    TUICallKitInfo(obj){
      console.log(obj)
      this.$store.dispatch('TUICallKit/SET_TUStatusInfo', obj);
    },

   





  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  // 聊天弹窗 样式=============== ↓ ===========

  .app-wrapper /deep/ .vdr{
    // z-index: 9997 !important;
    position: fixed;
    border-radius: 4px;
    box-shadow:0 0 16px 0 rgba(139,152,169,1);
  }
  .app-wrapper /deep/ .vdr.active:before{
    transform: scale(0.5);
  }
  .app-wrapper /deep/ .vdr-stick{
    display: none;
  }
  .app-wrapper /deep/ .vdr-stick-br, .vdr-stick-tl{
    display: block;
    width: 14px !important;
    height: 14px !important;
    background-image: url("data:image/png;base64,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") !important;
    background-size: 100% 100% !important;
    right: 2px !important;
    bottom: 2px !important;
    border: none !important;
  }
  .VueDragResize-centent-box{
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    .vdr-icon{
      width: 28px;
      height: 28px;
      position: absolute;
      bottom: -4px;
      right: -4px;
      background: #ff0000;
      z-index: auto;
      display: block;
    }
    .VueDragResize-title-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      height: 40px;
      padding: 10px;
      cursor: move;
      .title{
        margin: 0 auto;
      }
      .icon-box{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        img{
          margin-left: 12px;
          width: 16px;
          cursor: pointer;
        }
      }
    }
    .navbaerMag-content-box{
      flex: 1;
    }
  }

  .TUICallKit-box{
    width: 50rem;
    height: 35rem;
    position: fixed; 
    top: -50rem;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 9998;
    transition: all 0.1s;
  }
  .TUICallKit-box.show-TUICallKit{
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
// 头部广告
.ad-box{
  width: 100%;
  position: relative;
  display: flex;
  &>img{
    width: 100%;
    height: 140px;
  }
  .ad-content-box{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .content-pagebox{
      width: 1366px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      padding: 10px 0;
      &>ul{
        li{
          font-size: 14px;
          color: #bdd7e9;
          display: flex;
          align-items: flex-end;
        }
      }
      ul.ad-content-ul-6{
        padding-top: 0;
      }
      ul.ad-content-ul-7{
        padding-top: 0;
        padding-left: 10px;
      }
      ul.ad-content-ul-8{
        padding-top: 60px;
        padding-left: 200px;
      }

    }
   
  }
}
@media screen and (max-width: 1466px){
  .ad-box .ad-content-box .content-pagebox{
    width: 1100px;
  }
}
</style>
