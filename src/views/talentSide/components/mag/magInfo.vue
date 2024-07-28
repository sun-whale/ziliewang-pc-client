<template>
  <div class="home">
    <div class="home-container">
      <div class="home-menu">
        <div class="menu-header">
          <img class="user-avatar" :src="currentUser.avatar"/>
        </div>
        <div class="menu-box">
          <div class="menu-list">
            <div class="menu-item" :class="menu_type == 'conversations'?'hover':''" @click="menuItem('conversations')">
              <i class="el-icon-chat-dot-square"></i>
              <span v-if="unreadAmount" class="menu-unread">{{ unreadAmount}}</span>
            </div>
            <div class="menu-item" :class="menu_type == 'contacts'?'hover':''" @click="menuItem('contacts')">
              <i class="el-icon-user-solid"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="home-main">
        <buddyChart v-if="menu_type == 'conversations'"/>
        <contacts v-if="menu_type == 'contacts'" :msgList="msgList"/>
      </div>
    </div>
  </div>
</template>

<script>
import buddyChart from './buddyChart';
import contacts from './Contacts';
export default {
  components: { 
    buddyChart,
    contacts
  },
  props:{
    is_type:{
      type: String,
      default() {
        return ''
      }
    },
  },
  data(){
    return {
      currentUser: null,
      unreadAmount: null,
      viewHeight:'',
      msgList:[],
      menu_type:'conversations', // 'conversations' 聊天记录  ， 'contacts' 好友
      page: 1,
      pagesize: 20,
    }
  },
  mounted(){
    this.getSysMsgList();
  },
  watch: {
    $route() {
      this.setCurrentRoute();
    },
    '$store.state.realAvatar'(newVal){
      this.avatar = newVal;
      this.$forceUpdate();// 更新数据
    },
    '$store.state.name'(newVal){
        this.name = newVal;
        this.$forceUpdate();// 更新数据
    },
  },
  created(){
    this.currentUser = {
      id: 'u_'+ localStorage.getItem('realUid'),
      uid:localStorage.getItem('realUid'),
      name: this.$store.state.user.name,
      avatar: this.$store.state.user.realAvatar,
      user_number: localStorage.getItem('user_number'),
      tag: 'user'
    }
   
    this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.setUnreadNumber);
  },
  methods:{
    setCurrentRoute(e){
     
    },
    // 获取消息数量
    setUnreadNumber(content) {
      console.log(content)
      this.unreadAmount = content.unreadTotal;
    },
    // 获取好友列表
    getSysMsgList() {
      let that = this;
      that.$axios.post('/api/user/friend/list', {
        tag: 'attention'
      }).then(res => {
        if (res.code == 0) {
          that.msgList = res.data;
        } else {
          that.$message.error({
            message: res.msg
          })
        }
      })
    },
    
    menuItem(n){
      this.menu_type = n;
    },

  }
}
</script>

<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0 10px 0;
  }

  .home-container {
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    display: flex;
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .home-menu {
    width: 60px;
    background-color: #F7F7F7;
    border-right: 1px solid #eeeeee;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .menu-header {
    margin: 20px auto;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
  .menu-box {
    padding: 20px 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .menu-item {
    color: #303133;
    cursor: pointer;
    height: 45px;
    position: relative;
  }
  .menu-item.hover i{
    color: #d02129 !important;
  }
  .menu-item>i{
    font-size: 26px;
  }
  .menu-unread {
    position: absolute;
    top: -10px;
    right: -5px;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    border-radius: 50%;
    background-color: #d02129;
    color: #ffffff;
    font-size: 12px;
  }

  .router-link-active i {
    color: #d02129 !important;
  }

  .iconfont {
    padding: 15px;
    font-size: 28px;
    color: #606266;
    cursor: pointer;
  }

  .iconfont:active {
    color: #d02129;
  }

  .home-main {
    padding: 0;
    flex: 1;
  }
</style>
