<!-- 现场课堂 -->
<template>
  <div class="bossSide-container">
    <div class="center">
      <div class="live">
        <div id="dplayer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Hls from 'hls.js';
import DPlayer from 'dplayer';
export default {
  name: "Live",
  data(){
    return {
      playUrl:{}, // 播放地址
    }
  },
  methods: {
    // 播放地址
    getPlayUrl(f){
      let that = this;
      that.$axios.post('/api/live/play-url',{}).then( res =>{
        if(res.code == 0){
          that.playUrl = res.data;
          if( typeof f == 'function'){
            return f(res.data.hls_play_url)
          }
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 直播
    live(url){
      let that = this;
      const hls = new Hls();
      console.log(hls)
      const dp = new DPlayer({
        live:true,
        container: document.getElementById('dplayer'),
        video: {
          url: url,
          type: 'customHls',
          customType: {
            customHls: function (video, player) {
              const hls = new Hls();
              hls.loadSource(video.src);
              hls.attachMedia(video);
            },
          },
        },
      });
    }
  },
   mounted() {
  },
  created(){
   // 播放地址
   this.getPlayUrl(this.live);
  }
};
</script>
<style scoped>
#dplayer{
  width: 100%; 
  height: 500px;
}
</style>