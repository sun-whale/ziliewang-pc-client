<template>
  <div>
    <div class="navber-container" :style="`background:${backgroundColor};`">
      <div class="navbar">
        <div class="hospital">
          <!-- <img src="../../../assets/image/logo-2.png" alt=""> -->
        </div>
        <div class="navbar-items-box"></div>
        <div class="right-menu">
          <div class="right-items-box">
            <div @click="clickMessage" class="communication-box">
              <img src="../../../assets/image/icon-wechat1.png" alt="" />
              <span>消息</span>
              <span class="corner-mark-box" v-if="unreadTotal">{{ unreadTotal }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth';

export default {
  components: {
  
  },
  data(){
    return{
      width: 0,
      height: 0,
      backgroundColor:'#fff',
      uid: localStorage.getItem('realUid'),
    }
  },
  computed: {
    name() {
      return this.$store.state.user.name
    },

    avatar() {
      // return localStorage.getItem('realAvatar')
      return this.$store.state.user.realAvatar
    },
    unreadTotal() {
      return this.$store.state.user.unreadTotal
    },
    notificationTotal() {
      return this.$store.state.user.notificationTotal
    },
    activeMenu() {
      const route = this.$route;
      let { meta, path,query,fullPath } = route;
      console.log(route)
      if(path == '/careerIdentity'){
        if( query.see_uid && query.see_uid != localStorage.getItem('realUid')){
          path = fullPath
        }
      }
      // if (meta.activeMenu) {
      //   return meta.activeMenu;
      // }
      return '' || path;
    },
    ad_show() {
      const route = this.$route;
      let { meta, path,query,fullPath } = route;
      console.log(route)
      return '' || path;
    },
    navbarMessagePrompt() {
      return this.$store.state.user.navbarMessagePrompt
    },
  },
  watch:{
    '$store.state.realAvatar'(newVal){
      console.log('realAvatar')
      this.avatar = newVal;
      this.$forceUpdate();// 更新数据
    },
    '$store.state.name'(newVal){
      console.log('name')
      this.name = newVal;
      this.$forceUpdate();// 更新数据
    },
    '$store.state.unreadTotal'(newVal){
      console.log('unreadTotal')
      this.unreadTotal = newVal;
      this.$forceUpdate();// 更新数据
    },
    '$store.state.notificationTotal'(newVal){
      console.log('notificationTotal')
      this.notificationTotal = newVal;
      this.$forceUpdate();// 更新数据
    },
    
    '$store.state.navbarMessagePrompt'(newVal){
      console.log('navbarMessagePrompt')
      this.navbarMessagePrompt = newVal;
      this.$forceUpdate();// 更新数据
    },
  },
  // 退出关闭
  beforeDestroy() {
    
  },
  mounted(){

  },
  created(){

  },
  methods: {
    logout() {
      // debugger
      setToken('');
      localStorage.setItem('tag', ''); // 用户身份 user、人才端 company、企业端缓存
      // 清除缓存的权限菜单
      sessionStorage.removeItem("route")
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    // 点击线上面试
    clickxsms(){
      this.$router.push('/myDelivery?subTag=3')
    },
    // 点击职圈
    clickProfessionalCircle(){
      this.$router.push('/professionalCircle');
    },
    // 点击我的好友
    clickmyGoodFriend(){
      this.$router.push('/myGoodFriend');
    },
    // 点击消息
    clickMessage(){
      this.$bus.$emit('talentSide_receiveParams', {type:'navbarMag',laiyuan:'nav',infoData:{} });
    },
    // 点击通知
    clickNotification(){
      this.$bus.$emit('getNotification',{});
    }
  },
};
</script>

<style lang="scss" scoped>
.navber-container{
  width: 100%;
  height: 50px;
}
.navbar {
  margin: 0 auto;
  width: 1200px;
  height: 50px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .hospital{
    height: 40px;
  }
  .hospital>img{
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }
  .navbar-items-box{
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 20px;
    /deep/ .el-menu--horizontal>.el-menu-item{
      height: 50px;
      line-height: 50px;
      min-width: 80px;
      font-size: 14px;
      text-align: center;
      padding: 0 10px;
    }
    /deep/ .el-menu--horizontal>.el-menu-item.is-active{
      background-color: #000a14 !important;
      border-bottom-color: $g_bg !important;
    }
  }
  .right-menu {
    width: auto;
    height: 100%;
    line-height: 50px;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }
    .right-items-box{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 6px;
      div{
        padding: 0 6px;
        font-size: 14px;
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        color: #000;
        img{
          width: 14px;
          height: 14px;
          margin-right: 6px;
        }
        .corner-mark-box{
          line-height: initial;
          background: #ff0000;
          color: #fff;
          border-radius: 10px;
          padding: 2px 6px;
          position: absolute;
          top: 2px;
          right: -3px;
          font-size: 12px;
          transform: scale(0.8);
        }
      }
      &>div.hover{
        background-color: #000A14 !important;
        border-bottom: 2px solid #37f !important;
      }
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        position: relative;
          cursor: pointer;
          color: #fff;
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 20px;
          vertical-align: middle;
          margin-right: 10px;
        }

        .username {
          vertical-align: middle;
          cursor: pointer;
          color: #fff;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          // position: absolute;
          // right: -20px;
          // top: 21px;
          font-size: 12px;
        }
      }
    }
  }
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
      ul.ad-content-ul-1{
        padding-top: 20px;
      }
      ul.ad-content-ul-2{
        padding-top: 10px;
        padding-left: 20px;
      }
      ul.ad-content-ul-3{
        padding-top: 40px;
        padding-left: 200px;
      }
      ul.ad-content-ul-5{
        padding-top: 60px;
        padding-left: 180px;
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
