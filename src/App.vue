<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      timer: null,
    };
  },
  destroyed() {
    // setToken('');
    localStorage.setItem("tag", ""); // 用户身份 user、人才端 company、企业端缓存
    // 清除缓存的权限菜单
    sessionStorage.removeItem("route");
  },
  mounted() {
    this.timer = setInterval(() => {
      let tag = localStorage.getItem("tag");
      if (tag == "user") {
        this.newestMessage();
      }
    }, 10000); // 10秒
  },
  methods: {
    newestMessage() {
      const that = this;
      clearInterval(this.timer);
      // 初始化io对象
      var socket = io("http://59.110.24.172:2120");
      // uid 可以为网站用户的uid
      var uid = localStorage.getItem("realUid"); // 单个用户
      // var uid = Math.floor(Math.random() * (10 - 1 + 1)) + 1; // 多个用户
      // 当socket连接后发送登录请求
      socket.on("connect", function () {
        socket.emit("login", uid);
      });
      // 后端推送来消息时
      socket.on("new_msg", function (msg) {
        console.log("收到消息：" + msg);
        that.$notify({
          title: "消息通知",
          message: msg,
          position: "bottom-right",
        });
      });
      // 后端推送来在线数据时
      socket.on("update_online_count", function (online_stat) {
        console.log(online_stat);
        // that.$notify({
        //   title: "消息通知",
        //   message: online_stat,
        //   position: "bottom-right",
        // });
      });
    },
  },
};
</script>
<style>
/*引入阿里字体图标*/
@import "./assets/iconfont/iconfont.css";
#app {
  min-height: 100%;
}
#screenShotContainer {
  position: fixed;
  z-index: 9999;
}
.content-box .el-dialog__header {
  display: none !important;
}
</style>
