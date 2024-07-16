<template>
  <div>
    <div class="container-zx">
      <el-dialog
        title="简历详情"
        :center="false"
        :visible.sync="zx_dialogVisible"
        width="940px"
        :before-close="handleClose"
      >
        <div class="pc-preview-wrapper m-box">
          <!-- 个人信息 -->
          <div class="resume-item item-base" v-if="basic_info">
            <div class="figure J_resume_baseMsg_headImgPreview">
              <img
                :src="
                  basic_info
                    ? basic_info.avatar
                    : require('../../../assets/image/bossSide/img-user.jpg')
                "
                alt=""
                class="cur-default"
              />
            </div>
            <div class="item-right item-right-1">
              <div style="text-align: left; display: flex">
                <h2 class="name">
                  {{
                    basic_info.is_name_protect == 1
                      ? basic_info.name
                      : basic_info.real_name
                  }}
                </h2>
                <div class="info-labels fr">
                  <span class="label-text">
                    <img
                      src="../../../assets/image/Frame_1.png"
                      alt=""
                      class="fz fz-age"
                    />
                    <span>{{
                      basic_info.birth_year_month
                        ? basic_info.birth_year_month
                        : "30岁"
                    }}</span>
                  </span>
                  <em class="vline"></em>
                  <span class="label-text">
                    <img
                      src="../../../assets/image/Frame_2.png"
                      alt=""
                      class="fz fz-age"
                    />
                    <span>{{
                      basic_info.begin_work_date
                        ? basic_info.begin_work_date
                        : "暂无"
                    }}</span>
                  </span>
                  <em class="vline"></em>
                  <span class="label-text">
                    <img
                      src="../../../assets/image/icon-qzzt-1.png"
                      alt=""
                      class="fz fz-age"
                    />
                    <span>{{
                      basic_info.work_status_desc
                        ? basic_info.work_status_desc
                        : "暂无"
                    }}</span>
                  </span>
                  <em class="vline"></em>
                  <span class="label-text">
                    <img
                      src="../../../assets/image/Frame_5.png"
                      alt=""
                      class="fz fz-age"
                    />
                    <span>{{
                      basic_info.live_city ? basic_info.live_city : "暂无"
                    }}</span>
                  </span>
                </div>
              </div>
              <div class="text selfDescription">
                {{ basic_info ? basic_info.advantages_highlights : "暂无" }}
              </div>
            </div>
          </div>
          <!-- 期望职位 -->
          <div class="resume-item" v-if="infoData.job_expectation">
            <h3 class="title">期望职位</h3>
            <div class="item-right">
              <div
                style="text-align: left"
                v-for="(items, idx) in infoData.job_expectation"
                :key="idx"
              >
                <div class="info-labels">
                  <span class="label-text">{{ items.desired_position }}</span>
                  <em class="vline"></em>
                  <span class="label-text">{{ items.desired_industry }}</span>
                  <em class="vline"></em>
                  <span class="label-text">{{ items.expected_salary }}</span>
                  <em class="vline"></em>
                  <span class="label-text">{{ items.desired_location }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 工作经历 -->
          <div class="resume-item" v-if="infoData.work_experience">
            <h3 class="title">工作经历</h3>
            <div class="item-right">
              <div class="history-list">
                <div
                  class="history-item"
                  v-for="(items, idx) in infoData.work_experience"
                  :key="idx"
                >
                  <span class="period"
                    >{{ items.begin_date }} - {{ items.end_date }}</span
                  >
                  <h4 class="name">
                    <span>{{ items.company_name }}</span>
                    <em class="vline"></em>
                    <span>{{ items.position }}</span>
                  </h4>
                  <div class="item-text">
                    <span class="project-title">内容：</span>
                    <div
                      class="text"
                      v-html="items.responsibility_performance"
                    ></div>
                    <!-- <p class="tags">
                      <span></span>
                    </p> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 项目经历 -->
          <div class="resume-item" v-if="infoData.project_experience">
            <h3 class="title">项目经历</h3>
            <div class="item-right">
              <div class="history-list">
                <div
                  class="history-item"
                  v-for="(items, idx) in infoData.project_experience"
                  :key="idx"
                >
                  <span class="period"
                    >{{ items.begin_date }} - {{ items.end_date }}</span
                  >
                  <h4 class="name">
                    <span>{{ items.project_name }}</span>
                    <em class="vline"></em>
                    <span>{{ items.position }}</span>
                  </h4>
                  <div class="item-text">
                    <span class="project-title">内容：</span>
                    <div class="text" v-html="items.job_content"></div>
                    <!-- <p class="tags">
                      <span></span>
                    </p> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 教育经历 -->
          <div class="resume-item" v-if="infoData.education_experience">
            <h3 class="title">教育经历</h3>
            <div class="item-right">
              <div class="history-list">
                <div
                  class="history-item"
                  v-for="(items, idx) in infoData.education_experience"
                  :key="idx"
                >
                  <span class="period">{{ items.school_date }}</span>
                  <h4 class="name">
                    <b>{{ items.school }}</b>
                    <em class="vline"></em>
                    <b>{{ items.specialty }}</b>
                    <em class="vline"></em>
                    <b>{{ items.education_background }}</b>
                  </h4>
                  <!-- <p class="tags school-tags">
                    <span class="blue">211院校</span>
                  </p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="info-right-box" v-if="is_type == 'searchTalent'">
          <div class="m-box">
            <div class="title">感觉人才还不错，您可以:</div>
            <div class="form-btns">
              <el-button type="primary" @click="clickChat(infoData)"
                >打招呼</el-button
              >
              <el-button @click="getContactMthod(infoData, 'phone')"
                >电话沟通</el-button
              >
              <el-button @click="getContactMthod(infoData, 'wechat_number')"
                >获取微信</el-button
              >
            </div>
            <div
              class="form-btns"
              style="display: flex; align-items: flex-end; margin-top: 10px"
            >
              <el-rate
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </div>
            <div class="icon-box">
              <!-- <div>
                <img src="../../../assets/image/bossSide/icon-shareAlt-1.png" alt="" />
                <span>转发给同事</span>
              </div> -->

              <div @click="collection">
                <img
                  src="../../../assets/image/bossSide/icon-star-1.png"
                  alt=""
                />
                <span :class="infoData.is_collection == 1 ? 'hover' : ''">
                  {{ infoData.is_collection == 1 ? "已收藏" : "收藏" }}</span
                >
              </div>
              <div @click.stop="clickShare()">
                <img
                  src="../../../assets/image/bossSide/icon-shareAlt-1.png"
                  alt=""
                />
                <span>分享</span>
              </div>
              <div @click.stop="clickComplaint()">
                <i class="el-icon-s-release"></i>
                <span>举报</span>
              </div>
            </div>

            <!-- 分享区域 开始 -->
            <div class="items-review-box" :class="show_share ? 'show-box' : ''">
              <div class="share-content">
                <div class="share-item" @click="clickShareWent(1)">
                  <img src="../../../assets//image/share-wx.png" />
                  <span>微信</span>
                </div>
                <div class="share-item" @click="clickShareWent(1)">
                  <img src="../../../assets//image/share-pyq.png" />
                  <span>朋友圈</span>
                </div>
                <div class="share-item" @click="clickShareWent(2)">
                  <img src="../../../assets//image/share-wb.png" />
                  <span>微博</span>
                </div>
              </div>
            </div>
            <!-- 分享区域 结束 -->
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- 选择岗位 弹窗 -->
    <div class="positionList-dialogbox">
      <el-dialog
        title="选择岗位1"
        :center="false"
        :visible.sync="position_dialogVisible"
        width="300px"
        :before-close="position_handleClose"
      >
        <div class="positionList-box">
          <ul style="max-height: 400px; overflow-y: auto">
            <li
              v-for="(item, index) in positionList"
              :key="index"
              @click="clickpositionList(item)"
            >
              {{ item.position_name }}
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>

    <Complaint
      ref="complaint"
      :id="complaintData.id"
      :uId="complaintData.uId"
      states="0"
      zIndex="1000"
    />
  </div>
</template>

<script>
import Complaint from "@/components/complaint";
export default {
  components: { Complaint },
  props: {
    infoData: {
      type: Object,
      default() {
        return {
          data: {},
        };
      },
    },
    basic_info: {
      type: Object,
      default() {
        return {
          data: {},
        };
      },
    },
    is_type: {
      type: String,
      default() {
        return {
          data: "",
        };
      },
    },
  },
  data() {
    return {
      show_share: false,
      zx_dialogVisible: false,
      positionList: [], // 岗位列表
      position_dialogVisible: false,
      seltPositionData: {},
      complaintData: {
        id: "",
        uId: "",
      },
    };
  },
  computed: {},
  mounted() {},
  methods: {
    // 举报人才
    clickComplaint() {
      // 当前登录人id
      this.complaintData.id = localStorage.getItem("user_number");
      // 人才id
      this.complaintData.uId = this.basic_info.user_number;
      this.zx_dialogVisible = false;
      this.$refs.complaint._data.states = "0";
      this.$refs.complaint._data.isComplaint = true;
      this.$refs.complaint.setComplaintType();
    },
    // 是否显示分享
    clickShare() {
      this.show_share = this.show_share ? false : true;
    },
    // 分享按钮点击  1 复制链接  2 微博
    clickShareWent(i) {
      const that = this;
      const title = "【自猎网】"; // 标题
      if (i == 2) {
        let images = encodeURIComponent(that.basic_info.avatar);
        let shareUrl = encodeURIComponent(window.location.href);
        const url = `https://service.weibo.com/share/share.php?url=${shareUrl}&type=3&count=1&appkey=&title=${title}&pic=${images}&searchPic=false&ralateUid=&language=zh_cn&rnd=`;
        window.open(url, "_blank");
        this.show_share = false;
        return;
      }
      navigator.clipboard
        .writeText(title + window.location.href)
        .then(() => {
          this.$message.success("已复制到剪贴板");
        })
        .catch((err) => {
          console.error("复制失败", err);
        });
    },
    handleClose(done) {
      this.zx_dialogVisible = false;
    },
    // 点击收藏
    async collection() {
      let that = this;
      let url = "";
      let infoData = that.infoData;
      if (infoData.is_collection == 1) {
        // 取消收藏
        url = "/api/company-collection/cancelcollection";
      } else {
        //收藏
        url = "/api/company-collection/collection";
      }
      await that.$axios
        .post(url, {
          uid: infoData.basic_info.uid,
        })
        .then((res) => {
          if (res.code == 0) {
            that.$message.success({
              message: res.msg,
            });
            infoData.is_collection == 1
              ? (infoData.is_collection = 2)
              : (infoData.is_collection = 1);
            that.infoData = infoData;
          } else {
            that.$message.error({
              message: res.msg,
            });
          }
        });
    },
    // 点击获取微信、手机号
    async getContactMthod(i, t) {
      let that = this;
      let p = {
        uid: i.uid || i.basic_info.uid,
      };
      let text = "";
      if (t == "phone") {
        p.field = "phone";
        text = "手机号";
      }
      if (t == "wechat_number") {
        p.field = "wechat_number";
        text = "微信";
      }

      that.$axios
        .post("/api/company/get-contact-method", p)
        .then((res) => {
          if (res.code == 0) {
            this.$alert(res.data.contact_method, text, {
              confirmButtonText: "确定",
            });
          } else {
            that.$message.error({
              message: res.msg,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // 点击聊一聊
    async clickChat(i) {
      let that = this;
      let res = await that.$axios.post("/api/staff/profile", {});
      if (res.data.vip_rank < 1) {
        that.$message.error({
          message: "购买会员后才可打招呼！",
        });
        setTimeout(() => {
          that.$router.push("/topUpBuy");
        }, 1000);
        return;
      }
      that.seltPositionData = i;
      console.log(that.seltPositionData)
      that.getPositionList(); // 获取职位
    },
    // 创建岗位会话信息
    createPositionChatRecord(p_i, u_i) {
      let that = this;
      let p = {
        position_id: p_i,
        uid: u_i,
        tag: 2,
      };
      that.$axios
        .post("/api/position-chat-record/create", p)
        .then((res) => {
          if (res.code == 0) {
            console.log("保存岗位成功");
          } else {
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 点击岗位列表
    clickpositionList(i) {
      let that = this;
      let seltPositionData = that.seltPositionData;
      let name = "";
      if (seltPositionData.basic_info.is_name_protect == 1) {
        name = seltPositionData.basic_info.name;
      } else {
        name = seltPositionData.basic_info.real_name;
      }
      let infoData = {
        id: "u_" + seltPositionData.basic_info.uid,
        uid: seltPositionData.basic_info.uid,
        name: name,
        avatar: seltPositionData.basic_info.avatar,
        company_id: i.company_id, // 企业id
        position_id: i.id, // 岗位id
        position_name: i.position_name,
        user_number: i.user_number,
      }
      that.zx_dialogVisible = false;
      that.position_dialogVisible = false;
      that.createPositionChatRecord(i.id,seltPositionData.basic_info.uid);
      that.$bus.$emit('receiveParams', {type:'searchTalent',laiyuan:'nav',infoData });
    },
    position_handleClose() {
      this.position_dialogVisible = false;
    },
    // 获取职位
    getPositionList() {
      let that = this;
      that.$axios
        .post("/api/company-interview/recruit/position/list", {
          company_id: localStorage.getItem("company_id"),
        })
        .then((res) => {
          if (res.code == 0) {
            that.positionList = res.data;
            if (that.positionList.length <= 0) {
              that.$message.error({
                message: "请先发布岗位！",
              });
            } else {
              that.position_dialogVisible = true;
            }
          } else {
            that.$message.error({
              message: res.msg,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container-zx /deep/ .el-dialog {
  min-width: 320px;
  top: 50%;
  transform: translateY(-50%);
  margin-top: 0 !important;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 68px);
  .el-dialog__header {
    text-align: left;
    background: #fff;
    padding: 16px 20px;
    height: auto;
    .el-dialog__title {
      font-size: 16px;
      color: $g_textColor;
    }
  }
  .el-dialog__body {
    // height: calc(100vh - 128px);
    flex: 1;
    overflow: overlay;
    padding: 16px;
    display: flex;
    .pc-preview-wrapper {
      flex: 1;
      color: #414a60;
      line-height: 26px;
      padding: 20px 16px;
      .resume-item {
        display: block;
        zoom: 1;
        position: relative;
        padding-top: 18px;
        overflow: hidden;
        &:first-child {
          padding-top: 0;
        }
        .figure {
          float: left;
        }
        .J_resume_baseMsg_headImgPreview {
          position: relative;
          z-index: 99;
        }
        img {
          width: 130px;
          height: 160px;
          border-radius: 6px;
          cursor: default;
        }
        .item-right {
          position: relative;
          padding-left: 80px;
          vertical-align: top;
          padding-top: 2px;
          h2.name {
            width: auto;
            font-size: 14px;
            font-weight: bold;
            display: inline-block;
            position: relative;
          }
          .info-labels {
            font-size: 0;
            padding: 0;
            .label-text {
              display: inline-block;
              vertical-align: middle;
              font-size: 13px;
              img {
                width: 14px;
                height: 14px;
              }
            }
            .vline {
              margin: 0 10px;
            }
            .fz {
              margin-left: 5px;
              display: inline-block;
              width: 16px;
              vertical-align: middle;
            }
          }
          .fr {
            flex: 1;
            padding-left: 10px;
          }
          .text {
            color: #61687c;
            font-size: 13px;
            line-height: 26px;
            position: relative;
            word-wrap: break-word;
            word-break: break-all;
            white-space: pre-line;
            max-width: 600px;
            text-align: left;
          }

          .history-item {
            padding-top: 20px;
            position: relative;
            text-align: left;
            &:first-child {
              padding-top: 0;
            }
            .period {
              float: right;
              color: #9fa3b0;
              font-size: 12px;
            }
            h4.name {
              font-weight: 500;
              position: relative;
              color: #414a60;
              span,
              b {
                font-weight: 500;
              }
              .vline {
                margin: 0 18px;
              }
            }
            .item-text {
              position: relative;
              margin-top: 25px;
              min-height: 26px;
              color: #9fa3b0;
              .text {
                color: #51586d;
                font-size: 13px;
                line-height: 26px;
                position: relative;
                word-wrap: break-word;
                word-break: break-all;
                white-space: pre-line;
                max-width: 600px;
                padding-top: 10px;
              }
              .tags {
                margin-top: 15px;
                padding-bottom: 5px;
                span {
                  display: inline-block;
                  border: 1px solid #e3e7ed;
                  border-radius: 15px;
                  margin-right: 12px;
                  font-size: 12px;
                  line-height: 22px;
                  padding: 0 15px;
                  color: #9fa3b0;
                }
              }
            }
          }
          .project-title {
            font-weight: 500;
            line-height: 20px;
            width: 60px;
            text-align: right;
            box-sizing: border-box;
            padding-right: 4px;
            color: #51586d;
          }
        }
        .item-right.item-right-1 {
          padding-left: 145px;
        }
        .title {
          float: left;
          font-size: 14px;
          color: #414a60;
          width: 70px;
          font-weight: 500;
        }
      }
    }
    .info-right-box {
      width: 320px;
      padding-left: 16px;
      .title {
        font-size: 14px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 24px;
      }
      .form-btns {
        width: 100%;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        .el-button {
          padding: 0;
          width: 100%;
          height: 40px;
          line-height: 40px;
          margin: 0;
          margin-top: 1rem;
        }
        .el-button--primary {
          background-color: $g_color;
          border-color: $g_color;
        }
      }
      .icon-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        & > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          img {
            width: 16px;
            height: 16px;
          }
          span {
            font-size: 12px;
            font-weight: 400;
            color: #86909c;
            line-height: 20px;
            padding-top: 6px;
          }
        }
      }
    }
  }
}
.vline {
  width: 1px;
  height: 12px;
  vertical-align: middle;
  background: #e0e0e0;
  margin: 0 10px;
  display: inline-block;
}
.positionList-dialogbox {
  /deep/ .el-dialog {
    .el-dialog__header {
      text-align: left;
      padding: 10px;
      .el-dialog__title {
        font-size: 15px;
        color: $g_textColor;
      }
      .el-dialog__headerbtn {
        top: 10px;
      }
    }
    .el-dialog__body {
      max-height: 400px;
      padding: 0 0 20px 0;
      margin: 0 10px;
      border-top: 1px solid #f2f3f5;
      .positionList-box {
        height: auto;
        width: 100%;
        li {
          font-size: 14px;
          padding: 10px;
          cursor: pointer;
          &:hover {
            background: #e0e0e041;
            color: $g_color;
          }
        }
      }
    }
  }
}
// 评论展示
.items-review-box {
  transition: all 0.5s;
  padding-left: 16px;
  padding-right: 16px;
  background: #f6f6f694;
  margin-top: 10px;
  height: 0;
  overflow: auto;
  &.show-box {
    height: auto;
    padding-top: 10px;
    padding-bottom: 14px;
    max-height: 450px;
  }
  .share-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .share-item {
      font-size: 12px;
      color: #505050;
      line-height: 20px;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      img {
        width: 28px;
        height: 28px;
        margin-bottom: 4px;
      }
      span {
        display: block;
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
