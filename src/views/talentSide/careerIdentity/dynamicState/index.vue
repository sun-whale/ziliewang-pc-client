<template>
  <div id="myProfessionalCircle">
    <div class="dynamicState-box view-box">
      <div class="dynamicState-top">
        <div class="dynamicState-title">推荐语</div>
        <div class="fb-btn" @click="clickPublishBtn">评价</div>
      </div>
      <div class="dynamicState-container">
        <!-- 列表项 开始 -->
        <div class="container-items-box" v-for="(item,index) in dataList" :key="index">
          <!-- <div class="right-container-title"><span>回忆那么真</span><span>发布了动态</span></div> -->
          <div class="right-container-item">
            <div class="title list-title-box">
              <div class="title-left">
                <img :src="infoData.avatar?infoData.avatar:require('../../../../assets/image/img-user.jpg' )" alt="" />
                <span>{{ infoData.real_name }}</span>
                <div class="name-id-box">
                  <span>{{ infoData.real_name }}</span>
                  <span class="span-id">ID: {{ infoData.uid }}</span>
                </div>
              </div>
              <div class="title-t">{{ item.createtime }}</div>
            </div>

            <div class="items-dt-box">
              <div>
                <div class="items-dt-p">{{ item.content }}</div>
                <div class="tu-box">
                  <div class="items-img-box" v-if="item.images.length>0">
                    <img :src="items" alt="" title="图片" @click="$preview(idx,item.images)" v-for="(items,idx) in item.images" :key="idx"/>
                  </div>
                  <div class="items-img-box" v-if="item.video">
                    <a href="javascript:0;" title="视频" @click="gotoVideo(item.video)">
                      <video :src="item.video" style="object-fit: fill;" width="100%" height="100%" ></video>
                    </a>
                  </div>
                </div>
                
              </div>
              <div class="items-bottom-btn">
                <div class="bottom-btn-items">
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
                </div>
                <img src="../../../../assets/image/icon-copy.png" alt="删除"  class="item-delete-img" @click.stop="clickItemDelete(item,index)"  v-if="uid == infoData.uid"/>
              </div>

              <!-- 评论区域 开始 -->
              <div class="items-review-box" :class="item.show_review?'show-box':''">
                <div class="fabu-box">
                  <el-input type="text" v-model="content" placeholder="评论千万条，友善第一条"></el-input>
                  <el-button type="primary" @click="clickInfoVerifyBtn(1)">评论</el-button>
                </div>
                <!-- 评论列表模块 开始 -->
                <div class="comment-box">
                  <div class="comment-title-box"><span>{{ detailData.comment_num }}</span>评论</div>

                  <div class="comment-list-box">
                    <ul>
                      <li v-for="(items,c_index) in detailData.comment_list" :key="c_index">
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
                            <div class="bottom-btn-items" @click="clickPoint('commentID',item.id,c_index,items.id)" v-if="items.is_point == 2">
                              <img src="../../../../assets/image/thumbs-up.png" alt="" />
                              <span>{{ items.point_num }} 赞</span>
                            </div>
                            <div class="bottom-btn-items" @click="clickCancelPoint('commentID',item.id,c_index,items.id) " v-else>
                              <img src="../../../../assets/image/thumbs-up.png" alt="" />
                              <span class="point-hover">{{ items.point_num }} 已赞</span>
                            </div>
                            <div class="bottom-btn-items" @click.stop="clickRecover(items)">
                              <img src="../../../../assets/image/comment.png" alt="" />
                              <span>{{ items.comment_num }} 回复</span>
                            </div>
                            <div class="bottom-btn-items" @click.stop="clickitemsDelt(items,c_index)" v-if="uid == infoData.uid">
                              <img src="../../../../assets/image/icon-copy.png" alt="" />
                              <span>删除</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>
                <!-- 评论列表模块 结束 -->
              </div>
              <!-- 评论区域 结束 -->
            </div>
          </div>
        </div>
        <!-- 列表项 结束 -->
        <el-empty description="暂无数据..." v-if="dataList.length == 0"></el-empty>
      </div>
    </div>
    
    <!-- 、、、、 发布弹窗 、、、、 -->
    <el-dialog :visible.sync="dialogVisible" width="640px" :before-close="handleClose">
      <div class="login-type-box">
        <span :class=" tag == 2?'hover':'' " @click="clickTab(2)">图片</span>
        <span :class=" tag == 1?'hover':'' " @click="clickTab(1)">视频</span>
      </div>
      <div class="dialog-bodybox">
        <!-- 发图片 开始-->
        <div class="dialog-img-box" v-if="tag == 2">
          <div class="img-item" v-for="(item,index) in upImgList" :key="index">
            <img :src="item.upload_files" alt="" />
          </div>
          <div class="img-item add">
            <el-upload class="avatar-uploader" 
              ref="upload" 
              action= "none"
              multiple
              :limit="3"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :data="uploadData"
              :http-request="uploadArticleCover" 
              >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </div>
        <!-- 发图片 结束-->
        <!-- 发视频 开始-->
        <div class="dialog-img-box" v-if="tag == 1">
          <div class="img-item" v-for="(item,index) in video_files_path" :key="index">
            <video :src="item.upload_files" style="object-fit: fill;" width="100%" height="100%" ></video>
          </div>
          <div class="img-item add">
              <el-upload class="avatar-uploader" 
                drag ref="upload_video" 
                action= "none"
                :limit="1"
                :show-file-list="false"
                multiple
                :before-upload="beforeVideoUpload"
                :http-request="up_video" 
                :on-exceed='limitCheck'
              >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </div>
        <!-- 发视频 结束-->
        <div class="dialog-content-box">
          <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </div>
      </div>
      
      <div slot="footer" class="dialog-footer">
        <!-- <div><span>1</span><span>2</span><span>3</span></div> -->
        <el-button type="primary" @click="clickMaskBtn">发布</el-button>
      </div>
    </el-dialog>

     <!-- 视频弹窗 -->
     <videoDialog :infoData="video_url"  ref="video" />
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
      dataList: [], //动态列表
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
    // 获取用户职圈信息
    this.getUserProfile();
  },
  methods: {
    recoverValueClose(){

    },
    clickTab(n){
      this.tag = n;
    },
    // 点击列表
    // clicklistItems(i){
    //   this.$router.push({
    //     path:'/professionalCircle/circleDetails',   //跳转的路径
    //     query:{           //路由传参时push和query搭配使用 ，作用时传递参数
    //       id:i.id,
    //     }
    //   })
    // },

    // 获取用户职圈信息
    getUserProfile(){
      this.$axios.post('/api/profession-circle/my',{
        see_uid: this.see_uid
      }).then( res =>{
        if(res.code == 0){
          this.infoData = res.data.users;
          this.count_list = res.data.count_list;
          let dataList = res.data.list;
          dataList.forEach( ele =>{
            ele.show_review = false
          })
          this.dataList = dataList;
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
      let dataList =that.dataList;
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
              dataList[index].point_num++;
              dataList[index].is_point = 1;
              that.dataList = dataList;
              console.log(that.dataList)
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
      let dataList =that.dataList;
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
              dataList[index].point_num--;
              dataList[index].is_point = 2;
              that.dataList = dataList;
              console.log(that.dataList)
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
      let dataList = that.dataList;
      if(dataList[idx].show_review == true){
        dataList[idx].show_review = false;
        that.dataList = dataList;
        return
      }
      dataList.forEach( ele =>{
        ele.show_review = false;
      })
      dataList[idx].show_review = true;
      that.dataList = dataList;
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

    // 点击发布
    clickPublishBtn(){
      this.dialogVisible = true;
    },  
    //点击弹窗发布按钮
    clickMaskBtn(){
      let that = this;
      let p = {
        content: that.textarea,
      }
      let upImgList = that.upImgList;
      let video_files_path = that.video_files_path;
      let video = [];
      let images = [];

      if(upImgList.length > 0){
        upImgList.forEach( ele =>{
          images.push(ele.upload_files_path)
        })
        let str = images.toString(',');
        p.images = str;
        
      }
      if(video_files_path.length > 0){
        video_files_path.forEach( ele =>{
          video.push(ele.upload_files_path)
        })
        let video_str = video.toString(',');
        p.video = video_str;
      }
      console.log(p)
      if( !that.is_return ){
        return
      }
      that.is_return = false;
      that.$axios.post('/api/profession-circle/create',p).then( res =>{
        if(res.code == 0){
          that.$message.success('发布成功！');
          that.dialogVisible = false;
          this.textarea = '';
          that.upImgList = [];
          that.video_files_path = [];
          // 获取用户职圈信息
          that.getUserProfile();
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
      let dataList = that.dataList;
      console.log(item)
      let p = {
        id: item.id,
      }
      that.$axios.post('/api/profession-circle/delete',p).then( res =>{
        if(res.code == 0){
          that.$message.success('删除成功！');
          dataList.splice(index,1);
          that.dataList = dataList;
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
    margin-top: 20px;    
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 2px 3px rgba(0, 0, 0, .2);

    .dynamicState-top{
      width: 100%;
      background: #FFFFFF;
      border-radius: 4px 4px 4px 4px;
      position: relative;
      padding: 10px 20px 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
          padding: 10px 30px;
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
            // 评论展示
            .items-review-box{
              transition: all 0.5s;
              padding-left: 16px;
              padding-right: 16px;
              background: #f6f6f694;
              margin-top: 10px;
              height: 0;
              overflow: auto;
              &.show-box{
                height: auto;
                padding-top: 16px;
                padding-bottom: 16px;
                max-height: 450px;
              }
              .fabu-box{
                width: 100%;
                height: auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                /deep/ .el-button{
                  padding: 0;
                  width: 100px;
                  height: 35px;
                  line-height: 35px;
                  margin-left: 20px;
                }
                /deep/ .el-button--primary{
                  background-color: $g_color;
                  border-color: $g_color;
                }
                /deep/ .el-input__inner{
                  height: 35px;
                  line-height: 35px;
                  font-size: 13px;
                }
              }
              .comment-box{
                width: 100%;
                margin-top: 20px;
                .comment-title-box{
                  font-size: 14px;
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
                  margin-top: 14px;
                  ul{
                    width: 100%;
                    li{
                      width: 100%;
                      margin-top: 10px;
                      .items-bottom-btn{
                        margin-top: 6px;
                      }
                    }
                  }
                }
              }
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
  #myProfessionalCircle /deep/ .el-dialog{
    top: 50%;
    transform: translateY(-50%);
    margin-top: 0 !important;
    .dialog-bodybox{
      width: 100%;
      border-radius: 8px;
      border: 1px solid #E5E6EB;
      padding: 12px;
      margin-top: 10px;
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
        margin-top: 16px;
        .el-textarea__inner{
          font-size: 14px;
          padding: 0;
          border: none;
          &:focus{
            border-color: $g_color;
          }
        }
      }

    }
    .login-type-box{
        width: 100%;
        display: flex;
        align-items: center;
        span{
          text-align: center;
          font-size: 16px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #4E5969;
          line-height: 28px;
          position: relative;
          padding: 4px 20px;
          cursor: pointer;
        }
        span.hover{
          font-weight: bold;
          color: $g_textColor;
          &::after{
            content: '';
            width: 44px;
            height: 3px;
            background: $g_color;
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
          }
        }
      }
    .el-dialog__body{
      padding: 0 20px;
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

    // 评论回复弹窗
    .recoverVisible{
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
