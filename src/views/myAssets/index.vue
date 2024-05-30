<template>
  <!-- 我的资产 -->
  <div class="bossSide-container" :style="width">
    <div class="m-box margin-top-20">
      <div class="title-box">
        <div class="left">
          <img src="../../assets/image/bossSide/wallet-three.png" alt="" />
          <span>我的资产</span>
        </div>
        <div class="infoData-box">
          <div class="infoData-wddj-box">
            <div>
              <span class="span-1">我的等级：</span>
              <span class="span-2">{{ userInfo.vip_rank_text?userInfo.vip_rank_text:'普通用户' }}</span>
              <button class="goldCoin-btn" @click="goToTopUpBuy">购买</button>
            </div>
          </div>
          <div class="infoData-lm-box">
            <div>
              <span class="span-1">到期时间：</span>
              <span class="span-2">{{ userInfo.vip_expire_time_text?userInfo.vip_expire_time_text:'无' }}</span>
            </div>
          </div>
          <div class="infoData-sycs-box">
            <div>
              <span class="span-1">今日剩余聊天次数:</span>
              <span class="span-2">0</span>
            </div>
            <div>
              <span class="span-1">今日剩余获取电话数:</span>
              <span class="span-2">0</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <div class="m-box margin-top-20 zxzw-data">
      <div class="left">
        <img src="../../assets/image/bossSide/myRecruitment-search.png" alt="" />
        <span>充值记录</span>
      </div>

      <div class="tableData-box margin-top-20">    
        <el-table :data="orderList" style="width: 100%">
          <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center">
          <template slot-scope="scope">
            <!-- <span>{{ scope.$index + 1 + (tableDataPage.page - 1) * tableDataPage.size }}</span> -->
            <span>{{ scope.$index + 1  }}</span>
          </template>
        </el-table-column>
          <el-table-column prop="pay_price" label="充值金额"></el-table-column>
          <el-table-column prop="rechargelist.recharge_name" label="会员等级"></el-table-column>
          <el-table-column prop="createtime" label="充值时间"></el-table-column>
          <el-table-column prop="order_no" label="订单号"></el-table-column>
          <!-- <el-table-column prop="e" label="回复处理量"></el-table-column> -->
          <!-- <el-table-column prop="e" label="互动量"></el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="blue" @click.stop="clickViewDetails(scope.row)">查看详情</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>


     <!-- 查看详情----弹窗 -->
    <div class="container-zx">
      <el-dialog title="充值详情" :center="false" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
        <div class="pc-preview-wrapper">
          <div class="talent-box">
            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">会员等级：</div>
                <div class="items-text" style="color: #ff0000;">{{infoData.rechargelist?infoData.rechargelist.recharge_name:''}}</div>
              </div>
            </div>
            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">订单号：</div>
                <div class="items-text">{{infoData.order_no}}</div>
              </div>
            </div>
            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">充值金额：</div>
                <div class="items-text">{{ infoData.pay_price }}</div>
              </div>
            </div>

            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">每天线上沟通数：</div>
                <div class="items-text">{{infoData.rechargelist?infoData.rechargelist.every_day_free_create_chat:''}}</div>
              </div>
            </div>
            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">每天获取人才电话数：</div>
                <div class="items-text">{{infoData.rechargelist?infoData.rechargelist.every_day_get_user_mobile:''}}</div>
              </div>
            </div>

            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">购买须知：</div>
                <div class="items-text">{{infoData.rechargelist?infoData.rechargelist.rights_interests:''}}</div>
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
  components: {

  },
  data() {
    return {
      orderList:[],
      tableDataPage: {
        page: 1,
        size: 10,
        total: 0
      },
      infoData:{},
      dialogVisible:false,
      userInfo:{},
      width: {
        "width": '',
      },
      url_type:'staff'
    }
  },
  created(){
    let currentRoute = this.$route;
    if(currentRoute.path == '/talentSide/myAssets'){
      this.url_type = 'user'
      this.$nextTick( ()=>{
        this.width = {
          "width": '1200px',
          "margin": '20px auto 20px',
        }
      })
    }
    //  获取信息
    this.getFormData();
    //  获取信息
    this.getUserInfo();
  },
 
  methods:{
    //  获取信息
    getUserInfo(){
      let that = this;
      let url = '';
      if(that.url_type == 'staff'){
        url = '/api/staff/profile'
      }
      if(that.url_type == 'user'){
        url = '/api/user/profile'
      }
      that.$axios.post(url,{}).then( res =>{
        if(res.code == 0){
          if(that.url_type == 'staff'){
            that.userInfo = res.data;
          }
          if(that.url_type == 'user'){
            that.userInfo = res.data.basic_info;
          }
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    }, 
    // 点击购买
    goToTopUpBuy(){
      if(this.url_type == 'staff'){
        this.$router.push('/topUpBuy');
      }
      if(this.url_type == 'user'){
        this.$router.push('/talentSide/topUpBuy');
      }
    },
    getFormData(){
      let that = this;
      that.$axios.post('/api/order/list',{}).then( res =>{
        if(res.code == 0){
          that.orderList = res.data;
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
    handleClose(done) {
      this.dialogVisible = false;
    },
  },
}
</script>

<style lang="scss" scoped>
  .title-box{
    .left{
      display: flex;
      align-items: center;
      img {
        width: 23px;
        height: 23px;
        margin-top: -4px;
      }
      span {
        font-size: 16px;
        font-weight: 500;
        color: #1F2E4D;
        line-height: 26px;
        padding-left: 10px;
      }
    } 
    .infoData-box{
      padding-left: 10px;
      padding-top: 6px;
      &>div{
        font-size: 16px;
        display: flex;
        align-items: center;
        padding: 6px 0;
      }
      .span-1{
        display: inline-block;
        min-width: 120px;
      }
      .span-2{
        font-weight: bold;
        color: #ff0000;
      }
      .infoData-sycs-box{
        div{
          margin-right: 20px;
        }
      }
    }
    .goldCoin-btn{
      background: $g_bg;
      box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.04);
      border-radius: 2px;
      opacity: 1;
      border: none;
      padding: 6px 12px;
      color: #fff;
      border-radius: 4px;
      font-size: 14px;
      margin-left: 120px;
    }
  }
  .zxzw-data{
    width: 100%;
    .left{
      display: flex;
      align-items: center;
      img {
        width: 23px;
        height: 23px;
        margin-top: -4px;
      }
      span {
        font-size: 15px;
        font-weight: 500;
        color: #1F2E4D;
        line-height: 26px;
        padding-left: 10px;
      }
    } 
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
            .items-label{
              min-width: 80px;
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