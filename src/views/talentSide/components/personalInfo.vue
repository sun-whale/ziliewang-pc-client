<template>
  <div class="right-box">
    <div class="m-box">
      <div class="users-box" @click="goToMyResume">
        <div class="avatar-box">
          <img :src="basic_info.avatar?basic_info.avatar:require('../../../assets/image/img-user.jpg')" alt="" class="img-user" />
          <div class="users-right">
            <div class="users-name">
              <span class="span-1" v-if="basic_info">{{basic_info.real_name}}</span>
              <img src="../../../assets/image/sex-1.png" alt="" class="img-sex"/>
            </div>
            <div class="wcd-box">简历完整度{{ perfection_degree.degree_num }}%</div>
          </div>
        </div>
        <span class="span-id">ID: {{ basic_info.user_number }}</span>
      </div>
      
      <div class="infoTab-box">
        <div class="infoTab-items" v-for="(item,index) in countList" :key="index" @click="goTomyProfessionalCircle(item)">
          <span class="infoTab-items-num">{{ item.count }}</span>
          <span class="infoTab-items-name">{{ item.text }}</span>
        </div>
      </div>

      <div class="setTab-box">
        <div class="setTab-items" @click="clcikRefresh">
          <img src="../../../assets/image/Frame_12.png" alt="" />
          <span class="setTab-items-name">刷新简历</span>
        </div>
        <div class="setTab-items" @click="goToMyResume">
          <img src="../../../assets/image/Frame_12.png" alt="" />
          <span class="setTab-items-name">查看简历</span>
        </div>
        <div class="setTab-items" @click="goTo('myDelivery')">
          <img src="../../../assets/image/Frame_12.png" alt="" />
          <span class="setTab-items-name">我的投递</span>
        </div>
      </div>
    </div>
    <!-- 我的资产 开始 -->
    <div class="m-box margin-top-20 vip-box">
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
          <span class="goldCoin-span">{{ basic_info.vip_rank_text?basic_info.vip_rank_text:'普通用户' }}</span>
          <button class="goldCoin-btn" @click="goToTopUpBuy">购买</button>
        </div>
        <div class="goldCoin-title" v-if="basic_info.vip_expire_time_text">到期时间: {{ basic_info.vip_expire_time_text }}</div>
      </div>
    </div>
    <!-- 我的资产 结束 -->


    <!-- 用户黑名单 --  侧边抽屉 -->
    <div id="drawer-box">
      <el-drawer :title="cb_title" :visible.sync="drawer" :before-close="drawer_handleClose">
        <div class="items-box">
          <ul v-if="userDefriendList.length>0">
            <li class="s-list-nav" v-for="(item,index) in userDefriendList" :key="index" @click="goToCompanyDetails(item.company_id)">
              <div class="itemWrap">
                <div class="s-avatar">
                  <img :src=" item.avatar ? item.avatar : require('../../../assets/image/img-user.jpg')" alt="" />
                </div>

                <div class="s-list-info">
                  <div class="s-list-name"><span>{{ item.name ?item.name :'暂无' }}</span><span class="span-time">{{ item.createtime }}</span></div>
                  <div class="s-list-intro"><span>{{ item.company_name?item.company_name :''  }}</span></div>
                </div>
              </div>
            </li>
            <div class="tips-box" v-if="userDefriendList.length<= 0">- 暂无数据 -</div>
          </ul>
        </div>
      </el-drawer>
    </div>
  </div>

</template>

<script>
import { getPerfectionDegree } from "../../../utils/index";

export default {
  components: {
  },
  data(){
    return{
      infoData:{}, // 信息
      basic_info:{},
      perfection_degree: {},
      cb_title:'',
      drawer: false,
      userDefriendList: [],
      cb_item: {},
      countList: []

    }
  },
  computed: {
    
  },
  mounted() {
    // 组件间通信
    this.$bus.$on('getVip', this.getUserProfile);
  },
  created() {
    // 获取个人信息
    this.getUserProfile();
    this.getUserCountList();
  },
  methods: {
    goToCompanyDetails(id){
      this.drawer = false;
      this.$router.push({
        path:'/companyDetails',
        query:{
          id: id
        }
      })
    },
    goTomyProfessionalCircle(i){
      this.cb_title = i.text;
      this.cb_item = i;

      this.getUserDefriendList();
      // this.$router.push('/myProfessionalCircle');
    },
    // 关闭侧边栏
    drawer_handleClose() {
      this.drawer = false;
    },
    getUserDefriendList(){
      let that = this;
      let p = {
        page: 1,
        pagesize: 100,
        type: that.cb_item.type,
        tag: that.cb_item.tag,
      };
      that.$axios.post('/api/userinfooperate/list',p).then( res =>{
        if(res.code == 0){
          that.userDefriendList = res.data.list;
          that.drawer = true;
        }else{
          that.$message.error({
            message:res.msg
          })
          return
        }

      }).catch( e =>{
        that.$message.error({
          message:e.message
        })
        console.log(e)
      })
    },
    goTo(type){
      this.$router.push('/myDelivery?tag=' + type);
    },
    // 点击我的简历
    goToMyResume(){
      this.$router.push('/myResume');
    },
    // 点击刷新
    clcikRefresh(){
      this.$message.success('刷新成功！');
    },
    // 
    getUserCountList(){
      let that = this;
      that.$axios.post('/api/user/count/list',{}).then(res =>{
        if(res.code == 0){
          that.countList = res.data;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    // 获取个人信息
    getUserProfile(params){
      let that = this;
      that.$axios.post('/api/user/profile',{}).then(res =>{
        if(res.code == 0){
          that.infoData = res.data;
          that.basic_info = res.data.basic_info;
          that.curriculum_vitae = res.data.basic_info.curriculum_vitae;
          // 简历完善度、
         that.perfection_degree = getPerfectionDegree(res.data);
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    // 点击我的资产
    clickmyAssets(){
      let that = this;
      that.$router.push({ path:'/talentSide/myAssets' })
    },
    // 点击购买
    goToTopUpBuy(){
      this.$router.push('/talentSide/topUpBuy');
    },
  },
};
</script>

<style lang="scss" scoped>

.right-box{
  opacity: 1;
  text-align: left;
  .m-box{
    padding: 20px 16px;
  }
  .users-box{
    width: 100%;
    .avatar-box{
      width: auto;
      display: flex;
      align-items: center;
      img.img-user {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        border: 3px solid #F2F3F5;
      }
      .users-right{
        flex: 1;
        padding-left: 8px;
        .users-name{
          display: flex;
          align-items: center;
          .span-1{
            font-size: 15px;
            font-weight: bold;
            color: $g_textColor;
            line-height: 32px;
          }
          .img-sex{
            width: 0.9rem;
            height: 0.9rem;
            margin-left: 0.8rem;
          }

        }
      }
    
    }
    .span-id{
      font-size: 14px;
      font-weight: bold;
      padding-top: 4px;
    }

  }
  .wcd-box{
    font-size: 14px;
    font-weight: 400;
    color: #86909C;
  }
  .infoTab-box{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    margin-top: 1.5rem;
    .infoTab-items {
      width: 33.33333%;
      // flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 100%;
      margin-top: 8px;
      &:hover{
        background: #f8f9fd;
      }
      .infoTab-items-num{
        font-size: 20px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 28px;
      }
      .infoTab-items-name{
        font-size: 13px;
        font-weight: 400;
        color: #86909C;
        margin-top: 6px;
        text-align: center;
      }
    }
  }
  .setTab-box{
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #F2F3F5;
    display: flex;
    justify-content: space-between;
    .setTab-items{
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img{
        width: 32px;
        height: 32px;
      }
      .setTab-items-name{
        font-size: 13px;
        font-weight: 400;
        color: $g_textColor;
        margin-top: 6px;
      }

    }
  }

}
.vip-box{
  width: 100%;
  text-align: left;
  background: #fff;
  padding: 10px 20px;
  
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
}
// 侧边栏
#drawer-box{
  /deep/ .el-drawer__header{
    margin: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #e2e2e2;
  }
  .items-box{
    width: 100%;
    padding: 5px 20px 20px 20px;
    .s-list-nav{
      width: 100%;
      position: relative;
      cursor: pointer;
      .itemWrap{
        padding: 8px 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e2e2e2;
        .s-avatar{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          &>img{
            width: 100%;
            height: 100%;
          }
        }
        .s-list-info{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 10px;
         
          .s-list-name {
            font-size: 15px;
            color: #1e1f24;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .s-list-name span {
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .s-list-name span.span-time{
            font-size: 13px;
            color: #848691;
          }
          .s-list-intro {
            font-size: 14px;
            height: 16px;
            width: 100%;
            color: #848691;
            display: flex;
            align-items: center;
            padding-top: 10px;
          }
          .s-list-intro span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .s-list-button .s-button {
          height: 28px;
          width: 60px;
          background-color: $g_bg;
          color: #fff;
          border-radius: 20px;
          font-size: 13px;
          line-height: 28px;
          text-align: center;
          cursor: pointer;
        }

      }
    }
    .tips-box{
      width: 100%;
      margin-top: 30px;
      color: #999;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
