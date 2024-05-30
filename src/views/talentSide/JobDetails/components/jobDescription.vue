<template>
  <!-- 职位介绍 -->
  <div class="div-box">
    <div class="title">职位介绍</div>
    <div class="title-subtag">
      <span v-for="(item,index) in infoData.job_benefits" :key="index">{{ item }}</span>
    </div>
    <div class="info-box">
      <!-- <div class="title">职责描述:</div>
      <div class="text">
        1、严格按照公司规定的财务制度和审批流程开展日常财务工作<br /> 
      </div>
      <div class="title">任职要求:</div>
      <div class="text">
        1、大学本科及以上学历，会计、财务管理等相关专业，持有会计资格证书<br />
      </div> -->
      {{ infoData.position_desc }}
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
    .title-subtag{
      margin-top: 10px;
      span{
        font-size: 12px;
        font-weight: 400;
        color: #1D2129;
        line-height: 20px;
        padding: 0.3rem 0.6rem;
        border: 1px solid #E5E6EB;
        border-radius: 4px;
        background: #F7F8FA;
        margin-left: 8px;
        &:nth-of-type(1){
          margin-left: 0;
        }
      }
    }
    .info-box{
      width: 100%;
      margin-left: 1rem;
      margin-top: 16px;
      color: $g_textColor;
      font-size: 14px;
      font-weight: 400;
      line-height: 28px;
      .title{
        margin-top: 1.3rem;
      }
    }
  }
</style>