<template>
  <!-- 企业主页---申请企业页 -->

  <div class="bossSide-container">
    <div class="m-box">
      <div class="title">企业信息</div>
      <div class="info-box">

        <div class="items-box">
          <div class="title"><span>* </span>营业执照</div>
          <div class="z_file fl">
            <el-upload class="avatar-uploader" 
              drag ref="upload" 
              action= "none"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :data="uploadData"
              :http-request="up_business_license_img" 
              >
              <img :src="business_license?business_license:require('../../assets/image/bossSide/a11.png')" alt="" class="add-img" />
            </el-upload>
          </div>
        </div>

        <div class="items-box">
          <div class="title"><span>* </span>企业logo</div>
          <div class="z_file fl">
            <el-upload class="avatar-uploader" 
              drag ref="upload" 
              action= "none"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :data="uploadData"
              :http-request="up_logo_img" 
              >
              <img :src="logo?logo:require('../../assets/image/bossSide/a11.png')" alt="" class="add-img" />
            </el-upload>
          </div>
        </div>

        
        <div class="items-box">
          <div class="title"><span>* </span>公司名称</div>
          <el-input v-model="company_name" placeholder="公司名称"></el-input>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>法人</div>
          <el-input v-model="legal_person" placeholder="法人"></el-input>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>注册资本</div>
          <el-input v-model="registered_capital" placeholder="注册资本"></el-input>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>成立日期</div>
          <el-input v-model="establishment_date" placeholder="成立日期"></el-input>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>核准日期</div>
          <el-input v-model="approval_date" placeholder="核准日期"></el-input>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>公司注册地址</div>
          <el-input v-model="company_register_address" placeholder="公司注册地址"></el-input>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>组织代码</div>
          <el-input v-model="organization_code" placeholder="组织代码"></el-input>
        </div>
        
        <div class="items-box">
          <div class="title"><span>* </span>所属主行业</div>
          <el-select v-model="industry" placeholder="请选择主行业">
            <el-option
              v-for="item in industryList"
              :key="item.industry"
              :label="item.industry"
              :value="item.industry">
            </el-option>
          </el-select>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>企业性质</div>
          <el-select v-model="business_nature" placeholder="请选择企业性质">
            <el-option
              v-for="item in natureList"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>规模</div>
          <el-select v-model="company_scale" placeholder="请选择规模">
            <el-option
              v-for="item in scaleList"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>上市/投融资状态</div>
          <el-select v-model="corporate_finance" placeholder="请选择上市/投融资状态">
            <el-option
              v-for="item in listingList"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>

        <div class="title" style="margin-top: 16px;">账户管理员/使用人身份信息</div>
        <div class="info-box">
          <div class="items-box">
            <div class="title"><span>* </span>姓名</div>
            <el-input v-model="staff_name" placeholder="姓名"></el-input>
          </div>
          <div class="items-box">
            <div class="title"><span>* </span>身份证</div>
            <el-input v-model="id_card" placeholder="身份证"></el-input>
          </div>
          <div class="items-box">
            <div class="title"><span>* </span>电话</div>
            <el-input v-model="phone" placeholder="电话"></el-input>
          </div>
          <div class="items-box">
            <div class="title"><span>* </span>微信</div>
            <el-input v-model="company_wx" placeholder="绑定微信的手机号或微信号"></el-input>
          </div>
          <div class="items-box">
            <div class="title"><span>* </span>登录密码</div>
            <el-input v-model="password" placeholder="登录密码"></el-input>
          </div>
        </div>
        <div class="btn-box">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth';

export default {
  data(){
    return {
      industryList: [],
      company_name: '',// 公司名称
      legal_person: '', //法人
      registered_capital:'', //注册资本
      approval_date:'', // 核准日期
      establishment_date:'', // 成立日期
      company_register_address: '', // 注册地址
      organization_code: '',  //组织代码
      industry:'', // 所属主行业
      business_nature:'', // 企业性质
      company_scale:'', // 规模
      corporate_finance:'', //上市/投融资状态
      business_license:'', // 营业执照照片
      logo: '', //logo
      upload_files_path:'',
      uploadData:{
        up_tag: 'business_license'
      },
      natureList: [
        {id:1,name:'有限责任'},
        {id:2,name:'股份制'},
        {id:3,name:'国有企业'},
        {id:4,name:'合伙企业'},
        {id:5,name:'个体工商户'},
        {id:6,name:'私营企业'},
        {id:7,name:'合资企业'},
        {id:8,name:'外资企业'},
        {id:9,name:'独资企业'},
        {id:10,name:'政府机关/非盈利机构'},
        {id:11,name:'事业单位'},
      ],  
      scaleList: [
        {id:1,name:'0-20人'},
        {id:2,name:'20-50人'},
        {id:3,name:'50-99人'},
        {id:4,name:'100-599人'},
        {id:5,name:'599-1999人'},
        {id:6,name:'1999人以上'},
      ],
      listingList:[
        {id:1,name:'天使轮'},
        {id:2,name:'A轮'},
        {id:3,name:'B轮'},
        {id:4,name:'C轮'},
        {id:5,name:'已上市'},
        {id:6,name:'未上市'},
      ],
      staff_name:'',
      id_card:'',
      phone:'',
      password:'',
      company_wx: '',
    }
  },
  created(){
    // 获取行业列表信息
    this.getIndustryList();
  },
  methods:{
     // 选择的文件超出限制的文件总数量时触发
     limitCheck() {
      this.$message.warning('每次只能上传一个文件')
    },
    // 获取行业列表信息
    getIndustryList(){
      let that = this;
      that.$axios.post('/api/industry/list',{}).then( res =>{
        that.industryList = res.data;
      }).catch( e=>{
        console.log(e)
      })
    },
    //公司logo
    up_logo_img(param){
      const formData = new FormData();
      formData.append('file[]',param.file);
      // formData.append('pictureCategory','articleCover');
      formData.append('up_tag','logo');
      this.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then( res=>{
        this.logo = res.data.upload_files;
        this.$refs['upload'].clearFiles();
       
      }).catch( e=>{
        console.log('erro')
        this.$refs['upload'].clearFiles()
      })
    },
    // 营业执照 ---- 上传图片
    up_business_license_img(param){
      console.log(param.file)
      const formData = new FormData();
      formData.append('file[]',param.file);
      // formData.append('pictureCategory','articleCover');
      formData.append('up_tag','business_license');
      this.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then( res=>{
        this.business_license = res.data.upload_files;
        this.$refs['upload'].clearFiles();
        this.getInfoData(res.data.upload_files);

       
      }).catch( e=>{
        console.log('erro')
        this.$refs['upload'].clearFiles()
      })
    },
    getInfoData(url){
      let that = this;
      that.$axios.post('/api/company/check-business-license',{
        business_license: url
      }).then( res =>{
        if(res.code == 0){
          that.company_name= res.data.company_name; // 公司名称
          that.legal_person= res.data.legal_person; //法人
          that.company_register_address= res.data.company_register_address; // 注册地址
          that.organization_code= res.data.organization_code;  //组织代码
          that.registered_capital= res.data.registered_capital;  //注册资本
          that.approval_date= res.data.approval_date; // 核准日期
          that.establishment_date= res.data.establishment_date; // 成立日期
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type == 'image/png' || 'image/jpeg'|| 'image/jpg'|| 'image/gif'|| 'image/webp';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // const isLt500Kb = file.size / 1024 <= 500;
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error('上传图片只能是图片格式!');
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1M!');
      }
      return isJPG && isLt1M;
    },

    // 点击提交
    async submitForm(){
      let that = this;
      let p = {
        company_name: that.company_name, // 公司名称
        legal_person: that.legal_person, // 法人
        company_register_address: that.company_register_address, //公司注册地址
        organization_code: that.organization_code, // 组织代码
        business_license: that.business_license, //营业执照
        logo: that.logo, //公司logo
        industry: that.industry, // 所属主页
        business_nature: that.business_nature, // 企业性质
        company_scale: that.company_scale, // 企业规模
        corporate_finance: that.corporate_finance, // 上市状态
        staff_name: that.staff_name,
        id_card: that.id_card,
        phone: that.phone,
        password: that.password,
        company_wx: that.company_wx,
        registered_capital: that.registered_capital, //注册资本
        approval_date: that.approval_date, // 核准日期
        establishment_date: that.establishment_date, // 成立日期
      }
      if(p.company_name == ''){
        that.$message.warning('公司名称不能为空!');
        return
      }
      if(p.legal_person == '' || !p.legal_person){
        that.$message.warning('法人不能为空!');
        return
      }
      if(p.company_register_address == ''){
        that.$message.warning('公司注册地址不能为空!');
        return
      }
      if(p.organization_code == '' || !p.organization_code){
        that.$message.warning('组织代码不能为空!');
        return
      }
      if(p.business_license == '' || !p.business_license){
        that.$message.warning('营业执照不能为空!');
        return
      }
      if(p.logo == '' || !p.logo){
        that.$message.warning('公司logo不能为空!');
        return
      }
      if(p.staff_name == '' || !p.staff_name){
        that.$message.warning('个人姓名不能为空!');
        return
      }
      if(p.id_card == '' || !p.id_card){
        that.$message.warning('身份证不能为空!');
        return
      }
      if(p.phone == '' || !p.phone){
        that.$message.warning('手机号不能为空!');
        return
      }
      if(p.password == '' || !p.password){
        that.$message.warning('密码不能为空!');
        return
      }
      if(p.company_wx == '' || !p.company_wx){
        that.$message.warning('微信不能为空!');
        return
      }
      
      await that.$axios.post('/api/company/apply',p).then( res =>{
        if(res.code == 0){
          that.$message.success('提交成功！');
          let data = res.data;
          setToken(data.token);
          localStorage.setItem('tag', 'company'); // 用户身份 user、人才端 company、企业端缓存
          localStorage.setItem('realUid', data.user.id); // 用户uid缓存
          localStorage.setItem('staffVipRank', data.user.vip_rank); // 用户会员等级
          localStorage.setItem('company_id', data.user.company_id); // 企业id缓存
          setTimeout(() => {
            that.$router.push('/dashboard');
          }, 500);
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    resetForm(){
      this.company_name = ''; // 公司名称
      this.legal_person = ''; //法人
      this.company_register_address = ''; // 注册地址
      this.organization_code = '';  //组织代码
      this.business_license = ''; // 营业执照照片
      this.logo = ''; //logo
      this.industry = '';  // 所属主页
      this.business_nature = '';  // 企业性质
      this.company_scale = '';  // 企业规模
      this.corporate_finance = '';  // 上市状态
      this.staff_name = ''; // 
      this.id_card = '';
      this.phone = ''; //  个人手机号
      this.password = ''; // 个人密码
      this.company_wx = ''; // 微信号
      this.registered_capital = ''; //注册资本
      this.approval_date = ''; // 核准日期
      this.establishment_date = ''; // 成立日期
    },

  }
}
</script>

<style lang="scss" scoped>
  .bossSide-container{
    width: 1200px;
    margin: 20px auto;
  }
  .title{
    font-weight: bold;
    font-size: 16px;
  }
  .info-box{
    margin-top: 16px;
    .items-box{
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 20px;
      &:nth-of-type(1){
        margin-top: 0px;
      }
      .title{
        width: 140px;
        height: 24px;
        font-size: 15px;
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
      & /deep/ .el-select, & /deep/ .el-input__inner {
        height: 32px;
        line-height: 32px;
      }
      & /deep/ .el-select{
        margin-left: 40px;
      }
      .avatar-box{
        width: 68px;
        height: 68px;
        border-radius: 50%;
        position: relative;
        margin-left: 40px;
        &>img{
          width: 100%;
          height: 100%;
          display: inline-block;
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
        & /deep/ .el-input__inner {
          height: 32px;
          line-height: 32px;
        }
      }
      
      & /deep/ .el-input.is-active .el-input__inner, & /deep/ .el-input__inner:focus{
        border-color: $g_bg;
      }
      .z_file {
        width: 128px;
        height: 128px;
        margin-left: 40px;
        position: relative;
        .add-img{
          display: block;
          width: 128px;
          height: 128px;
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
</style>