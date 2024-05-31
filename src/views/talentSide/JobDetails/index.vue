<template>
  <div>
    <!-- 头部岗位信息 开始 -->
    <div class="container-title-box">
      <div class="container-titleinfo">
        <div class="titleinfo-left-box">
          <div class="title-box">
            <div class="title-text">{{ infoData.position_name }}- <span v-if="infoData.company">{{infoData.company.company_name }}</span></div>
            <div class="pay-box">
              {{ infoData.salary }}K 
              <span v-if="infoData.months != 12 && infoData.months">· {{ infoData.months }}薪</span>
            </div>
          </div>
          <div class="title-tag">
            <span>{{ infoData.work_address }}</span>
            <span>{{ infoData.work_times }}</span>
            <span>{{ infoData.educational_experience }}</span>
          </div>
          <div class="title-subtag">
            <span v-for="(item,index) in infoData.job_benefits" :key="index">{{ item }}</span>
          </div>
        </div>
        <div class="titleinfo-right-box">
          <div class="btn-box">
            <el-button class="deliver-1" v-if='infoData.is_deliver == 1'>已投递</el-button>
            <el-button class="deliver-2" @click="clickDeliver" v-else>投简历</el-button>
            <!-- <el-button class="chat" @click="clickChat">聊一聊</el-button> -->
          </div>
          <div class="tag-box">
            <span class="tag-items" @click="collection">
              <img src="../../../assets/image/icon-collect.png" alt="" />
              <span :class="infoData.is_collection == 1?'hover':''"> {{ infoData.is_collection == 1?"已收藏":'收藏' }}</span>
            </span>
            <!-- <span class="tag-items">
              <img src="../../../assets/image/icon-wechat.png" alt="" />
              <span>微信分享扫描</span>
            </span> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 头部岗位信息 结束 -->

    <!-- 主题部分 开始 -->
    <div class="container">
      <div class="mainBody-box">
        <div class="left">
          <!-- boss信息 开始 -->
          <div class="m-box boss-info-box">
            <div class="boss-info-left">
              <div class="img-box">
                <img :src="infoData.avatar?infoData.avatar:require('../../../assets/image/img-user.jpg')" alt="" />
                <span class="span-id">ID: {{ infoData.publish_uid }}</span>
              </div>
              <div class="info-text">
                <div class="info-text-1"><span class="name">{{ infoData.publish_name?infoData.publish_name:'' }}</span><span class="status">当前在线</span><span class="aptitude">已认证</span></div>
                <div class="info-text-2"><span>{{ infoData.role_desc }}·</span><span class="company-span" v-if="infoData.company" @click="clickCompany">{{ infoData.company.company_name }}</span></div>
              </div>
            </div>
            <div class="boss-info-btn">
              <el-button class="chat" :class="infoData.check_is_position == 1?'hover':'' " @click="clickChat" >聊一聊</el-button>
              <el-button class="chat" @click="clickMobile(infoData)">打电话</el-button>
              <el-button class="chat" @click="clickWechat(infoData)">加微信</el-button>
            </div>
          </div>
          <!-- boss信息 结束 -->
          <!-- 职位介绍 开始 -->
          <div class="m-box margin-top-20">
            <JobDescription :infoData="infoData"/>
          </div>
          <!-- 职位介绍 结束 -->
          <!-- 公司简介 开始 -->
          <div class="m-box margin-top-20">
            <CompanyProfile :infoData="infoData.companyinstroduction"/>
          </div>
          <!-- 公司简介 结束 -->
        </div>
        <div class="right">
          <!-- 公司信息 开始 -->
          <div class="m-box">
            <CompanyInfo :infoData="infoData.company"/>
          </div>
          <!-- 公司信息 结束 -->
          <!-- 公司信息 开始 -->
          <div class="m-box margin-top-20">
            <OtherPositions :OtherPositionsList="infoData.other_position"/>
          </div>
          <!-- 公司信息 结束 -->
        </div>
      </div>
    </div>
    <!-- 主题部分 结束 -->

  </div>

</template>

<script>
import JobDescription from "./components/jobDescription";
import CompanyProfile from "./components/companyProfile";
import CompanyInfo from "./components/companyInfo"
import OtherPositions from "./components/otherPositions"

export default {
  name: 'JobDetails',
  components: {
    JobDescription,
    CompanyProfile,
    CompanyInfo,
    OtherPositions,
  },
  data(){
    return{
      infoData: {},
      company:{},
      is_type: 'chat',
      userVipRank: localStorage.getItem('userVipRank') || 0,
    }
  },
  created(){
    this.id = this.$route.query.id;
  },
  mounted(){
    this.getInfo();
  },
  computed: {
    
  },
  methods: {
    // 点击公司名称
    clickCompany(){
      this.$router.push({
        path:'/companyDetails',
        query:{
          id: this.infoData.company_id
        }
      })
    },
    async getInfo(){
      let that = this;
      let p = {
        position_id: that.id,
      }
      await that.$axios.post('/api/company-position/detail',p).then( res =>{
        if(res.code == 0){
          let infoData = res.data;
          infoData.job_benefits = infoData.job_benefits.split(',');
          that.infoData = infoData;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 投简历
    clickDeliver(){
      let that = this;
      let p = {
        position_id: that.id,
        company_id: that.infoData.company_id,
        company_uid: that.infoData.company.uid,
      }
      that.$axios.post('/api/user/deliver',p).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message:'投递成功'
          })
          that.infoData.is_deliver = 1;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 点击收藏
    collection(){
      let that = this;
      let url = '';
      let infoData = that.infoData;
      if( infoData.is_collection == 1){
        // 取消收藏
        url = '/api/user/cancelcollection'
      }else{
        //收藏
        url = '/api/user/collection'
      }
      that.$axios.post(url,{
        position_id: infoData.id,
        company_id: infoData.company_id,
      }).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message:res.msg
          })
        infoData.is_collection == 1?infoData.is_collection = 2 : infoData.is_collection = 1;
        that.infoData = infoData;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },

    // 点击聊一聊
    clickChat(){
      let that = this;
      let infoData = {
        position_id: that.id,
        company_id: that.infoData.company_id,
        id:'c_' + that.infoData.publish_uid,
        uid: that.infoData.publish_uid,
        name: that.infoData.publish_name || 'BOSS',
        avatar: that.infoData.avatar || 'https://zlw0720.oss-cn-beijing.aliyuncs.com/avatar/20240127/e4ffd5fcef38311336c5676416b317fa.jpg',
      }
      console.log(infoData)
      that.createPositionChatRecord(infoData.company_id,infoData.position_id,infoData.uid);
      that.$bus.$emit('talentSide_receiveParams', {type:'JobDetails',laiyuan:'nav',infoData:infoData });
      that.$bus.$emit('talentSide_clickSidebar', {type:'clickChat'});
    },
    // 创建岗位会话信息
    createPositionChatRecord(c_i,p_i,u_i){
      let that = this;
      let p = {
        position_id: p_i,
        company_uid: u_i,
        company_id: c_i,
        tag: 1,
      }
      that.$axios.post('/api/position-chat-record/create',p).then(res =>{
        if(res.code == 0){
          console.log('保存岗位成功')
        }else{
          
        }
      }).catch(e =>{
        console.log(e)
      })
    }, 
    // 点击添加微信
    clickWechat(i){
      let that = this;
      if(that.userVipRank < 1){
        this.$message.error("需要升级为VIP会员可获取对方微信!");
        setTimeout( () =>{
          that.$router.push('/talentSide/topUpBuy');
        },1000)
        return
      }
      this.$alert(i.companystaff.company_wx, '微信', {
        confirmButtonText: '确定',
      });
    },
    // 点击打电话
    clickMobile(i){
      let that = this;
      if(that.userVipRank < 1){
        this.$message.error("需要升级为VIP会员可获取对方电话!");
        setTimeout( () =>{
          that.$router.push('/talentSide/topUpBuy');
        },1000)
        return
      }
      this.$alert(i.companystaff.phone, '电话', {
        confirmButtonText: '确定',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .container{
    width: 1200px;
    margin: 1.2rem auto 0;
  }
  .container-title-box{
    width: 100%;
    padding: 1.2rem 0;
    background: #fff;
    font-size: 14px;
    .container-titleinfo{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      .titleinfo-left-box{
        flex: 1;
        text-align: left;
        .title-box{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title-text{
            flex: 1;
            font-size: 1.4rem;
            font-weight: bold;
            color: $g_textColor;
            line-height: 1.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-word; 
            text-align: left;
          }
          .pay-box{
            width: auto;
            padding-right: 1.5rem;
            padding-left: 5rem;
            font-size: 1.4rem;
            font-weight: bold;
            color: #FF4D4F;
            line-height: 1.4rem;
          }
        }
        .title-tag{
          margin-top: 1rem;
          span{
            font-size: 14px;
            font-weight: 400;
            color: #1D2129;
            padding: 0 1rem;
            border-left: 1px solid #F2F3F5;
            &:nth-of-type(1){
              padding-left: 0;
              border: none;
            }
          }
          
        }
        .title-subtag{
          margin-top: 1.5rem;
          span{
            font-size: 12px;
            font-weight: 400;
            color: #1D2129;
            line-height: 20px;
            padding: 6px 12px;
            border: 1px solid #E5E6EB;
            border-radius: 4px;
            background: #F7F8FA;
            margin-left: 8px;
            &:nth-of-type(1){
              margin-left: 0;
            }
          }
        }
      }
      .titleinfo-right-box{
        width: 320px;
        padding-left: 2.5rem;
        .btn-box{
          width: 100%;
          display: flex;
          justify-content: space-between;
          button{
            flex: 1;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 16px;
            border: none;
            color: #fff;
            border-radius: 20px !important;
            padding: 0;
            &.deliver-1{
              background: #86909C;
            }
            &.deliver-2{
              background: $g_bg;
            }
            &.chat{
              background: $g_bg;
            }
          }

        }
        .tag-box{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 1rem;
          .tag-items{
            padding-left: 10px;
            display: flex;
            align-items: center;
            font-size: 14px;
            font-weight: 400;
            color: #86909C;
            line-height: 22px;
            cursor: pointer;
            img{
              width: 14px;
              height: 14px;
              margin-right: 5px;
            }
            span{
              &.hover{
                color: $g_color;
              }
            }
          }
        }
      }
    }
  }
  .mainBody-box{
    width: 100%;
    display: flex;
    .left{
      flex: 1;
      .boss-info-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .boss-info-left{
          flex: 1;
          display: flex;
          align-items: center;
          .img-box{
            width: auto;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            img{
              display: inline-block;
              width: 54px;
              height: 54px;
              border-radius: 50%;
              border: 2px solid #F7F8FA;
            }
            .span-id{
              font-size: 14px;
              font-weight: bold;
              padding-top: 4px;
            }

          }
          .info-text{
            flex: 1;
            padding-left: 0.9rem;
            &>div{
              display: flex;
              align-items: center;
              font-size: 14px;
              color: #86909C;
              line-height: 22px;
              &.info-text-1{
                .name{
                  font-size: 16px;
                  font-weight: bold;
                  color: $g_textColor;
                  line-height: 24px;
                }
                .status{
                  padding-left: 0.6rem;
                  margin-left: 0.6rem;
                  font-size: 13px;
                  font-weight: 400;
                  color: #86909C;
                  line-height: 20px;
                  position: relative;
                  &::after{
                    content:'';
                    width: 8px;
                    height: 8px;
                    background: #52C41A;
                    border-radius: 50%;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                  }
                }
                .aptitude{
                  font-size: 12px;
                  font-weight: 400;
                  color: #FA8C16;
                  line-height: 20px;
                  padding: 0.1rem 0.6rem;
                  background: #FFF7E6;
                  border-radius: 2px;
                  border: 1px solid #FFD591;
                  margin-left: 0.5rem;
                }
              }
              &.info-text-2{
                margin-top: 0.5rem;
   
              }
            }
          }

        }
        .boss-info-btn{
          width: auto;
          padding: 0 0.8rem;
          button{
            width: 90px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            font-size: 0.8rem;
            border: none;
            color: #fff;
            border-radius: 20px !important;
            padding: 0;
            background: $g_bg;
          }
          button.hover{
            background: #86909C !important;
          }
        }
      }

    }
    .right{
      width: 380px;
      padding-left: 0.8rem;

    }
  }
  .company-span{
    cursor: pointer;
  }
  .company-span:hover{
    color: $g_color;          
  }
 


</style>
