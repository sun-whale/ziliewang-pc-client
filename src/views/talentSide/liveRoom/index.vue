<template>
  <div class="container-box">
    <div class="live-banner">
      <div class="container">
        <!-- 视频区域 开始 -->
        <div class="live-video" v-if="videoUrl">
          <div class="live-video-title">
            <h1>亚玛芬体育2024届管培生招募空中宣讲会</h1>
            <p>
              <img src="../../../assets/image/icon-wechat1.png" alt="" />
              <span>开播时间: 3月4日 19:00</span>
            </p>
          </div>
          <div class="live-video-cover" :style="`background-image:url(${liveInfo.image});`"></div>
        </div>
        <div class="live-video" v-else>
          <video-player @ready="handleReady" ref="videoPlayer" :options="playerOptions" class="videoPlayer-box"></video-player>
        </div>
        <!-- 视频区域 结束 -->
        <!-- 讨论区域 开始  -->
        <div class="live-im">222</div>
        <!-- 讨论区域 结束  -->
      </div>
    </div>
    <div class="live-desc">

      <div class="container">
        <div class="live-introduce">
          <h2>
            <span>直播介绍</span>
          </h2>
          <div class="live-introduce-desc">
            <div class="lecturer-slide">
              <h3><span>主讲人</span></h3>
              <div class="lecturer-card">
                <div class="lecturer-card-img"><img src="https://image0.lietou-static.com/img/65d870f529a2bb31d83ec59308u.jpg" alt=""></div>
                <div class="lecturer-card-desc">
                  <p class="lecturer-card-name"><strong>AMER SPORTS</strong></p>
                  <p class="lecturer-card-title">亚玛芬体育</p>
                </div>
              </div>
            </div>
            <div class="live-bright">
              <h3>本场亮点</h3>
              <div class="live-bright-desc">
                亚玛芬体育2024届管培生招募空中宣讲会，即将开场！

                解锁网申通关指南，助你顺利通关网申全流程！
                揭秘未来成长计划，看亚玛芬如何让你迅速成长~
                打开员工福利宝箱，带你了解亚玛芬的各项员工福利政策，提前感受在亚玛芬工作的满满幸福感~

                除此之外
                还有亚玛芬企业文化大揭秘
                嘉宾们的个人经验分享、职场故事放送
                参与直播间三轮互动问答
                还有亚玛芬定制礼品等你来抢！
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'liveList',
  components: {

  },
  data(){
    return{
      liveInfo:{image:'https://image0.lietou-static.com/img/65d86e09eb61c74ef2d7a4ab08u.jpg'},
      videoUrl:'',
      playerOptions: { // 播放地址
        // 视频 url
        sources: [{
          src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
          type: 'video/mp4'
        }],
        // 其他设置项
        autoplay: true, // 视频将在加载完成后自动播放
        controls: true,  //将显示控制条（播放/暂停、音量、进度条等控件）
        poster: 'https://image0.lietou-static.com/img/65d86e09eb61c74ef2d7a4ab08u.jpg',  // 设置视频封面
      }


    }
  },
  created(){
    console.log(this.$route.query)
  },
  computed: {
    
  },
  mounted(){
    // 通过 ref 访问 videoPlayer 组件实例
    // this.$refs.videoPlayer.play()
  },
  methods: {
    // 播放地址
    getPlayUrl(f){
      let that = this;
      that.$axios.post('/api/live/play-url',{}).then( res =>{
        if(res.code == 0){
          that.playUrl = res.data;
          // if( typeof f == 'function'){
          //   return f(res.data.hls_play_url)
          // }
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    //视频播放器准备好时触发
    handleReady(player){
      console.log(player)
    }
  },
};
</script>

<style lang="scss" scoped>
  .live-banner {
    height: 540px;
    margin-bottom: 40px;
    padding: 20px 0 40px 0;
    background: #2e2f3d no-repeat top;
  }
  .container {
    margin: 0 auto;
    padding: 0 8px;
    width: 1200px;
    margin-right: auto;
    margin-left: auto;
  }
  .live-video{
    position: relative;
    float: left;
    width: 784px;
    height: 460px;
    overflow: hidden;
    background-color: #000;
    border-radius: 4px;
    .live-video-title {
      position: absolute;
      z-index: 3;
      width: 100%;
      height: 90px;
      padding: 16px 16px 0 24px;
      color: #fff;
      background-color: rgba(0, 0, 0, .7);
      transition: transform .3s 3s;
      h1{
        margin: 0 0 8px;
        overflow: hidden;
        font-size: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
        line-height: 1.2;
      }
      &>p{
        display: flex;
        align-items: center;
        img{
          width: 18px;
          height: 18px;
        }
        span{
          padding-left: 10px;
        }
      }

    }
    .live-video-cover {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        background: 100% 100% / contain no-repeat;
    }

  }
  .live-im {
    position: relative;
    float: right;
    width: 385px;
    height: 460px;
    padding: 24px;
    background: rgba(0, 0, 0, .4) url(//concat.lietou-static.com/fe-www-pc/v6/images/bg.db4daf32.jpg) 0 0 / contain no-repeat;
    border-radius: 4px;
  }
  .live-introduce>h2 {
    margin: 0 0 20px;
    font-size: 22px;
  }
  .lecturer-slide {
    margin-bottom: 32px;
  }
  .lecturer-slide>h3 {
    margin: 0 0 10px;
    font-size: 18px;
  }
  .lecturer-card {
    overflow: hidden;
    width: 284px;
    height: 112px;
    margin: 0 8px;
    padding: 24px;
    background-color: #f8f8f8;
    border-radius: 4px;
    .lecturer-card-img {
      float: left;
      width: 64px;
      height: 64px;
      overflow: hidden;
      background-color: #fff;
      border-radius: 32px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .lecturer-card-desc {
      margin-left: 64px;
      padding-top: 9px;
      padding-left: 16px;
      line-height: 1.4;
      .lecturer-card-name {
        margin-bottom: 10px;
        font-size: 16px;
        strong {
          font-weight: 700;
        }
      }
      &>p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .lecturer-card-title {
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        white-space: normal;
      }
    }
  }
  .live-bright>h3 {
    margin: 0 0 8px;
    font-size: 20px;
  }
  .live-bright-desc {
    color: #666;
    font-size: 14px;
    line-height: 1.8;
    white-space: pre-wrap;
    word-break: break-all;
  } 
  .live-video /deep/ .video-player{
    width: 100%;
    height: 100%;
  }
  .live-video /deep/ .video-js{
    width: 100%;
    height: 100%;
  }
  .live-video /deep/ .vjs-big-play-button{
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>
