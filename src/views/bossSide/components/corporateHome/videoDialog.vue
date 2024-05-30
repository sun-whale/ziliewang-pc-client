<template>
  <div class="container-zx">
    <el-dialog title="播放视频" :center="false" :visible.sync="video_dialogVisible" width="780px" :before-close="handleClose">
      <div class="video-box">
        <video :src="infoData.video_url" :controls="controls" webkit-playsinline="true" playsinline="true"
          x-webkit-airplay="allow"
          x5-playsinline
          @play="onPlayerPlay"
          @pause="onPlayerPause"
          autoplay="autoplay" 
          style="object-fit: fill;" 
          width="100%" 
          height="100%" 
          ref="video">
      </video>
      </div>
      
    </el-dialog>
  </div>
</template>

<script>

export default {

  components: {
  },
  props:{
    infoData: {
      type: Object,
      default() {
        return {
          data: {}
        }
      }
    },
    is_type:{
      type:String,
      default(){
        return {
          data:''
        }
      }
    }
  },
  data(){
    return{
      video_dialogVisible: false,
      controls:true,
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
   
    handleClose(done) {
      this.video_dialogVisible = false;
      this.infoData = {};
    },
    // 播放回调
    onPlayerPlay(player) {
        console.log("player play!", player);
    },

    // 暂停回调
    onPlayerPause(player) {

    },
  },
};
</script>

<style lang="scss" scoped>
  .container-zx /deep/ .el-dialog{
    min-width: 320px;
    height: 60%;
    min-height: 400px;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 0 !important;
    display: flex;
    flex-direction: column;
    .el-dialog__header{
      text-align: left;
      height: auto;
      .el-dialog__title{
        font-size: 16px;
        color: $g_textColor;
      }
    }
    .el-dialog__body{
      flex: 1;
      overflow: overlay;
      padding: 20px;
     .video-box{
      width: 100%;
      height: 100%;
     }
    }
  }
</style>
