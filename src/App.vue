<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  destroyed(){
    // setToken('');
      localStorage.setItem('tag', ''); // 用户身份 user、人才端 company、企业端缓存
      // 清除缓存的权限菜单
      sessionStorage.removeItem("route")
  }
};
</script>
<style>
  /*引入阿里字体图标*/
  @import './assets/iconfont/iconfont.css';
 #app{
  min-height: 100%;
 }
 #screenShotContainer{
  position: fixed;
  z-index: 9999;
 }
 .content-box .el-dialog__header{
  display: none !important;
 }
</style>
