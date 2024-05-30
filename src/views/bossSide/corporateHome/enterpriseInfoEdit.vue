<template>
  <div class="bossSide-container">
    <!-- 企业主页---信息修改页 -->
    <div class="m-box page-box">
      <el-tabs :tab-position="tabPosition" v-model="tabType" @tab-click="handleClick">
        <el-tab-pane label="企业基本信息" name="basic" >
          <companyBasic v-if="tabType == 'basic' "/>
        </el-tab-pane>
        <el-tab-pane label="企业介绍" name="introduction">
          <introduction v-if="tabType == 'introduction'" />
        </el-tab-pane>
        <el-tab-pane label="工作制度及福利" name="work_system">
          <workSystem  v-if="tabType == 'work_system'" />
        </el-tab-pane>
        <el-tab-pane label="企业视频介绍" name="show">
          <companyShow  v-if="tabType == 'show'" />
        </el-tab-pane>
        <el-tab-pane label="公司核心团队" name="team">
          <teamGenius  v-if="tabType == 'team'" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import companyShow from "../components/corporateHome/companyShow";
  import workSystem from "../components/corporateHome/workSystem";
  import teamGenius from "../components/corporateHome/teamGenius";
  import introduction from "../components/corporateHome/introduction";
  import companyBasic from "../components/corporateHome/companyBasic";

  export default {
    components: {
      companyShow,
      workSystem,
      teamGenius,
      introduction,
      companyBasic
    },
    data(){
      return {
        tabPosition: 'left', //标签一共有四个方向的设置 tabPosition="left|right|top|bottom"
        tabType:'basic',
        uploadData:{
          up_tag: 'business_license'
        },
        
      }
    },
    created(){
      this.tabType = this.$route.query.type;
    },
    methods:{
      handleClick(e){
        console.log(e)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-box{
    height: calc(100vh - 90px);
    padding-right: 1rem;
    & /deep/ .el-tabs--left{
      height: 100%;
    }
    & /deep/ .el-tabs__item:hover, & /deep/ .el-tabs__item.is-active{
      color: $g_color;
    }
    & /deep/ .el-tabs__item{
      padding: 0 30px 0 10px;
    }
    & /deep/ .el-tabs--left .el-tabs__item.is-left{
      font-size: 16px;
      font-weight: bold;
      &:nth-of-type(1){
        margin-top: 0;
      }
    }
    
    & /deep/ .el-tabs__content{
      overflow-y: auto;
      position: relative;
      height: 100%;
    }
  }
  .label-items-box{
    width: 100%;
    height: auto;
    font-size: 14px;
    padding-left: 10px;
    padding-right: 1rem;
    .box-title{
      margin-top: 10px;
      .title-1{
        font-size: 16px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 24px;
      }
      .title-2{
        margin-top: 8px;
        font-size: 14px;
        font-weight: 400;
        color: #4E5969;
        line-height: 22px;
      }
    }
    .items-box{
      width: 100%;
      margin-top: 16px;
      .title{
        font-size: 16px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 24px;
      }
      .info-box{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        &>div{
          margin-top: 10px;
          margin-right: 12px;
          width: 200px;
          height: 140px;
          position: relative;
        }

      }
    }
    & .el-input{
        width: 30rem;
      }
    & /deep/ .el-input.is-active .el-input__inner, & /deep/ .el-input__inner:focus{
        border-color: $g_bg;
      }
      /deep/ .el-form-item__content{
        line-height: 32px;
      }
      /deep/ .el-form-item__label{
        padding-right: 20px;
        line-height: 32px;
      }
      /deep/ .el-input__inner{
        height: 32px;
        line-height: 32px;
      }
      /deep/ .el-input__icon{
        line-height: 32px;
      }
    & /deep/ .el-form-item {
      margin-bottom: 22px;
      display: flex;
      align-items: center;
    }
    & /deep/ .el-form-item__content{
      margin: 0 !important;
      flex: 1;
      display: flex;
      align-items: center;
    }

  }
  .btn-box{
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding: 20px 40px;
   & .el-button{
    width: 114px;
    height: 40px;
    margin-right: 20px;
   }
   & /deep/ .el-button--primary{
    background-color:$g_bg;
    border-color: $g_color;
   }
 
  }
  .avatar-box{
    width: 128px;
    height: 128px;
    margin-left: 40px;
    position: relative;
    .add-img{
      display: block;
      width: 128px;
      height: 128px;
      border: none;
    }
    .avatar-uploader{
      width: 100%;
      height: 100%;
      &::v-deep .el-upload {
        width: 100%;
        height: 100%;
      }
      &::v-deep .el-upload-dragger{
        width: 100%;
        height: 100%;
      }
      &::v-deep .el-upload-dragger .el-icon-camera{
        font-size: 28px;
      }
    }
  }
</style>