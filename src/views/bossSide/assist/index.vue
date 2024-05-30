<template>
  <div class="bossSide-container">
    <!-- 常见问题 -->
    <div class="m-box margin-top-20 assist-box">
      <div class="left-box"></div>
      <div class="right-box">
        <div class="wt-box">
          <div class="title">常见问题相关问题</div>
          <div class="wt-list">
            <p>1. 什么是虚拟电话号码？</p>
            <p>2. 为什么设置虚拟电话号码？有效期是多久？</p>
            <p>3. 如何拨打虚拟号码？</p>
            <p>4. 当前虚拟号码有效期能否延迟？</p>
            <p>5. 哪些简历会显示虚拟号码？</p>
            <p>6. 企业来电时，求职者端显示是虚拟号还是真实号？</p>
            <p>7. 主动投递的简历是否是真实号码？是否有时效性？</p>
          </div>
        </div>
        <div class="assist-items-box">
          <div class="problem-title">1.什么是虚拟电话号码？</div>
          <div class="answer">虚拟电话号码是通过第三方运营商，给手机或座机号码设置的虚拟号。<br /> 在智联招聘当招聘者需要与求职者进行电话沟通时，智联招聘系统将会为该求职者自动分配虚拟号码，以保障可以顺畅沟通的同时，保护求职者的信息安全。</div>
        </div>
        <div class="assist-items-box">
          <div class="problem-title">2. 为什么设置虚拟电话号码？有效期是多久？</div>
          <div class="answer">为建设更安全健康的招聘求职环境，进一步保护招聘者和求职者的信息安全。因此，智联招聘设置开通了虚拟电话号码功能。<br />虚拟电话号码的有效期为7天，7天后系统会重新分配新的虚拟电话号码，具体时间可通过求职者简历详情中进行查看（请参考如下截图）</div>
        </div>
        <div class="assist-items-box">
          <div class="problem-title">3.如何拨打虚拟号码？</div>
          <div class="answer">当招聘者使用虚拟电话号码时，需先拨打11位虚拟手机号，听到提示音后继续输入分机号。</div>
        </div>
        <div class="assist-items-box">
          <div class="problem-title">4.当前虚拟号码有效期能否延迟？</div>
          <div class="answer">当分配的虚拟号码到第7日后，系统会自动为该求职者简历中的联系电话生成新的虚拟号码，方便企业用户与求职者联系，登录系统即可见，故不会将同一个虚拟号码延期</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .assist-box{
    display: flex;
    .left-box{
      width: auto;
    }
    .right-box{
      flex: 1;
      .wt-box{
        width: 100%;
        .title{
          font-size: 20px;
          font-weight: 500;
          color: #1F2E4D;
          line-height: 28px;
        }
        .wt-list{
          margin-top: 15px;
          p{
            font-size: 14px;
            font-weight: 400;
            color: #000000;
            line-height: 28px;
          }
        }
      }
      .assist-items-box{
        margin-top: 30px;
        .problem-title{
          font-size: 16px;
          font-weight: bold;
          color: #1F2E4D;
          line-height: 24px;
        }
        .answer{
          font-size: 14px;
          font-weight: 400;
          color: #4E5969;
          line-height: 28px;
        }
      }
    }
  }
</style>