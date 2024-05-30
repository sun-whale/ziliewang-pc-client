<template>
  <div class="bossSide-container interaction-box">
    <div class="chat-window-box">
      <buddyChart />
    </div>

    <!-- 预览附件简历pdf 弹窗  -->
    <div class="container-pdf">
      <el-dialog title="附件预览" :center="false" :visible.sync="pdf_dialogVisible" width="800px" :before-close="pdf_handleClose">
        <div class="pdf-preview-box">
          <div class="pdfViewer" id="viewer">
            <pdf :src="src" style="width: 100%;" :page="i" v-for="i in numPages" :key="i" ref="pdf"></pdf>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf';
import buddyChart from '../../bossSide/components/mag/buddyChart.vue';
export default {
  components: {
    pdf,
    buddyChart,
  },
  data() {
    return {
      tabStatus: 1, //消息类型 1.投递 2.邀请 3.不合适 4.其他
      uid: window.localStorage.getItem('uid'),
      loading: false,
      yqms_dialogVisible: false,
      ruleForm:{
        type:'',
        begin_time:'',
        end_time:'',
        staff:'',
        phone:'',
        remark:''
      },
      page: 1,
      pagesize: 20,
      user_uid:'', // 对方uid
      selt_index: -1,
      selt_info: '',
      onlineResumeData:{}, // 在线简历
      online_basic_info:{}, // 在线简历个人信息
      is_type:'',
      pdfUrl:'',
      src: "",
      pdf_dialogVisible: false,
      numPages: 0

    }
  },
  created(){
    this.user_uid = this.$route.query.user_uid;
  },
  mounted(){

  },
  methods:{
    /**
     * 获取当前时间 格式：yyyy-MM-dd HH:MM:SS
    */
    getCurrentTime(){
        var date = new Date();//当前时间
        var month = this.zeroFill(date.getMonth() + 1);//月
        var day = this.zeroFill(date.getDate());//日
        var hour = this.zeroFill(date.getHours());//时
        var minute = this.zeroFill(date.getMinutes());//分
        var second = this.zeroFill(date.getSeconds());//秒

        //当前时间
        var curTime = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        return curTime;
    },

    /**
     * 补零
     */
    zeroFill(i){
      if (i >= 0 && i <= 9) {
          return "0" + i;
      } else {
          return i;
      }
    },
    pdf_handleClose(done) {
      this.pdf_dialogVisible = false;
    },
    yqms_handleClose(done) {
      this.yqms_dialogVisible = false;
    },
    clickStatus(n){
      this.tabStatus = n;
    },
    clickmsgListData(i){
      let that = this;
      that.selt_info = i;
      that.user_uid = i.uid;
      that.msgList = i.chat_list;
      that.scrollBottom(); // 页面滚动到底部
    },


    
    // 获取聊天列表
    getSysMsgList(){
      let that = this;
      that.$axios.post('/api/sys-msg/list',{
        page: that.page,
        pagesize: that.pagesize
      }).then( res =>{
        if(res.code == 0){
          let sysMsgListData = res.data;
          that.sysMsgListData = sysMsgListData;
          sysMsgListData.forEach( ele =>{
            if(ele.uid == that.user_uid){
              console.log(ele)
              that.clickmsgListData(ele)
            }
          })
          // that.selt_info = that.sysMsgListData[that.selt_index]
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 查看在线简历
    onlineResume(){
      let that = this;
      let selt_info = that.selt_info;
      that.$axios.post('/api/company/resume/detail',{
        uid: selt_info.uid
      }).then( res =>{
        if(res.code == 0){
          that.onlineResumeData = res.data;
          that.online_basic_info = res.data.basic_info;
          that.$refs.onlineResume._data.zx_dialogVisible = true;
          // that.zx_dialogVisible = true;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 点击附件简历名称---预览
    clickVitae(url){
      this.pdfUrl = url;
      // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
      this.src = pdf.createLoadingTask(this.pdfUrl);
      this.getPDFnums(this.pdfUrl);
      this.pdf_dialogVisible = true;
    },
    //计算pdf页码总数
    getPDFnums(url) {
      this.loading = true
      //let loadURL = pdf.createLoadingTask(url)
      let loadURL = pdf.createLoadingTask({
        url: url,//你的pdf地址
      })

      loadURL.promise.then(pdf => {
          this.numPages = pdf.numPages
          this.$set(this, 'docsPDF.numPages', pdf.numPages)
          this.loading = false
      }).catch(err => {
          this.loading = false;
          this.loadingError = true;
      })
    },
    // 点击发送面试邀请
    submitForm(){
      let that = this;
      let selt_info = that.selt_info;
      let p = {
        status: 2, //1.待查看2.发送邀请 3.不合适 4.已参加 5已超时
        uid: selt_info.uid, // 用户 
        id: selt_info.company_interview_id, // 面试信息id 
        company_id: selt_info.company_id, // 企业id
        position_id: selt_info.position_id,  // 岗位信息id
        system_msg_id: selt_info.id,  // 消息id
        type_id:  selt_info.type_id,
        type: that.ruleForm.type,
        begin_time: that.ruleForm.begin_time,
        end_time: that.ruleForm.end_time,
        staff: that.ruleForm.staff,
        phone: that.ruleForm.phone,
        remark: that.ruleForm.remark
      }
      console.log(p)
      that.$axios.post('/api/company-interview/edit',p).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message:'发送面试邀请成功'
          })
          this.yqms_dialogVisible = false;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    click_bhs(n){
      let that = this;
      let selt_info = that.selt_info;
      let p = {
        status: n, //1.待查看 2 发出邀请 3不合适  6求简历
        uid: selt_info.uid, // 用户 
        id: selt_info.company_interview_id, // 面试信息id 
        company_id: selt_info.company_id, // 企业id
        position_id: selt_info.position_id,  // 岗位信息id
        system_msg_id: selt_info.id,  // 消息id
        type_id:  selt_info.type_id,
      }
      that.$axios.post('/api/company-interview/edit',p).then( res =>{
        if(res.code == 0){
          if(n == 3){
            that.$message.success({
              message:'已添加为不合适'
            })
          }
          if(n == 6){
            that.$message.success({
              message:'发送成功！'
            })
          }
          
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },



  //滚动到底部
    scrollBottom:function(){
      var that=this;
      this.$nextTick(function(){
          var container = that.$refs.scrollbar;
          container.scrollTop = 999999999;
      });
    },
  
  }
}
</script>

<style lang="scss" scoped>
  .interaction-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 75px);
    margin-top: 10px;
    margin-bottom: 10px;
  }
  // 聊天页面样式
  .chat-window-box{
    padding: 0;
    width: 100%;
    margin: 0 auto;
    flex: 1;
    display: flex;
    height: calc(100vh - 120px);
    margin-top: 15px;
  }
  dd, dl, dt, li, ol, ul {
    list-style: none;
  }


  .container-pdf /deep/ .el-dialog{
    min-width: 320px;
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
      height: calc(100vh - 128px);
      overflow: hidden;
      padding: 20px;
      .pdf-preview-box{
        width: 794px;
        height: calc(100vh - 172px);
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
    
  }
 
</style>