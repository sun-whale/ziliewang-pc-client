<template>
  <div class="block-sidebar" v-if="sidebar_show">
    <div class="block-sidebar-item iconfont">
      <button class="CB-kJkihA" @click="sidebarChatBtn">
        <img src="../../../assets/image/icon-chatMessage.png" alt="">
        <span class="corner-mark-box" v-if="unreadTotal">{{ unreadTotal }}</span>
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
    sidebarChatBtn(){
      this.$bus.$emit( 'talentSide_receiveParams', {type:'sidebar',laiyuan:'rightSidebar',infoData:this.infoData } );
      this.$store.dispatch('user/actions_sidebarShow',false);// vuex
    }
    
    
  
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

</style>
