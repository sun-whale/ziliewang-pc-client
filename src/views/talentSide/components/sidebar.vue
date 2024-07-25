<template>
  <div class="block-sidebar" v-if="sidebar_show">
    <div class="block-sidebar-item iconfont">

      <el-tooltip placement="top" v-if="unreadTotal">
        <div slot="content">
          <ul class="conversations-list-box">
            <li v-for="(item,index) in conversations" :key="index" @click="sidebarChatBtn(item,'li')">
              <img :src="item.data.avatar?item.data.avatar:require('../../../assets/image/img-user.jpg')" alt="" class="img-user"/>
              <div class="list-right">
                <div class="list-name">{{ item.data.name }}</div>
                <div class="wcd-box">
                  <span class="text" v-if="item.lastMessage.type === 'text'">{{item.lastMessage.payload.text}}</span>
                  <span class="text" v-if="item.lastMessage.type === 'texts'">{{item.lastMessage.payload.text}}</span>
                  <span v-else-if="item.lastMessage.type === 'video'">[视频消息]</span>
                  <span v-else-if="item.lastMessage.type === 'audio'">[语音消息]</span>
                  <span v-else-if="item.lastMessage.type === 'image' || item.lastMessage.type === 'images'">[图片消息]</span>
                  <span v-else-if="item.lastMessage.type === 'file'">[文件消息]</span>
                  <span v-else-if="item.lastMessage.type === 'resume'">[简历消息]</span>
                  <span v-else-if="item.lastMessage.type === 'phone'">[交换联系方式消息]</span>
                  <span v-else-if="item.lastMessage.type === 'interview'">[邀请面试消息]</span>
                  <span v-else-if="item.lastMessage.type === 'quality'">[素质测评]</span>
                  <span v-else-if="item.lastMessage.type === 'assess'">[面试评估]</span>
                  <span v-else-if="item.lastMessage.type === 'share-card'">[好友卡片]</span>
                  <span v-else-if="item.lastMessage.type === 'share-post'">[职位卡片]</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <button class="CB-kJkihA" @click="sidebarChatBtn(infoData,'btn')">
          <img src="../../../assets/image/icon-chatMessage.png" alt="">
          <span class="corner-mark-box">{{ unreadTotal }}</span>
        </button>
      </el-tooltip>

      <button class="CB-kJkihA" @click="sidebarChatBtn(infoData,'btn')" v-else>
        <img src="../../../assets/image/icon-chatMessage.png" alt="">
      </button>

    </div>
  </div>

</template>

<script>
export default {
  components: {
  },
  props:{
    infoData:{
      type: Object,
      default() {
        return {}
      }
    },
    filteredList:{
      type: Array,
      default() {
        return []
      }
    },
  },
  data(){
    return{
      sidebar: false,
    }
  },
  computed: {
    unreadTotal() {
      return this.$store.state.user.unreadTotal
    },
    sidebar_show() {
      return this.$store.state.user.sidebar_show
    },
    conversations() {
      return this.filteredList.filter(item => {
        return item.unread > 0;
      });
    }
  },
  watch:{
    '$store.state.unreadTotal'(newVal){
      this.unreadTotal = newVal;
      this.$forceUpdate();// 更新数据
    },
    '$store.state.sidebar_show'(newVal){
      this.sidebar_show = newVal;
      this.$forceUpdate();// 更新数据
    },
  },
  mounted() {
  
  },
  methods: {
    // 点击侧边栏 聊天按钮
    sidebarChatBtn(i,type){
      console.log(i)
      let infoData = {};
      if(type == 'btn'){
        infoData = i;
      }
      if(type == 'li'){
        infoData = {
          avatar: i.data.avatar,
          name: i.data.name,
          tag: i.data.tag,
          uid: i.data.uid,
          user_number: i.data.user_number,
          id: i.userId,
          is_friend: i.data.is_friend,
        };
      }
      this.$bus.$emit( 'talentSide_receiveParams', {type:'sidebar',laiyuan:'rightSidebar',infoData: infoData } );
      this.$store.dispatch('user/actions_sidebarShow',false);// vuex
    },
    
    
    
  
  },
};
</script>

<style lang="scss" scoped>
.block-sidebar {
  position: fixed;
  right: 50px;
  bottom: 150px;
  width: 60px;
  z-index: 9999;
  .block-sidebar-item {
    font-size: 50px;
    color: rgba(204,204,204,.5);
    text-align: center;
    line-height: 50px;
    margin-bottom: 20px;
    cursor: pointer;
    display: block;
    transition: all 0.25s ease 0s;
    position: relative;
    .CB-kJkihA {
      border: none;
      display: inline-flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      position: relative;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      line-height: 1.2;
      overflow: unset;
      font-size: 14px;
      letter-spacing: 1px;
      transform: none;
      white-space: normal;
      overflow-wrap: break-word;
      color: #666;
      background-color: #fff;
      box-shadow: 0 0 8px 0 rgba(0,0,0,0.16);
      position: relative;
      .corner-mark-box{
        line-height: initial;
        background: #ff0000;
        color: #fff;
        border-radius: 10px;
        padding: 2px 6px;
        position: absolute;
        top: -8px;
        right: -10px;
        font-size: 12px;
        transform: scale(0.8);
      }
      img{
        width: 24px;
        height: 22px;
      }
    }
  } 
}

.conversations-list-box{
  max-width: 200px;
  &>li{
    width: 100%;
    padding:5px 0;
    cursor: pointer;
    display: flex;
    border-bottom: 1px solid #bebebe;
    img.img-user {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }   
    .list-right{
      flex: 1;
      padding-left: 4px;
      .list-name {
        font-size: 12px;
      }
      .wcd-box {
        font-size: 12px;
        white-space: nowrap; /* 防止文本换行 */
        overflow: hidden; /* 隐藏超出部分 */
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        max-width: 140px; /* 设置一个宽度，可以根据需要调整 */
      }
    }
  }
  &>li:hover{
    opacity: 0.8;
  }
}


</style>
