<template>
  <div class="container">
    <div class="assess-box" v-for="(item, index) in assessList" :key="index">
      <div class="assess-title">
        <p>
          <span>{{ item.states == "0" ? "视频" : "录音" }}</span>
          {{ index + 1 }}、{{ item.title }}
        </p>
        <el-button
          class="assess-begin"
          @click="toggleCamera(item.states, index)"
          size="small"
          >{{
            item.recordedUrl
              ? "重新录制"
              : item.cameraActive
              ? "结束录制"
              : "开始录制"
          }}</el-button
        >
      </div>
      <video
        class="finished-video"
        v-if="item.recordedUrl && item.states == '0'"
        :src="item.recordedUrl"
        controls
      ></video>
      <audio
        controls
        class="finished-audio"
        v-if="item.recordedUrl && item.states == '1'"
        :src="item.recordedUrl"
      ></audio>
      <p v-if="item.cameraActive" class="tip">正在录制中...</p>
    </div>
    <!-- 视频展示区域 -->
    <video class="video" ref="videoElement" autoplay></video>

    <el-button type="primary" class="topic-sub">提交</el-button>
  </div>
</template>
<script>
export default {
  name: "interviewAssess",
  data() {
    return {
      assessList: [
        {
          title: "请用视频方式简单做个自我介绍",
          states: "0",
          cameraActive: false,
          recordedUrl: "",
        },
        {
          title: "请用录音方式简单做个自我介绍",
          states: "1",
          cameraActive: false,
          recordedUrl: "",
        },
      ],
      stream: null,
      videoElement: null,
      mediaRecorder: null,
      chunks: [],
      getUserMedia: {
        video: false,
        audio: true,
      },
    };
  },
  mounted() {
    // 初始化录制数据
    this.videoElement = this.$refs.videoElement;
  },
  methods: {
    toggleCamera(type, index) {
      const that = this;
      this.assessList[index].recordedUrl = "";
      // 判断是录音还是视频
      if (type == 0) {
        this.getUserMedia.video = true;
      } else {
        this.getUserMedia.video = false;
      }
      if (!this.assessList[index].cameraActive) {
        navigator.mediaDevices
          .getUserMedia(this.getUserMedia)
          .then((stream) => {
            this.stream = stream;
            this.videoElement.srcObject = stream;
            this.assessList[index].cameraActive = true;
            setTimeout(() => {
              that.startRecording(index);
            }, 500);
          })
          .catch((error) => {
            console.error("无法打开摄像头:", error);
          });
      } else {
        that.stopRecording();
        setTimeout(() => {
          that.videoElement.srcObject = null;
          that.stream.getTracks().forEach((track) => {
            track.stop();
          });
          that.assessList[index].cameraActive = false;
        }, 500);
      }
    },
    // 开始录制
    startRecording(index) {
      console.log("开始录制");
      if (MediaRecorder.isTypeSupported("video/webm")) {
        this.chunks = [];
        this.mediaRecorder = new MediaRecorder(this.stream, {
          mimeType: "video/webm",
        });
        this.mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            this.chunks.push(e.data);
          }
        };
        this.mediaRecorder.onstop = () => {
          const recordedBlob = new Blob(this.chunks, { type: "video/webm" });
          this.chunks = [];
          this.assessList[index].recordedUrl =
            URL.createObjectURL(recordedBlob);
          //   this.recordedVideoUrl = URL.createObjectURL(recordedBlob);
        };
        this.mediaRecorder.start();
        console.log("开始录制成功");
      } else {
        console.error("不支持录制视频");
      }
    },
    // 结束录制
    stopRecording() {
      this.mediaRecorder.stop();
      this.mediaRecorder = null;
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding-top: 20px;
}
.assess-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  p {
    display: flex;
    align-items: center;
  }
  span {
    color: #1ec5d8;
    font-size: 12px;
    padding: 4px 6px;
    margin-right: 8px;
    border: 1px solid #1ec5d8;
  }

  .assess-begin {
    color: #fff;
    margin-right: 20px;
    background-color: #1ec5d8;
    border: 1px solid #1ec5d8;
  }
}
.video {
  width: 200px;
  height: 180px;
  position: fixed;
  top: 70px;
  left: 20px;
  z-index: 9;
}
.finished-video {
  width: 350px;
  height: auto;
}
.finished-video,
.finished-audio {
  margin-bottom: 20px;
}
.tip {
  text-align: center;
  font-size: 14px;
  color: #999;
}
.topic-sub {
  width: 200px;
  display: flex;
  justify-content: center;
  color: #fff;
  margin: 0 auto;
  background-color: #1ec5d8;
  border: 1px solid #1ec5d8;
}
</style>