<template>
  <div class="label-items-box">
    <div class="box-title">
      <div class="title-1">秀出企业视频与美图</div>
      <div class="title-2">亮眼的视频和图片是企业品牌建设的重要一步</div>
    </div>
    <div class="items-box">
      <div class="title">企业视频 (选填)</div>
      <div class="info-box">
        <div class="info-items" v-for="(item,index) in video_files_path" :key="index">
          <a href="javascript:0;" title="视频" @click="gotoVideo(item)">
            <video :src="item" style="object-fit: fill;" width="100%" height="100%" ></video>
            <div class="icon-img-box">
              <img class="icon-img" title="删除" src="../../../../assets/image/bossSide/icon-copy.png" alt="" @click.stop="deleteVideo(item,index)"/>
            </div>
          </a>
        </div>
        <div class="info-items">
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
            <img src="../../../../assets/image/bossSide/icon-add.png" alt="" class="add-img" />
            <div class="file-tips">企业视频</div>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="items-box">
      <div class="title">企业美图 (选填)</div>
      <div class="info-box">
        <div class="info-items" v-for="(item,index) in image_files_path" :key="index">
          <a href="javascript:0;" title="图片" @click="$preview(index,image_files_path)">
            <img :src="item" alt="" class="image-box" />
            <div class="icon-img-box">
              <img class="icon-img" title="删除" src="../../../../assets/image/bossSide/icon-copy.png" alt="" @click.stop="deleteImg(item,index)" />
            </div>
          </a>
        </div>
        <div class="info-items">
          <el-upload class="avatar-uploader" 
            drag ref="upload" 
            action= "none"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="up_image" 
            >
            <img src="../../../../assets/image/bossSide/icon-add.png" alt="" class="add-img" />
            <div class="file-tips">点击上传美图</div>
          </el-upload>
        </div>
      </div>
    </div>

    <div class="btn-box">
      <el-button type="primary" @click="submitForm('btn')">保存</el-button>
    </div>

    <!-- 视频弹窗 -->
    <videoDialog :infoData="infoData"  ref="video" />
  </div>
</template>

<script>
import videoDialog from './videoDialog.vue';
export default {
  components: {
    videoDialog
  },
  props:{
    data:{
      type: Object,
      default() {
          return {}
        }
    }
  },
  data(){
    return{
      video_files_path:[],
      image_files_path:[],
      infoData:{}
    }
  },
  created(){
    // 获取信息
    this.getDetail();
  },
  mounted(){
 
  },
  computed: {
    
  },
  methods: {
    // 点击删除图片
    deleteImg(i,idx){
      let image_files_path = this.image_files_path;
      image_files_path.splice(idx,1);
      this.image_files_path = image_files_path;
      this.$message.success('删除成功！');
      this.submitForm();
    },
    // 点击删除视频
    deleteVideo(i,idx){
      let video_files_path = this.video_files_path;
      video_files_path.splice(idx,1);
      this.video_files_path = video_files_path;
      this.$message.success('删除成功！');
      this.submitForm();
    },
    // 点击视频
    gotoVideo(url){
      this.infoData = {
        video_url: url
      }
      this.$refs.video._data.video_dialogVisible = true;
    },
    // 选择的文件超出限制的文件总数量时触发
    limitCheck() {
      this.$message.warning('每次最多上传3个文件')
    },
    
    beforeVideoUpload(file) {
      console.log(file)
      const isJPG = file.type === 'video/mp4' || 'video/avi' || 'video/wmv' || 'video/flv' || 'video/rmvb' || 'video/mov';
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error('上传只能是 视频 格式!');
      }
      if (!isLt10M) {
        this.$message.error('上传大小不能超过 10MB!');
      }
      return isJPG && isLt10M;
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
    // 点击上传 ----  视频
    up_video(param){
      console.log(param)
      let data = {
        file: param.file,
        up_tag: 'video'
      }
      this.uploadFile(data);
    },
    // 点击上传图片
    up_image(param){
      let data = {
        file: param.file,
        up_tag: 'business_license'
      }
      this.uploadFile(data);
    },
    uploadFile(data){
      let that = this;
      // if(this.image_files_path.length > 10){
      //   that.$message.error({
      //     message: '最多上传10条！'
      //   })
      //   return
      // }
      const formData = new FormData();
      formData.append('file[]',data.file);
      // formData.append('pictureCategory','articleCover');
      if(data.up_tag == 'business_license'){
        formData.append('up_tag','business_license');
      }
      if(data.up_tag == 'video'){
        formData.append('up_tag','video');
      }
      that.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then( res=>{
        if(data.up_tag == 'video'){
          that.video_files_path.push(res.data.upload_files);
        }
        if(data.up_tag == 'business_license'){
          that.image_files_path.push(res.data.upload_files);
        }
        that.$refs['upload'].clearFiles();
        that.$refs['upload_video'].clearFiles();
      }).catch( e=>{
        console.log('erro')
        that.$refs['upload'].clearFiles();
        that.$refs['upload_video'].clearFiles();
      })
    },

    // 获取信息
    getDetail(){
      let that = this;
      that.$axios.post('/api/company/image/detail',{}).then( res =>{
        if(res.code == 0){
          that.image_files_path =  res.data.images?res.data.images.split(','): [];
          that.video_files_path =  res.data.video?res.data.video.split(','): [];
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch( e=>{
        console.log(e)
      })
    },
    // 点击发布
    submitForm(n){
      let that = this;
      let p = {
        images: that.image_files_path.join(','),
        video: that.video_files_path.join(','),
      };
      that.$axios.post('/api/company/image/create',p).then( res =>{
        if(res.code == 0){
          if(n == 'btn'){
            that.$message.success({
              message:'上传成功！'
            })
          }
          setTimeout( ()=>{
            that.getDetail();
          },1000)
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch( e=>{
        console.log(e)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
  .label-items-box{
    width: 100%;
    height: auto;
    font-size: 14px;
    padding-left: 10px;
    padding-right: 1rem;
    .box-title{
      margin-top: 10px;
      .title-1{
        font-size: 16px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 24px;
      }
      .title-2{
        margin-top: 8px;
        font-size: 14px;
        font-weight: 400;
        color: #4E5969;
        line-height: 22px;
      }
    }
    .items-box{
      width: 100%;
      margin-top: 24px;
      .title{
        font-size: 16px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 24px;
      }
      .info-box{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        &>div{
          margin-top: 10px;
          margin-right: 12px;
          width: 200px;
          height: 140px;
          position: relative;
          .image-box{
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
          .avatar-uploader{
            width: 100%;
            height: 100%;
            & /deep/ .el-upload {
              width: 100%;
              height: 100%;
            }
            & /deep/ .el-upload-dragger{
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .file-tips{
                margin-top: 6px;
                font-size: 14px;
                font-weight: 400;
                color: #86909C;
                line-height: 22px;
              }
            }
            & /deep/ .el-upload-dragger .el-icon-camera{
              font-size: 28px;
            }
          }


        }

      }
    }
    & .el-input{
        width: 30rem;
      }
    & /deep/ .el-input.is-active .el-input__inner, & /deep/ .el-input__inner:focus{
        border-color: $g_bg;
      }
      /deep/ .el-form-item__content{
        line-height: 32px;
      }
      /deep/ .el-form-item__label{
        padding-right: 20px;
        line-height: 32px;
      }
      /deep/ .el-input__inner{
        height: 32px;
        line-height: 32px;
      }
      /deep/ .el-input__icon{
        line-height: 32px;
      }
    & /deep/ .el-form-item {
      margin-bottom: 22px;
      display: flex;
      align-items: center;
    }
    & /deep/ .el-form-item__content{
      margin: 0 !important;
      flex: 1;
      display: flex;
      align-items: center;
    }

  }
  .btn-box{
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding: 20px 40px;
   & .el-button{
    width: 114px;
    height: 40px;
    margin-right: 20px;
   }
   & /deep/ .el-button--primary{
    background-color:$g_bg;
    border-color: $g_color;
   }
 
  }
  .info-items video{
    width: 100%;
    height: 100%;
  }
  .info-items a{
    position: relative;
  }
  .info-items a:hover .icon-img-box{
    display: block;
  }
  .icon-img-box{
    display: none;
    width: 100%;
    height: auto;
    text-align: right;
    padding: 4px 10px;
    background: #f5f5f571;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .icon-img-box .icon-img{
    width: 20px;
    height: 22px;
  }
</style>
