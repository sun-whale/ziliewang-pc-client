<template>
  <div class="container">
    <div class="info-title-box myResume-plate">
      <div class="info-title-top" v-if=" !redact_info ">
        <div class="info-avatar">
          <div class="info-avatar-i" @click="clickUpload('avatar')">
            <el-upload class="avatar-uploader" 
              drag ref="upload" 
              action= "none"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :data="uploadData"
              :http-request="uploadArticleCover" 
              >
              <!-- <i class="el-icon-camera"></i> -->
              <img :src=" data.avatar ? data.avatar : require('../../../../assets/image/img-user.jpg' )" alt="" />
            </el-upload>
          </div>
        </div>
        <div style="flex: 1;padding-left: 0.9rem;">
          <div class="info-1">
            <span class="info-name">{{ data.real_name }}</span>
            <span class="info-set1" @click="clickRedactBtn(1)">编辑</span>
          </div>
          <ul class="info-2">
            <li>
              <img src="../../../../assets/image/Frame_1.png" alt="">
              <span>{{ data.birth_year_month?data.birth_year_month:'30岁' }}</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_2.png" alt="">
              <span>{{ data.begin_work_date?data.begin_work_date:'暂无' }}</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_5.png" alt="">
              <span>{{ data.live_city?data.live_city:"暂无" }}</span>
            </li>
            <li>
              <img src="../../../../assets/image/icon-qzzt-1.png" alt="">
              <span>{{ data.work_status_desc }}</span>
            </li>
          </ul>
          <ul class="info-2">
            <li>
              <img src="../../../../assets/image/Frame_6.png" alt="">
              <span>{{ data.real_phone }}</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_4.png" alt="">
              <span>{{ data.real_email }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="redact-title-top" v-else>
        <el-form ref="form" :model="infoData">
          <div class="mb20 redact-item">
            <div class="item-label">姓名</div>
            <div class="item-content">
              <el-input v-model="infoData.real_name" disabled placeholder="请输入姓名" clearable></el-input>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">当前求职状态</div>
            <div class="item-content">
              <el-select v-model="infoData.work_status" placeholder="请选择">
                <el-option
                  v-for="item in work_status_op"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">参加工作时间</div>
            <div class="item-content">
              <el-date-picker
                v-model="infoData.begin_work_date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="参加工作时间">
              </el-date-picker>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">所在城市</div>
            <div class="item-content">
              <el-cascader
                :options="options"
                ref="cascaderAddr" 
                v-model="selectedOptions"
                :props="{ value: 'label' }"
                :show-all-levels="false"
                @change="handleChange">
              </el-cascader>
            </div>
          </div>
          <div class="mb20 redact-item">
            <div class="item-label">生日</div>
            <div class="item-content">
              <el-date-picker
                v-model="infoData.birth_year_month"
                type="date"
                value-format="yyyy-MM-dd" disabled
                placeholder="生日">
              </el-date-picker>
            </div>
          </div>
          <div class="mb20 redact-item">
            <div class="item-label">电话</div>
            <div class="item-content">
              <el-input v-model="infoData.real_phone" placeholder="请输入电话" clearable></el-input>
            </div>
          </div>
          <div class="mb20 redact-item">
            <div class="item-label">微信</div>
            <div class="item-content">
              <el-input v-model="infoData.wechat_number" placeholder="请输入微信号或绑定手机号" clearable></el-input>
            </div>
          </div>
          <div class="mb20 redact-item">
            <div class="item-label">邮箱</div>
            <div class="item-content">
              <el-input v-model="infoData.real_email" placeholder="请输入邮箱" clearable></el-input>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">性别</div>
            <div class="item-content">
              <div class="radio-item" :class="infoData.sex == 1 ? 'radio-checked':'' ">男</div>
              <div class="radio-item" :class="infoData.sex == 2 ? 'radio-checked':'' ">女</div>
            </div>
          </div>
          <div class="mb20 redact-item"></div>
          <div class="mb20 redact-item">
            <div class="item-label">上传个人照片</div>
            <div class="item-content">
              <div class="z_file" @click="clickUpload('resume_image')">
                <el-upload class="avatar-uploader" 
                drag ref="upload" 
                action= "none"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :data="uploadData"
                :http-request="uploadArticleCover" 
                >
                <img :src="data.avatar ? data.avatar:require('../../../../assets/image/bossSide/a11.png')" alt="" class="add-img" />
              </el-upload>
              </div>
              
            </div>
          </div>
          <div class="form-btns redact-item">
            <el-button @click="clickInfoCancelBtn">取消</el-button>
            <el-button type="primary" @click="clickInfoVerifyBtn">确定</el-button>
          </div>
        </el-form>
      </div>
      <!-- 优势亮点 -->
      <div class="info-title-bottom" v-if="!redact_spot">
        <div class="jobExpectation-title-box">
          <span class="info-t">优势亮点</span>
          <span class="info-set1" @click="clickRedactBtn(2)">编辑</span>
        </div>
        <div class="info-title-x">{{ data.advantages_highlights?data.advantages_highlights:'暂无' }}</div>
      </div>
      <!-- 优势亮点 -- 编辑 -->
      <div class="redact-title-bottom" v-else>
        <div class="jobExpectation-title-box">
          <span class="info-t">优势亮点</span>
        </div>
        <div class="textarea-box">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="infoData.advantages_highlights">
          </el-input>
        </div>
        <div class="form-spotbtns">
          <el-button @click="clickSpotCancelBtn">取消</el-button>
          <el-button type="primary" @click="clickSpotVerifyBtn">确定</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import config from '../../../../axios/config'
import pcas from '../../../../assets/json/pc-code.json'

export default {
  components: {
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
      config: config.baseURL.upload,
      redact_info: false, 
      redact_spot: false,
      resume_image:'',
      infoData: {},
      fileList:[],
      imageUrl:'',
      upload_files_path:'',
      uploadData:{
        up_tag: 'avatar'
      },
      upload_type:'avatar',
      work_status_op: [
        {value: 1,label: '在职'},
        {value: 2,label: '在职不考虑'},
        {value: 3,label: '在职，看看新机会'},
        {value: 4,label: '离职'},
        {value: 5,label: '交职业圈好友/寻找商业合作计划'}
      ],
      options: pcas,
      selectedOptions: ['','上海'],
    }
  },
  mounted(){
 
  },
  computed: {
    
  },
  methods: {
    clickUpload(n){
      this.upload_type = n;
    },
     // 获取省市区地址级联
     handleChange(thsAreaCode) {
      // thsAreaCode = this.$refs['cascaderAddr'].getCheckedNodes()[0].pathLabels// 注意2： 获取label值
      // console.log(thsAreaCode) // 注意3： 最终结果是个一维数组对象
      this.selectedOptions = thsAreaCode;
      this.infoData.live_city = thsAreaCode[1];
    },
    //  修改信息
    setUserSave(data,f){
      let that = this;
      let p = Object.assign({},data);
      that.$axios.post('/api/user/save',p).then( res =>{
        if(res.code == 0){
          that.$message.success('修改成功！');
          if(p.avatar){
            console.log(this.data.avatar)
            localStorage.setItem('realAvatar', this.data.avatar); // 用户头像缓存
            this.$store.dispatch('user/set_realAvatar', this.data.avatar);
          }
          return f()
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 选择的文件超出限制的文件总数量时触发
    limitCheck() {
      this.$message.warning('每次只能上传一个文件')
    },
    // 上传图片--- 头像
    uploadArticleCover(param){
      console.log(param.file)
      const formData = new FormData();
      formData.append('file[]',param.file);
      formData.append('pictureCategory','articleCover');
      formData.append('up_tag','avatar');
      this.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then( res=>{
        this.data.avatar = res.data.upload_files;
        let upload_files_path = res.data.upload_files_path;
        this.infoData.avatar = upload_files_path;
        this.$refs['upload'].clearFiles();
        if(this.upload_type == 'avatar'){
          let p = {
            avatar: upload_files_path
          }
          this.setUserSave(p);
        }
      }).catch( e=>{
        console.log('erro')
        this.$refs['upload'].clearFiles()
      })
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

    
    clickRadio(n){
      this.infoData.sex = n;
    },
    // 点击编辑
    clickRedactBtn(n){
      this.infoData = JSON.parse(JSON.stringify(this.data));
      this.infoData.avatar = '';
      let options = this.options;
      let live_city = this.infoData.live_city;
      let selectedOptions = this.selectedOptions;
      options.forEach(ele => {
        ele.children.forEach(item =>{
          if( item.label == live_city ){
            selectedOptions[0] = ele.label;
            selectedOptions[1] = item.label;
          }
        })
      });
      this.selectedOptions = selectedOptions;
      this.resume_image = this.infoData.resume_image;
      if(n == 1){
        this.redact_info = true;
      }else if(n == 2){
        this.redact_spot = true;
      }
      
    }, 
    // 点击编辑个人信息取消按钮
    clickInfoCancelBtn(){
      this.redact_info = false;
    },
    // 点击编辑个人信息确定按钮
    clickInfoVerifyBtn(){

      let p = {
        name: this.infoData.real_name,
        sex: this.infoData.sex,
        phone: this.infoData.real_phone,
        email: this.infoData.real_email,
        wechat_number: this.infoData.wechat_number,
        work_status: this.infoData.work_status,
        birth_year_month: this.infoData.birth_year_month,
        begin_work_date: this.infoData.begin_work_date,
        live_city: this.infoData.live_city,
        resume_image: this.resume_image,
      }
      if(this.infoData.avatar){
        p.avatar = this.infoData.avatar;
      }
      if(p.name == ''){
        this.$message.warning('姓名不能为空!');
        return
      }
      if(p.work_status == '' || !p.work_status){
        this.$message.warning('请选择当前求职状态!');
        return
      }
      if(p.phone == ''){
        this.$message.warning('手机号不能为空!');
        return
      }
      if(p.sex == '' || !p.sex || p.sex == 0){
        this.$message.warning('请选择性别!');
        return
      }
      if(p.email == '' || !p.email){
        this.$message.warning('邮箱不能为空!');
        return
      }
      if(p.wechat_number == '' || !p.wechat_number){
        this.$message.warning('微信不能为空!');
        return
      }
      const subCallback= ()=>{
        this.redact_info = false;
        this.$emit('refreshInfo')
      }
      this.setUserSave(p,subCallback);
     
      // this.redact_info = false;
    },
    // 点击优势亮点取消按钮
    clickSpotCancelBtn(){
      this.redact_spot = false;
    },
    // 点击优势亮点确定按钮
    clickSpotVerifyBtn(){
      const advantages_highlights = this.infoData.advantages_highlights;
      if(!advantages_highlights || advantages_highlights == ''){
        this.$message.warning('填写不能为空!');
        return
      }
      let p = {
        advantages_highlights,
      };
      const subCallback= ()=>{
        this.redact_spot = false;
        this.data.advantages_highlights = p.advantages_highlights;
      }
      this.setUserSave(p,subCallback);
    },

  },
};
</script>

<style lang="scss" scoped>
  .myResume-plate{
    width: 100%;
    border-radius: 6px;
    background: #fff;
    margin-bottom: 16px;
    .jobExpectation-title-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info-t{
        font-size: 18px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 24px;
      }
      .info-icon-img{
        width: 22px;
        height: 22px;
        cursor: pointer;
      }

    }
  }
  .info-title-box{
    .info-title-top{
      width: 100%;
      display: flex;
      padding: 24px 30px;
      .info-avatar{
        width: 64px;
        height: 64px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        img{
          width: 64px;
          height: 64px;
        }
        .info-avatar-i{
          width: 100%;
          height: 100%;
          background: #898a8b7a;
          font-size: 28px;
          // display: none;
          text-align: center;
          line-height: 64px;
          color: #ffffff;
          position: absolute;
          left: 0;
          top: 0;
          cursor: pointer;
          .avatar-uploader::v-deep .el-upload-dragger{
            width: 100%;
            height: 100%;
            border: none;
            background: none;
          }
          .avatar-uploader::v-deep .el-upload-dragger .el-icon-camera{
            font-size: 28px;
          }
        }
        &:hover .info-avatar-i{
          display: block;
        }
      }
      

      .info-1{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .info-name{
          font-size: 18px;
          font-weight: bold;
          color: $g_textColor;
        }

      }
      .info-2{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li{
          display: flex;
          align-items: center;
          margin-top: 8px;
          margin-left: 30px;
          line-height: 22px;
          img{
            width: 14px;
            height: 14px;
          }
          span{
            font-size: 14px;
            color: $g_textColor;
            padding-left: 4px;
          }
        }
        li:nth-of-type(1){
          margin-left: 0;
        }
      }
    }
    .redact-title-top{
      padding: 24px 15px;
      background: #F4F5F7;
      text-align: left;
      position: relative;
      .redact-item{
        display: inline-block;
        width: 50%;
        vertical-align: top;
        padding: 0 15px;
        .item-label{
          font-size: 14px;
          text-align: right;
          vertical-align: middle;
          color: #495060;
          line-height: 1;
          box-sizing: border-box;
          float: none;
          display: inline-block;
          padding: 0 0 10px;
        }
        .item-content {
          position: relative;
          line-height: 32px;
          display: flex;
          .radio-item{
            flex: 1;
            min-width: auto;
            line-height: 36px;
            display: inline-block;
            border: 1px solid #e3e7ed;
            background-color: #fff;
            text-align: center;
            cursor: pointer;
            color: #9fa3b0;
            margin-right: 20px;
            white-space: nowrap;
            position: relative;
            vertical-align: middle;
            font-size: 16px;
            &:last-of-type {
              margin-right: 0;
            }
          }
          .radio-checked {
            border-color: $g_color;
            color: $g_color;
            background-color: #effbfa;
          }
          /deep/ .el-select{
            width: 100%;
            .el-input.is-focus .el-input__inner{
              border-color: $g_color;
            }
          }
          /deep/ .el-date-editor.el-input,/deep/  .el-date-editor.el-input__inner{
            width: 100%;
          }
          .el-cascader{
            width: 100%;
          }
          /deep/ .el-input__inner:focus{
            border-color: $g_color;
          }
        }

        .z_file {
          width: 168px;
          height: 168px;
          margin-left: 40px;
          position: relative;
          .add-img{
            display: block;
            width: 168px;
            height: 168px;
            border: none;
          }
          .avatar-uploader{
            width: 100%;
            height: 100%;
            &::v-deep .el-upload {
              width: 100%;
              height: 100%;
            }
            &::v-deep .el-upload-dragger{
              width: 100%;
              height: 100%;
            }
            &::v-deep .el-upload-dragger .el-icon-camera{
              font-size: 28px;
            }
          }
        }
      }
      // .redact-item:nth-child(odd) {
      //   margin-bottom: 0;
      // }
      .form-btns{
        // position: absolute;
        // bottom: 26px;
        // right: 15px;
        text-align: right;
        padding: 0 15px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
      }
    }
    .info-title-bottom{
      padding: 24px 30px;
      .info-title-x{
        padding: 10px 0;
        margin-top: 6px;
        font-size: 12px;
        font-weight: 400;
        color: #4E5969;
        line-height: 22px;
        text-align: left;
      }
    }
    .redact-title-bottom{
      padding: 20px 30px;
      background: #F4F5F7;
      text-align: left;
      position: relative;
      border: 1px solid #fff;
      .textarea-box{
        width: 100%;
        margin-top: 10px; 
        font-size: 14px;
        /deep/ .el-textarea__inner{
          font-size: 14px;
          &:focus{
            border-color: $g_color;
          }
        }
      }
      .form-spotbtns{
        margin-top: 16px;
        width: 100%;
        text-align: right;
      }
    }
    /deep/ .el-button{
      padding: 0;
      width: 100px;
      height: 40px;
      line-height: 40px;
    }
    /deep/ .el-button--primary{
      background-color: $g_color;
      border-color: $g_color;
    }
  }
  .info-set1{
    font-size: 14px;
    font-weight: 400;
    color: $g_color;
    cursor: pointer;
  }
  .el-select-dropdown__item.selected{
    color: $g_color;
  }
</style>
