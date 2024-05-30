<template>
  <!-- 好友列表 开始 -->
  <div class="interaction-box">
    <magInfo /> 
  </div>
</template>

<script>
import magInfo from '../components/mag/magInfo.vue';

export default {
  name: 'myGoodFriend',
  components: {
    magInfo,
  },
  data(){
    return{

    }
  },
  computed: {
    
  },
  mounted(){

  },
  created(){
    
  },
  methods: {
   
  },
};
</script>

<style lang="scss" scoped>

.interaction-box{
    width: 1200px;
    height: calc(100vh - 120px);
    margin: 0 auto;
  }


  @media screen and (max-width: 1366px) {
    .interaction-box{
      width: 850px;
    }
  }
</style>
