<template>
  <div>
    <div class="container-title-box">
      <el-tabs v-model="tag" @tab-click="handleClick">

        <el-tab-pane label="评论与回复" name="pingl-hf">
          <div class="container info-box">
            <!-- 列表项 开始 -->
            <div class="container-items-box" v-for="(item,index) in commentReplyList" :key="index">
              <div class="items-left-box">
                <div class="title-t">{{ item.createtime }}</div>
                <div class="items-info-box">
                  <img :src=" item.avatar ? item.avatar : require('../../../assets/image/img-user.jpg' )" alt="" @click.stop="clickName(item)"/>
                  <div class="name-corporation">
                    <div class="text-1"><span class="text-1-span1">{{ item.name }}</span><span class="text-1-span2">{{ item.comment_type_desc }}了你的动态</span></div>
                    <div class="text-3">
                      {{ item.profession_circle_content }}
                    </div>
                    <div class="text-2">
                      <span>丨 {{ item.content }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 列表项 结束 -->
            <el-empty description="暂无数据..." v-if="commentReplyList.length<= 0"></el-empty>
          </div>
        </el-tab-pane>
        <!-- 关注 -->
        <el-tab-pane label="关注" name="attention">
          <div class="container info-box">
            <!-- 列表项 开始 -->
            <div class="container-items-box" v-for="(item,index) in dataList" :key="index">
              <div class="items-left-box">
                <div class="title-t">{{ item.createtime }}</div>
                <div class="items-info-box">
                  <img :src=" item.avatar ? item.avatar : require('../../../assets/image/img-user.jpg' )" alt="" @click.stop="clickName(item)"/>
                  <div class="name-corporation">
                    <div class="text-1"><span>{{ item.real_name }}</span><span class="text-1-span2" v-if="tag == 'fans'">关注了你</span></div>
                    <div class="text-2">
                      <span>{{ item.company_name?item.company_name:'无' }}</span>
                      <span class="span-2">|</span>
                      <span>{{ item.position?item.position:'无'}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="items-right-box">
                <div class="right-btn type-1" v-if="item.status == 2" @click.stop="addAttention(item,index)">
                  <img src="../../../assets/image/Frame_10.png" alt="" />
                  <span>关注</span>
                </div>
                <div class="right-btn type-2" v-if="item.status == 1" @click.stop="cancelAttention(item,index)">
                  <span>已关注</span>
                </div>
              </div>
            </div>
            <!-- 列表项 结束 -->
            <el-empty description="暂无数据..." v-if="dataList.length<= 0"></el-empty>
          </div>
        </el-tab-pane>
        <!-- 粉丝 -->
        <el-tab-pane label="粉丝" name="fans">
          <div class="container info-box">
            <!-- 列表项 开始 -->
            <div class="container-items-box" v-for="(item,index) in dataList" :key="index">
              <div class="items-left-box">
                <div class="title-t">{{ item.createtime }}</div>
                <div class="items-info-box">
                  <img :src=" item.avatar ? item.avatar : require('../../../assets/image/img-user.jpg' )" alt="" @click.stop="clickName(item)"/>
                  <div class="name-corporation">
                    <div class="text-1"><span>{{ item.real_name }}</span><span class="text-1-span2" v-if="tag == 'fans'">关注了你</span></div>
                    <div class="text-2">
                      <span>{{ item.company_name?item.company_name:'无' }}</span>
                      <span class="span-2">|</span>
                      <span>{{ item.position?item.position:'无'}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="items-right-box">
                <div class="right-btn type-1" v-if="item.status == 2" @click.stop="addAttention(item)">
                  <img src="../../../assets/image/icon-plus.png" alt="" />
                  <span>回关</span>
                </div>
                <div class="right-btn type-2" v-if="item.status == 1" @click.stop="cancelAttention(item)">
                  <span>已关注</span>
                </div>
              </div> -->
            </div>
            <!-- 列表项 结束 -->
            <el-empty description="暂无数据..." v-if="dataList.length<= 0"></el-empty>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
export default {
  name: 'attentionFans',
  components: {
  },
  data(){
    return{
      tag: 'attention',
      page: 1,
      dataList:[],
      see_uid: '', // 被查看的ID
      commentReplyList: [], // 评论回复列表
    }
  },
  computed: {
    
  },
  created(){
    console.log(this.$route.query)
    this.tag = this.$route.query.tag?this.$route.query.tag:'attention';
    this.see_uid = this.$route.query.see_uid;
  }, 
  mounted(){
    if(this.tag == 'attention' || this.tag == 'fans'){
      this.getList();
    }
    //  评论回复
    if( this.tag == 'pingl-hf' ){
        this.getCommentReply();
      }
  },
  methods: {
    handleClick(tab, event){
      console.log(tab.name)
      this.page = 1;
      //  评论回复
      if( tab.name == 'pingl-hf' ){
        this.getCommentReply();
      }
      //  关注/ 粉丝
      if(tab.name == 'attention' || tab.name == 'fans' ){
        this.getList();
      }

    },
    // 评论与回复
    getList(){
      this.$axios.post('/api/user/friend/list',{
        page: this.page,
        tag: this.tag,
        see_uid: this.see_uid
      }).then(res =>{
        if(res.code == 0){
          this.dataList = res.data
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 点击头像、名称
    clickName(i){
      console.log(i)
      let uid = localStorage.getItem('realUid');
      this.$router.push({
        path:'/careerIdentity',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          see_uid:i.uid,
        }
      })
      
    },
    // 获取评论回复
    getCommentReply(){
      this.$axios.post('/api/profession-circle/msg/comment-reply',{}).then(res =>{
        if(res.code == 0){
          this.commentReplyList = res.data
        }else{
          this.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 关注
    addAttention(i,idx){
      let dataList = this.dataList;
      let index = idx;
      this.$axios.post('/api/user-attention/attention',{
        attention_uid: i.uid
      }).then( res =>{
        if(res.code == 0){
          this.$message.success('关注成功！');
        }else{
          this.$message.error({
            message:res.msg
          })
        }
        dataList[index].status = 1;
        this.dataList = dataList;
      }).catch(e =>{
        console.log(e)
      })
    },
    // 取消关注
    cancelAttention(i,idx){
      let dataList = this.dataList;
      let index = idx;
      this.$axios.post('/api/user-attention/cancel-attention',{
        attention_uid: i.uid
      }).then( res =>{
        if(res.code == 0){
          this.$message.success('取消成功！');
        }else{
          this.$message.error({
            message:res.msg
          })
        }
        dataList[index].status = 2;
        this.dataList = dataList;
      }).catch(e =>{
        console.log(e)
      })
    },
  
  },
};
</script>

<style lang="scss" scoped>
  .container-title-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    /deep/ .el-tabs{
        height: 100%;
        width: 100%;
        .el-tabs__header {
          height: 100%;
          background: #FFFFFF;
          .el-tabs__nav-wrap{
            height: 100%;
            line-height: 3rem;
            &::after{
              height: 0;
            }
            .el-tabs__nav-scroll {
              height: 100%;
              padding: 0 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              .el-tabs__item.is-active{
                color: $g_color;
              }
              .el-tabs__active-bar{
                bottom: 1px;
                background-color: $g_bg;
              }
            }
          }
        }
      }
  }
  .info-box{
    width: 1200px !important;
    margin: 0 auto;
    width: 100%;
    text-align: left;
    padding: 0.8rem;
    background: #fff;
    border-radius: 4px;
    .container-items-box{
      width: 100%;
      padding: 0.8rem 1.3rem;
      display: flex;
      .items-left-box{
        flex: 1;
        cursor: pointer;
        .title-t{
          font-size: 14px;
          font-weight: 400;
          color: #86909C;
          line-height: 22px;
        }
        .items-info-box{
          display: flex;
          align-items: center;
          margin-top: 1rem;
          img{
            width: 56px;
            height: 56px;
            border-radius: 50%;
          }
          .name-corporation{
            flex: 1;
            margin-left: 0.8rem;
            .text-1{
              font-size: 15px;
              color: $g_color;
              .text-1-span2{
                font-size: 14px;
                padding-left: 10px;
                color: $g_textColor;
              }
            }
            .text-2{
              margin-top: 0.4rem;
              font-size: 14px;
              color: #86909C;
              .span-2{
                padding: 0 8px;
              }
            }
            .text-3{
              margin-top: 10px;
              font-size: 14px;
              font-weight: 400;
              color: $g_textColor;
              line-height: 24px;
            }
          }
        }
      }
      .items-right-box{
        width: auto;
        display: flex;
        align-items: center;
        .right-btn{
          width: auto;
          border-radius: 2px ;
          font-size: 14px;
          line-height: 22px;
          padding: 5px 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 4px;
          img{
            width: 14px;
            height: 14px;
            margin-right: 8px;
          }
          &.type-1{
            background: #37f;
            color: #fff;
          }
          &.type-2{
            color: #666;
            background: #dbdbdb;
          }
        }
      }
    }
  }
</style>
