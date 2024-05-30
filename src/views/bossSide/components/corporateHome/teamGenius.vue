<template>
  <div class="label-items-box">
    <!-- <div class="btn">
      <el-button type="primary" size="small" @click="addAccount">新增团队牛人</el-button>
    </div> -->
    <div class="box-title">
      <div class="title-1">公司核心团队</div>
      <div class="title-2"><span class="span-1">*</span>添加公司核心团队需要管理员在员工管理中进行员工标记</div>
      <div class="btn" v-if="userProfile.role_desc == 'BOSS'">
        <el-button type="primary" size="small" @click="goToStaffManagement">前往员工管理</el-button>
      </div>
    </div>
    <div class="guildListSection-box">
     <div class="guildList">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(item,index) in useDataList" :key="index">
          <div class="grid-content">
            <img class="user-img" :src="item.avatar?item.avatar:require('../../../../assets/image/bossSide/img-user.jpg')" alt="" />
            <p class="user-name">姓名：{{ item.staff_name }}</p>
            <p class="user-desc">职务：{{ item.role_desc }}</p>
            <p class="user-introduce">简介：{{ item.individual_resume?item.individual_resume:'暂无' }}</p>
            <div class="controls-box">
              <i class="el-icon-view" title="查看" @click="clickLike(item)"></i>
              <!-- <i class="el-icon-delete" title="移除"></i> -->
            </div>
          </div>
        </el-col>
        <el-empty el-empty description="暂无成员..." v-if="useDataList.length<=0"></el-empty>
      </el-row>
     </div>
    </div>


    <div class="details-box">
      <el-dialog title="详情" :center="false" :visible.sync="details_dialogVisible" width="680px" :before-close="details_handleClose">
        <div class="pc-preview-wrapper m-box">
          <!-- 个人信息 -->
          <div class="resume-item item-base">
            <div class="figure J_resume_baseMsg_headImgPreview">
              <img :src="infoData.avatar?infoData.avatar:require('../../../../assets/image/bossSide/img-user.jpg')" alt="" class="cur-default"/>
            </div>
            <div class="item-right item-right-1">
              <div style="text-align: left;">
                <h2 class="name">{{ infoData.staff_name?infoData.staff_name:'暂无' }}</h2>
                <!-- <div class="info-labels fr">
                  <span class="label-text">
                    <img src="../../../assets/image/Frame_1.png" alt="" class="fz fz-age"/>
                    <span>{{ infoData.basic_info?infoData.basic_info.birth_year_month:'30岁' }}</span>
                  </span>
                  <em class="vline"></em>
                  <span class="label-text">
                    <img src="../../../assets/image/Frame_2.png" alt="" class="fz fz-age"/>
                    <span>{{ infoData.basic_info?infoData.basic_info.begin_work_date:'暂无' }}</span>
                  </span>
                </div> -->
              </div>
              <div class="text selfDescription">职位：{{ infoData.role_desc?infoData.role_desc:'暂无' }}</div>
            </div>
          </div>
          <!-- 期望职位 -->
          <div class="resume-item">
            <h3 class="title">个人简介：</h3>
            <div class="item-right">
              {{ infoData.individual_resume?infoData.individual_resume:'暂无' }}
            </div>
          </div>
          
        </div>
      </el-dialog>
    </div>

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
      userProfile: {},
      infoData: {},
      useDataList: [],
      details_dialogVisible:false,
      addDialog:{
        visible: false
      }
    }
  },
  created(){
    // 获取员工列表
    this.getTableData();
  },
  mounted(){
  // 获取个人信息
  this.getUserProfile();
  },
  computed: {
    
  },
  methods: {
    details_handleClose(done) {
      this.details_dialogVisible = false;
    },
    // 获取员工列表
    getTableData() {
      let that = this;
      that.$axios.post('/api/staff/index',{
        is_core_team_member: 1
      }).then( res =>{
        if(res.code == 0){
          that.useDataList = res.data
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    addAccount() {
      this.addDialog.form = {};
      this.addDialog.visible = true;
    },
    goToStaffManagement(){
      this.$router.push({
        path:'/staffManagement',
      })
    },
    // 获取个人信息
    getUserProfile(){
      let that = this;
      that.$axios.post('/api/staff/profile',{}).then(res =>{
        if(res.code == 0){
          that.userProfile = res.data;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    // 点击查看详情
    clickLike(e){
      let that = this;
      let item = e;
      console.log(e)
      let id = e.id;
      that.$axios.post('/api/staff/profile',{
        uid: id
      }).then( res =>{
        if(res.code == 0){
          that.infoData = res.data;
          that.details_dialogVisible = true
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    }

  },
};
</script>

<style lang="scss" scoped>
  .btn-box{
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding: 20px 40px;
   &>.el-button{
    width: 114px;
    height: 40px;
    margin-right: 20px;
   }
   & /deep/ .el-button--primary{
    background-color:$g_bg;
    border-color: $g_color;
   }

  }
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
    // & .el-input{
    //     width: 30rem;
    //   }
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
  .btn {
    padding: 10px 0px;
    & /deep/ .el-button--primary{
      background: $g_bg;
      border-color: $g_bg;
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
  .guildListSection-box{
    width: 100%;
    min-width: 580px;
    padding: 0 20px;
    .guildList{
      /deep/ .el-col {
        border-radius: 4px;
      }
      /deep/ .grid-content {
        width: 100%;
        border-radius: 4px;
        min-height: 36px;
        box-shadow: 0 0 20px 0 #eaeaea;
        text-decoration: none;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 10px;
        margin-top: 14px;
        .user-img {
          width: 6.6rem;
          height: 6.6rem;
          border-radius: 50%;
          margin-bottom: 10px;
        }
        .user-name {
          color: $g_textColor;
          font-size: 15px;
          line-height: 28px;
          font-weight: bold;
          text-align: left;
        }
        .user-desc{
          color: $g_textColor;
          font-size: 15px;
          line-height: 28px;
          text-align: left;
        }
        .user-introduce{
          width: 100%;
          font-size: 14px;
          line-height: 23px;
          text-align: left;
          color: #666;
          display: flex;
          overflow:hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .controls-box{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 10px;
          &> i{
            margin-right: 2px;
            font-size: 16px;
            cursor: pointer;
            &:hover{
              color: $g_color;
            }
          }
        }
      }
    }
  }

  // 详情弹窗
  .details-box{
    & /deep/ .el-dialog{
      min-width: 320px;
      height: 75%;
      top: 50%;
      transform: translateY(-50%);
      margin-top: 0 !important;
      display: flex;
      flex-direction: column;
      .el-dialog__header{
        text-align: left;
        height: auto;
        .el-dialog__title{
          font-size: 16px;
          color: $g_textColor;
        }
      }
      .el-dialog__body{
      flex: 1;
      padding: 20px 30px 30px;
      // height: calc(100vh - 80px);
      overflow: overlay;
      padding: 20px;
      .pc-preview-wrapper{
        height: 100%;
        border-radius: 4px;
        border: 1px solid #e3e7ed;
        padding: 20px;
        color: #414a60;
        line-height: 26px;
        .resume-item{
          display: block;
          zoom: 1;
          position: relative;
          padding-top: 18px;
          overflow: hidden;
          &:first-child {
            padding-top: 0;
          }
          .figure {
            float: left;
          }
          .J_resume_baseMsg_headImgPreview {
            position: relative;
            z-index: 99;
          }
          img{
            width: 130px;
            height: 160px;
            border-radius: 6px;
            cursor: default;
          }
          .item-right {
            position: relative;
            padding-left: 140px;
            vertical-align: top;
            padding-top: 2px;
            font-size: 15px;
            h2.name{
              font-size: 18px;
              font-weight: bold;
              display: inline-block;
              position: relative;
            }
            .info-labels {
              font-size: 0;
              padding: 0;
              .label-text{
                display: inline-block;
                vertical-align: middle;
                font-size: 13px;
                img{
                  width: 14px;
                  height: 14px;
                }
              }
              .vline {
                margin: 0 0.9rem;
              }
              .fz {
                margin-left: 5px;
                display: inline-block;
                width: 16px;
                vertical-align: middle;
              }
            }
            .fr {
              float: right;
            }
            .text {
              color: #61687c;
              font-size: 13px;
              line-height: 26px;
              position: relative;
              word-wrap: break-word;
              word-break: break-all;
              white-space: pre-line;
              max-width: 600px;
              text-align: left;
            }
            
          }
          
          .title{
            float: left;
            font-size: 15px;
            color: #414a60;
            font-weight: 500;
            font-weight: bold;
          }
        }
      

      }
      
    }

    }
  }
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
      display: flex;
      align-items: center;
      span{
        color: red;
        font-weight: bold;
        font-size: 18px;
        padding-right: 4px;
      }
    }
  }
</style>
