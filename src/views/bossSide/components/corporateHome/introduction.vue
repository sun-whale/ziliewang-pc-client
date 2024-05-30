<template>
  <div class="label-items-box">
    <el-form :model="qyjs_ruleForm" :rules="qyjs_rules" ref="qyjs_ruleForm" label-width="180px" class="demo-ruleForm">
     
      <el-form-item label="成立时间" prop="establishment_date">
        <el-date-picker
          v-model="qyjs_ruleForm.establishment_date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="成立时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="企业官网" prop="company_official_website">
        <el-input v-model="qyjs_ruleForm.company_official_website" placeholder="企业官网"></el-input>
      </el-form-item>
      <el-form-item label="核心产品" prop="product">
        <el-input v-model="qyjs_ruleForm.product" placeholder="核心产品"></el-input>
      </el-form-item>
      <el-form-item label="获奖名称/获奖资讯链接" prop="reward_link">
        <el-input v-model="qyjs_ruleForm.reward_link" placeholder="获奖名称/获奖资讯链接"></el-input>
      </el-form-item>
      <el-form-item label="基本介绍" prop="introduction">
        <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 100}" v-model="qyjs_ruleForm.introduction"  placeholder="基本介绍"></el-input>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

export default {
  components: {
  },
  props:{
    data:{
      type: Object,
      default() {
          return {}
        }
    }
  },
  data(){
    return{
      qyjs_ruleForm:{ // 企业介绍--数据
        introduction: '', // 基本信息介绍
        establishment_date:'', // 成立时间
        company_official_website:'', // 企业官网
        product:'', // 核心产品
        reward_link:'', // 获奖名称/获奖资讯链接
      },
      qyjs_rules: {// 企业介绍-- 必填提示

      },
    }
  },
  created(){
    // 获取信息
    this.getDetail();
  },
  mounted(){
 
  },
  computed: {
    
  },
  methods: {
    // 获取信息
    getDetail(){
      let that = this;
      that.$axios.post('/api/company/introduction/detail',{}).then( res =>{
        if(res.code == 0){
          that.qyjs_ruleForm.introduction = res.data.introduction;
          that.qyjs_ruleForm.establishment_date = res.data.establishment_date;
          that.qyjs_ruleForm.company_official_website = res.data.company_official_website;
          that.qyjs_ruleForm.reward_link = res.data.reward_link;
          that.qyjs_ruleForm.product = res.data.product;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch( e=>{
        console.log(e)
      })
    },
    // 点击发布
    submitForm(){
      let that = this;
      let p = {
        introduction: that.qyjs_ruleForm.introduction,
        establishment_date: that.qyjs_ruleForm.establishment_date,
        company_official_website: that.qyjs_ruleForm.company_official_website,
        product: that.qyjs_ruleForm.product,
        reward_link: that.qyjs_ruleForm.reward_link,
      };
      that.$axios.post('/api/company/introduction/create',p).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message: '保存成功!'
          })
          that.getDetail();
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch( e=>{
        console.log(e)
      })
    },

  },
};
</script>

<style lang="scss" scoped>
  .label-items-box{
    width: 100%;
    height: auto;
    font-size: 14px;
    padding-left: 10px;
    padding-right: 1rem;

    .items-box{
      width: 100%;
      margin-top: 20px;
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
          
          .avatar-uploader{
            width: 100%;
            height: 100%;
            & /deep/ .el-upload {
              width: 100%;
              height: 100%;
            }
            & /deep/ .el-upload-dragger{
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .file-tips{
                margin-top: 6px;
                font-size: 14px;
                font-weight: 400;
                color: #86909C;
                line-height: 22px;
              }
            }
            & /deep/ .el-upload-dragger .el-icon-camera{
              font-size: 28px;
            }
          }


        }

      }
    }
    & .el-input,& .el-textarea{
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
      align-items: flex-start !important;
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
</style>
