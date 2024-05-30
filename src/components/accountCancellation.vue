<template>
  <div>
    <div class="userAgreement-box">
      <el-dialog class="declaration-box" title="自猎平台用户协议" :visible.sync="dialogVisible" height="auto">
        <div class="dialog-content-box">
          <div class="dialog-content-left">
            <h3>【重要】</h3>
            <br>
            <p>自猎科技平台账号系由自猎科技（宁波）有限公司（以下简称“我们”）就您使用部分或全部自猎科技平台服务（包括但不限于自猎网PC/APP产品、小程序等）的通用登录账号。在您决定申请账号注销前，请根据需要慎重注销自猎科技平台账号。申请“注销账号”的，您将无法使用自猎科技提供的全部产品与服务（网页端和手机端及小程序等）。</p>
            <p>需要特别说明的是，下文中“账号”特指您选择申请注销的账号类型，“产品与服务”特指与您申请注销账号相应的我们的产品与服务，本《注销协议》相关条款的解释，将根据您实际选择注销账号的确定具体含义。</p>
            <h3>【特别提示】</h3>
            <br>
            <p>当您按照注销页面提示填写信息、阅读并同意本《注销协议》及相关条款与条件且完成全部注销程序后，即表示您已充分阅读、理解并接受本《注销协议》的全部内容。阅读本《注销协议》的过程中，如果您不同意相关任何条款和条件约定，请您立即停止账号注销程序。</p>
            <p>账号注销意味着我们将在系统中删除您的个人和企业信息，使其保持不可被检索、访问的状态，或对其进行匿名化处理。账号注销后，您将无法再以此账号登录和使用所有产品与服务以及产品及服务中与第三方合作的服务内容，但您仍然有可能会收到自猎平台发送的相关产品推广信息。我们在此善意地提醒您，您注销账户的行为会给您向我们或平台上的第三方主张权利带来诸多不便。账号一旦注销完成，将无法恢复，包括您已购买但还没有消费完的产品服务会一并注销并视为主动放弃服务权利。请您在注销前慎重考虑。</p>
            <p>为账号安全考虑，对于账号注销申请，我们可能会对申请人进行身份验证，验证方式以页面显示为准。</p>
            <p style="color: #333;">您勾选本《注销协议》并点击下一步操作的，即视为您已经签署本《注销协议》并同意遵守其全部内容。</p>
            <br>
            <h3 style="text-align: center; color: #ff0000;">（如您确定准备注销账号的，请继续向下阅读）</h3>
            <br>
            <h4>一、为保障您的账号安全和财产权益，在您申请注销账号前，您应当确保该账号为正常状态的账号，否则，您可能无法注销该账号。“正常状态”是指该账号应同时符合以下条件：</h4>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="font-weigh: bold; color: #000;">·</span>&nbsp;&nbsp;该账号是您本人通过我们提供的官方渠道注册并由您本人使用的账号；</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="font-weigh: bold; color: #000;">·</span>&nbsp;&nbsp;该账号内不存在已提供服务但未支付的订单；</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="font-weigh: bold; color: #000;">·</span>&nbsp;&nbsp;该账号不存在任何未处理完毕的投诉、争议或纠纷，包括但不限于被冻结后未解冻或恢复、投诉举报他人或被他人投诉举报以及升级认证未完成的；</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="font-weigh: bold; color: #000;">·</span>&nbsp;&nbsp;该账号最近三个月内无任何被检测到异常登录或其他不安全、异常行为的记录；</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="font-weigh: bold; color: #000;">·</span>&nbsp;&nbsp;该账号无任何未处理完毕的违规被限制、冻结或其他处罚的记录。</p>
            <p>在您提交注销申请后，我们发现或被告知该账号涉及争议、纠纷等，包括但不限于投诉、举报、诉讼、仲裁、国家权力机关、监管部门调查等，我们有权暂停处理您的注销申请并且无需另行得到您的同意。</p>
            <br>
            <h4>二、您知悉并同意账号注销后，将自行承担下述后果：</h4>
            <br>
            <p>1.您将无法登录该账号，无法再通过此账号使用相关产品与服务。</p>
            <p>2.您将无法恢复和访问该账号中的全部数据信息，包括但不限于用户名/昵称、头像、附件简历、在线简历、系统消息、发布的职位、站内信息、历史订单记录、使用记录等，但您的留言、评论记录会一直保留及展示，如您不想展示您的留言及评价内容的，请您在注销前前往您留言及评价的内容下文进行删除您的留言及评价内容。</p>
            <p>3.您将无法找回该账号曾登录的PC端、手机App端等的所有记录。</p>
            <p style="font-weigh: bold;">4.一旦您注销账号，您在账号使用期间获得的已产生但未消耗完毕的增值服务或付费权益及未来的预期利益等视为您已自行放弃，将无法继续使用。我们将会对该账号下的全部权益进行清除处理，包括但不限于虚拟道具、卡券、VIP账号权益、直播产品等各类付费权益（以下合称“剩余资产”）。当您申请注销时，若账户存在剩余资产，我们会作出提示，以便您能够按照平台提示合理处分您的剩余资产，如您不进行处理并坚持继续注销、视为您主动放弃剩余资产。</p>
            <p>5.该账号一旦注销，将无法恢复。您在完成注销后，即使以相同的手机号码或身份证号码再次注册账号并审核通过的，此时该账号将默认为新的用户账号，无法继承注销前账号的所有产品服务。</p>
            <p style="color: #ff0000;">再次向您进行善意提醒，账号一旦注销后将无法恢复，建议您在操作之前自行备份与账号相关的所有信息和数据。</p>
            <br>
            <h4>三、账号注销流程</h4>
            <br>
            <p>1.您需按照我们官方渠道提供的注销流程和操作指引，在相关功能设置页面进行注销操作，结合您的真实意愿选择注销自猎科技平台下的所有账号；</p>
            <p>2.您已经仔细阅读与充分理解并同意本《注销协议》的全部内容；同时，您已经检查与确认您申请注销的账号已满足本协议第一条的要求；</p>
            <p>3.在您完成上述第两点后，我们将根据您申请注销的账号的安全状态以及您的相关产品与服务的使用情况等综合判断您的账号是否符合注销条件；</p>
            <p>4.如满足注销条件，为保障您的账号和财产权益的安全，我们需要进行注销申请的身份验证（如注册手机验证/密码认证/邮箱认证方式等），以确保您是申请注销账号的实际使用权人；</p>
            <p>5.如我们在综合判断后发现您申请注销的账号不符合注销条件的，或者“身份验证”失败的，您的注销可能会失败。您可以按照我们的注销流程进行后续操作或联系客服协助处理；</p>
            <p>6.在您完成前述“身份验证”后，视为您已成功向我们提交了账号注销申请。在此期间内，我们有可能会为您提供申请注销的账号提供15个自然日的冷静期（即“冻结期”）（以注销界面信息为准）。在该冻结期内，您无法登录与使用相关账号，且我们会将您申请注销的账号发布的相关信息从业务场景中删除，任何人均无法通过我们的服务查看到您的个人信息，但前述信息暂时不会作物理性删除或匿名化处理。冻结期内（如有冻结期），您在提供相关身份信息完成验证后，可通过客服或自猎网公布的其他方式申请恢复该账号；如平台无法提供冷静期的，则完成注销后即表示永久注销和删除所有权益和信息并无法申请恢复该账号。</p>
            <p>7.如冻结期届满（如有冻结期），我们未收到您恢复账号的请求或者未出现任何其他不得注销事由的，您申请注销的账号将被永久注销。（具体的注销流程化和操作以我们在官方渠道公布或产品页面提示的为准。）</p>
            <p>8.您理解并同意，在您申请注销账号期间，如我们需要对相关交易、投诉或其他与该账号相关的事项进行核实的，或者有其他合理理由的，我们有权冻结您申请注销的账号且暂时不为您提供注销服务。</p>
            <p>9.本协议如有未尽事宜，请参考自猎网《用户协议》《隐私政策》或其他相关页面规则、说明、提示等。</p>
            <p>10.若您在注销过程中有任何问题，您无法处理的或在处理过程中有任何疑惑的，可联系我们的客服协助处理。</p>
            <p style="color: #ff0000;">11.您知悉并同意：</p>
            <p style="color: #ff0000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="font-weigh: bold; color: #000;">·</span>&nbsp;&nbsp;您注销账号的行为，并不能减轻或免除您应承担的法定或约定的义务或责任。</p>
            <p style="color: #ff0000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="font-weigh: bold; color: #000;">·</span>&nbsp;&nbsp;在您的账号完成注销后，我们有权拒绝响应您提出的与前述相关的任何需求。</p>
            <br>
            <br>
            <p style="text-align:right;"><b> 生效日期：2024年1月1日</b></p>
            <p style="text-align:right;"><b>01版本</b></p>
            <br>
            <br>
            <br>
          </div>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="clickdialogVisible" class="footer-clobtn">确认注销</el-button>
      </span> 
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth';
export default {

  components: {
  },
  props:{
    id:{
      type: Number,
      default() {
        return null
      }
    },
  },
  data(){
    return{
      dialogVisible: false
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
   
    handleClose(done) {
      this.dialogVisible = false;
    },
    // 点击确认按钮
    clickdialogVisible(){
      let that = this;
      let id = that.id;
      let tag = localStorage.getItem('tag');
      that.dialogVisible = false;
      let p = {
        tag,
      }
      if(tag == 'company'){
        p.company_id = id;
      }
      if(tag == 'user'){
        p.uid = id;
      }
      that.$axios.post('/api/logout',p).then(res =>{
        if(res.code == 0){
          that.$message.success({
            message:'注销成功'
          })
          setToken('');
          localStorage.setItem('tag', ''); // 用户身份 user、人才端 company、企业端缓存
          // 清除缓存的权限菜单
          sessionStorage.removeItem("route");
          setTimeout( () =>{
            that.$router.push(`/login`);
          },1000)
        }else{
          
        }
      }).catch(error =>{
        console.log(error)
       
      })
    }
  },
};
</script>

<style lang="scss" scoped>
  .userAgreement-box /deep/ .el-dialog{
    height: 88%;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 50%;
    left: 50% !important;
    z-index: 9999 !important;
    transform: translate(-50%, -50%) !important;
    margin: 0 !important;
    border-radius: 6px;
    overflow: hidden;
    .el-dialog__header{
      padding: 20px 0;
      font-size: 15px;
      font-weight: 600;
      width: 100%;
      height: auto;
      background: #fff;
      text-align: center !important;
    }
    .el-dialog__body{
      flex: 1;
      width: 100%;
      padding: 0 !important;
      overflow: auto !important;
      -ms-overflow-style:none !important; /*IE浏览器 */
      scrollbar-width:none !important;  /*火狐浏览器 */
    
    }
  }

   /* 谷歌浏览器隐藏滚动条 */
  .userAgreement-box /deep/ .el-dialog__body::-webkit-scrollbar{ 
    display: none;
  }
  .userAgreement-box /deep/ .el-dialog__footer{
    display: inline-block;
    width: 100%;
    height: auto;
    padding: 10px 0;
    background: #fff;
    text-align: center;
  }
  .userAgreement-box /deep/ .el-dialog__footer .footer-clobtn{
    color: #fff !important;
  }
  .userAgreement-box /deep/ .el-dialog__body .dialog-content-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .userAgreement-box /deep/ .el-dialog__body .dialog-content-box .dialog-content-left{
    flex: 1;
    width: 100%;
    text-align: left;
    padding: 0 20px;
  }
 
  .userAgreement-box /deep/ .el-dialog__body .dialog-content-box .dialog-content-left p{
    line-height: 26px;
  }
</style>
