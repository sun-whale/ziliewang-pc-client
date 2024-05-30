<template>
  <div class="bossSide-container center-box" :style="width">
    <div class="n-scrollbar-container">
      <div class="bg-teal-500">
        <div class="bg-teal-title">
          <span class="span-1">当前等级</span>
          <span class="span-2">{{userInfo.vip_rank_text?userInfo.vip_rank_text:'普通用户'}}</span>
        </div>
      </div>

      <div class="n-setMeal-box">
        <div class="n-setMeal-titlebox">
          <!-- <span class="span-1">会员充值</span> -->
          <!-- <span class="span-2">早期尝鲜价格</span> -->
        </div>  
        <el-row class="row-bg" justify="center">
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" v-for="(item,index) in setMealList" :key="index">
            <div class="grid-content">
              <div></div>
              <div class="setMeal-num-box">
                <h3>{{ item.recharge_name }}</h3>
              </div>
              <div class="setMeal-money-box">
                <span class="money-icon">￥</span> {{ item.recharge_price }}
              </div>
              <div class="rights-box">
                <div  class="rights-text" :class="showFull[index].status ?'':'auto'" v-html="item.rights_interests"></div>
                <div class="rights-img-box">
                  <img :src="`${ showFull[index].status ?require('../../assets/image/zhankaijiantoucopy.png'):require('../../assets/image/zhankaijiantoucopy_1.png')}`" alt="" :title="showFull[index].status?'收起':'展开'" @click.stop='openFulltxt(index)'/>
                </div>
              </div>
              <!-- <div class="span-num">{{ item.get_num }} 次</div> -->
              <div class="setMeal-btn-box" @click="clickBuyBtn(item)">立即购买</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
      <!-- 支付弹窗 -->
    <el-dialog title="订单支付" :center="false" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" height="auto">
      <div class="dialog-content-box">
        <div class="dialog-content-left">
          <div>套餐：<span class="text-teal-600">{{ checkInfo.get_num }} 次</span></div>
          <div>金额：<span class="text-teal-600">{{ checkInfo.pay_price }} 元</span></div>
          <div>创建时间：<span class="text-teal-600">{{ checkInfo.createtime }}</span></div>
        </div>
        <div class="dialog-content-right" id="qrcode" ref="qrcode">
          <img :src="qrCodeImgUrl" alt="" />
          <span class="tis-span">微信扫一扫支付</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickgbBtn" class="footer-clobtn-1">关 闭</el-button>
        <el-button type="primary" @click="clickQRBtn" class="footer-clobtn">确认订单</el-button>
      </span> 
    </el-dialog>

    <!-- 邀请码弹窗 -->

  </div>

</template>

<script>
  import QRCode from 'qrcode'
  export default {
    name: 'topUpBuy',
    data(){
      return{
        uid: window.localStorage.getItem('uid'),
        viewHeight:'',
        setMealList:[],
        dialogVisible: false,
        checkInfo:{},
        codeurl: "",//回调url
        timer1: "", //支付循环
        zlw_m_num: 0,
        qrCodeImgUrl:'',
        order_no:'', // 订单号
        invite_code:'', // 邀请码
        userInfo:{},
        width: {
          "width": '',
        },
        url_type:'staff',
        showFull: [],
      }
    },
    created(){
      let currentRoute = this.$route;
      if(currentRoute.path == '/talentSide/topUpBuy'){
        this.url_type = 'user'
        this.$nextTick( ()=>{
          this.width = {
            "width": '1200px',
            "margin": '20px auto 20px',
          }
        })
      }
      this.getOrderPayList();
      // 获取用户剩余次数
      this.get_chatgpt_num();
    },
    mounted(){
     
    },

    methods: {
      openFulltxt(idx) {
        let index = idx;
        this.showFull[index].status = !this.showFull[index].status
        this.showFull= this.showFull
      },
      handleCopy(n){
          //创建一个input框
        const input = document.createElement("input");
        //将指定的DOM节点添加到body的末尾
        document.body.appendChild(input);
        //设置input框的value值为直播地址
        input.setAttribute("value", n);
        //选取文本域中的内容
        input.select();
        //copy的意思是拷贝当前选中内容到剪贴板
        //document.execCommand（）方法操纵可编辑内容区域的元素
        //返回值为一个Boolean，如果是 false 则表示操作不被支持或未被启用
        if (document.execCommand("copy")) {
          document.execCommand("copy");
        }
        //删除这个节点
        document.body.removeChild(input);
        this.$message.success({
          message:'复制成功',
          duration: 1500,
        })
      },
      clickgbBtn(){
        this.dialogVisible = false;
        clearInterval(this.timer1);
      },
      clickQRBtn(){
        this.dialogVisible = false;
        clearInterval(this.timer1);
        this.get_chatgpt_num();
      },
      // 获取用户
      get_chatgpt_num(){
        let that = this;
        let url = '';
        if(that.url_type == 'staff'){
          url = '/api/staff/profile'
        }
        if(that.url_type == 'user'){
          url = '/api/user/profile'
        }
        that.$axios.post(url,{}).then( res =>{
          console.log(res)
        if(res.code == 0){
          if(that.url_type == 'staff'){
            that.userInfo = res.data;
            that.zlw_m_num = res.data.zlw_m_num;
            localStorage.setItem('staffVipRank', res.data.vip_rank); // 用户会员等级
          }
          if(that.url_type == 'user'){
            that.userInfo = res.data.basic_info;
            localStorage.setItem('userVipRank', res.data.basic_info.vip_rank); // 用户会员等级
            that.$bus.$emit('getVip', {});
          }
        }else{
          that.$message.error({
            message:res.data.msg
          })
        }
      })
       
      },
      // 获取充值列表接口
      getOrderPayList(){
        let that = this;
        that.$axios.post('/api/recharge/list',{}).then( res =>{
          if(res.code == 0){
            let setMealList = res.data;
            let replaceRegex = /(\n\r|\r\n|\r|\n)/g; 
            let showFull =[];
            setMealList.forEach(ele => {
              ele.rights_interests = ele.rights_interests.replace(replaceRegex, '<br/>');
              let obj = {};
              obj.status = false;
              showFull.push(obj);
            });
            that.showFull = showFull;
            that.setMealList = setMealList;
          }else{
            that.$message.error({
              message:res.data.msg
            })
          }
        })
      },
      // 点击购买按钮获取 支付二维码
      async clickBuyBtn(i) {
        let that = this;
        let p = {
          recharge_id: i.id,
        };
        try {
          //调用后端接口，接收返回url
          const res = await that.$axios.post('/api/order/create',p);
          that.checkInfo = res.data;
          that.order_no = res.data.order_no;
          //清空二维码
          that.qrCodeImgUrl = '';
          //循环请求查看是否支付成功
          that.timer1 = setInterval(() => {
            that.get_order_status(that.order_no);
          }, 1000);
          console.log(that.timer1)
          //如果在组件内的支付，很可能会监听不到组件销毁
          //通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          that.$once("hook:beforeDestroy", () => {
            clearInterval(this.timer1);
            that.dialogVisible = false;//支付的弹窗
          });
          // 使用toDataURL方法 返回的是promise对象 通过.then取值
          let img = QRCode.toDataURL(res.data.code_url)
          img.then(t => {
            that.dialogVisible = true
            console.log(t)
            that.qrCodeImgUrl = t
          })
        } catch (err) {
          this.$message.error({
            message: err,
            type: "none",
          });
        }
      },
      //监听支付轮询
      async get_order_status(o) {
        let that = this;
        try {
          const res = await that.$axios.post('/api/order/detail',{ order_no: o });
          console.log('监听支付轮询-1')
          //如果支付成功
          if (res.data.pay_status == 2) {
            this.dialogVisible = false;
            // 获取用户剩余次数
            // this.get_chatgpt_num();
            // 填写邀请码
            clearInterval(this.timer1);
            this.$message({
              message: "支付成功",
              type: "success",
            });
            setTimeout(() => {
              that.get_chatgpt_num();
            }, 500);
          }
        } catch (err) {
          // this.$message.error({
          //   message: err,
          //   type: "none",
          // });
        }
      },

    },
  }
</script>

<style lang="scss" scoped>
  .center-box {
    box-sizing: border-box;
    flex: 1;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    z-index: auto;
    box-shadow: 0 0 10px 0 #36597c40;
  }
  .n-scrollbar-container{
    width: 100%;
    overflow-Y: auto;
    height: 100%;
    max-height: inherit;
  }
  .bg-teal-500{
    background-color: #14b8a6;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
  }
  .bg-teal-title{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
  }
  .bg-teal-title>span.span-1{
    line-height: 1.5;
    font-size: 26px;
    color: $g_textColor;
    margin-bottom: 10px;
  }
  .bg-teal-title>span.span-2{
    line-height: 1.5;
    font-size: 22px;
  }
  .bg-invite-box{
    font-size: 14px;
    color: #eeeeee;
    font-weight: 100;
  }
  .bg-invite-box>div{
    margin: 6px 0;
  }
  .bg-invite-code>span{
    padding: 0 10px;
  }
  .invite-copy{
    color: #034570;
    cursor: pointer;
    padding-left: 10px;
  }
  .invite-copy:hover{
    color: #ff0000;
  }
  .n-setMeal-box{
    width: 100%;
    // padding-top: 24px;
  }
  .n-setMeal-titlebox{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .n-setMeal-titlebox>span{
    font-weight: bold;
  }
  .n-setMeal-titlebox>span.span-1{
    font-size: 32px;
    line-height: 1;
  }
  .n-setMeal-titlebox>span.span-2{
    font-size: 18px;
    padding-top: 15px;
    line-height: 1.5;
    color: #14b8a6;
  }
  .row-bg{
    margin-top: 10px;
    padding: 0 10px;
  }
  .row-bg >>> .el-col{
    padding: 10px 5px;
  }
  .grid-content{
    width: 100%;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    padding: 10px;
    transition: 0.5s;
    margin: 10px 0;
    box-sizing: border-box;
  }
  .span-num{
    font-size: 15px;
    width: 100%;
    text-align: center;
    padding-top: 10px;
  }
  .grid-content:hover{
    border-color: #14b8a6;
    // transform: scale(1.02);
    transition: 0.5s;
  }
  .rights-box{
    width: 100%;
    margin-top: 10px;
  }
  .rights-text.auto{
    // height: auto !important;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .rights-text{
    font-size: 14px;
    line-height: 24px;
    color: $g_textColor;
    height: auto;
    overflow: hidden;
  }
  .rights-img-box{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    &>img{
      width: 22px;
      height: 22px;
      cursor: pointer;
    }
  }
  .setMeal-num-box{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
  .setMeal-num-box h3{
    font-size: 28px;
    line-height: 30px;
  }
  .setMeal-money-box{
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-top: 10px;
    font-weight: 700;
    font-size: 35px;
    line-height: 36px;
  }
  .setMeal-money-box .money-icon{
    font-size: 20px;
    padding-right: 10px;
  }
 
  .setMeal-btn-box{
    margin-top: 20px;
    width: 86%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 24px;
    padding: 4px;
    font-weight: 600;
    color: #14b8a6;
    border: 1px solid #d8d8d8c7;
    border-radius: 6px;
    transition: 0.5s;
    cursor: pointer;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .setMeal-btn-box:hover{
    background: #14b8a6;
    border:1px solid #14b8a6 !important;
    color: #fff;
    transition: 0.5s;
  }
  .center-box >>> .el-dialog{
    width: 600px;
    padding: 20px;
  }
  .dialog-content-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .dialog-content-left{
    flex: 1;
    padding: 12px;
  }
  .dialog-content-left>div{
    width: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  .dialog-content-left>div .text-teal-600{
    color: #14b8a6;
    padding-left: 10px;
  }
  .dialog-content-right{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .dialog-content-right img{
    width: 180px;
    height: 180px;
  }
  .dialog-content-right .tis-span{
    font-size: 14px;
    color: #ff0000;
  }
  .footer-clobtn-1{
    border-radius: 20px;
    transition: 0.3s;
  }
  .footer-clobtn-1:hover{
    color: #14b8a6;
    background: #e7f8f6;
    transition: 0.3s;
  }
  .footer-clobtn{
    border-radius: 20px;
    transition: 0.3s;
    color: #fff;
    background: $g_bg;
  }
  .footer-clobtn:hover{
    color: #fff;
    background: $g_bg;
    transition: 0.3s;
  }
</style>

<style scoped>
  @media screen and (max-width: 768px){
    .bg-teal-500{
      padding: 8px;
    }
    .bg-teal-500>span.span-1{
      font-size: 18px;
    }
    .n-setMeal-titlebox>span.span-1{
      font-size: 32px;
    }
    .n-setMeal-box{
      padding-top: 12px;
    }
    .grid-content{
      padding: 10px;
    }
    .setMeal-money-box{
      font-size: 28px;
      margin-top: 20px;
    }
    .setMeal-btn-box{
      padding: 10px 4px;
    }
    .center-box >>> .el-dialog__header{
      padding: 10px 0;
    }
    .center-box >>> .el-dialog__body{
      padding: 10px;
    }
    .bg-teal-500>span.span-2{
      line-height: 1.2;
      font-size: 14px;
    }
  }
  @media (min-width: 768px) and (max-width: 1466px){
    
  }

</style>
