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
            <div class="div-id">ID: {{ infoData.user_number }}</div>
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
              <div class="left" @click="clickCancelAttention" v-if=" infoData.is_already_attention ==  3">
                <span>互相关注</span>
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
          <div @click="uid == see_uid ? clickAttentionTab('attention'):'' ">
            <span class="title">关注: </span>
            <span class="text">{{ infoData.attention_num }}</span>
          </div>
          <div @click="uid == see_uid ? clickAttentionTab('attention'):'' ">
            <span class="title">粉丝: </span>
            <span class="text">{{ infoData.fan_num }}</span>
          </div>
        </div>

        <div class="share-content">

          <div style="position: absolute;" @click="clickShare()">
            <i class="el-icon-share" style="color:#86909C;padding-right: 2px;"></i>
            <span>分享</span>
          </div>

          <!-- 分享区域 开始 -->
          <div class="items-review-box" :class="show_share?'show-box':''">
            <div class="share-list">
              <div class="share-item" @click="clickShareWent(1)">
                <img src="../../../assets//image/share-wx.png" />
                <span>微信</span>
              </div>
              <div class="share-item" @click="clickShareWent(1)">
                <img src="../../../assets//image/share-pyq.png" />
                <span>朋友圈</span>
               </div>
              <div class="share-item" @click="clickShareWent(2)">
                <img src="../../../assets//image/share-wb.png" />
                <span>微博</span>
              </div>
            </div>
          </div>
          <!-- 分享区域 结束 -->
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
    
    <div class="recommendation">
      <div class="dynamicState-box listview-box">
          <div class="dynamicState-top">
            <div class="dynamicState-title">推荐语</div>
            <!-- <div class="fb-btn" @click="clickPublishBtn">评价</div> -->
          </div>

          <div class="publish-box" v-if="see_uid != uid">
            <div class="dialog-bodybox">
              <div class="dialog-content-box">
                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="clickMaskBtn">发布</el-button>
            </div>
          </div>

          <div class="dynamicState-container">
            <!-- 列表项 开始 -->
            <div class="container-items-box" v-for="(item,index) in evaluateList" :key="index">
              <div class="right-container-item">
                <div class="title list-title-box">
                  <div class="title-left">
                    <img :src="item.evaluate_user_avatar?item.evaluate_user_avatar:require('../../../assets/image/img-user.jpg' )" alt="" />
                    <div class="name-id-box">
                      <span>{{ item.evaluate_user_name }}</span>
                      <span class="span-id">ID: {{ item.user_number }}</span>
                    </div>
                  </div>
                  <div class="title-t">{{ item.createtime }}</div>
                </div>

                <div class="items-dt-box">
                  <div>
                    <div class="items-dt-p" v-html="item.content"></div>
                    
                  </div>
                  <div class="items-bottom-btn">
                    
                    <img src="../../../assets/image/icon-copy.png" alt="删除"  class="item-delete-img" @click.stop="clickItemDelete(item,index)"  v-if="uid == item.uid"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="sec-footer" v-if="evaluateList.length != 0">
              <div class="sec-content--more" @click="clickMore">
                <span>查看更多</span>
                <i class="el-icon-arrow-down"></i>
              </div>
            </div>
            <!-- 列表项 结束 -->
            <el-empty description="暂无数据..." v-if="evaluateList.length == 0"></el-empty>
          </div>
        </div>

    </div>

  </div>
</template>

<script>
import videoDialog from '../components/videoDialog.vue';

export default {
  name: 'careerIdentity',
  components: {
    videoDialog,
  },
  data(){
    return{
      show_share: false,
      see_uid:'',
      uid:'',
      infoData: {}, // 信息
      count_list: {},
      infoList:[],
      evaluateList: [], //推荐语列表
      page: 1,
      pagesize: 10,
      textarea:'',
      is_return: true,
      dialogVisible: false,

    }
  },
  computed: {
    
  },
  mounted(){
   
  },
  created(){
    this.see_uid = this.$route.query.see_uid || localStorage.getItem('realUid');
    this.uid = localStorage.getItem('realUid');
    this.page = 1;
    this.pagesize = 10;
    console.log(this.page)
    // 获取用户职圈信息
    this.getUserProfile();
    // 获取推荐语列表
    this.getEevaluateList();
  },
  methods: {
    clickMore(){
      this.page = this.page+1;
      this.getEevaluateList();
    },
    // 获取推荐语列表
    getEevaluateList(){
      let that = this;
      let p = {
        page: that.page,
        pagesize: that.pagesize
      }
      let url = `/api/user-evaluate/list?page=${p.page}&pagesize=${p.pagesize}&see_uid=${that.see_uid}`
      // if(that.see_uid != that.uid){
      //   p.see_uid = that.see_uid;
      //   url = `/api/user-evaluate/list?page=${p.page}&pagesize=${p.pagesize}&see_uid=${that.see_uid}`
      // }else{
      //   url = `/api/user-evaluate/list?page=${p.page}&pagesize=${p.pagesize}`
      // }
      this.$axios.get(url,{}).then( res =>{
        if(res.code == 0){
          if(res.data.list.length <= 0){
            this.$message.error({
              message: "暂无更多数据..."
            })
          }else{
            let dataList = that.evaluateList.concat(res.data.list);
            this.evaluateList = dataList;
            // dataList.forEach( ele =>{
            //   ele.show_review = false
            // })
            // this.evaluateList = dataList;
          }
          
        }else{
          this.$message.error({
            message:res.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    //点击推荐语发布按钮
    clickMaskBtn(){
      let that = this;
      let p = {
        content: that.textarea,
        evaluate_user_type: 1,  // 评价用户类型 1.人才用户 2.企业用户
        uid: that.see_uid, // 	被评价人才ID
      }
      console.log(p)
      if( !that.is_return ){
        return
      }
      that.is_return = false;
      that.$axios.post('/api/user-evaluate/create',p).then( res =>{
        if(res.code == 0){
          that.$message.success('发布成功！');
          that.dialogVisible = false;
          this.textarea = '';
          this.page = 1;
          this.pagesize = 10;
          this.evaluateList = [];
          that.getEevaluateList();
        } else{
          that.$message.error({
            message:res.msg
          })
        }
        that.is_return = true;
      }).catch(e =>{
        console.log(e)
        that.is_return = true;
      })
      
    },
    // 删除
    clickItemDelete(i,idx){
      let that = this;
      let item = i;
      let index = idx;
      let evaluateList = that.evaluateList;
      console.log(item)
      let p = {
        id: item.id,
      }
      that.$axios.post('/api/user-evaluate/delete',p).then( res =>{
        if(res.code == 0){
          that.$message.success('删除成功！');
          evaluateList.splice(index,1);
          that.evaluateList = evaluateList;
        } else{
          that.$message.error({
            message:res.msg
          })
        }
        that.is_return = true;
      }).catch(e =>{
        console.log(e)
        that.is_return = true;
      })

    },
    // 是否显示分享
    clickShare(){
      this.show_share = this.show_share ? false : true;
    },
    // 分享按钮点击  1 复制链接  2 微博
    clickShareWent(i){
      const that = this;
      const title = "【自猎网】"; // 标题
      if(i == 2){
        let images = encodeURIComponent(that.infoData.avatar)
        let shareUrl = encodeURIComponent(window.location.href);
        const url = `https://service.weibo.com/share/share.php?url=${shareUrl}&type=3&count=1&appkey=&title=${title}&pic=${images}&searchPic=false&ralateUid=&language=zh_cn&rnd=`;
        window.open(url, '_blank');
        this.show_share = false;
        return;
      }
      navigator.clipboard.writeText(title + window.location.href).then(() => {
        this.$message.success('已复制到剪贴板')
      }).catch(err => {
        console.error('复制失败', err);
      });
    },
    
    clickAttentionTab(name){
      this.$router.push({
        path:'/attentionFans',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          tag:name,
          see_uid: this.see_uid + ''
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
    margin-top: 10px;    
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 2px 3px rgba(0, 0, 0, .2);
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
      height: 146px;
      position: relative;
      overflow: hidden;
      .profile-background-image{
        position: relative;
        width: 100%;
        padding-bottom: 146px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background:  50% / cover;
        background: url('../../../assets/image/circle-info-bg.svg') 50% / cover;;

      }
    }
    .ph5{
      padding: 5px 20px 0 20px;
      position: relative;
      .display-flex{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .pv-top-card--photo{
          margin-top: -112px;
          z-index: 4;
          .pv-top-card__photo-wrapper {
            width: 140px;
            height: 140px;
            box-sizing: border-box;
            background-clip: border-box;
            border-radius: 50%;
            background-color: #fff;
            border: 4px solid #fff;
            box-shadow: none;
            margin: auto;
            position: relative;
            & img {
              width: 132px;
              height: 132px;
              border-radius: 50%;
            }
           
          }
          .div-id{
            font-size: 15px;
            font-weight: bold;
            text-align: center;
          }
        }
        .gz-sx-btn{
          width: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-right: 50px;
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
          padding: 10px 0;
          margin-right: 14px;
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
      .share-content{
        font-size: 14px;
        color: #505050;
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
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
  .recommendation-showbox{
    padding: 10px 20px 20px;
  }
// 评论展示
.items-review-box{
  transition: all 0.5s;
  padding-left: 10px;
  padding-right: 10px;
  background: #f6f6f694;
  height: 0;
  overflow: auto;
  margin-top: 20px;
  &.show-box{
    height: auto;
    padding-top: 10px;
    padding-bottom: 14px;
    max-height: 450px;
  }
  .share-list{
    display: flex;
    align-items: center;
    justify-content: space-around;
    .share-item{
      font-size: 12px;
      color: #505050;
      line-height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      img{
        width: 28px;
        height: 28px;
        margin-bottom: 4px;
      }
      span{
        display: block;
        width: 100%;
        text-align: center; 
      }
    }
  }
}
.recommendation{
  .listview-box{
    background: #FFFFFF;
    border-radius: 6px;
    opacity: 1;
    overflow: hidden;
  }
  .dynamicState-box{
    width: 100%;
    margin-top: 10px;    
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 2px 3px rgba(0, 0, 0, .2);

    .dynamicState-top{
      width: 100%;
      background: #FFFFFF;
      border-radius: 4px 4px 4px 4px;
      position: relative;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #dedfe0;
      .dynamicState-title{
        font-size: 20px;
        font-weight: bold;
      }
      .fb-btn{
        width: 96px;
        height: 35px;
        line-height: 35px;
        background: $g_bg;
        border-radius: 4px;
        color: #fff;
        font-size: 13px;
        text-align: center;
        cursor: pointer;
      }
    }
    .dynamicState-container{
      .container-items-box{
        background: #fff;
        margin-top: 10px;
        position: relative;
        .right-container-title{
          margin-top: 10px;
          width: 100%;
          height: 44px;
          line-height: 44px;
          border-bottom: 1px solid #F2F3F5;
          span{
            margin-left: 20px;
            font-size: 14px;
            color: #86909C;
            line-height: 22px;
          }

        }
        .right-container-item{
          padding: 10px 20px;
          margin-top: 0;
          &:nth-child(1){
            margin-top: 0;
          }
          .title.list-title-box{
            .title-left{
              img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
              }
              span{
                font-size: 14px;
              }
              .name-id-box{
                padding-left: 4px;
                display: flex;
                flex-direction: column;
                .span-id{
                  font-weight: bold;
                }
              }
            }
          }
          .title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title-left{
              display: flex;
              align-items: center;
              img{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin-right: 8px;
              }
              span{
                font-size: 12px;
                font-weight: 400;
                color: #4E5969;
                line-height: 22px;
              }
            }
            
            .title-t{
              font-size: 12px;
              font-weight: 400;
              color: #86909C;
              line-height: 22px;
            }
          }
          .items-c-box{
            .items-c-p{
              font-weight: 400;
              line-height: 22px;
              font-size: 13px;
              color: #666;
            }
          }
          .items-dt-box{
            width: 100%;
            padding-left: 20px;
            border-bottom: 1px solid #eee;
            .items-dt-p{
              font-size: 14px;
              font-weight: 400;
              color: #1F2E4D;
              line-height: 28px;
            }
            .tu-box{
              display: flex;
              align-items: center;
              flex-wrap: wrap;
            }
            .items-img-box{
              height: auto;
              display: flex;
              flex-wrap: wrap;
              margin-top: 14px;
              margin-left: 10px;
              img{
                width: 140px;
                // height: 100px;
                margin-left: 0.5rem;
                &:nth-child(1){
                  margin: 0;
                }
              }
              &>a{
                width: 140px;
                height: 100px;
                margin-left: 0.5rem;
                &:nth-child(1){
                  margin: 0;
                }
                
              }
            }
            .items-img-box:nth-of-type(1){
              margin-left: 0;
            }

          }
          .items-bottom-btn{
            display: flex;
            align-items: center;
            margin-top: 0.8rem;
            position: relative;
            .bottom-btn-items{
              margin-right: 16px;
              display: flex;
              align-items: center;
              cursor: pointer;
              img{
                width: 14px;
                height: 14px;
                margin-right: 4px;
                display: inline-block;
              }
              span{
                font-size: 12px;
                font-weight: 400;
                color: #86909C;
                line-height: 22px;
              }
            }
            .item-delete-img{
              width: 22px;
              height: 22px;
              position: absolute;
              right: 20px;
              bottom: 0;
              display: none;
              cursor: pointer;
            }
          }
        }
        &:hover .items-bottom-btn .item-delete-img{
          display: block;
        }
      }
      
    }
  }
  .publish-box{
    width: 100%;
    padding: 0 10px;
    .dialog-bodybox{
      width: 100%;
      padding: 12px;
      .dialog-img-box{
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        .img-item{
          width: 76px;
          height: 76px;
          background: #f7f8fa;
          flex-shrink: 0;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          border: 1px solid #dedfe0;
          margin-left: 0.6rem;

          img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            -o-object-fit: cover;
            object-fit: cover;
            display: block;
          }
          &:nth-of-type(1){
            margin-left: 0;
          }
        }
        .img-item.add {
          transition: all .2s ease-in-out;
          border: 1px dashed #dedfe0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          color: $g_textColor;
          .avatar-uploader{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .el-upload {
              display: inline-block;
              text-align: center;
              cursor: pointer;
              outline: 0;
              width: 100%;
              height: 100%;
              line-height: 76px;
            }
            .el-upload-dragger{
              width: 100%;
              height: 100%;
              background: none;
              border: none;
            }
          }
        }

      }
      .dialog-content-box{
        width: 100%;
        height: 100%;
        .el-textarea__inner{
          font-size: 14px;
          padding: 0;
          border: none;
          
        }
        /deep/ .el-textarea__inner:focus{
          border-color: $g_color;
        }
      }

    }
    .dialog-footer{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      .el-button{
        padding: 0;
        width: 100px;
        height: 35px;
        line-height: 35px;
      }
      .el-button--primary{
        background-color: $g_color;
        border-color: $g_color;
      }
    }
    
  }
  .sec-footer{
    width: 100%;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .sec-content--more{
      width: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      padding: 10px 20px;
      cursor: pointer;
      i{
        margin-left: 10px;
      }
    }
    .sec-content--more:hover{
      color: $g_color;
    }
  }
}
// 、、、、、、、、、、、、、、、   新版样式  ↑  、、、、、、、、、、、、

</style>
