<template>
  <div class="label-items-box">
    <el-form :model="gzzd_ruleForm" :rules="gzzd_rules" ref="gzzd_ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="加班情况" prop="work_overtime">
        <el-select v-model="gzzd_ruleForm.work_overtime" placeholder="加班情况">
          <el-option
            v-for="item in overtimeList"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作时间" prop="work_time">
        <el-input v-model="gzzd_ruleForm.work_time" placeholder="工作时间"></el-input>
      </el-form-item>
      <el-form-item label="休息时间" prop="time_out_time">
        <el-input v-model="gzzd_ruleForm.time_out_time" placeholder="休息时间"></el-input>
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
      gzzd_ruleForm:{ // 工作制度及福利--数据
        work_overtime:'',  //加班情况
        work_time:'', // 工作时间
        time_out_time:'', // 休息时间
      },
      gzzd_rules: {// 工作制度及福利-- 必填提示

      },
      overtimeList: [
        {id:1,name:'不加班'},
        {id:2,name:'偶尔加班'},
        {id:3,name:'加班'},
      ]
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
      that.$axios.post('/api/company/work/institution/detail',{}).then( res =>{
        if(res.code == 0){
          that.gzzd_ruleForm.work_overtime =  res.data.work_overtime;
          that.gzzd_ruleForm.work_time =  res.data.work_time;
          that.gzzd_ruleForm.time_out_time =  res.data.time_out_time;
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
        work_overtime: that.gzzd_ruleForm.work_overtime,
        work_time: that.gzzd_ruleForm.work_time,
        time_out_time: that.gzzd_ruleForm.time_out_time,
      };
  
      that.$axios.post('/api/company/work/institution/create',p).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message:'保存成功!'
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
</style>
