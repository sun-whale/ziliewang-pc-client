<template>
  <div class="container info-box">
    <div class="info-left-box">
      <div class="info-right-container">
        <!-- 列表项 开始 -->
        <div class="container-items-box" v-if="infoData.users">
          <div class="right-container-item">
            <div class="title">
              <div class="title-left" @click.stop="clickName(infoData)" >
                <img :src="infoData.users.avatar?infoData.users.avatar:require('../../../../assets/image/img-user.jpg')" alt="" class="avatar-img"/>
                <span>{{ infoData.users.name }}</span>
              </div>
              <div class="title-t">{{ infoData.createtime }}</div>
            </div>

            <div class="items-c-box">
              <div>
                <div class="items-c-p">{{ infoData.content }}</div>
                <div class="items-img-box" v-if="infoData.images.length>0">
                  <img :src="items" alt="" @click="$preview(idx,infoData.images)" v-for="(items,idx) in infoData.images" :key="idx"/>
                </div>
                <div class="items-img-box" v-if="infoData.video">
                  <a href="javascript:0;" title="视频" @click="gotoVideo(infoData.video)">
                    <video :src="infoData.video" style="object-fit: fill;" width="100%" height="100%" ></video>
                  </a>
                </div>
              </div>
              <div class="items-bottom-btn">
                <div class="bottom-btn-items">
                  <img src="../../../../assets/image/preview-open.png" alt="" />
                  <span>{{ infoData.read_num }} 阅读</span>
                </div>
                <div class="bottom-btn-items" @click="clickPoint " v-if="infoData.is_point == 2">
                  <img src="../../../../assets/image/thumbs-up.png" alt="" />
                  <span>{{ infoData.point_num }} 赞</span>
                </div>
                <div class="bottom-btn-items" @click="clickCancelPoint " v-else>
                  <img src="../../../../assets/image/thumbs-up.png" alt="" />
                  <span class="point-hover">{{ infoData.point_num }} 已赞</span>
                </div>
                
                <div class="bottom-btn-items">
                  <img src="../../../../assets/image/comment.png" alt="" />
                  <span>{{ infoData.comment_num }} 评论</span>
                </div>
              </div>
            </div>
            <div class="fabu-box">
              <el-input type="text" v-model="content" placeholder="评论千万条，友善第一条"></el-input>
              <el-button type="primary" @click="clickInfoVerifyBtn(1)">评论</el-button>
            </div>
            <!-- 评论模块 开始 -->
            <div class="comment-box">
              <div class="comment-title-box"><span>{{ infoData.comment_num }}</span>评论</div>

              <div class="comment-list-box">
                <ul>
                  <li v-for="(items,index) in infoData.comment_list" :key="index">
                    <div class="title">
                      <div class="title-left" @click.stop="clickName(items)">
                        <img :src="items.avatar?items.avatar:require('../../../../assets/image/img-user.jpg')" alt="" class="avatar-img"/>
                        <span>{{ items.name }}</span>
                        <img src="../../../../assets/image/right-one.png" alt="" class="right-one" v-if="items.reply_id"/>
                        <span v-if="items.reply_id">{{ items.publish_name }}</span>
                      </div>
                      <div class="title-t">{{ items.createtime }}</div>
                    </div>
                    <div class="items-c-box">

                      <div class="items-c-p">{{ items.content }}</div>

                      <div class="items-bottom-btn">
                        <div class="bottom-btn-items" @click="clickPoint('commentID',items.id) " v-if="items.is_point == 2">
                          <img src="../../../../assets/image/thumbs-up.png" alt="" />
                          <span>{{ items.point_num }} 赞</span>
                        </div>
                        <div class="bottom-btn-items" @click="clickCancelPoint('commentID',items.id) " v-else>
                          <img src="../../../../assets/image/thumbs-up.png" alt="" />
                          <span class="point-hover">{{ items.point_num }} 已赞</span>
                        </div>
                        <div class="bottom-btn-items" @click.stop="clickRecover(items)">
                          <img src="../../../../assets/image/comment.png" alt="" />
                          <span>{{ items.comment_num }} 回复</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
            <!-- 评论模块 结束 -->
          </div>
        </div>
        <!-- 列表项 结束 -->
      </div>
    </div>
    <!-- 右侧模块 开始 -->
    <div class="info-right-box">
      <!-- 热门推荐 -->
      <hotRecommendation />
    </div>
    <!-- 右侧模块 结束 -->


    <!-- 回复弹窗 -->
    <div class="recoverVisible">
      <el-dialog title="回复评论" :visible.sync="recoverVisible" width="482px" :before-close="recoverValueClose">
        <div class="cententinfo-box">
          <div class="demo-input-suffix">
            <el-input v-model="recover_value" type="text" name="recover_value" placeholder="回复评论"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="recoverVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickInfoVerifyBtn(2)">确 定</el-button>
        </span>
      </el-dialog>
    </div>


    <!-- 视频弹窗 -->
    <videoDialog :infoData="video_url"  ref="video" />
  </div>

</template>

<script>
import hotRecommendation from '../components/hotRecommendation.vue';
import videoDialog from '../../components/videoDialog.vue';

export default {
  name: 'circleDetails',
  components: {
    hotRecommendation,
    videoDialog
  },
  data(){
    return{
      infoData:{},
      content:'',
      id: '',
      is_content: false, // 评论框展示判断
      recoverVisible: false,
      recover_value: '',
      reply_content:'', // 回复弹窗 value
      reply_id: 0,
      video_url: {
        video_url: '',
      },
      userVipRank: localStorage.getItem('userVipRank') || 0,
    }
  },

  created(){
    this.id = this.$route.query.id;
  },
  mounted(){
    //获取职圈详情
    this.getInfoData();
  },
  computed: {
    
  },
  methods: {
    recoverValueClose(){

    },
    // 获取详情
   async getInfoData(){
      await this.$axios.post('/api/profession-circle/detail',{
        profession_circle_id: this.id
      }).then( res =>{
        if( res.code == 0 ){
          this.infoData = res.data;
        }else{
          this.$message.error({
            message:res.msg
          })
        }
      }).catch( e =>{
        console.log(e)
      })
    },
    // 点击头像、名称
    clickName(i){
      console.log(i)
      let uid = localStorage.getItem('realUid');
      this.$router.push({
        path:'/careerIdentity',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          see_uid:i.uid+ '',
        }
      })
      
    },
    // 点击评论
    // clickComment(i){
    //   this.is_content = true;
    // },
    // 发布评论
    clickInfoVerifyBtn(n){
      let that = this;
      let num = n; // 1 评论职圈； 2、回复评论
      let p = {
        profession_circle_id: that.id,
      }
      if( num == 1){
        p.content= that.content;
      }
      if( num == 2){
        p.reply_id = that.reply_id;
        p.content = that.recover_value;
      }
      that.$axios.post('/api/profession-circle/comment',p).then( res =>{
        console.log(res)
        if( res.code == 0 ){
          let text = '';
          if(num == 1){
            text = '评论成功！';
            that.content = '';
          }
          if(num == 2){
            text = '回复成功！';
            that.recoverVisible = false;
            that.recover_value = '';
          }
          that.$message.success(text);
          setTimeout( ()=>{
            // this.is_content = false;
            //获取职圈详情
            that.getInfoData();
          },1500)
          
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch( e =>{
        console.log(e)
      })
    },
    // 点击点赞
    clickPoint(s,id){
      console.log('clickPoint')
      let infoData = this.infoData;
      let p = {
        profession_circle_id: this.id,
      }
      if(s == 'commentID'){
        // 职圈评论id
        p.comment_id = id;
      }
      this.$axios.post('/api/profession-circle/point',p).then( res =>{
        if( res.code == 0 ){
            this.$message.success('点赞成功！');
            setTimeout( () =>{
              //获取职圈详情
              this.getInfoData();
            },1000)
           
        }else{
          this.$message.error({
            message:res.msg
          })
        }
      }).catch( e =>{
        console.log(e)
      })
    },
    // 取消
    clickCancelPoint(s,id){
      let infoData = this.infoData;
      let p = {
        profession_circle_id: this.id,
      }
      if(s == 'commentID'){
        // 职圈评论id
        p.comment_id = id;
      }
      this.$axios.post('/api/profession-circle/cancel-point',p).then( res =>{
        if( res.code == 0 ){
          this.$message.success('取消成功！');
          setTimeout( () =>{
            //获取职圈详情
            this.getInfoData();
          },1000)
        }else{
          this.$message.error({
            message:res.msg
          })
        }
      }).catch( e =>{
        console.log(e)
      })
    },
    // 点击评论列表回复
    clickRecover(item){
      if(this.userVipRank < 1){
        this.$message.error("需要升级为VIP会员可评论、回复!");
        setTimeout( () =>{
          this.$router.push('/talentSide/topUpBuy');
        },1000)
        return
      }
      console.log(item)
      this.reply_id = item.id;
      this.recoverVisible = true;
    },
    // 点击视频
    gotoVideo(url){
      this.video_url = {
        video_url: url
      }
      this.$refs.video._data.video_dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
   .info-box{
    width: 1200px !important;
    margin: 0 auto;
    margin-top: 1rem;
    width: 100%;
    display: flex;
    text-align: left;
    .info-left-box{
      flex: 1;
      .info-right-container{
        .container-items-box{
          background: #fff;
          .right-container-title{
            margin-top: 1rem;
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
            padding: 1.2rem;
            margin-top: 0;
            &:nth-child(1){
              margin-top: 0;
            }
            .title{
              display: flex;
              align-items: center;
              justify-content: space-between;
              .title-left{
                display: flex;
                align-items: center;
                cursor: pointer;
                img.avatar-img{
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  margin-right: 8px;
                }
                img.right-one{
                  width: 16px;
                  height: 16px;
                  margin: 0 8px;
                }
                span{
                  font-size: 14px;
                  font-weight: 400;
                  color: #4E5969;
                  line-height: 22px;
                }
              }
             
              .title-t{
                font-size: 14px;
                font-weight: 400;
                color: #86909C;
                line-height: 22px;
              }
            }
            .items-c-box{
              width: 100%;
              padding-left: 2rem;
              .items-c-p{
                font-size: 14px;
                font-weight: 400;
                color: #1F2E4D;
                line-height: 28px;
              }
              .items-img-box{
                width: 100%;
                height: auto;
                display: flex;
                flex-wrap: wrap;
                margin-top: 0.8rem;
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
            }
            .items-bottom-btn{
              display: flex;
              align-items: center;
              margin-top: 0.8rem;
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
                  font-size: 14px;
                  font-weight: 400;
                  color: #86909C;
                  line-height: 22px;
                }
              }
            }
            .fabu-box{
              width: 100%;
              height: auto;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 1rem;
              padding: 0 20px;
              /deep/ .el-button{
                padding: 0;
                width: 100px;
                height: 2rem;
                line-height: 2rem;
                margin-left: 20px;
              }
              /deep/ .el-button--primary{
                background-color: $g_color;
                border-color: $g_color;
              }
              /deep/ .el-input__inner{
                height: 2rem;
                line-height: 2rem;
                font-size: 0.7rem;
              }
            }
            .comment-box{
              width: 100%;
              margin-top: 2rem;
              .comment-title-box{
                font-size: 0.8rem;
                font-weight: bold;
                color: $g_textColor;
                line-height: 24px;
                position: relative;
                display: flex;
                align-items: center;
                &::after{
                  width: 3px;
                  height: 70%;
                  content: '';
                  background: $g_bg;
                  position: absolute;
                  left: 0;
                  top: 50%;
                  transform: translateY(-50%);
                }
                span{
                  padding: 0 0.5rem;
                }
              }
              .comment-list-box{
                width: 100%;
                margin-top: 0.8rem;
                ul{
                  width: 100%;
                  li{
                    width: 100%;
                    margin-top: 0.8rem;
                    .items-bottom-btn{
                      margin-top: 0.4rem;
                    }
                  }
                }
              }
            }

          }

        }
        
      }
    }
    .info-right-box{
      width: 380px;
      padding-left: 0.8rem;
    }
  }

  .container{
    /deep/ .el-dialog{
      min-width: 420px;
      top: 50%;
      transform: translateY(-50%);
      margin-top: 0 !important;
      .el-dialog__header{
        text-align: left;
        .el-dialog__title{
          font-size: 15px;
          color: $g_textColor;
        }
      }
      .el-dialog__body{
        height: auto;
        overflow: hidden;
        padding: 20px;
        .cententinfo-box{
          width: 100%;
          margin-top: 10px;
          .cententinfo-title{
            font-size: 14px;
            font-weight: 400;
            color: $g_textColor;
            line-height: 22px;
            text-align: left;
          }
          .demo-input-suffix{
            width: 100%;
            display: flex;
            align-items: center;
            span{
              width: auto;
              font-size: 14px;
              font-weight: 400;
              color: #000000;
              line-height: 22px;
            }
            .el-input {
              position: relative;
              font-size: 14px;
              flex: 1;
              margin-left: 10px;
            }
            .el-input__inner {
              font-size: 14px;
              padding: 14px 10px;
              width: 100%;
              border: 1px solid #e9e9e9;
              border-radius: 4px;
              outline: none;
              box-sizing: border-box;
              display: block;
              box-shadow: none;
              transition: border .3s;
              background-color: #fff;
              resize: none;
            }
            .el-input__inner:hover{
              border-color: $g_color;
            }
            .el-input.is-active .el-input__inner, .el-input__inner:focus{
              border-color: $g_color;
              outline: 0;
            }

          }

        }
      }
      .el-button{
        padding: 0;
        width: 100px;
        height: 40px;
        line-height: 40px;
      }
      .el-button--primary{
        background-color: $g_color;
        border-color: $g_color;
      }

      
    }
  }
</style>
