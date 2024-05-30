<template>
  <div class="conversations" :style="`width: ${laiyuan == 'nav'? width + 'px':'100%'};height:${laiyuan == 'nav'? height + 'px':'100%'};`">
    <div class="conversation-list">
      <div class="conversation-list-container">
        <div class="conversation-list-content">

          <ConversationList :title_show="title_show" :infoData="profile.friend" :laiyuan="laiyuan" @chatLocation="chatLocation"/>
          
        </div>
      </div>
    </div>
    <!-- 聊天部分 开始-->
    <div class="contact-main">
      <PrivateChat :infoData="profile.friend"  v-if="is_chat"/>
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
    title_show:{
      type: String,
      default() {
        return ''
      }
    },
    width:{
      type: Number,
      default() {
        return 1000
      }
    },
    height:{
      type: Number,
      default() {
        return 500
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
      is_chat: false
    };
  },
  created() {
    if(JSON.stringify(this.infoData) != '{}'){
      this.chatLocation(this.infoData)
    }
  },
  
  methods: {
    
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
  width: 260px;
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
  padding: 10px 8px;
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
