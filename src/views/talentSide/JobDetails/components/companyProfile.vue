<template>
  <!-- 公司简介 -->
  <div class="div-box">
    <div class="title">公司简介</div>
    <div class="info-box">
      <div class="text">
        {{ infoData?infoData.introduction:"暂无" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    infoData:{
      type: Object,
      default() {
          return {}
        }
    }
  },
}
</script>

<style lang="scss" scoped>
  .div-box{
    width: 100%;
    &>.title{
      font-size: 16px;
      font-weight: bold;
      color: $g_textColor;
      line-height: 1.2rem;
    }
    .info-box{
      width: 100%;
      margin-left: 1rem;
      margin-top: 1rem;
      .text{
        color: $g_textColor;
        font-size: 14px;
        font-weight: 400;
        line-height: 28px;
      }
    }
  }
</style>