<template>
  <div class="mian-box">
    <!-- 头部 开始  -->
    <navbar />
    <!-- 头部 结束  -->
    <!-- 主题 开始 -->
    <div ref="keepAliveContainer" class="container-box">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive && isRouterAlive" :key="$route.fullPath" ref="routerView"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive && isRouterAlive" :key="$route.fullPath" ref="routerView"></router-view>
    </div>
    <!-- 主题 结束 -->
    <!-- 底部 开始  -->
    <Footer />
    <!-- 底部 结束  -->

    <!-- 侧边栏 -->
    <Sidebar ref="sidebar" :infoData="infoData" :filteredList="filteredList"/>
    <!-- 聊天弹窗 开始-->
    <transition name="suck-in" mode="out-in">
      <VueDragResize :style="`z-index:${zInfex_0};`"
       dragHandle=".VueDragResize-title-box" 
       :isActive="true" :isDraggable="true" :parentLimitation="true" :preventActiveBehavior="true"
       :parentW="parentW" :parentH="parentH" 
       :w="width" :h="height" :minw="minw" :minh="minh"
       :x="left" :y="top" 
       @resizing="resize" 
       @dragging="resize" 
       @deactivated="onDeactivated"
       v-if="is_VueDragResize">
        <div class="VueDragResize-centent-box">
          <div class="VueDragResize-title-box">
            <div class="title">{{ vueDragResizeTitle }}</div>
            <div class="icon-box">
              <img src="../../assets/image/icon-minificationpng.png" title="缩小"  @click="clickSXBtn" />
              <img src="../../assets/image/icon-fangda.png" title="放大"  @click="clickFDBtn" />
              <img src="../../assets/image/icon-close.png" title="关闭" @click="clickMinificationpngBtn" />
            </div>
          </div>
          <div class="Chat-box">

            <!-- <buddyChart :infoData="infoData" :laiyuan="laiyuan" is_pop="is_pop" ref="chat" /> -->
            <magInfo :infoData="infoData" :laiyuan="laiyuan" @setVueDragResizeTitle="setVueDragResizeTitle" is_pop="is_pop" ref="chat" />
          </div>
        </div>
      </VueDragResize>
    </transition>

    <!-- 聊天弹窗 结束-->

 

    <div class="TUICallKit-box" :class="show_TUICallKit ? 'show-TUICallKit' : '' ">
      <TUICallKit 
        :allowedMinimized="true" 
        :allowedFullScreen="true"
        :beforeCalling="beforeCalling"
        :afterCalling="afterCalling"
        :statusChanged="handleStatusChanged"
      />
    </div>

    <!-- 系统通知 --  侧边抽屉 -->
    <div id="drawer-box">
      <el-drawer title="系统通知" :visible.sync="is_Notification" :before-close="clickCloseNotificationBtn">
        <div class="items-box">
          <ul>
            <li class="s-list-nav" v-for="(item,index) in notificationList" :key="index">
              <div class="itemWrap">
                <div class="s-avatar">
                  <img :src=" item.operate_user_avatar ? item.operate_user_avatar : require('../../assets/image/img-user.jpg')" alt="" />
                </div>
                <div class="s-list-info">
                  <div class="s-list-name">
                    <span>
                      <span>{{ item.operate_user_name }}</span>
                      <!-- 通知类型 1.收藏 2.点赞 3.转发 4.查看 5.评论 6.回复 -->
                      <span v-if="item.type == 1">收藏了您</span>
                      <span v-if="item.type == 2">点赞了您的评论</span>
                      <span v-if="item.type == 3">转发了您的评论</span>
                      <span v-if="item.type == 4">查看了您的简历</span>
                      <span v-if="item.type == 5">评论了您的动态</span>
                      <span v-if="item.type == 6">评论了您的评论</span>
                    </span>
                    <span class="span-time">{{ item.createtime }}</span>
                  </div>
                  <div class="s-list-intro"><span>{{ item.content?item.content :'暂无'  }}</span></div>
                </div>
              </div>
            </li>
          </ul>
          <div class="tips-box" v-if="notificationList.length<= 0">- 暂无通知 -</div>
        </div>
      </el-drawer>
    </div>

  </div>
</template>
<script>
import Navbar from './components/Navbar';
import Footer from '../../components/footer';
import VueDragResize from 'vue-drag-resize';
import Sidebar from './components/sidebar';
// import buddyChart from './components/mag/buddyChart.vue';
import magInfo from './components/mag/magInfo.vue';
import { TUICallKit, TUICallKitServer, TUICallType,STATUS } from "@tencentcloud/call-uikit-vue2.6";
import * as GenerateTestUserSig from "../../debug/GenerateTestUserSig-es";

  export default {
    provide(){ 
      // 父组件中通过provide来提供变量，在子组件中通过inject来注入。
      return {
        reloads: this.reloads
      }
    },
    name: 'Mian',
    components: {
      Navbar,
      Footer,
      VueDragResize,
      Sidebar,
      // buddyChart,
      magInfo,
      TUICallKit,
    },
    data(){
      return {
        isRouterAlive: true,
        width: 0,
        height: 0,
        minw: 516,
        minh: 340,
        parentH: 0,
        parentW: 0,
        top: 1,
        left: 500,
        zInfex_0: 99,
        is_VueDragResize: false,
        laiyuan:'',
        is_pop:'pop',
        infoData: {},
        filteredList: [],
        show_TUICallKit: false,
        // 腾讯云 SDKAppID、userSig 的获取参考下面步骤
        // 主叫的 userID
        userID: 'u_'+ localStorage.getItem('realUid'),    
        // 被叫的 userID
        callUserID: '',
        to:{},
        TUICallKit_type: 0,
        countTime: null,
        counter: 0,
        unreadTotal: null, // 新消息数量
        vueDragResizeTitle: '消息中心',
        notificationList: [],
        is_Notification: false
      }
    },
    watch: {
      $route() {
        this.setCurrentRoute();
      },
      '$store.state.user.realAvatar'(newVal){
        this.avatar = newVal;
        this.$forceUpdate();// 更新数据
      },
      '$store.state.user.name'(newVal){
        this.name = newVal;
        this.$forceUpdate();// 更新数据
      },
    },
    beforeCreate(){
      console.log('beforeCreate')
    },
    mounted(){
      // 组件间通信
      this.$bus.$on('talentSide_receiveParams', this.talentSide_receiveParams);
      this.$bus.$on('click_conversationList_item_getInfoData', this.click_conversationList_item_getInfoData);
      // 点击导航 通知按钮
      this.$bus.$on('getNotification',this.getNotification);
      // 腾讯云-- 点击电话、视频
      this.$bus.$on('user_clickCall', this.user_clickCall);
    },
    created(){
      let that = this;
      let getViewportSize = this.$getViewportSize();
      this.parentH = getViewportSize.height; // 组件范围
      this.parentW = getViewportSize.width; // 组件范围 
      this.width = Number(getViewportSize.width)/2>1000?Number(getViewportSize.width)/2:1000; // 可拖动div 宽度
      this.height = Number(getViewportSize.height - 120); // 可拖动div 高度
      this.left = Number(getViewportSize.width)/2 - Number(this.width)/2;
      this.top = 60;
      this.currentUser = {
        id: 'u_'+ localStorage.getItem('realUid'),
        uid:localStorage.getItem('realUid'),
        name: this.$store.state.user.name,
        avatar: this.$store.state.user.realAvatar,
        user_number: localStorage.getItem('user_number'),
        tag: 'user'
      }
      //连接goeasy
      if (this.goEasy.getConnectionStatus() === 'disconnected') {
         this.connectGoEasy(); 
      }
      this.listenConversationUpdate();// 监听会话列表变化
      this.loadConversations(); //加载会话列表

      // 腾讯云 音视频 初始化 ↓
      this.Init();
    },
    // 页面卸载
    beforeDestroy() {
      //断开连接
      this.goEasy.disconnect({
        onSuccess: function(){
            console.log("断开连接成功.")
        },
        onFailed: function(error){
            console.log("断开连接失败, code:"+error.code+ ",error:"+error.content);
        }
      });
      this.goEasy.im.off(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.setUnreadNumber);
    },
    methods:{
      //连接goeasy
       connectGoEasy() {
        let that = this;
        this.goEasy.connect({
          id: this.currentUser.id,
          data: {
            name: this.currentUser.name,
            avatar: this.currentUser.avatar,
            uid: this.currentUser.uid,
            user_number: this.currentUser.user_number,
          },
          onSuccess: function (res) { 
            console.log("连接成功.",that.currentUser)
          },
          onFailed: function (error) { //连接失败
            console.log("连接失败, code:" + error.code + ",error:" + error.content);
          },
          onProgress: function (attempts) { //连接或自动重连中
            console.log("连接或自动重连中", attempts);
          }
        });
      },
      // 监听会话列表变化
      listenConversationUpdate() {
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
            console.log('获取最新会话列表失败, code:' + error.code + 'content:' + error.content);
          },
        });
      },
      // 获取消息数量
      setUnreadNumber(content) {
        console.log(content)
        this.filteredList = content.conversations; // 会话列表
        this.unreadAmount = content.unreadTotal;
        this.$store.dispatch('user/actions_unreadTotal', content.unreadTotal); // vuex
        if(content.unreadTotal >0){
          this.$store.dispatch('user/actions_sidebarShow',true);// vuex
        }
      },
      talentSide_receiveParams(params){
        console.log(params)
        // '接收到的参数:' params
        this.laiyuan = params.laiyuan?params.laiyuan:'';
        this.infoData = params.infoData;
        this.is_VueDragResize = false;
        this.$nextTick(function () {
          this.is_VueDragResize = true;
        });
        this.$store.dispatch('user/actions_sidebarShow',false);// vuex
        // this.zInfex_0 = 99;
        // this.top = 56;
      },
      // 监听导航上 点击通知按钮事件
      getNotification(params){
        let that = this;
        that.$axios.post('/api/system/notification/list',{}).then( res =>{
          if(res.code == 0){
            that.notificationList = res.data.list;
          }else{
            that.$message.error({
              message:res.msg
            })
          }
          that.is_Notification = true;
        }).catch( e =>{
          that.$message.error({
            message:e.message
          })
          console.log(e)
        })
      },
      // 点击会话列表获取所点击对象数据
      click_conversationList_item_getInfoData(params){
        console.log(params)
        this.infoData = params;
      },
      //监听到当前路由状态并激活当前菜单
      setCurrentRoute() {
        this.activeIndex = this.$route.path;    
      },
      
      reloads () {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      },
      //
      onDeactivated(e){
        
      },
      // 拖拽时可以确定元素位置
      resize(newRect) {
        this.width = newRect.width;
        this.height = newRect.height;
        this.top = newRect.top;
        this.left = newRect.left;
      },
      // 点击 聊天弹窗关闭按钮
      // clickCloseBtn(){
      //   this.is_VueDragResize = false;
      // },
      // 点击聊天窗口缩小
      clickSXBtn(){
        let getViewportSize = this.$getViewportSize();
        this.is_VueDragResize = false;
        this.$nextTick(() =>{
          this.width = Number(getViewportSize.width)/2>1000?Number(getViewportSize.width)/2:1000; // 可拖动div 宽度
          this.height = Number(getViewportSize.height - 120); // 可拖动div 高度
          this.top = 60;
          this.left = Number(getViewportSize.width)/2 - Number(this.width)/2;
          this.is_VueDragResize = true;
        })
      },
      // 点击聊天窗口放大
      clickFDBtn(){
        let getViewportSize = this.$getViewportSize();
        console.log(getViewportSize)
        this.is_VueDragResize = false;
        this.$nextTick(() =>{
          this.top = 0;
          this.left = 0;
          this.height = getViewportSize.height; // 可拖动div 高度
          this.width = getViewportSize.width - 16; // 可拖动div 宽度
          this.is_VueDragResize = true;
        })
      },
      // 点击聊天弹窗关闭--按钮
      clickMinificationpngBtn(){
        this.is_VueDragResize = false;
        // this.$bus.$emit('talentSide_clickSidebar',{ is_clickMinificationpngBtn:true } );
        this.$store.dispatch('user/actions_sidebarShow',true);// vuex
      },
      
      // 点击 系统通知弹窗关闭按钮
      clickCloseNotificationBtn(){
        this.is_Notification = false;
      },
      setVueDragResizeTitle(e){
        // 'conversations' 聊天记录  ， 'contacts' 好友
        if(e.menu_type == 'conversations'){
          this.vueDragResizeTitle = '消息中心';
        }
        if(e.menu_type == 'contacts'){
          this.vueDragResizeTitle = '我的好友';
        }
      },

      // 腾讯云 初始化
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
          console.log(error)
        }
      },
      // 通话
      async user_clickCall(e) {
        try {
          this.to = e.to;
          this.TUICallKit_type = e.type;
          this.show_TUICallKit = true;
          // 1v1 video call
          await TUICallKitServer.call({ 
              userID: e.to.id,
              type: e.type == 1? TUICallType.AUDIO_CALL: TUICallType.VIDEO_CALL, //1、语音通话(TUICallType.AUDIO_CALL )、2、视频通话(TUICallType.VIDEO_CALL )
            });
        } catch (error) {
          alert(error);
        }
      },
      // 拨打电话前与收到通话邀请前会执行此函数
      beforeCalling(type, error) {
        console.log("拨打电话前与收到通话邀请前会执行此函数-type:", type, error);

      },
      // 结束通话后会执行此函数
      afterCalling() {
        console.log('结束通话后会执行此函数')
        // this.show_TUICallKit = false;
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
          this.user_TUICallKitInfo({to: this.to,type: 5,text });
          // 正在 1v1 语音通话；
          console.log('正在 1v1 语音通话:',STATUS.CALLING_C2C_AUDIO);
          
        }
        if (oldStatus === STATUS.DIALING_C2C && newStatus === STATUS.IDLE) {
          console.log('呼叫未接通')
          this.show_TUICallKit = false;
          let text = '';
          if(this.TUICallKit_type == 1){
            text = '语音通话未接通'
          }
          if(this.TUICallKit_type == 2){
            text = '视频通话未接通'
          }
          this.user_TUICallKitInfo({to: this.to,type: 6,text });
        }
        if (oldStatus === STATUS.DIALING_C2C && newStatus === STATUS.CALLING_C2C_AUDIO) {
          // 正在 1v1 语音通话；
          console.log('正在 1v1 语音通话:',STATUS.CALLING_C2C_AUDIO);
          // 初始化计数器
          let counter = 0;
          // 创建计时器，每1000毫秒（即每秒）执行一次函数
           this.countTime = setInterval(function() {
              this.counter++; // 增加计数器的值
              console.log(this.counter); // 在控制台输出当前计数器的值
          }, 1000);

        }
        if (oldStatus === STATUS.CALLING_C2C_AUDIO && newStatus === STATUS.IDLE) {
          // 语音通话结束；
          console.log('语音通话结束');
          clearInterval(this.countTime);
          this.show_TUICallKit = false;
          let counter = this.counter;
          this.user_TUICallKitInfo({to: this.to,type: 3,text: '通话结束',counter });
        }
        if (oldStatus === STATUS.DIALING_C2C && newStatus === STATUS.CALLING_C2C_VIDEO) {
          // 正在 1v1 视频通话
          console.log('正在 1v1 视频通话:',STATUS.CALLING_C2C_VIDEO);
        }
        if (oldStatus === STATUS.CALLING_C2C_VIDEO && newStatus === STATUS.IDLE) {
          // 语音通话结束；
          console.log('视频通话结束');
          this.show_TUICallKit = false;
          this.user_TUICallKitInfo({to: this.to,type: 4,text: '视频结束' });
        }
        
      },
      user_TUICallKitInfo(obj){
        console.log(obj)
        this.$store.dispatch('TUICallKit/SET_userTUStatusInfo', obj);
      },
    },
   

  }
</script>
<style lang="scss" scoped>
  .mian-box{
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
  .container-box{
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    min-height: 100%;
    flex: 1;
    padding-bottom: 10px;
    .container{
      width: 1200px;
      margin: 1.2rem auto 0;
    }
  }
  // 聊天弹窗 样式=============== ↓ ===========

  .mian-box /deep/ .vdr{
    z-index: 2000 !important;
    position: fixed;
    border-radius: 4px;
    box-shadow:0 0 16px 0 rgba(139,152,169,1);
  }
  .mian-box /deep/ .vdr.active:before{
    transform: scale(0.5);
  }
  .mian-box /deep/ .vdr-stick{
    box-shadow: none;
    background: none;
    border: 0;
  }
  .mian-box /deep/ .vdr-stick-tm{
    left: 0;
    top: -2px !important;
    width: 100% !important;
    height: 4px !important;
    margin: 0 !important;
  }
  .mian-box /deep/ .vdr-stick-bm{
    left: 0;
    bottom: -2px !important;
    width: 100% !important;
    height: 4px !important;
    margin: 0 !important;
  }
  .mian-box /deep/ .vdr-stick-ml{
    top: 0;
    left: -2px !important;
    width: 4px !important;
    height: 100% !important;
    margin: 0 !important;
  } 
  .mian-box /deep/ .vdr-stick-mr{
    top: 0;
    right: -2px !important;
    width: 4px !important;
    height: 100% !important;
    margin: 0 !important;
  }
  .mian-box /deep/ .vdr-stick-br{
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
    padding: 10px 0;
    padding-top: 0;
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
      height: auto;
      padding: 10px;
      padding-left: 60px;
      cursor: move;
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
    .Chat-box{
      flex: 1;
      height: calc(100% - 60px);
    }
    .gt-span{
      cursor: pointer;
      color: $g_color;
      font-size: 14px;
    }
  }
  //  弹窗 动画样式 -----
  .suck-in-enter-active, .suck-in-leave-active {
    transition: all 0.4s ease;
    transform-origin: right;
  }

  .suck-in-enter, .suck-in-leave-to {
    opacity: 0;
    transform: translateX(100%) scale(0);
  }
  // 聊天弹窗 样式=============== ↑ ===========
  .TUICallKit-box{
    width: 50rem;
    height: 35rem;
    position: fixed; 
    top: -50rem;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 2001;
    transition: all 0.1s;
  }
  .TUICallKit-box.show-TUICallKit{
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  #drawer-box{
    /deep/ .el-drawer__header{
      margin: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #e2e2e2;
    }
    .items-box{
      width: 100%;
      padding: 5px 20px 20px 20px;
      .s-list-nav{
        width: 100%;
        position: relative;
        cursor: pointer;
        .itemWrap{
          padding: 8px 0;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #e2e2e2;
          .s-avatar{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            &>img{
              width: 100%;
              height: 100%;
            }
          }
          .s-list-info{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 10px;
          
            .s-list-name {
              font-size: 15px;
              color: #1e1f24;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .s-list-name span {
              overflow-x: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 14px;
              font-weight: bold;
            }
            .s-list-name span.span-time{
              font-size: 13px;
              color: #848691;
            }
            .s-list-intro {
              font-size: 14px;
              height: 16px;
              width: 100%;
              color: #848691;
              display: flex;
              align-items: center;
              padding-top: 10px;
            }
            .s-list-intro span {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .s-list-button .s-button {
            height: 28px;
            width: 60px;
            background-color: $g_bg;
            color: #fff;
            border-radius: 20px;
            font-size: 13px;
            line-height: 28px;
            text-align: center;
            cursor: pointer;
          }

        }
      }
      .s-list-nav:hover{
        background: rgba(236, 236, 236, 0.288);
      }
      .tips-box{
        width: 100%;
        margin-top: 30px;
        color: #999;
        font-size: 14px;
        text-align: center;
      }
    }
  }
</style>