<template>
  <div>
    <!-- 头部岗位信息 开始 -->
    <div class="container-title-box">
      <div class="container-titleinfo">
        <div class="titleinfo-left-box">
          <img :src="infoData.logo?infoData.logo: require('../../../assets/image/img-user.jpg')" alt="" class="company-logo"/>
          <div class="company-name-box">
            <div class="title-box">
              <div class="title-text"><span v-if="infoData.company_name">{{infoData.company_name }}</span></div>
            </div>
            <div class="title-tag">
              <span>
                {{ infoData.company_scale }}
                <span style="font-weight: bold;"> · </span>
                {{ infoData.industry }}
              </span>
            </div>
          </div>
          
        </div>
        <div class="titleinfo-right-box">
          <div class="btn-box">
            <span class="recruit-num">{{ infoData.recruit_position_num }}</span>
            <span style="padding-bottom: 4px;">在招岗位</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 头部岗位信息 结束 -->

    <!-- 主题部分 开始 -->
    <div class="container">
      <div class="mainBody-box">
        <div class="left">
          <!-- 公司信息 开始 -->
          <div class="companyDetails-box">
            <div class="div-box">
              <div class="title">工商信息</div>
              <div class="business-detail" :class="is_show?'show-business-all':''">
                <!-- <div class="show-btn-box">{{ is_show?'收起':'查看更多' }}</div> -->
                <ul>
                  <li class="w-340px">
                    <span class="t">企业名称：</span>
                    {{ infoData.company_name }}
                  </li>
                  <li class="w-220px">
                    <span class="t">法定代表人：</span>
                    {{ infoData.legal_person }}
                  </li>
                  <li class="w-180px">
                    <span class="t">成立时间：</span>
                    {{ companyintroduction?companyintroduction.establishment_date:'' }}
                  </li>
                  <li class="w-340px">
                    <span class="t">企业类型：</span>
                    {{ infoData.business_nature }}
                  </li>
                  <li class="w-220px">
                    <span class="t">上市状态：</span>
                    {{ infoData.corporate_finance }}
                  </li>
                  <li class="w-180px">
                    <span class="t">统一社会信用代码：</span>
                    {{ infoData.organization_code }}
                  </li>
                  <li class="w-340px">
                    <span class="t">公司地址：</span>
                    {{ infoData.company_register_address }}
                  </li>
                </ul>
              </div>
            </div> 
          </div>
          <!-- 公司信息 结束 -->
          <!-- 公司简介 开始 -->
          <div class="companyDetails-box margin-top-20">
            <div class="div-box">
              <div class="title">公司简介</div>
              <div class="info-box">
                <div class="text">
                  {{ companyintroduction?companyintroduction.introduction:"暂无" }}
                </div>
              </div>
            </div>
          </div>
          <!-- 公司简介 结束 -->
          <!-- 公司图片 开始 -->
          <div class="companyDetails-box margin-top-20">
            <div class="div-box">
              <div class="title">公司图片</div>
              <div class="info-box" v-if="companyintroduction">
                <div class="imagesList-item-box" v-for="(item,index) in imagesList" :key="index">
                  <div class="item-box">
                    <img :src="item" alt="" @click="$preview(index,imagesList)"/>
                  </div>
                </div>
              </div> 
              <div style="padding:20px;font-size:15px;" v-else>暂无</div>
            </div>
          </div>
          <!-- 公司图片 结束 -->
          <!-- 公司视频 开始 -->
          <div class="companyDetails-box margin-top-20">
            <div class="div-box">
              <div class="title">公司视频</div>
              <div class="info-box" v-if="companyintroduction">
                <div class="video-box" v-if="companyintroduction.video">
                  <video :src="videoList[0]" style="object-fit: fill;" height="460px" :controls="controls" 
                    x-webkit-airplay="allow"
                    x5-playsinline
                    @play="onPlayerPlay"
                    @pause="onPlayerPause"
                    autoplay="autoplay" 
                    ref="video"
                  >
                  </video>
                </div>
                <div style="padding:20px;font-size:15px;" v-else>暂无</div>
              </div>
              <div style="padding:20px;font-size:15px;" v-else>暂无</div>
            </div>
          </div>
          <!-- 公司视频 结束 -->
        </div>
        <div class="right">
          <!-- 在招职位 开始 -->
          <div class="companyDetails-box">
            <OtherPositions :OtherPositionsList="infoData.companyposition"/>
          </div>
          <!-- 在招职位 结束 -->
        </div>
      </div>
    </div>
    <!-- 主题部分 结束 -->

  </div>

</template>

<script>
import OtherPositions from "./components/otherPositions"
export default {
  name: 'companyDetails',
  components: {
    OtherPositions,
  },
  data(){
    return{
      infoData: {},
      company:{},
      is_type: 'chat',
      is_show: false,
      companyintroduction: {},
      videoList: [],
      imagesList: [],
      controls:true,
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
    // 播放回调
    onPlayerPlay(player) {
      console.log("player play!", player);
    },

    // 暂停回调
    onPlayerPause(player) {

    },
    async getInfo(){
      let that = this;
      let p = {
        company_id: that.id,
      }
      await that.$axios.post('/api/company/basic/info/detail',p).then( res =>{
        if(res.code == 0){
          let infoData = res.data;
          that.infoData = infoData;
          that.companyintroduction = infoData.companyintroduction;
          if(infoData.companyintroduction){
            let images = infoData.companyintroduction.images;
            let video = infoData.companyintroduction.video;
            that.imagesList = images.split(',') || [];
            that.videoList = video.split(',') || [];
          }
          
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
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
        display: flex;
        .company-logo{
          width: 70px;
          height: 70px;
          border-radius: 12px;
          display: inline-block;
          vertical-align: middle;
        }
        .company-name-box{
          padding-left: 10px;
          .title-box{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title-text{
              flex: 1;
              font-size: 26px;
              font-weight: bold;
              color: $g_textColor;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              word-break: break-word; 
              text-align: left;
            }
          }
          .title-tag{
            margin-top: 1rem;
            span{
              font-size: 14px;
              font-weight: 400;
              color: #1D2129;
            }
            
          }
        }
        
      }
      .titleinfo-right-box{
        width: auto;
        padding-left: 40px;
        .btn-box{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-weight: bold;
          font-size: 16px;
          color: $g_textColor;
          .recruit-num{
            font-size: 30px;
            padding-right: 4px;
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

    }
    .right{
      width: 380px;
      padding-left: 15px;

    }
  }
 
  .companyDetails-box{
    width: 100%;
    text-align: left;
    background: #fff;
    border-radius: 6px;
    padding: 20px;
  }
  .div-box{
    width: 100%;
    &>.title{
      font-size: 16px;
      font-weight: bold;
      color: $g_textColor;
      line-height: 1.2rem;
    }
    .business-detail{
      position: relative;
      border-radius: 12px;
      border: none;
      background: #f8f8f8;
      padding: 20px;
      height: auto;
      margin-top: 16px;
      .show-btn-box {
        position: absolute;
        display: block;
        bottom: 16px;
        left: 50%;
        width: auto;
        padding-right: 16px;
        transform: translate(-50%,0);
        top: auto;
        text-align: center;
        font-size: 15px;
        color: #00a6a7;
        line-height: 21px;
        transition: all .2s linear;
        cursor: pointer;
      }
      ul {
        overflow: hidden;
        max-height: 158px;
        display: flex;
        flex-wrap: wrap;
        li {
          display: inline-block;
          vertical-align: top;
          font-size: 15px;
          color: #333;
          line-height: 21px;
          padding: 0 5px 0 0;
          margin-bottom: 30px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          -ms-box-sizing: border-box;
          -o-box-sizing: border-box;
          box-sizing: border-box;
          span {
            display: block;
            font-size: 14px;
            color: #999;
            line-height: 20px;
            margin-bottom: 8px;
          }
          .t {
            color: #9fa3b0;
            padding-right: 0;
          }
        }
        .w-340px{
          width: 340px;
        }
        .w-180{
          width: 180px;
        }
        .w-220px{
          width: 220px;
        }
      }
    }
    .info-box{
      width: 100%;
      margin-left: 1rem;
      margin-top: 1rem;
      .text{
        color: $g_textColor;
        font-size: 14px;
        font-weight: 400;
        line-height: 28px;
      }
      .imagesList-item-box{
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        padding: 0 5px;
        .item-box{
          width: 33.3333333333333333333333333%;
          height: 220px;
          padding: 5px;
          img{
            width: 100%;
            height: 100%;
            display: inline-block;
            border-radius: 6px;
            cursor: pointer;
          }
        }
      }
      .video-box{
        padding: 0 30px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

</style>
