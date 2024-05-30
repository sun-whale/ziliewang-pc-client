<template>
  <!-- 公司信息 -->
  <div class="div-box">
    <div class="title">
     <span class="title-span">公司信息</span> 
      <div class="right zc-box" @click="clickCompany">
        <span>更多</span>
        <img src="../../../../assets/image/bossSide/right.png" alt="">
      </div>
    </div>
    <div class="info-name-box">
      <img :src="infoData.logo" alt="" class="com-img"/>
      <div class="name-box">
        <div class="com-name" @click="clickCompany">{{ infoData.company_name }}</div>
        <div class="com-job-num">在招职位<span>{{ infoData.recruit_position_num }}</span>个</div>
      </div>
    </div>
    <div class="info-2-box">
      <div>
        <span class="span-t">企业行业:</span>
        <span class="span-i">{{ infoData.industry_requirement }}/{{ infoData.industry }}</span>
      </div>
      <div>
        <span class="span-t">人数规模:</span>
        <span class="span-i">{{ infoData.company_scale }}</span>
      </div>
      <div>
        <span class="span-t">职位地址:</span>
        <span class="span-i">{{ infoData.company_register_address }}</span>
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
    },
  },
  methods:{
    // 点击公司名称
    clickCompany(){
      this.$router.push({
        path:'/companyDetails',
        query:{
          id: this.infoData.id
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .div-box{
    width: 100%;
    &>.title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-span{
        font-size: 16px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 1.2rem;
      }
      .right{
        display: flex;
        align-items: center;
        cursor: pointer;
        img{
          width: 12.5px;
          height: 12.5px;
          margin-top: -4px;
        }
        span{
          color: $g_color;
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
          padding-left: 6px;
        }
      }
      .zc-box{
        img {
          margin-top: -2px;
          margin-left: 4px;
        }
        span{
          color: #4E5969;
        }
      }
    }
   
    .info-name-box{
      width: 100%;
      display: flex;
      margin-top: 10px;
      .com-img{
        width: 54px;
        height: 54px;
      }
      .name-box{
        flex: 1;
        padding-left: 10px;
        .com-name{
          font-size: 14px;
          font-weight: 400;
          color: $g_textColor;
          line-height: 22px;
          cursor: pointer;
          &:hover{
            color: $g_color;    
          }
        }
        .com-job-num{
          font-size: 14px;
          font-weight: 400;
          color: #86909C;
          line-height: 22px;
        }
      }
    }
    .info-2-box{
      margin-top: 5px;
      &>div{
        margin-top: 4px;
        display: flex;
        font-size: 13px;
        .span-t{
          width: auto;
          font-weight: 400;
          color: $g_textColor;
          line-height: 24px;
        }
        .span-i{
          flex: 1;
          font-weight: 400;
          color: #86909C;
          line-height: 24px;
          padding-left: 10px;
        }
      }
    }
  }
</style>
