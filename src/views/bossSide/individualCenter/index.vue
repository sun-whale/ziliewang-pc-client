<template>
  <!-- 企业主页 -->
  <div class="bossSide-container">
    <div class="tab-box">
      <div class="tab-left">
        <div :class="tabStatus == 'basicInfo'?'hover-items':'' " @click="clickStatus('basicInfo')">基本信息</div>
        <div :class="tabStatus == 'expressions'?'hover-items':'' " @click="clickStatus('expressions')">常用语</div>
        <div :class="tabStatus == 2?'hover-items':'' " @click="clickStatus(2)">账号安全</div> 
        <!-- <div :class="tabStatus == 3?'hover-items':'' " @click="clickStatus(3)">员工关系</div> -->
        <!-- <div :class="tabStatus == 4?'hover-items':'' " @click="clickStatus(4)">隐私中心</div> -->
      </div>
    </div>
    <div class="m-box margin-top-20">
      <!-- 基本信息 开始-->
      <div class="jc-info-box" v-if="tabStatus == 'basicInfo'">
        <div class="items-box">
          <div class="title">头像</div>
          <!-- <div class="avatar-box">
            <img src="../../../assets/image/bossSide/img-user.jpg" alt="" />
          </div> -->
          <div class="info-avatar">
            <div class="info-avatar-i">
              <el-upload class="avatar-uploader" 
                drag ref="upload" 
                action= "none"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :data="uploadData"
                :http-request="uploadArticleCover" 
                >
                <img :src=" infoData.avatar ? infoData.avatar : require('../../../assets/image/bossSide/img-user.jpg' )" alt="" />
              </el-upload>
            </div>
          </div>
          <span class="sub-span">该头像将对求职者可见</span>
        </div>
        <!-- <div class="items-box">
          <div class="title">用户名</div>
          <span class="name-span">zjafsqyf482386</span>
        </div> -->
        <div class="items-box">
          <div class="title"><span>* </span>姓名</div>
          <el-input v-model="infoData.staff_name" placeholder="姓名"></el-input>
          <!-- <span class="sub-span">该头像将对求职者可见</span> -->
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>微信</div>
          <el-input v-model="infoData.company_wx" placeholder="请输入微信号或绑定手机号"></el-input>
          <!-- <span class="sub-span">该头像将对求职者可见</span> -->
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>公司</div>
          <el-input v-model="infoData.company_name" placeholder="请输入" disabled></el-input>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>职务</div>
          <el-input v-model="infoData.role_desc" placeholder="请输入" disabled></el-input>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>简介</div>
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 12}" placeholder="请输入个人简介或介绍" v-model="infoData.individual_resume"></el-input>
        </div>
        <div class="btn-box">
          <el-button type="primary" @click="setUserSave_btn">保存</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">取消</el-button> -->
        </div>
      </div>
      <!-- 基本信息 结束-->
      <!-- 常用语设置 开始-->
      <div class="jc-info-box" v-if="tabStatus == 'expressions'">
        <div class="container-right-items" id="set_expressions">
          <div class="title">常用语设置</div>
          <ul class="phraseslist-box">
            <li class="phrases-item" v-for="(item,index) in phraseslist" :key="index">
              <p>{{ item.common_language }}</p>
              <div class="item-i">
                <i class="el-icon-edit" @click="clickupdate(item.common_language,item.id)"></i>
                <i class="el-icon-delete" @click="deletePhrasesQR(item.id)"></i>
              </div>
            </li>
          </ul>
          <button @click="clickSetPhrases">添加常用语</button>
        </div>
      </div>
      <!-- 常用语设置 结束-->

      <!-- 账号安全 开始-->
      <div v-if="tabStatus == 2">
        <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-ph.png" alt="" />
            <div class="item-info-box">
              <div class="title">手机号</div>
              <div class="sub-title">{{ infoData.phone }}</div>
            </div>
          </div>
          <div class="right" @click="clickSetPhone">换绑</div>
        </div>
        <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-sfz.png" alt="" />
            <div class="item-info-box">
              <div class="title">已通过实名认证</div>
              <div class="sub-title"><span>姓名：{{ infoData.staff_name }}</span><span style="padding-left: 10px;">身份证：{{ infoData.id_card }}</span></div>
            </div>
          </div>
          <!-- <div class="right">换绑</div> -->
        </div>
        <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-zhmm.png" alt="" />
            <div class="item-info-box">
              <div class="title">账号注销</div>
              <div class="sub-title"><span>账号注销成功后会清空用户在本平台上所有信息！</span></div>
            </div>
          </div>
          <div class="right" @click="clickAccountCancellation">注销</div>
        </div>
        <!-- <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-zhmm.png" alt="" />
            <div class="item-info-box">
              <div class="title">密码设置</div>
              <div class="sub-title"><span>当前登录账号：{{ infoData.phone }}</span></div>
            </div>
          </div>
          <div class="right" @click="clickSetPassword">修改密码</div>
        </div> -->
        <!-- <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-yx.png" alt="" />
            <div class="item-info-box">
              <div class="title">绑定安全邮箱</div>
              <div class="sub-title">{{ infoData.real_email }}  可用于找回账号和密码</div>
            </div>
          </div>
          <div class="right" @click="clickSetEmail">换绑</div>
        </div> -->
        
        <!-- <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-wx.png" alt="" />
            <div class="item-info-box">
              <div class="title">绑定微信</div>
              <div class="sub-title">可用微信登录当前账号</div>
            </div>
          </div>
          <div class="right">换绑</div>
        </div> -->
        <!-- <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-zjhm.png" alt="" />
            <div class="item-info-box">
              <div class="title">设置主叫号码 {{ infoData.phone }}</div>
              <div class="sub-title">仅可使用主叫号码联系人才</div>
            </div>
          </div>
          <div class="right">换绑</div>
        </div> -->
      </div>
      <!-- 账号安全 结束-->

      <!-- 修改手机号 弹窗 -->
      <div class="setPhoneVisible">
        <el-dialog title="修改手机号" :visible.sync="setPhoneVisible" width="500px" :before-close="closePhoneVisible">
          <div class="cententinfo-box">
            <div class="cententinfo-title">手机号: {{ infoData.phone }}</div>
            <div class="demo-input-suffix">
              <span>新手机号:</span>
              <el-input v-model="new_phone" type="number" name="new_phone" placeholder="新手机号"></el-input>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="setPhoneVisible = false">取 消</el-button>
            <el-button type="primary" @click="clickPhoneQR">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 修改密码 弹窗 -->
      <div class="setPasswordVisible">
        <el-dialog title="密码设置" :visible.sync="setPasswordVisible" width="500px" :before-close="closePasswordVisible">
          <div class="cententinfo-box">
            <div class="cententinfo-title">手机号: {{ infoData.phone }}</div>
            <div class="demo-input-suffix">
              <span>新密码:</span>
              <el-input v-model="password" type="password" name="password" placeholder="8-16位字母、数字、字符，不支持空格" show-password></el-input>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="setPasswordVisible = false">取 消</el-button>
            <el-button type="primary" @click="clickPasswordQR">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      
    </div>
    <!-- 账号注销弹窗 -->
    <div class="accountVisible">
      <accountCancellation :id="infoData.company_id" ref="accountCancellation"/>
    </div>

    <!-- 常用语 弹窗 -->
    <div class="setPasswordVisible">
      <el-dialog title="常用语" :visible.sync="setPhrasesVisible" width="500px" :before-close="closePhrasesVisible">
        <div class="cententinfo-box">
          <div class="demo-input-suffix">
            <el-input type="textarea" :rows="3" v-model="phrases" name="Phrases" placeholder="添加常用语" show-password></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setPhrasesVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickPhrasesQR">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import accountCancellation from "../../../components/accountCancellation.vue";

export default {
  components: {
    accountCancellation
  },
  data() {
    return {
      tabStatus: 'basicInfo', // 基本信息
      phraseslist: [], // 常用语列表
      phrases:'',
      phrases_id:'',
      infoData:{
        staff_name:"Lucy",
        company_wx:"",
        role_desc: "",
        avatar:'',
        phone:'',
        individual_resume:''
      },
      new_phone:'',
      upload_files_path:'',
      uploadData:{
        up_tag: 'avatar'
      },
      password:'',
      setPhoneVisible: false,
      setPasswordVisible: false,
      setPhrasesVisible: false,
    }
  },
  created(){
    this.tabStatus = this.$route.query.tabStatus || 'basicInfo';
    //  获取信息
    this.getUserInfo();
    // 获取常用语
    this.geturlCommonLanguageList();
  },
  methods:{
    // 获取常用语
    geturlCommonLanguageList(){
      let that = this;
      that.$axios.post('/api/common-language/list',{}).then(res =>{
        if(res.code == 0){
          that.phraseslist = res.data;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    // 点击添加常用语
    clickSetPhrases(){
      this.setPhrasesVisible = true;
    },
    closePhrasesVisible(){
      this.setPhrasesVisible = false;
    },
    // 点击编辑常用语
    clickupdate(n,i){
      this.phrases = n;
      this.phrases_id = i;
      this.setPhrasesVisible = true;
    },
    // 删除用语
    deletePhrasesQR(i){
      let that = this;
      let p = {
        id: i,
      };
      that.$axios.post('/api/common-language/delete',p).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message:'删除成功'
          })
          setTimeout(()=>{
             that.geturlCommonLanguageList();
          },1500)
          return
        }else{
          that.$message.error({
            message:res.msg
          })
          return
        }

      }).catch( e =>{
        console.log(e)
      })
    },
    // 确认常用语
    clickPhrasesQR(){
      let that = this;
      let p = {
        common_language: that.phrases,
      };
      let url = '';
      if(that.phrases_id){
        p.id = that.phrases_id,
        url = '/api/common-language/update'
      }else{
        url = '/api/common-language/create'
      }
      that.$axios.post(url,p).then( res =>{
        if(res.code == 0){
          if(that.phrases_id){
            that.$message.success({
              message:'修改成功'
            })
          }else{
            that.$message.success({
              message:'添加成功'
            })
          }
          
          setTimeout(()=>{
             that.geturlCommonLanguageList();
             that.setPhrasesVisible = false;
          },1500)
          return
        }else{
          that.$message.error({
            message:res.msg
          })
          return
        }

      }).catch( e =>{
        console.log(e)
      })
    },
    // 点击修改手机号
    clickSetPhone(){
      this.setPhoneVisible = true;
    },
    // 点击设置密码
    clickSetPassword(){
      this.setPasswordVisible = true;
    },
    clickSetEmail(){

    },
    // 点击账号注销按钮
    clickAccountCancellation(){
      this.$refs.accountCancellation._data.dialogVisible = true;
    },
    // 关闭 修改手机号码弹窗
    closePhoneVisible(){
      this.setPhoneVisible = false;
    },
    // 关闭 修改密码弹窗
    closePasswordVisible(){
      this.setPasswordVisible = false;
    },
    // 确认修改密码
    clickPasswordQR(){
      let that = this;
      let p = {
        password: that.password,
      };
      that.setUserSave(p);
    },
    // 确认修改手机号
    clickPhoneQR(){
      let that = this;
      let p = {
        phone: that.new_phone,
      };
      if(!p.phone || p.phone){
        that.$message.error('请先输入电话！');
        return
      }
      this.setUserSave(p);
    },
    //  获取信息
    getUserInfo(){
      let that = this;
      that.$axios.post('/api/staff/profile',{}).then( res =>{
        if(res.code == 0){
          that.infoData = res.data;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },  
    // SET_staffName(){
    //   let p = {
    //     avatar: this.upload_files_path,
    //     staff_name: this.infoData.staff_name,
    //   }
    //   //  修改信息
    //   this.setUserSave(p);
    // },

    // 点击基本信息保存
    setUserSave_btn(){
      let p = {
        staff_name: this.infoData.staff_name,
        company_wx: this.infoData.company_wx,
        individual_resume: this.infoData.individual_resume,
      }
      if(this.upload_files_path){
        p.avatar = this.upload_files_path
      }
      if(p.staff_name == '' || !p.staff_name){
        this.$message.error('姓名不能为空！');
        return
      }
      if(p.company_wx == '' || !p.company_wx){
        this.$message.error('微信不能为空！');
        return
      }
      if(p.individual_resume == '' || !p.individual_resume){
        this.$message.error('简介不能为空！');
        return
      }
      //  修改信息
      this.setUserSave(p);
    },
    //  修改信息
    setUserSave(data){
      let that = this;
      let p = Object.assign({},data);
      that.$axios.post('/api/staff/save',data).then( res =>{
        if(res.code == 0){
          that.$message.success('修改成功！');
          if(data.staff_name){
            that.$store.dispatch('user/SET_staffName', data.staff_name); // vuex
          }
          if(that.infoData.avatar){
            that.$store.dispatch('user/SET_staffAvatar', that.infoData.avatar); // vuex);
          }
          if(that.setPhoneVisible){
            that.closePhoneVisible();
          }
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    clickStatus(n){
      this.tabStatus = n;
    },
    // 上传图片--- 头像
    uploadArticleCover(param){
      console.log(param.file)
      const formData = new FormData();
      formData.append('file[]',param.file);
      formData.append('pictureCategory','articleCover');
      formData.append('up_tag','avatar');
      this.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then( res=>{
        this.infoData.avatar = res.data.upload_files;
        this.upload_files_path = res.data.upload_files_path;
        this.$refs['upload'].clearFiles();

        // let p = {
        //   avatar: upload_files_path
        // }
        // this.setUserSave(p);
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
    
  }
}
</script>

<style lang="scss" scoped>
  .tab-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tab-left{
      width: auto;
      display: flex;
      align-items: center;
      &>div{
        width: auto;
        line-height: 32px;
        margin-right: 18px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #86909CFF;
        cursor: pointer;
      }
      &>div.hover-items{
        color: $g_textColor;
        font-weight: bold;
      }
    }
  }
  .jc-info-box{
    .items-box{
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 20px;
      &:nth-of-type(1){
        margin-top: 0px;
      }
      .title{
        width: 71px;
        height: 24px;
        font-size: 16px;
        font-weight: 400;
        color: $g_textColor;
        line-height: 24px;
        text-align: right;
        &>span{
          color: #ff0000;
          font-size: 18px;
          font-weight: bold;
        }
      }
      .info-avatar{
        width: 68px;
        height: 68px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-left: 40px;
        img{
          width: 68px;
          height: 68px;
        }
        .info-avatar-i{
          width: 100%;
          height: 100%;
          background: #898a8b7a;
          // display: none;
          text-align: center;
          line-height: 68px;
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
      &>span.sub-span{
        width: auto;
        font-size: 16px;
        font-weight: 400;
        color: #C9CDD4;
        line-height: 24px;
        margin-left: 15px;
      }
      &>span.name-span{
        font-size: 16px;
        font-weight: 400;
        color: #1F2E4D;
        line-height: 24px;
        margin-left: 40px;
      }
      & .el-input{
        margin-left: 40px;
        width: 30rem;
      }
      & /deep/ .el-input.is-active .el-input__inner, & /deep/ .el-input__inner:focus{
        border-color: $g_bg;
      }
      & .el-textarea{
        margin-left: 40px;
        width: 30rem;
      }
    }
  }
  .list-items-box{
    width: 100%;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
      display: flex;
      align-items: center;
      &>img{
        width: 48px;
        height: 48px;
      }
      .item-info-box{
        padding-left: 20px;
        .title{
          font-weight: bold;
          font-size: 16px;
          color: $g_textColor;
        }
        .sub-title{
          margin-top: 6px;
          text-align: left;
          font-size: 14px;
          font-weight: 400;
          color: #86909CFF;
        }
      }
    }
    .right{
      width: 140px;
      height: 40px;
      text-align: center;
      font-size: 14px;
      line-height: 40px;
      border: 1px solid #E5E6EBFF;
      border-radius: 4px;
      color: $g_textColor;
      cursor: pointer;
    }
  }
  .btn-box{
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding: 20px 40px;
   &>.el-button{
    width: 114px;
    height: 40px;
    margin-right: 20px;
   }
   & /deep/ .el-button--primary{
    background-color:$g_bg;
    border-color: $g_color;
   }

  }
  
.bossSide-container{
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
      padding: 20px 0;
      margin: 0 20px;
      border-top: 1px solid #F2F3F5;
      .cententinfo-box{
        width: 100%;
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
          margin-top: 20px;
          position: relative;
          .send-vcode-btn {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            color: $g_color;
            display: flex;
            align-items: center;
            background-color: transparent;
            border: none;
            padding: 0 10px;
            outline: none;
            cursor: pointer;
            transition: background-color .3s,color .3s;
            margin-top: 0;
            font-size: 14px;
          }
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
.phraseslist-box{
  width: auto;
  padding: 0 10px;
  margin-top: 13px;
}
.phraseslist-box>li.phrases-item{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 22px;
  margin-bottom: 4px;
  background: #fff;
  font-size: 15px;
  font-weight: 400;
  color: #333;
  line-height: 28px;
  position: relative;
}
.phraseslist-box>li.phrases-item:before {
  content: "";
  position: absolute;
  top: 21px;
  left: 8px;
  width: 6px;
  height: 6px;
  background: #d9d9d9;
  border-radius: 50%;
}
.phraseslist-box>li.phrases-item:hover{
  box-shadow: 0 4px 16px 0 hsla(0,0%,60%,.2);
  border-radius: 8px;
}
.item-i{
  display: flex;
  align-items: center;
  font-size: 18px;
  &>i{
    margin-left: 10px;
    cursor: pointer;
    &:hover{
      color: $g_color;
    }
  }
}
.container-right-items{
  width: 100%;
  text-align: left;
  .title{
    font-size: 16px;
    font-weight: bold;
    color: $g_textColor;
    line-height: 24px;
  }
  .info-box{
    font-size: 14px;
    font-weight: 400;
    color: #86909C;
    line-height: 22px;
  }
  .phone-protect-box{
    width: 100%;
    display: flex;
    margin-top: 1.5rem;
    .phone-protect-title{
      font-size: 14px;
      font-weight: bold;
      color: $g_textColor;
      line-height: 22px;
    }
    .el-switch{
      margin-left: 16.5rem;
    }
    /deep/ .el-switch.is-checked .el-switch__core{
      border-color: $g_color;
      background-color: $g_bg;
    }
  }
  button{
    width: auto;
    padding: 0 16px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: $g_bg;
    border-radius: 30px;
    opacity: 1;
    border: 1px solid $g_bg;
    color: #FFFFFF;
    font-size: 14px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    margin-top: 12px;
    margin-left: 12px;
    img{
      width: 12px;
      height: 12px;
    }
    span{
      margin-left: 6px;
    }
  }
}
</style>