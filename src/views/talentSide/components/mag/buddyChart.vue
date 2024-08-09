<template>
  <div class="conversations" :style="`width: 100%;height:100%;`">
    <div class="conversation-list" :class=" is_show ? 'show' : '' " >
      <div class="conversation-list-container">
        <div class="conversation-list-content" :style="`padding: ${is_show ?'10px 8px':'0'}`">

          <ConversationList :infoData="profile.friend" :laiyuan="laiyuan" @chatLocation="chatLocation"/>
          
        </div>
      </div>
      <img src="../../../../assets/image/icon-shouqi.png" alt="收起" class="icon-shouqi" v-if="is_show" @click="clickiconShow"/>
      <img src="../../../../assets/image/icon-zhankai.png" alt="展开" class="icon-zhankai" v-if="!is_show" @click="clickiconShow"/>
    </div>
    <!-- 聊天部分 开始-->
    <div class="contact-main">
      <PrivateChat :infoData="profile.friend" ref="privateChat" v-if="is_chat"/>
    </div>
    <!-- 聊天部分 结束-->
  </div>
</template>

<script>
import PrivateChat from './PrivateChat.vue';
import ConversationList from './conversationList.vue';
export default {
  name: 'Conversations',
  components: { 
    PrivateChat,
    ConversationList
  },
  props:{
    infoData:{
        type: Object,
        default() {
          return {}
        }
      },
    laiyuan:{
      type: String,
      default() {
        return ''
      }
    },
  },
  data() {
    return {
      profile: {
        friend: null,
      },
      is_chat: false,
      is_show: true
    };
  },
  created() {
    if(JSON.stringify(this.infoData) != '{}'){
      this.chatLocation(this.infoData)
    }
    
  },
  
  methods: {
    clickiconShow(){
      this.is_show = !this.is_show;
    },
    chatLocation (conversation) {
      this.profile.friend = conversation;
      console.log(this.profile.friend)
      this.is_chat = false;
      this.$nextTick( () => {
        this.is_chat = true;
      })
    }
  },
};
</script>

<style scoped>
.conversations {
  width: 100%;
  position: relative;
  display: flex;
  color: #333333;
}
.conversation-list {
  width: 0;
  position: relative;
}
.conversation-list.show{
  width: 260px;
}

.icon-shouqi{
  width: 30px;
  height: 46px;
  position: absolute;
  top: 0;
  right: -10px;
  cursor: pointer;
  z-index: 100;
}
.icon-zhankai{
  width: 30px;
  height: 46px;
  position: absolute;
  top: 0;
  left: -10px;
  cursor: pointer;
  z-index: 100;
}
.conversation-list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-right: #dbd6d6 1px solid;
}

.conversation-list-content {
  flex: 1;
  overflow-y: auto;
  padding-top: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.conversation-list-content::-webkit-scrollbar {
  display: none;
}
.contact-main {
  flex: 1;
  background: #FFFFFF;
}
</style>
