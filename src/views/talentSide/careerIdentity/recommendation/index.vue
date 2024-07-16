<template>
  <div id="myProfessionalCircle">
    <div class="dynamicState-box view-box">
      <div class="dynamicState-top">
        <div class="dynamicState-title">推荐语</div>
        <!-- <div class="fb-btn" @click="clickPublishBtn">评价</div> -->
      </div>

      <div class="publish-box">

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
        <!-- 列表项 开始  -->
        <div class="container-items-box" v-for="(item,index) in evaluateList" :key="index">
          <div class="right-container-item">
            <div class="title list-title-box">
              <div class="title-left">
                <img :src="item.evaluate_user_avatar?item.evaluate_user_avatar:require('../../../../assets/image/img-user.jpg' )" alt="" />
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
                <!-- <div class="tu-box">
                  <div class="items-img-box" v-if="item.images.length>0">
                    <img :src="items" alt="" title="图片" @click="$preview(idx,item.images)" v-for="(items,idx) in item.images" :key="idx"/>
                  </div>
                  <div class="items-img-box" v-if="item.video">
                    <a href="javascript:0;" title="视频" @click="gotoVideo(item.video)">
                      <video :src="item.video" style="object-fit: fill;" width="100%" height="100%" ></video>
                    </a>
                  </div>
                </div> -->
              </div>
              <div class="items-bottom-btn">
                 <!-- <div class="bottom-btn-items">
                  <img src="../../../../assets/image/preview-open.png" alt="" />
                  <span>{{ item.read_num?item.read_num:0 }}阅读</span>
                </div>
                <div class="bottom-btn-items" @click="clickPoint('',item.id,index)" v-if="item.is_point == 2">
                  <img src="../../../../assets/image/thumbs-up.png" alt="" />
                  <span>{{ item.point_num?item.point_num:0 }} 赞</span>
                </div>
                <div class="bottom-btn-items" @click="clickCancelPoint('',item.id,index)" v-else>
                  <img src="../../../../assets/image/thumbs-up.png" alt="" />
                  <span class="point-hover">{{ item.point_num?item.point_num:0 }} 已赞</span>
                </div>
               <div class="bottom-btn-items" @click.stop="clickReview(item,index)">
                  <img src="../../../../assets/image/comment.png" alt="" />
                  <span>{{ item.comment_num?item.comment_num:0 }}评论</span>
                </div> -->
                <img src="../../../../assets/image/icon-copy.png" alt="删除"  class="item-delete-img" @click.stop="clickItemDelete(item,index)"  v-if="uid == item.uid"/>
                <img src="../../../../assets/iconfont/link-icon.svg" alt="点赞"  class="item-link-img"  />
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
    

     <!-- 视频弹窗 -->
     <videoDialog :infoData="video_url"  ref="video" />

  </div>
</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth';
import videoDialog from '../../components/videoDialog.vue';

export default {
  name: 'dynamicState',
  components: {
    videoDialog
  },
  props:{
    see_uid:{
      type: String,
      default() {
        return ''
      }
    },
  },
  data(){
    return{
      uid:'',
      activeName: 'second',
      dialogVisible: false,
      uploadData:{
        up_tag: 'other'
      },
      textarea:'',
      upImgList:[],
      video_files_path:[],
      is_return: true,
      video_url: {
        video_url: '',
      },
      tag: 2,
      infoData: {},
      count_list: {},
      evaluateList: [], //推荐语列表
      page: 1,
      pagesize: 10,


      // 点击选中的列表项
      seltItemInfoData: {},
      detailData:{}, // 动态获取详情
      content:'',
      id: '',
      is_content: false, // 评论框展示判断
      recoverVisible: false,
      recover_value: '',
      reply_content:'', // 回复弹窗 value
      reply_id: 0,
    }
  },
  computed: {
    
  },
  mounted(){
    this.uid = localStorage.getItem('realUid');
  },
  created(){
    // 获取推荐语列表
    this.getEevaluateList();
  },
  methods: {
    recoverValueClose(){

    },
    clickTab(n){
      this.tag = n;
    },
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
      this.$axios.get('/api/user-evaluate/list?page=' + p.page + '&pagesize=' + p.pagesize,{}).then( res =>{
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
    // 点击点赞
    clickPoint(s,it_id,idx,c_id){
      console.log('clickPoint')
      let that = this;
      let index = idx;
      let evaluateList =that.evaluateList;
      let p = {
        profession_circle_id: it_id,
      }
      if(s == 'commentID'){
        // 职圈评论id
        p.comment_id = c_id;
      }
      that.$axios.post('/api/profession-circle/point',p).then( res =>{
        if( res.code == 0 ){
          that.$message.success('点赞成功！');
            if(s == 'commentID'){
              // 职圈评论
              setTimeout( () =>{
              //获取职圈详情
                that.getInfoData();
              },1000)
            }else{
              evaluateList[index].point_num++;
              evaluateList[index].is_point = 1;
              that.evaluateList = evaluateList;
              console.log(that.evaluateList)
            }
           
           
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
    clickCancelPoint(s,it_id,idx,c_id){
      let that = this;
      let index = idx;
      let evaluateList =that.evaluateList;
      let p = {
        profession_circle_id: it_id,
      }
      if(s == 'commentID'){
        // 职圈评论id
        p.comment_id = c_id;
      }
      that.$axios.post('/api/profession-circle/cancel-point',p).then( res =>{
        if( res.code == 0 ){
          that.$message.success('取消成功！');
          if(s == 'commentID'){
              // 职圈评论
              setTimeout( () =>{
              //获取职圈详情
              that.getInfoData();
              },1000)
            }else{
              evaluateList[index].point_num--;
              evaluateList[index].is_point = 2;
              that.evaluateList = evaluateList;
              console.log(that.evaluateList)
            }
        }else{
          that.$message.error({
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
      this.reply_id = item.id;
      this.recoverVisible = true;
    },
    clickitemsDelt(item,index){
      let that = this;
      console.log(item)
      let detailData = this.detailData;
      console.log(item)
      detailData.comment_list.splice(index,1);
      detailData.comment_num--;
      that.detailData = detailData;
      return
      let p = {
        id: item.id,
      }
      that.$axios.post('',p).then( res =>{
        if(res.code == 0){
          that.$message.success('删除成功！');
          detailData.comment_list.splice(index,1);
          that.detailData = detailData;
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
    // 点击列表 评论按钮
    clickReview(i,idx){
      let that = this;
      that.seltItemInfoData = i;
      that.id = i.id;
      that.getInfoData();
      let evaluateList = that.evaluateList;
      if(evaluateList[idx].show_review == true){
        evaluateList[idx].show_review = false;
        that.evaluateList = evaluateList;
        return
      }
      evaluateList.forEach( ele =>{
        ele.show_review = false;
      })
      evaluateList[idx].show_review = true;
      that.evaluateList = evaluateList;
    },
    // 获取详情
   async getInfoData(){
      await this.$axios.post('/api/profession-circle/detail',{
        profession_circle_id: this.id
      }).then( res =>{
        if( res.code == 0 ){
          this.detailData = res.data;
        }else{
          this.$message.error({
            message:res.msg
          })
        }
      }).catch( e =>{
        console.log(e)
      })
    },

    // 点击发布
    clickPublishBtn(){
      this.dialogVisible = true;
    },  
    //点击弹窗发布按钮
    clickMaskBtn(){
      let that = this;
      let p = {
        content: that.textarea,
        evaluate_user_type: 1,  // 评价用户类型 1.人才用户 2.企业用户
        uid: that.see_uid, // 	被评价人才ID
      }
      // let upImgList = that.upImgList;
      // let video_files_path = that.video_files_path;
      // let video = [];
      // let images = [];

      // if(upImgList.length > 0){
      //   upImgList.forEach( ele =>{
      //     images.push(ele.upload_files_path)
      //   })
      //   let str = images.toString(',');
      //   p.images = str;
        
      // }
      // if(video_files_path.length > 0){
      //   video_files_path.forEach( ele =>{
      //     video.push(ele.upload_files_path)
      //   })
      //   let video_str = video.toString(',');
      //   p.video = video_str;
      // }
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
          // that.upImgList = [];
          // that.video_files_path = [];
          // 获取推荐语列表
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
    handleClose(done) {
      this.dialogVisible = false;
    },
    logout() {
      // debugger
      setToken('');
      // 清除缓存的权限菜单
      sessionStorage.removeItem("route")
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 上传图片
    uploadArticleCover(param){
      let data = {
        file: param.file,
        up_tag: 'other'
      }
      this.uploadFile(data);
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type == 'image/png' || 'image/jpeg'|| 'image/jpg'|| 'image/gif'|| 'image/webp';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是图片格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 上传视频限制
    beforeVideoUpload(file) {
      console.log(file.type)
      const isJPG = file.type == ('video/mp4' || 'video/avi' || 'video/wmv' || 'video/flv' || 'video/rmvb' || 'video/mov');
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error('上传只能是 视频 格式!');
      }
      if (!isLt10M) {
        this.$message.error('上传大小不能超过 10MB!');
      }
      return isJPG && isLt10M;
    },
    // 选择的文件超出限制的文件总数量时触发
    limitCheck() {
      this.$message.warning('每次最多上传1个文件')
    },
    // 点击上传 ----  视频
    up_video(param){
      console.log(param)
      let data = {
        file: param.file,
        up_tag: 'video'
      }
      this.uploadFile(data);
    },
    uploadFile(data){
      console.log(data)
      let that = this;
      const formData = new FormData();
      formData.append('file[]',data.file);
      if(data.up_tag == 'other'){
        formData.append('up_tag','other');
      }
      if(data.up_tag == 'video'){
        formData.append('up_tag','video');
      }
      formData.append('pictureCategory','articleCover');
      that.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then( res=>{
        let info = res.data;
        if(data.up_tag == 'video'){
          that.video_files_path.push(info);
        }
        if(data.up_tag == 'other'){
          that.upImgList.push(info);
        }
        that.$refs['upload'].clearFiles();
        that.$refs['upload_video'].clearFiles();
      }).catch( e=>{
        console.log('erro')
        if(data.up_tag == 'video'){
          that.$refs['upload_video'].clearFiles();
        }
        if(data.up_tag == 'other'){
          that.$refs['upload'].clearFiles();
        }
      })
    },
    // 点击视频
    gotoVideo(url){
      this.video_url = {
        video_url: url
      }
      this.$refs.video._data.video_dialogVisible = true;
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
            .item-link-img{
              width: 22px;
              height: 22px;
              position: absolute;
              right: 40px;
              bottom: 0;
              display: none;
              cursor: pointer;
            }
          }
        }
        &:hover .items-bottom-btn .item-delete-img,
        &:hover .items-bottom-btn .item-link-img{
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
</style>
