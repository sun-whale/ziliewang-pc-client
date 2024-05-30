<template>
  <div class="container" id="myProfessionalCircle">
    <div class="new-title-box view-box">
      <div class="live-video-hero-image">
        <div class="profile-background-image"></div>
      </div>
      <div class="ph5">
        <div class="display-flex">
          <div class="pv-top-card--photo">
            <div class="pv-top-card__photo-wrapper">
              <img :src="infoData.avatar?infoData.avatar:require('../../../assets/image/img-user.jpg' )" alt="" />
            </div>
          </div>
          <div class="gz-sx-btn" v-if="uid != see_uid">
            <div>
              <div class="left" @click="clickAttention" v-if=" infoData.is_already_attention ==  2">
                <img src="../../../assets/image/Frame_10.png" alt="" />
                <span>关注</span>
              </div>
              <div class="left" @click="clickCancelAttention" v-if=" infoData.is_already_attention ==  1">
                <span>已关注</span>
              </div>
            </div>
            <div>
              <div class="right" @click="clickAddBlacklist" v-if=" infoData.is_already_black ==  2">
                <!-- <img src="../../../assets/image/Frame_10.png" alt="" /> -->
                <span>加入黑名单</span>
              </div>
              <div class="right" @click="clickCancelBlacklist" v-if=" infoData.is_already_black ==  1">
                <span>取消黑名单</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt2 relative name-box">
          <div class="name-title">
            <span class="name-1">{{ infoData.real_name }}</span>
            <span class="name-2">&nbsp;&nbsp; —— &nbsp;&nbsp; {{ infoData.position }}</span>
          </div>
        </div>

        <div class="user-top-num">
          <div @click="clickAttentionTab('attention')">
            <span class="title">关注: </span>
            <span class="text">{{ infoData.attention_num }}</span>
          </div>
          <div @click="clickAttentionTab('fans')">
            <span class="title">粉丝: </span>
            <span class="text">{{ infoData.fan_num }}</span>
          </div>
        </div>

      </div>
      
    </div>
    <!-- 工作经历 -->
    <div class="view-box work-experience">
      <div class="experience-top">
        <div class="experience-title">工作经历</div>
        <div class="fb-btn"></div>
      </div>
      <div class="experience-container">
        <ul class="row-options-detail-box">
          <li class="options-item" v-for="(item,index) in infoData.user_work_experience" :key="index">
            <div class="image-box">
              <img src="../../../assets/image/work-icon.png" alt="" />
            </div>
            <div class="item-info">
              <div>{{ item.position }}</div>
              <div>{{item.company_name}}</div>
              <p>{{ item.begin_date }} — {{ item.end_date }}</p>
            </div>
          </li>
        </ul>
      </div>

    </div>
    <!-- 教育经历 -->
    <div class="view-box education-experience">
      <div class="experience-top">
        <div class="experience-title">教育经历</div>
        <div class="fb-btn"></div>
      </div>
      <div class="experience-container">
        <ul class="row-options-detail-box">
          <li class="options-item" v-for="(item,index) in infoData.user_education_experience" :key="index">
            <div class="education-image-box">
              <img src="../../../assets/image/shcool.png" alt="" />
            </div>
            <div class="item-info">
              <div>{{ item.school }}</div>
              <div>{{ item.education_background }} · {{ item.specialty }}</div>
              <p>{{ item.school_date }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import videoDialog from '../components/videoDialog.vue';
export default {
  name: 'careerIdentity',
  components: {
    videoDialog
  },
  data(){
    return{
      see_uid:'',
      uid:'',
      infoData: {}, // 信息
      count_list: {},
      infoList:[],
    }
  },
  computed: {
    
  },
  mounted(){
    
  },
  created(){
    this.see_uid = this.$route.query.see_uid || localStorage.getItem('realUid');
    this.uid = localStorage.getItem('realUid');
    // 获取用户职圈信息
    this.getUserProfile();
  },
  methods: {
    
    clickAttentionTab(name){
      this.$router.push({
        path:'/attentionFans',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          tag:name,
          see_uid: localStorage.getItem('realUid')
        }
      })
    },

    // 点击关注按钮
    clickAttention(){
      this.$axios.post('/api/user-attention/attention',{
        attention_uid: this.see_uid
      }).then( res =>{
        if(res.code == 0){
          this.$message.success('关注成功！');
          this.getUserProfile();
        }else{
          this.$message.error({
            message:res.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    // 取消关注
    clickCancelAttention(){
      this.$axios.post('/api/user-attention/cancel-attention',{
        attention_uid: this.see_uid
      }).then( res =>{
        if(res.code == 0){
          this.$message.success('取消成功！');
        }else{
          this.$message.error({
            message:res.msg
          })
        }
        this.getUserProfile();
      }).catch(e =>{
        console.log(e)
      })
    },
    // 加入黑名单
    clickAddBlacklist(){
      this.$axios.post('/api/user-defriend/create',{
        defriend_uid: this.see_uid
      }).then( res =>{
        if(res.code == 0){
          this.$message.success('加入黑名单成功！');
          this.getUserProfile();
        }else{
          this.$message.error({
            message:res.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    // 取消黑名单
    clickCancelBlacklist(){
      this.$axios.post('/api/user-defriend/delete',{
        defriend_uid: this.see_uid
      }).then( res =>{
        if(res.code == 0){
          this.$message.success('取消成功！');
        }else{
          this.$message.error({
            message:res.msg
          })
        }
        this.getUserProfile();
      }).catch(e =>{
        console.log(e)
      })
    },
    // 获取用户职圈信息
    getUserProfile(){
      this.$axios.post('/api/profession-circle/my',{
        see_uid: this.see_uid
      }).then( res =>{
        if(res.code == 0){
          this.infoData = res.data.users;
          this.infoList = res.data.list;
          this.count_list = res.data.count_list;
        }else{
          this.$message.error({
            message:res.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    },
   
  }
};
</script>

<style lang="scss" scoped>
  .view-box{
    background: #FFFFFF;
    border-radius: 6px;
    opacity: 1;
    overflow: hidden;
  }
 .mt2, .mv2 {
    margin-top: 10px;
  }
  .relative{
    position: relative !important;
  }
  .new-title-box{
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 2px 3px rgba(0, 0, 0, .2);
    .live-video-hero-image{
      width: 100%;
      height: 200px;
      position: relative;
      overflow: hidden;
      .profile-background-image{
        position: relative;
        width: 100%;
        padding-bottom: 200px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background:  50% / cover;
        background: url('../../../assets/image/circle-info-bg.svg') 50% / cover;;

      }
    }
    .ph5{
      padding: 0 20px;
      .display-flex{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .pv-top-card--photo{
          margin-top: -112px;
          z-index: 4;
          .pv-top-card__photo-wrapper {
            width: 160px;
            height: 160px;
            box-sizing: border-box;
            background-clip: border-box;
            border-radius: 49.9%;
            background-color: #fff;
            border: 4px solid #fff;
            box-shadow: none;
            margin: auto;
            position: relative;
            & img {
              width: 152px;
              height: 152px;
              border-radius: 50%;
            }
          }
        }
        .gz-sx-btn{
          width: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-right: 30px;
          &>div{
            flex: 1;
            padding: 0 10px;
            border-radius: 2px;
            font-size: 13px;
            text-align: center;
            cursor: pointer;
            &>div{
              padding: 8px 0;
              img{
                width: 12px;
                height:12px;
              }
            }
            .left{
              background: $g_color;
              color: #fff;
              img{
                margin-right: 4px;
              }
            }
            .right{
              border: 1px solid #E5E6EB;
              box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.04);
              color: $g_textColor;
            }
            
          }
        }
      }
      .name-box{
        width: 100%;
        .name-title{
          display: flex;
          align-items: center;
          .name-1{
            font-size: 24px;
            color: #333;
            font-weight: bold;
          }
        }
      }
      .user-top-num{
        display: flex;
        align-items: center;
        div{
          text-align: center;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .title{
            font-size: 16px;
            font-family: DIN Alternate-Bold, DIN Alternate;
            font-weight: bold;
            color: #4E5969;
          }
          .text{
            font-size: 16px;
            font-weight: 400;
            color: #6d747e;
            line-height: 22px;
            padding-left: 10px;
          }
          
        }
      }
    }
   
  }
  .experience-top{
    width: 100%;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    position: relative;
    padding: 10px 20px 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .experience-title{
      font-size: 20px;
      font-weight: bold;
    }
  }
  // 工作经历
  .work-experience{
    margin-top: 20px;    
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 2px 3px rgba(0, 0, 0, .2);
  }
  // 教育经历
  .education-experience{
    margin-top: 20px;    
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 2px 3px rgba(0, 0, 0, .2);
  }
  .experience-container{
    width: 100%;
    .row-options-detail-box{
      padding: 10px 20px;
      .options-item{
        display: flex;
        margin-top: 10px;
        .image-box{
          width: 42px;
          height: 42px;
          background: #b9b9b9;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: 30px;
            height: 30px;
          }
        }
        .education-image-box{
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .item-info{
          flex: 1;
          padding-left: 12px;
          border-bottom: 1px solid #f0f3f7;
          div{
            font-size: 14px;
            line-height: 20px;
          }
          p{
            font-size: 13px;
            line-height: 20px;
            color: #6b6b6b;
          }
        }
      }
    }
  }

  // 、、、、、、、、、、、、、、、   新版样式  ↑  、、、、、、、、、、、、

</style>
