<template>
  <div class="bossSide-container">
    <!-- 我的面试安排页 -->
    <div class="tab-box">
      <div class="tab-left">
        <div :class="tabStatus == 1?'hover-items':'' " @click="clickStatus(1)">待接受</div>
        <div :class="tabStatus == 2?'hover-items':'' " @click="clickStatus(2)">不接受</div>
        <div :class="tabStatus == 3?'hover-items':'' " @click="clickStatus(3)">待参加</div>
        <div :class="tabStatus == 4?'hover-items':'' " @click="clickStatus(4)">未参加</div>
        <div :class="tabStatus == 5?'hover-items':'' " @click="clickStatus(5)">已超时</div>
        <div :class="tabStatus == 6?'hover-items':'' " @click="clickStatus(6)">已完成</div>
        <div :class="tabStatus == 7?'hover-items':'' " @click="clickStatus(7)">不合适</div>
      </div>
    </div>

    <div class="m-20 m-box inquire-box">
      <div class="inquire-left-box">
        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" label-suffix=":">
          <el-form-item label="面试方式" prop="interview_method">
            <el-select v-model="ruleForm.interview_method" placeholder="面试方式">
              <el-option label="不限" value="不限"></el-option>
              <el-option label="线上" value="线上"></el-option>
              <el-option label="线下" value="线下"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="面试职位" prop="interview_position">
            <el-select v-model="ruleForm.interview_position" placeholder="面试职位">
              <el-option label="不限" value="不限"></el-option>
              <el-option label="前端" value="前端"></el-option>
              <el-option label="后端" value="后端"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面试者" prop="interviewee">
            <el-select v-model="ruleForm.interviewee" placeholder="面试者">
              <el-option label="不限" value="不限"></el-option>
              <el-option :label="item.publish_name" :value="item.publish_name" v-for="(item,index) in jobList" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="inquire-right-box">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm">搜索</el-button>
      </div>
    </div>

    <div class="m-box margin-top-20 tableData-box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 + (tableDataPage.page - 1) * tableDataPage.size }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="users.real_name" label="投递人"></el-table-column>
        <el-table-column prop="interview_time" label="开始时间"></el-table-column>
        <el-table-column prop="end_time_text" label="结束时间"></el-table-column>
        <el-table-column prop="d" label="面试方式">
          <template slot-scope="scope">
            <span>{{ scope.row.type == 1?'线上':'线下' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="companyposition.position_name" label="面试职位"></el-table-column>
        <el-table-column prop="staff" label="面试者"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="blue" @click.stop="clickViewDetails(scope.row)">查看详情</span>
            <!-- <span class="blue">导出</span> -->
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 查看详情----弹窗 -->
    <div class="container-zx">
      <el-dialog title="面试信息" :center="false" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
        <div class="pc-preview-wrapper">
          <div class="talent-box">

            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">投递人：</div>
                <div class="items-text">{{ infoData.users?infoData.users.real_name:'' }}</div>
              </div>
              <div class="items items-r" v-if="infoData">
                <span class="label-text">
                  <img src="../../../assets/image/Frame_1.png" alt="" class="fz fz-age"/>
                  <span>{{ infoData.users?infoData.users.birth_year_month:'20岁' }}</span>
                </span>
                <em class="vline"></em>
                <span class="label-text">
                  <img src="../../../assets/image/Frame_2.png" alt="" class="fz fz-age"/>
                  <span>{{ infoData.users?infoData.users.begin_work_date:'暂无' }}</span>
                </span>
                <em class="vline"></em>
                <span class="label-text">
                  <img src="../../../assets/image/icon-qzzt-1.png" alt="" class="fz fz-age"/>
                  <span>{{ infoData.users?infoData.users.work_status_desc:'在职不考虑' }}</span>
                </span>
              </div>
            </div>
            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">联系电话：</div>
                <div class="items-text">{{infoData?infoData.phone:''}}</div>
              </div>
            </div>
            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">面试岗位：</div>
                <div class="items-text">{{infoData.companyposition?infoData.companyposition.position_name:''}}</div>
              </div>
            </div>

            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">面试时间：</div>
                <div class="items-text">{{infoData?infoData.interview_time:''}}</div>
              </div>
            </div>

            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">面试官：</div>
                <div class="items-text">{{infoData?infoData.staff:''}}</div>
              </div>
            </div>

            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">备注：</div>
                <div class="items-text">{{infoData?infoData.remark:''}}</div>
              </div>
            </div>

          </div>

        </div>
      </el-dialog>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabStatus: 1,
      ruleForm:{
        interview_method:'不限',
        interview_position:'不限',
        interviewee:'',
        contact_person:'',
      },
      tableData:[],
      tableDataPage: {
        page: 1,
        size: 10,
        total: 0
      },
      dialogVisible:false,
      infoData:{},
      jobList: [],
    }
  },
  mounted(){
    this.getSysMsgList();
  },
  created(){
    this.getinfoList();
  },
  methods:{
    handleClose(done) {
      this.dialogVisible = false;
    },
    // 重置
    resetForm(){

    },
    // 搜索
    submitForm(){

    },
    clickStatus(n){
      this.tabStatus = n;
      this.getSysMsgList();
    },
    // 获取聊天列表
    getSysMsgList(){
      let that = this;
      that.$axios.post('/api/company-interview/index',{
        status: that.tabStatus
      }).then( res =>{
        if(res.code == 0){
          that.tableData = res.data;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },

    // 点击查看详情
    clickViewDetails(i){
      console.log(i)
      this.infoData = i;
      this.dialogVisible = true;
    },
    getinfoList(){
      let that = this;
      that.$axios.post('/api/company-position/list',{}).then( res =>{
        if(res.code == 0){
          that.jobList = res.data
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
  
    
  }
}
</script>

<style lang="scss" scoped>
  .tab-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tab-left{
      width: auto;
      display: flex;
      align-items: center;
      &>div{
        width: auto;
        line-height: 32px;
        margin-right: 15px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #86909CFF;
        cursor: pointer;
      }
      &>div.hover-items{
        color: $g_textColor;
        font-weight: bold;
      }
    }
    .tab-right{
      width: 124px;
      line-height: 32px;
      color: #4E5969;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img{
        width: 14px;
        height: 14px;
      }
      span{
        font-size: 14px;
        line-height: 22px;
        padding-left: 4px;
      }
    }
  }
  .inquire-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .inquire-left-box{
      flex: 1;
      .demo-ruleForm{
        width: 100%;
        display: flex;
        align-items: center;
        /deep/ .el-form-item{
          margin: 0;
          padding-left: 10px;
          display: flex;
          &:nth-of-type(1){
            padding-left: 0;
          }
          .el-form-item__content{
          line-height: 32px;
          }
          .el-form-item__label{
            line-height: 32px;
          }
          .el-input__inner{
            height: 32px;
            line-height: 32px;
          }
          .el-input__icon{
            line-height: 32px;
          }
        }
      }
    }
    .inquire-right-box{
      width: auto;
      & /deep/ .el-button{
        height: 32px;
        line-height: 32px;
        padding: 0 20px;
      }
      & /deep/ .el-button--primary{
        background-color:$g_bg;
        border-color: $g_color;
      }
    }
  }
  .tableData-box{

    .blue {
      color: $g_color;
      cursor: pointer;
    }
    /deep/ .has-gutter tr{
      background: #F7F9FC !important;
    }
  }
  .container-zx /deep/ .el-dialog{
    min-width: 320px;
    max-height: 500px;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 0 !important;
    .el-dialog__header{
      text-align: left;
      .el-dialog__title{
        font-size: 16px;
        color: $g_textColor;
      }
    }
    .el-dialog__body{
      padding: 20px 30px 30px;
      height: calc(100vh - 128px);
      overflow: overlay;
      padding: 10px;
      .pc-preview-wrapper{
        border-radius: 4px;
        padding: 10px 20px;
        color: $g_textColor;
        line-height: 26px;
        
        .box-items{
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-top: 10px;
          &:nth-of-type(1){
            margin-top: 0;
          }
          .items{
            flex: 1;
            display: flex;
            align-items: center;
            .items-label{
              width: 80px;
              font-size: 15px;
              font-weight: bold;
              text-align: right;
            }
            .items-text{
              font-size: 14px;
              color: #414a60;
              padding-left: 4px;
            }
            
          }
          .items-l{
            justify-content: flex-start;
          }
          .items-r{
            justify-content: flex-end;
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
        }
      }
    }
  }
</style>