<template>
  <div class="bossSide-container myRecruitmentData">
    <!-- 我的招聘数据页 -->
    <div class="title-box">招聘数据</div>
    <div class="m-box margin-top-20 zp-data">
      <div class="tab-box">
        <div class="left-box">
          <img src="../../../assets/image/bossSide/myRecruitment-search.png" alt="" />
          <span class="title">我的招聘数据总览</span>
          <div class="item-content">
            <el-date-picker
              v-model="begin_date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始时间">
            </el-date-picker>
            <span class="span-line"> 至 </span>
            <el-date-picker
              v-model="end_date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束时间">
            </el-date-picker>
            <el-button type="primary" size="small" @click="clickSearhButton">搜索</el-button>
          </div>
        </div>
        <div class="right-box"></div>
      </div>

      <div class="dataInfo-box">

        <div>
          <div class="title">
            <span>简历浏览量</span>
            <!-- <img src="../../../assets/image/bossSide/question-circle.png" alt=""> -->
          </div>
          <div class="num" @click="goToPages('/resumeViewNum')">{{ company_recruitment_count.resume_view_num?company_recruitment_count.resume_view_num:0 }}</div>
          <div class="sm-box">
            <img src="../../../assets/image/bossSide/caret-right.png" alt="">
            <span class="sm-n">0</span>
            <span class="sm-t">相比上周期</span>
          </div>
        </div>
        <div>
          <div class="title">
            <span>聊天发起量</span>
            <!-- <img src="../../../assets/image/bossSide/question-circle.png" alt=""> -->
          </div>
          <div class="num" @click="goToPages('/interaction')">{{ company_recruitment_count.chat_initiate_num?company_recruitment_count.chat_initiate_num:0 }}</div>
          <div class="sm-box">
            <img src="../../../assets/image/bossSide/caret-right.png" alt="">
            <span class="sm-n">0</span>
            <span class="sm-t">相比上周期</span>
          </div>
        </div>
        <div>
          <div class="title">
            <span>回复处理量</span>
            <!-- <img src="../../../assets/image/bossSide/question-circle.png" alt=""> -->
          </div>
          <div class="num" @click="goToPages('/interaction')">{{ company_recruitment_count.reply_num?company_recruitment_count.reply_num:0 }}</div>
          <div class="sm-box">
            <img src="../../../assets/image/bossSide/caret-right.png" alt="">
            <span class="sm-n">0</span>
            <span class="sm-t">相比上周期</span>
          </div>
        </div>
        <div>
          <div class="title">
            <span>虚拟号码获取量</span>
            <!-- <img src="../../../assets/image/bossSide/question-circle.png" alt=""> -->
          </div>
          <div class="num" @click="goToPages('/numberAcquisitionNum')">{{ company_recruitment_count.get_phone_num?company_recruitment_count.get_phone_num:0 }}</div>
          <div class="sm-box">
            <img src="../../../assets/image/bossSide/caret-right.png" alt="">
            <span class="sm-n">0</span>
            <span class="sm-t">相比上周期</span>
          </div>
        </div>
        <!-- <div>
          <div class="title">
            <span>互动量</span>
            <img src="../../../assets/image/bossSide/question-circle.png" alt="">
          </div>
          <div class="num">0</div>
          <div class="sm-box">
            <img src="../../../assets/image/bossSide/caret-right.png" alt="">
            <span class="sm-n">0</span>
            <span class="sm-t">相比上周期</span>
          </div>
        </div> -->
        <div>
          <div class="title">
            <span>面试邀约量</span>
            <!-- <img src="../../../assets/image/bossSide/question-circle.png" alt=""> -->
          </div>
          <div class="num" @click="goToPages('/myInterviewSchedule')">{{company_recruitment_count.interview_invite_num?company_recruitment_count.interview_invite_num:0}}</div>
          <div class="sm-box">
            <img src="../../../assets/image/bossSide/caret-right.png" alt="">
            <span class="sm-n">0</span>
            <span class="sm-t">相比上周期</span>
          </div>
        </div>

        <div>
          <div class="title">
            <span>Agent职位</span>
            <!-- <img src="../../../assets/image/bossSide/question-circle.png" alt=""> -->
          </div>
          <div class="num" @click="goToPages('/agencyRecruitment')">{{company_recruitment_count.interview_invite_num?company_recruitment_count.interview_invite_num:0}}</div>
          <div class="sm-box">
            <img src="../../../assets/image/bossSide/caret-right.png" alt="">
            <span class="sm-n">0</span>
            <span class="sm-t">相比上周期</span>
          </div>
        </div>

      </div>
    </div>
    <div class="m-box margin-top-20 zxzw-data">
      <div class="tab-box">
        <div class="left-box">
          <img src="../../../assets/image/bossSide/frame-22.png" alt="" />
          <span class="title">在线职位数据</span>
          <!-- <span class="title-show">数据周期: 2023.03.30 ~ 2023.04.05</span> -->
        </div>
        <div class="right-box"></div>
      </div>

      <div class="block">
        <div style="flex: 1;">
          <div class="input-box">
            <span>关键词</span>
            <el-input placeholder="请输入职位名称/工作城市"></el-input>
          </div>
        </div>
        
        
      </div>

      <div class="tableData-box margin-top-20">    
        <el-table :data="company_recruitment_list" style="width: 100%">
          <el-table-column prop="position_name" label="在招职位"></el-table-column>
          <el-table-column prop="companypositionaboutcount.chat_initiate_num" label="聊天发起量"></el-table-column>
          <el-table-column prop="companypositionaboutcount.reply_num" label="求职者回复量"></el-table-column>
          <el-table-column prop="companypositionaboutcount.deliver_num" label="求职者投递量"></el-table-column>
          <!-- <el-table-column prop="e" label="回复处理量"></el-table-column> -->
          <el-table-column prop="companypositionaboutcount.get_phone_num" label="虚拟号码获取量"></el-table-column>
          <!-- <el-table-column prop="e" label="互动量"></el-table-column> -->
          <el-table-column label="操作">
            <template>
              <!-- <span class="blue">查看详情</span> -->
              <span class="blue">导出</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<script>
import {formatDate,handleTimeValue} from '../../../utils/utils'
import {Loading } from 'element-ui';

export default {
  data(){
    return {
      begin_date:'',
      end_date:'',
      formData: {},
      company_recruitment_count:{},
      company_recruitment_list: [],
    }
  },
  created(){
    // 获取当前的日期
    const date = new Date();
    this.end_date = handleTimeValue(date).time;
    // 获取一周前的日期
    const oneWeekAgo = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
    this.begin_date = handleTimeValue(oneWeekAgo).time;
    this.clickSearhButton();
  },
  methods:{
    // 点击日期搜索按钮
    clickSearhButton(){
      //  获取信息
      this.getFormData();
    },
    goToPages(path){
      this.$router.push({ path })
    },
    getFormData(){
      let that = this;
      let loadingInstance = Loading.service({
        lock: false,
        customClass: 'z-index999',
        text: '加载中，请稍后...',
        spinner: 'ui-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      that.$axios.post('/api/company/recruitment',{
        begin_date: that.begin_date,
        end_date: that.end_date,
      }).then( res =>{
        loadingInstance.close();
        if(res.code == 0){
          that.formData = res.data;
          that.company_recruitment_list = res.data.company_recruitment_list.list;
          that.company_recruitment_count = res.data.company_recruitment_count;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch( e =>{
        loadingInstance.close();
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .title-box{
    height: 24px;
    font-size: 16px;
    font-weight: bold;
    color: $g_textColor;
    line-height: 24px;
  }
  .myRecruitmentData{
    
    .tab-box{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left-box{
        display: flex;
        align-items: center;
        &>img{
          width: 24px;
          height: 24px;
        }
        .title{
          font-size: 18px;
          font-weight: bold;
          color: $g_textColor;
          line-height: 26px;
          padding-left: 5px;
        }
        .title-show{
          font-size: 14px;
          font-weight: 400;
          color: #86909C;
          line-height: 22px;
          padding-left: 24px;
        }
      }
    }
    .zp-data{
      width: 100%;
      .dataInfo-box{
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 40px;
        &>div{
          flex: 1;
          .title{
            display: flex;
            align-items: center;
            &>span{
              font-size: 14px;
              font-weight: 400;
              color: #86909C;
              line-height: 22px;
            }
            &>img{
              width: 16px;
              height: 16px;
              margin-left: 4px;
            }
          }
          .num{
            font-size: 30px;
            font-family: DIN Alternate-Bold, DIN Alternate;
            font-weight: bold;
            color: $g_textColor;
            line-height: 40px;
            margin: 4px 0;
            cursor: pointer;
          }
          .sm-box{
            display: flex;
            align-items: center;
            &>img{
              width: 12px;
              height: 12px;
            }
            &>span{
              font-size: 12px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #86909C;
              line-height: 20px;
              margin-left: 4px;
            }
          }
        }
      }
    }
    .zxzw-data{
      width: 100%;
      .block{
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .input-box{
        display: flex;
        align-items: center;
        width: 300px;
        &>span{
          font-size: 14px;
          font-weight: 400;
          color: #4E5969;
          line-height: 22px;
          padding-right: 10px;
          width: auto;
        }
        .el-input{
          flex: 1;
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
    }
  }
  .item-content {
    margin-left: 30px;
    position: relative;
    line-height: 30px;
    display: flex;
    .radio-item{
      flex: 1;
      min-width: auto;
      line-height: 30px;
      display: inline-block;
      border: 1px solid #e3e7ed;
      background-color: #fff;
      text-align: center;
      cursor: pointer;
      color: #9fa3b0;
      margin-right: 20px;
      white-space: nowrap;
      position: relative;
      vertical-align: middle;
      font-size: 14px;
      &:last-of-type {
        margin-right: 0;
      }
      /deep/ .el-textarea__inner{
        font-size: 14px;
        &:focus{
          border-color: $g_color;
        }
      }
    }
    .radio-checked {
      border-color: $g_color;
      color: $g_color;
      background-color: #effbfa;
    }
    /deep/ .el-select{
      width: 100%;
      .el-input.is-focus .el-input__inner{
        border-color: $g_color;
      }
    }
    /deep/ .el-date-editor.el-input__inner,/deep/ .el-date-editor.el-input{
      width: 170px;
    }
    /deep/ .el-input__inner{
      height: 30px;
      line-height: 30px;
      cursor: pointer;
    }
    /deep/ .el-input__icon{
      line-height: 30px;
    }
    /deep/ .el-cascader{
      width: 100%;
    }
    /deep/ .el-button{
      height: 30px;
      padding: 0 20px;
      margin-left: 20px;
    }
    /deep/ .el-button--primary{
      background-color: $g_bg;
      border-color: $g_bg;
    }
    img{
      width: 21px;
      height: 18px;
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
    }
    .span-line{
      margin: 0 10px;
      font-size: 14px;
    }
  }
</style>