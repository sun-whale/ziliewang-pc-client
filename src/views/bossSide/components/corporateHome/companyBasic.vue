<template>
  <div class="label-items-box">
    <el-form :model="jbxx_ruleForm" :rules="jbxx_rules" ref="jbxx_ruleForm" label-width="180px" class="demo-ruleForm">
      <el-form-item label="企业logo" prop="logo">
        <div class="avatar-box">
          <el-upload class="avatar-uploader" 
            drag ref="upload" 
            action= "none"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="up_logo_img" 
            >
            <img :src="jbxx_ruleForm.logo?jbxx_ruleForm.logo:require('../../../../assets/image/bossSide/a11.png')" alt="" class="add-img" />
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="营业执照" prop="business_license">
        <div class="avatar-box">
          <el-upload class="avatar-uploader" 
            drag ref="upload" 
            action= "none"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="up_business_license_img" 
            >
            <img :src="jbxx_ruleForm.business_license" alt="" class="add-img" />
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="对外展示名称" prop="company_name">
        <el-input v-model="jbxx_ruleForm.company_name" placeholder="企业对外展示名称"></el-input>
      </el-form-item>
      <el-form-item label="法人" prop="legal_person">
        <el-input v-model="jbxx_ruleForm.legal_person" placeholder="法人"></el-input>
      </el-form-item>
      <el-form-item label="组织代码" prop="organization_code">
        <el-input v-model="jbxx_ruleForm.organization_code" placeholder="组织代码" disabled></el-input>
      </el-form-item>
      <el-form-item label="注册资本" prop="registered_capital">
        <el-input v-model="jbxx_ruleForm.registered_capital" placeholder="注册资本" disabled></el-input>
      </el-form-item>
      <el-form-item label="核准日期" prop="approval_date">
        <el-input v-model="jbxx_ruleForm.approval_date" placeholder="核准日期" disabled></el-input>
      </el-form-item>
      <el-form-item label="成立日期" prop="establishment_date">
        <el-input v-model="jbxx_ruleForm.establishment_date" placeholder="成立日期" disabled></el-input>
      </el-form-item>
      <el-form-item label="所属主行业" prop="industry">
        <el-select v-model="jbxx_ruleForm.industry" placeholder="请选择主行业">
          <el-option
            v-for="item in industry.industryList"
            :key="item.industry"
            :label="item.industry"
            :value="item.industry">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性质" prop="business_nature">
        <el-select v-model="jbxx_ruleForm.business_nature" placeholder="请选择企业性质">
          <el-option
            v-for="item in natureList"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规模" prop="company_scale">
        <el-select v-model="jbxx_ruleForm.company_scale" placeholder="请选择企业规模">
          <el-option
            v-for="item in scaleList"
            :key="item.name"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上市/投融资状态" prop="corporate_finance">
        <el-select v-model="jbxx_ruleForm.corporate_finance" placeholder="上市/投融资状态">
          <el-option
            v-for="item in listingList"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="注册地" prop="company_register_address">
        <el-input v-model="jbxx_ruleForm.company_register_address" placeholder="企业注册地"></el-input>
      </el-form-item>
  
      <el-form-item class="btn-box">
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

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
      industry: { // 行业
          industryList: [],
        },
      jbxx_ruleForm:{ // 企业基本信息 -- 数据
        logo:'', // 头像
        legal_person:'', // 法人
        organization_code:'',
        registered_capital:'',
        approval_date:'',
        establishment_date:'',
        business_license:'', // 营业执照
        industry: '', // 所属主页
        business_nature:'', // 企业性质
        company_scale:'', // 企业规模
        corporate_finance:'', // 上市状态
        company_name:'', // 对外展示名称
        company_register_address:'', // 企业地址
      },
      jbxx_rules: {  // 企业基本信息 ----  必填提示
      
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
        {id:1,name:'0-20人',value:'0-20'},
        {id:2,name:'20-50人',value:'21-50'},
        {id:3,name:'50-99人',value:'51-99'},
        {id:4,name:'100-599人',value:'100-599'},
        {id:5,name:'599-1999人',value:'600-1999'},
        {id:6,name:'1999人以上',value:'2000'},
      ],
      listingList:[
        {id:1,name:'天使轮'},
        {id:2,name:'A轮'},
        {id:3,name:'B轮'},
        {id:4,name:'C轮'},
        {id:5,name:'已上市'},
        {id:6,name:'未上市'},
      ],

    }
  },
  created(){
    // 获取信息
    this.getDetail();
    // 获取行业列表信息
    this.getIndustryList();
  },
  mounted(){
 
  },
  computed: {
    
  },
  methods: {
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

    // 获取行业列表信息
    getIndustryList(){
      let that = this;
      that.$axios.post('/api/industry/list',{}).then( res =>{
        that.industry.industryList = res.data;
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
        this.jbxx_ruleForm.logo = res.data.upload_files;
        this.$refs['upload'].clearFiles();
      
      }).catch( e=>{
        console.log('erro')
        this.$refs['upload'].clearFiles()
      })
    },
    // 获取信息
    getDetail(){
      let that = this;
      that.$axios.post('/api/company/detail',{}).then( res =>{
        if(res.code == 0){
          that.jbxx_ruleForm.logo = res.data.logo;
          that.jbxx_ruleForm.company_register_address =  res.data.company_register_address;
          that.jbxx_ruleForm.company_name = res.data.company_name;
          that.jbxx_ruleForm.business_license = res.data.business_license;
          that.jbxx_ruleForm.legal_person = res.data.legal_person;
          that.jbxx_ruleForm.organization_code = res.data.organization_code;
          that.jbxx_ruleForm.industry = res.data.industry;
          that.jbxx_ruleForm.business_nature = res.data.business_nature;
          that.jbxx_ruleForm.company_scale = res.data.company_scale;
          that.jbxx_ruleForm.corporate_finance = res.data.corporate_finance;

          that.jbxx_ruleForm.registered_capital = res.data.registered_capital;
          that.jbxx_ruleForm.approval_date = res.data.approval_date;
          that.jbxx_ruleForm.establishment_date = res.data.establishment_date;

         
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch( e=>{
        console.log(e)
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
        this.jbxx_ruleForm.business_license = res.data.upload_files;
        this.$refs['upload'].clearFiles();
       
      }).catch( e=>{
        console.log('erro')
        this.$refs['upload'].clearFiles()
      })
    },
    // 点击提交
    submitForm(){
      let that = this;
      let p = {
        logo: that.jbxx_ruleForm.logo, //公司logo
        company_register_address: that.jbxx_ruleForm.company_register_address,
        company_name: that.jbxx_ruleForm.company_name,
        legal_person: that.jbxx_ruleForm.legal_person, // 法人
        organization_code: that.jbxx_ruleForm.organization_code,
        business_license: that.jbxx_ruleForm.business_license, // 营业执照
        industry: that.jbxx_ruleForm.industry, // 所属主页
        business_nature: that.jbxx_ruleForm.business_nature, // 企业性质
        company_scale: that.jbxx_ruleForm.company_scale, // 企业规模
        corporate_finance: that.jbxx_ruleForm.corporate_finance, // 上市状态
        registered_capital: that.jbxx_ruleForm.registered_capital,
        approval_date: that.jbxx_ruleForm.approval_date,
        establishment_date: that.jbxx_ruleForm.establishment_date,
      }
   
      that.$axios.post('/api/company/edit',p).then( res =>{
        if(res.code == 0){
          that.$message.success('保存成功！');
          setTimeout(()=>{
            that.getDetail();
          },1500)
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
  .label-items-box{
    width: 100%;
    height: auto;
    font-size: 14px;
    padding-left: 10px;
    padding-right: 1rem;

    .items-box{
      width: 100%;
      margin-top: 20px;
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
  .avatar-box{
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
</style>
