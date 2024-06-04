<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <div class="right-items-box">
        <div @click="clickMessage" class="communication-box">
          <img src="../../assets/image/bossSide/remind.png" alt="" />
          <span>消息</span>
          <span class="corner-mark-box" v-if="unreadAmount">{{ unreadAmount }}</span>
        </div>
        <div @click="gotoassist">
          <img src="../../assets/image/bossSide/questionCircle.png" alt="" />
          <span>帮助</span>
        </div>
        <div @click="gotoMyInterviewSchedule">
          <img src="../../assets/image/bossSide/comment.png" alt="" />
          <span>面试</span>
        </div>
        <div @click="goToCorporateHome">
          <img src="../../assets/image/bossSide/icon-frame2.png" alt="" />
          <span>企业主页</span>
        </div>
      </div>

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src=" avatar ? avatar : require('../../assets/image/img-user.jpg')" class="user-avatar">
          <span class="username">{{ name?name:'text' }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link> -->
          <router-link to="/individualCenter">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { setToken } from '@/utils/auth';
export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data(){
    return {
      width: 0,
      height: 0,
      unreadAmount: null,
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
    name() {
      return this.$store.state.user.staffName
    },

    avatar() {
      return this.$store.state.user.staffAvatar
    },
  },
  watch:{
    '$store.state.staffAvatar'(newVal){
      console.log('staffAvatar')
        this.avatar = newVal;
        this.$forceUpdate();// 更新数据
    },
    '$store.state.staffName'(newVal){
      console.log('staffName')
        this.name = newVal;
        this.$forceUpdate();// 更新数据
    },
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.listenConversationUpdate();// 监听会话列表变化
  },
  methods: {
    listenConversationUpdate() {
      this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.setUnreadNumber);
    },
    // 获取消息数量
    setUnreadNumber(content) {
      console.log(content)
      this.unreadAmount = content.unreadTotal;
    },


    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      // debugger
      this.$store.dispatch('user/SET_TOKEN', '');
      this.$store.dispatch('user/SET_staffName', '');
      this.$store.dispatch('user/SET_staffAvatar', '');
      this.$store.dispatch('user/SET_ROLE', '');
      localStorage.setItem('tag', ''); // 用户身份 user、人才端 company、企业端缓存
      localStorage.setItem('staffVipRank', ''); // 用户会员等级
      setToken('');
      // 清除缓存的权限菜单
      sessionStorage.removeItem("route")
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    // 点击企业主页
    goToCorporateHome(){
      this.$router.push('/corporateHome')
      return
    },
    
    gotoMyInterviewSchedule(){
      this.$router.push('/myInterviewSchedule');
    },
    gotoassist(){
      this.$router.push('/assist')
    },
    // 点击消息
    clickMessage(){
      this.$bus.$emit('receiveParams', {type:'navbarMag',laiyuan:'nav',infoData:{} });
    },
    // 拖拽时可以确定元素位置
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }
    .right-items-box{
      display: flex;
      align-items: center;
      justify-content: center;
      div{
        margin-right: 22px;
        font-size: 14px;
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        img{
          width: 14px;
          height: 14px;
          margin-right: 4px;
        }
        .corner-mark-box{
          line-height: initial;
          background: #ff0000;
          color: #fff;
          border-radius: 10px;
          padding: 2px 6px;
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 12px;
          transform: scale(0.8);
        }
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
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        .user-avatar {
          cursor: pointer;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }
        .username{
          margin-left: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
        }
      }
    }
  }
}
</style>
