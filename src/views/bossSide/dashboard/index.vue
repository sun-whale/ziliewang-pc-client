<template>
  <div class="bossSide-container">
    <div class="bossSide-box">
      <!-- 左侧 开始 -->
      <div class="bossSide-left-box">
        <!-- 搜索框模块 开始 -->
        <div class="search-box">
          <el-input placeholder="输入关键词，2.6亿人才库任你聊!" v-model="input_name" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
            <el-button slot="append" @click="getExistLabels">搜索</el-button>
          </el-input>
        </div>
        <!-- 搜索框模块 结束 -->
        <!-- 我的人才、我的职位 开始 -->
        <div class="my-TalentPosition-box margin-top-20">
          <div class="m-box my-talent-box">
            <div class="title-box">
              <div class="left">
                <img src="../../../assets/image/bossSide/user-business.png" alt="" />
                <span>我的人才</span>
              </div>
              <!-- <div class="right" @click="goToLiveBroadcast">
                <span>直播</span>
              </div> -->
            </div>
            <div class="data-box">
              <div class="data-box-1" @click="goTo('/interaction')">
                <div class="data-t">新招呼人才</div>
                <div class="data-n">{{ companyCountData.chat_num }}</div>
              </div>
              <div class="data-box-1" @click="goTo('/myCollect')">
                <div class="data-t">收藏的人才</div>
                <div class="data-n">{{ companyCountData.collection_num }}</div>
              </div>
            </div>
          </div>
          <div class="m-box my-position-box">
            <div class="title-box">
              <div class="left">
                <img src="../../../assets/image/bossSide/handbag.png" alt="" />
                <span>我的职位</span>
              </div>
              <div class="right" @click="goToPostJob">
                <img src="../../../assets/image/bossSide/edit.png" alt="" />
                <span>发布职位</span>
              </div>
            </div>
            <div class="data-box">
              <div  class="data-box-1" @click="goTo('/jobCenter')">
                <div class="data-t">在线职位</div>
                <div class="data-n">{{companyCountData.online_position_num}}</div>
              </div>
              <!-- <div>
                <div class="data-t">7天内即将下线</div>
                <div class="data-n">236</div>
              </div> -->
            </div>
          </div>
        </div>
        <!-- 我的人才、我的职位 结束 -->

        <!-- 我的面试 开始 -->
        <div class="my-interview-box m-box margin-top-20">
          <div class="title-box">
            <div class="left">
              <img src="../../../assets/image/bossSide/schedule.png" alt="" />
              <span>我的面试</span>
            </div>
          </div>
          <div class="tableData-box">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="50"
                  align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1 + (tableDataPage.page - 1) * tableDataPage.size }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="users.real_name" label="投递人" width="100" align="center"></el-table-column>
                <el-table-column prop="interview_time" label="开始时间" align="center"></el-table-column>
                <!-- <el-table-column prop="end_time_text" label="结束时间"></el-table-column> -->
                <!-- <el-table-column prop="companyposition.staff" label="面试官"></el-table-column> -->
                <el-table-column prop="companyposition.position_name" label="面试职位" align="center"></el-table-column>

                <el-table-column label="面试方式" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.type == 1?'线上':'线下' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="80" align="center">
                  <template slot-scope="scope">
                    <span class="blue" @click.stop="clickViewDetails(scope.row)">查看详情</span>
                    <!-- <span class="blue">导出</span> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>
        </div>
        <!-- 我的面试 结束 -->
      </div>
      <!-- 左侧 结束 -->
      <!-- 右侧 开始 -->
      <div class="bossSide-right-box">

        <!-- 我的资产 开始 -->
        <div class="m-box">
          <div class="title-box">
            <div class="left">
              <img src="../../../assets/image/bossSide/wallet-three.png" alt="" />
              <span>我的资产</span>
            </div>
            <div class="right zc-box" @click="clickmyAssets">
              <span>更多</span>
              <img src="../../../assets/image/bossSide/right.png" alt="">
            </div>
          </div>
          <div class="my-goldCoin-box">
            <div class="goldCoin-title">会员等级</div>
            <div class="goldCoin-num-btn-box">
              <span class="goldCoin-span">{{ userInfo.vip_rank_text }}</span>
              <button class="goldCoin-btn" @click="goToTopUpBuy">购买</button>
            </div>
            <div class="goldCoin-title">到期时间: {{ userInfo.vip_expire_time_text }}</div>
          </div>
        </div>
        <!-- 我的资产 结束 -->
        <!-- 我的权益 开始 -->
        <div class="m-box margin-top-20">
          <div class="title-box">
            <div class="left">
              <img src="../../../assets/image/bossSide/crown.png" alt="" />
              <span>我的权益</span>
            </div>
          </div>
          <div class="data-box">
            <div>
              <div class="data-t">剩余在线职位数</div>
              <div class="data-n">0</div>
            </div>
            <div>
              <div class="data-t">今日剩余聊天次数</div>
              <div class="data-n">0</div>
            </div>
          </div>
        </div>
        <!-- 我的权益 结束 -->
        
      </div>
      <!-- 右侧 结束 -->
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
    <Complaint id="123" uId="12345" states="2" />
  </div>
</template>

<script>
import Complaint from "@/components/complaint"
export default {
  name: 'Dashboard',
  components:{Complaint},
  data(){
    return{
      role: localStorage.getItem('role'),
      input_name:'', // 搜索框value
      tag: '',
      companyCountData:{},
      tableData:[],
      tableDataPage: {
        page: 1,
        size: 10,
        total: 0
      },
      dialogVisible:false,
      infoData:{},
      userInfo:{},
    }
  },
  computed: {
    
  },
  created(){
    //  获取信息
    this.getUserInfo();
    this.getCompanyCount();
    this.getSysMsgList();
  },
  methods: {
    //  获取信息
    getUserInfo(){
      let that = this;
      that.$axios.post('/api/staff/profile',{}).then( res =>{
        if(res.code == 0){
          that.userInfo = res.data;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    }, 
    goTo(url){
      this.$router.push(url);
    },
    // 点击购买
    goToTopUpBuy(){
      this.$router.push('/topUpBuy');
    },
    handleClose(done) {
      this.dialogVisible = false;
    },
    getCompanyCount(){
      let that = this;
      that.$axios.post('/api/company/count',{}).then( res =>{
        if(res.code == 0){
          that.companyCountData = res.data;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 点击直播
    goToLiveBroadcast(){
      let that = this;
      that.$router.push({ path:'/liveBroadcast' })
    },
    // 点击发布职位
    goToPostJob(){
      let that = this;
      that.$router.push({ path:'/postJob' })
    },
    searchEnterFun(e){
      console.log(e)
    },
    // 点击我的资产
    clickmyAssets(){
      let that = this;
      that.$router.push({ path:'/myAssets' })
    },
    // input 框搜索按钮
    getExistLabels(){
      let input_name = this.input_name;
      this.$router.push({ path:'/searchTalent?input_name=' + input_name })
    },
    getSysMsgList(){
      let that = this;
      that.$axios.post('/api/company-interview/index',{
        status: 3
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
  },
}
</script>

<style lang="scss" scoped>
  .search-box{
    width: 100%;
    cursor: pointer;
    /deep/ .input-with-select {
      width: 100%;
      display: flex;
      align-items: center;
      height: 48px;
      line-height: 48px;
      background: $g_bg;
      border-radius: 6px;
      overflow: hidden;
    }
    /deep/ .el-input-group--append .el-input__inner {
      flex: 1;
      border: 3px solid $g_bg;
      height: 100%;
      line-height: 48px;
      border-radius: 6px;
    }
    /deep/ .el-input-group__append{
      width: 100px;
      height: 100%;
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      .el-button {
        width: 100%;
        height: 100%;
        background: $g_bg;
        color: #fff;
        border: 1px solid $g_bg;
        border-radius: 0;
        font-size: 16px;
        margin: 0;
      }
    }
    
  }
  .my-TalentPosition-box{
    width: 100%;
    display: flex;
    font-size: 14px;
    .my-talent-box{
      margin-right: 0.4rem;
      padding: 1rem;
    }
    .my-position-box{
      margin-left: 0.4rem;
      padding: 1rem;
    }
  }
  .my-interview-box{
    min-height: 16rem;
  }
  .title-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    .left{
      display: flex;
      align-items: center;
      img{
        width: 1.1rem;
        height: 1.1rem;
        margin-top: -4px;
      }
      span{
        font-size: 0.9rem;
        font-weight: 500;
        color:$g_textColor;
        line-height: 26px;
        padding-left: 10px;
      }
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
  .data-box{
    width: 100%;
    margin-top: 1.5rem;
    display: flex;
    .data-box-1{
      cursor: pointer;
    }
    &>div{
      flex: 1;
      .data-t{
        font-size: 14px;
        font-weight: 400;
        color: #86909C;
        line-height: 1.1rem;
      }
      .data-n{
        font-size: 1.2rem;
        font-family: DIN Alternate-Bold, DIN Alternate;
        font-weight: bold;
        color: $g_textColor;
        line-height: 1.6rem;
        margin-top: 0.5rem;
      }
    }
  }
  .my-goldCoin-box{
    margin-top: 1.5rem;
    .goldCoin-title{
      font-size: 14px;
      font-weight: 400;
      color: #86909C;
      line-height: 22px;
    }
    .goldCoin-num-btn-box{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;
      span{
        font-size: 20px;
        font-weight: bold;
        color: #ff0000;
        line-height: 32px;
      }
      .goldCoin-btn{
        background: $g_bg;
        box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.04);
        border-radius: 2px;
        opacity: 1;
        border: none;
        padding: 6px 12px;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
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
