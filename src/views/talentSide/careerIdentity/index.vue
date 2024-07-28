<template>
  <div class="container" id="myProfessionalCircle">
    <div class="new-title-box view-box">
      <div class="live-video-hero-image">
        <div class="profile-background-image"></div>
      </div>
      <div class="ph5">
        <div class="display-flex">
          <div class="pv-top-card--photo">
            <div class="pv-top-card__photo-wrapper">
              <img
                :src="
                  infoData.avatar
                    ? infoData.avatar
                    : require('../../../assets/image/img-user.jpg')
                "
                alt=""
              />
            </div>
            <div class="div-id">ID: {{ infoData.user_number }}</div>
          </div>
          <div class="gz-sx-btn" v-if="uid != see_uid">
            <div @click="clickChitchat"><div class="left">聊一聊</div></div>
            <div>
              <div
                class="left"
                @click="clickAttention"
                v-if="infoData.is_already_attention == 2"
              >
                <img src="../../../assets/image/Frame_10.png" alt="" />
                <span>关注</span>
              </div>
              <div
                class="left"
                @click="clickCancelAttention"
                v-if="infoData.is_already_attention == 1"
              >
                <span>已关注</span>
              </div>
              <div
                class="left"
                @click="clickCancelAttention"
                v-if="infoData.is_already_attention == 3"
              >
                <span>互相关注</span>
              </div>
            </div>
            <div>
              <div
                class="right"
                @click="clickAddBlacklist"
                v-if="infoData.is_already_black == 2"
              >
                <!-- <img src="../../../assets/image/Frame_10.png" alt="" /> -->
                <span>加入黑名单</span>
              </div>
              <div
                class="right"
                @click="clickCancelBlacklist"
                v-if="infoData.is_already_black == 1"
              >
                <span>取消黑名单</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt2 relative name-box">
          <div class="name-title">
            <span class="name-1">{{ infoData.real_name }}</span>
            <span class="name-2"
              >&nbsp;&nbsp; —— &nbsp;&nbsp; {{ infoData.position }}</span
            >
          </div>
        </div>

        <div class="user-top-num">
          <!-- <div @click="uid == see_uid ? clickAttentionTab('attention') : ''"> -->
          <div @click="clickAttentionTab('attention')">
            <span class="title">关注: </span>
            <span class="text">{{ infoData.attention_num }}</span>
          </div>
          <div @click="uid == see_uid ? clickAttentionTab('attention') : ''">
            <span class="title">粉丝: </span>
            <span class="text">{{ infoData.fan_num }}</span>
          </div>
        </div>

        <div class="share-content">
          <div
            style="position: absolute; display: flex; align-items: center"
            @click="clickPraise(infoData.is_point_my_card)"
          >
            <img
              v-if="infoData.is_point_my_card == 1"
              src="../../../assets/iconfont/link-icons.svg"
              style="width: 14px; margin-right: 4px"
            />
            <img
              v-if="infoData.is_point_my_card == 2"
              src="../../../assets/iconfont/link-icon.svg"
              style="width: 14px; margin-right: 4px"
            />
            <span
              :style="infoData.is_point_my_card == 1 ? 'color: #1ec5d8' : ''"
              >点赞</span
            >
          </div>
          <div
            style="
              position: absolute;
              top: 30px;
              display: flex;
              align-items: center;
            "
            @click="clickShare()"
          >
            <i
              class="el-icon-share"
              style="color: #333; padding-right: 6px; font-size: 16px"
            ></i>
            <span>分享</span>
          </div>

          <!-- 分享区域 开始 -->
          <div class="items-review-box" :class="show_share ? 'show-box' : ''">
            <div class="share-list">
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
              <div class="share-item" @click="clickShareWent(3)">
                <img src="../../../assets//image/share-friend.png" />
                <span>好友</span>
              </div>
            </div>
          </div>
          <!-- 分享区域 结束 -->
        </div>
      </div>
    </div>
    <!-- 工作经历 -->
    <div class="view-box work-experience">
      <div class="experience-top">
        <div class="experience-title">工作经历</div>
        <div class="fb-btn"></div>
      </div>
      <div class="experience-container">
        <ul class="row-options-detail-box">
          <li
            class="options-item"
            v-for="(item, index) in infoData.user_work_experience"
            :key="index"
          >
            <div class="image-box">
              <img src="../../../assets/image/work-icon.png" alt="" />
            </div>
            <div class="item-info">
              <div>{{ item.position }}</div>
              <div>{{ item.company_name }}</div>
              <p>{{ item.begin_date }} — {{ item.end_date }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 教育经历 -->
    <div class="view-box education-experience">
      <div class="experience-top">
        <div class="experience-title">教育经历</div>
        <div class="fb-btn"></div>
      </div>
      <div class="experience-container">
        <ul class="row-options-detail-box">
          <li
            class="options-item"
            v-for="(item, index) in infoData.user_education_experience"
            :key="index"
          >
            <div class="education-image-box">
              <img src="../../../assets/image/shcool.png" alt="" />
            </div>
            <div class="item-info">
              <div>{{ item.school }}</div>
              <div>{{ item.education_background }} · {{ item.specialty }}</div>
              <p>{{ item.school_date }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 推荐语 -->
    <div class="recommendation">
      <div class="dynamicState-box listview-box">
        <div class="dynamicState-top">
          <div class="dynamicState-title">推荐语</div>
          <!-- <div class="fb-btn" @click="clickPublishBtn">评价</div> -->
        </div>

        <div class="publish-box" v-if="see_uid != uid">
          <div class="dialog-bodybox">
            <div class="dialog-content-box">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="textarea"
              ></el-input>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="clickMaskBtn">发布</el-button>
          </div>
        </div>

        <div class="dynamicState-container">
          <!-- 列表项 开始 -->
          <div
            class="container-items-box"
            v-for="(item, index) in evaluateList"
            :key="index"
          >
            <div class="right-container-item">
              <div class="title list-title-box">
                <div class="title-left">
                  <img
                    :src="
                      item.evaluate_user_avatar
                        ? item.evaluate_user_avatar
                        : require('../../../assets/image/img-user.jpg')
                    "
                    alt=""
                  />
                  <div class="name-id-box">
                    <span>{{ item.evaluate_user_name }}</span>
                    <span class="span-id">ID: {{ item.user_number }}</span>
                  </div>
                </div>
                <div class="title-t">{{ item.createtime }}</div>
              </div>

              <div class="items-dt-box">
                <div>
                  <div class="items-dt-p" v-html="item.content"></div>
                </div>
                <div class="items-bottom-btn">
                  <div
                    class="bottom-btn-items"
                    @click.stop="clickReview(item, index)"
                  >
                    <img src="../../../assets/image/comment.png" alt="" />
                    <span
                      >{{
                        item.reply_list ? item.reply_list.length : 0
                      }}回复</span
                    >
                  </div>
                  <div
                    class="bottom-btn-items"
                    @click.stop="clickItemReport(item, index)"
                  >
                    <img
                      src="../../../assets/iconfont/report-icon.svg"
                      alt=""
                    />
                    <span>投诉</span>
                  </div>
                  <div
                    class="bottom-btn-items"
                    @click.stop="clickItemDelete(item, index)"
                    v-if="userId == item.evaluate_uid || isUserMes"
                  >
                    <img src="../../../assets/image/icon-copy.png" alt="" />
                    <span>删除</span>
                  </div>
                </div>
                <!-- 评论区域 开始 -->
                <div
                  class="items-review-box"
                  :class="item.show_review ? 'show-box' : ''"
                >
                  <div class="fabu-box">
                    <el-input
                      type="text"
                      v-model="content"
                      placeholder="评论千万条，友善第一条"
                    ></el-input>
                    <el-button
                      type="primary"
                      @click="clickInfoVerifyBtn(1, item)"
                      >回复</el-button
                    >
                  </div>
                  <!-- 评论列表模块 开始 -->
                  <div class="comment-box">
                    <div class="comment-list-box">
                      <ul>
                        <li
                          v-for="(items, c_index) in item.reply_list"
                          :key="c_index"
                        >
                          <div class="title">
                            <div class="title-left">
                              <img
                                :src="
                                  items.evaluate_user_avatar
                                    ? items.evaluate_user_avatar
                                    : require('../../../assets/image/img-user.jpg')
                                "
                                alt=""
                                class="avatar-img"
                              />
                              <span>{{ items.evaluate_user_name }}</span>
                              <img
                                src="../../../assets/image/right-one.png"
                                alt=""
                                class="right-one"
                                v-if="items.reply_id"
                              />
                              <span v-if="items.reply_id">{{
                                items.user_name
                              }}</span>
                            </div>
                            <div class="title-t">{{ items.createtime }}</div>
                          </div>
                          <div class="items-c-box">
                            <div class="items-c-p">{{ items.content }}</div>

                            <div class="items-bottom-btn">
                              <div
                                class="bottom-btn-items"
                                @click.stop="
                                  clickRecover(items, item.id, index)
                                "
                              >
                                <img
                                  src="../../../assets/image/comment.png"
                                  alt=""
                                />
                                <span>{{ items.comment_num }} 回复</span>
                              </div>
                              <div
                                class="bottom-btn-items"
                                @click.stop="clickItemReport(items, c_index)"
                              >
                                <i
                                  class="el-icon-warning-outline"
                                  style="
                                    color: #86909c;
                                    padding-right: 2px;
                                    font-size: 14px;
                                  "
                                ></i>
                                <span>投诉</span>
                              </div>
                              <div
                                class="bottom-btn-items"
                                @click.stop="
                                  clickItemDelete(items, index, c_index)
                                "
                                v-if="uid == item.uid || uid == items.uid"
                              >
                                <img
                                  src="../../../assets/image/icon-copy.png"
                                  alt=""
                                />
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
          <div class="sec-footer" v-if="evaluateList.length != 0">
            <div class="sec-content--more" @click="clickMore">
              <span>查看更多</span>
              <i class="el-icon-arrow-down"></i>
            </div>
          </div>
          <!-- 列表项 结束 -->
          <el-empty
            description="暂无数据..."
            v-if="evaluateList.length == 0"
          ></el-empty>
        </div>
      </div>
    </div>
    <!-- 分享好友列表 -->
    <el-dialog title="好友列表" :visible.sync="friendVisible" width="30%">
      <div
        class="friend-item-box"
        v-for="(item, index) in friendList"
        :key="index"
        @click="clickFriendItem(item, index)"
      >
        <img :src="item.avatar" alt="" />
        <div>
          <div
            style="
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 2px;
              color: #333;
            "
          >
            {{ item.real_name }}
          </div>
          <div>{{ item.age }} | {{ item.live_city }}</div>
        </div>
      </div>
    </el-dialog>

    <!-- 回复弹窗 -->
    <div class="recoverVisible">
      <el-dialog
        title="回复评论"
        :visible.sync="recoverVisible"
        width="482px"
        :before-close="recoverValueClose"
      >
        <div class="cententinfo-box">
          <div class="demo-input-suffix">
            <el-input
              v-model="recover_value"
              type="text"
              name="recover_value"
              placeholder="回复评论"
            ></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="recoverVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickInfoVerifyBtn(2)"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <Complaint
      ref="complaint"
      states="0"
      :id="complaintData.id"
      :uId="complaintData.uid"
      zIndex="1000"
    />
  </div>
</template>

<script>
import Complaint from "@/components/complaint";
import videoDialog from "../components/videoDialog.vue";
import recommendation from "./recommendation/index.vue";

export default {
  name: "careerIdentity",
  components: {
    videoDialog,
    recommendation,
    Complaint,
  },
  data() {
    return {
      friendVisible: false,
      isUserMes: false,
      userId: localStorage.getItem("realUid"),
      avatar: localStorage.getItem("realAvatar"),
      name: localStorage.getItem("name"),
      show_share: false,
      see_uid: "",
      uid: "",
      infoData: {}, // 信息
      count_list: {},

      infoList: [],
      evaluateList: [], //推荐语列表
      page: 1,
      pagesize: 10,
      textarea: "",
      is_return: true,
      dialogVisible: false,
      complaintData: {
        id: "",
        uid: "",
      },
      friendList: [],
      recoverVisible: false,
      reply_item: {},
      reply_id: null,
      recommend_id: null, // 推荐语id
      recover_value: "",
      content: "",
      sel_index: 0,
      userGoEasy: {},
      history: {
        messages: [],
        allLoaded: false,
        loading: true,
      },
    };
  },
  computed: {},
  mounted() {},
  created() {
    this.see_uid = this.$route.query.see_uid || localStorage.getItem("realUid");
    this.uid = localStorage.getItem("realUid");
    if (!this.$route.query.see_uid) {
      this.isUserMes = true;
    }
    this.page = 1;
    this.pagesize = 10;
    console.log(this.page);
    // 获取用户职圈信息
    this.getUserProfile();
    // 获取推荐语列表
    this.getEevaluateList();
  },
  methods: {
    // 分享好友
    clickFriendItem(item, index) {
      const that = this;
      that.userGoEasy = {
        type: this.GoEasy.IM_SCENE.PRIVATE,
        id: "u_" + item.uid,
        data: {
          uid: item.uid,
          name: item.real_name,
          avatar: item.avatar,
          user_number: item.user_number,
          position_id: "", // 岗位id
          company_id: localStorage.getItem("company_id")
            ? localStorage.getItem("company_id")
            : "", // 公司id
          position_name: "", // 职位名称
        },
      };
      this.goEasy.im.createCustomMessage({
        type: "share-card",
        payload: {
          contentType: "share-card",
          userMessage: {
            name: that.infoData.real_name,
            avatar: that.infoData.avatar,
            position: that.infoData.position,
          },
          url: "/careerIdentity?see_uid=" + that.see_uid,
        },
        to: that.userGoEasy,
        onSuccess: (message) => {
          console.log("message", message);
          that.sendMessage(message, item.name);
        },
        onFailed: (err) => {
          console.log("创建消息err:", err);
        },
      });
    },
    sendMessage(message, userName) {
      const that = this;
      this.history.messages.push(message);
      this.goEasy.im.sendMessage({
        message: message,
        onSuccess: (message) => {
          console.log("发送成功", message);
          this.friendVisible = false;
          that.$message.success({
            message: "发送成功，可在我的好友中查看发送消息",
          });
        },
        onFailed: function (error) {
          if (error.code === 507) {
            alert("发送失败，没有配置OSS存储");
            console.log("发送失败，没有配置OSS存储");
          } else {
            console.log("发送失败:", error);
          }
        },
      });
    },

    recoverValueClose() {},
    // 点击评论列表回复
    clickRecover(item, id, idx) {
      this.reply_item = item;
      this.reply_id = item.id;
      this.recommend_id = id; // 推荐语id
      this.sel_index = idx;
      this.recoverVisible = true;
    },
    // 点击列表 评论按钮
    clickReview(i, idx) {
      let that = this;
      that.reply_item = i;
      that.reply_id = i.id;
      that.sel_index = idx;
      that.id = i.id;
      let evaluateList = that.evaluateList;
      evaluateList[idx].show_share = false;
      if (evaluateList[idx].show_review == true) {
        evaluateList[idx].show_review = false;
        that.evaluateList = evaluateList;
        return;
      }
      evaluateList.forEach((ele) => {
        ele.show_review = false;
      });
      evaluateList[idx].show_review = true;
      that.evaluateList = evaluateList;
    },
    // 发布评论
    clickInfoVerifyBtn(n, item) {
      let that = this;
      if (n == 1) {
        that.reply_item = item;
        that.reply_id = item.id;
        that.recommend_id = item.id; // 推荐语id
      }
      let p = {
        evaluate_user_type: 1,
        uid: that.reply_item.evaluate_uid,
        reply_id: that.reply_id,
        recommend_id: that.recommend_id,
        profile_uid: that.see_uid, //当前职业身份者uid
      };
      if (n == 1) {
        p.content = that.content;
      } else {
        p.content = that.recover_value;
      }
      that.$axios
        .post("/api/user-evaluate/create", p)
        .then((res) => {
          console.log(res);
          if (res.code == 0) {
            let sel_index = that.sel_index;
            let evaluateList = that.evaluateList;
            let data = res.data;
            evaluateList[sel_index].reply_list.unshift(data);
            that.evaluateList = evaluateList;

            that.recoverVisible = false;
            that.recover_value = "";
            that.content = "";
            that.$message.success("回复成功！");
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
    clickMore() {
      this.page = this.page + 1;
      this.getEevaluateList();
    },
    // 获取推荐语列表
    getEevaluateList() {
      let that = this;
      let p = {
        page: that.page,
        pagesize: that.pagesize,
      };
      let url = `/api/user-evaluate/list?page=${p.page}&pagesize=${p.pagesize}&see_uid=${that.see_uid}`;
      // if(that.see_uid != that.uid){
      //   p.see_uid = that.see_uid;
      //   url = `/api/user-evaluate/list?page=${p.page}&pagesize=${p.pagesize}&see_uid=${that.see_uid}`
      // }else{
      //   url = `/api/user-evaluate/list?page=${p.page}&pagesize=${p.pagesize}`
      // }
      this.$axios
        .get(url, {})
        .then((res) => {
          if (res.code == 0) {
            if (res.data.list.length <= 0) {
              this.$message.error({
                message: "暂无更多数据...",
              });
            } else {
              let list = res.data.list;
              list.forEach((ele) => {
                ele.show_review = false;
              });
              let dataList = that.evaluateList.concat(list);
              this.evaluateList = dataList;
            }
          } else {
            this.$message.error({
              message: res.msg,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //点击推荐语发布按钮
    clickMaskBtn() {
      let that = this;
      let p = {
        content: that.textarea,
        evaluate_user_type: 1, // 评价用户类型 1.人才用户 2.企业用户
        uid: that.see_uid, //当前职业身份者uid
        profile_uid: that.see_uid, //当前职业身份者uid: that.see_uid, // 	被评价人才ID
      };
      console.log(p);
      if (!that.is_return) {
        return;
      }
      that.is_return = false;
      that.$axios
        .post("/api/user-evaluate/create", p)
        .then((res) => {
          if (res.code == 0) {
            that.$message.success("发布成功！");
            that.dialogVisible = false;
            this.textarea = "";
            this.page = 1;
            this.pagesize = 10;
            this.evaluateList = [];
            that.getEevaluateList();
          } else {
            that.$message.error({
              message: res.msg,
            });
          }
          that.is_return = true;
        })
        .catch((e) => {
          console.log(e);
          that.is_return = true;
        });
    },
    // 举报
    clickItemReport(item, index) {
      console.log(item, index);
      // // 当前登录人id
      this.complaintData.id = localStorage.getItem("realUid")
        ? localStorage.getItem("realUid")
        : "";
      // // 人才id
      this.complaintData.uid = item.id;
      this.zx_dialogVisible = false;
      this.$refs.complaint._data.states = "2";
      this.$refs.complaint._data.isComplaint = true;
      this.$refs.complaint.setComplaintType();
    },

    // 删除推荐语
    clickItemDelete(i, idx, c_idx) {
      let that = this;
      let item = i;
      let index = idx;
      let c_index = c_idx;
      let evaluateList = that.evaluateList;
      console.log(item);
      let p = {
        id: item.id,
      };
      that.$axios
        .post("/api/user-evaluate/delete", p)
        .then((res) => {
          if (res.code == 0) {
            that.$message.success("删除成功！");
            if (!c_index) {
              evaluateList.splice(index, 1);
              that.evaluateList = evaluateList;
            } else {
              evaluateList[index].reply_list.splice(c_index, 1);
              that.evaluateList = evaluateList;
            }
          } else {
            that.$message.error({
              message: res.msg,
            });
          }
          that.is_return = true;
        })
        .catch((e) => {
          console.log(e);
          that.is_return = true;
        });
    },
    // 是否显示分享
    clickShare() {
      this.show_share = this.show_share ? false : true;
    },
    // 点赞
    clickPraise(is_point_my_card) {
      const that = this;
      let page = {
        uid: that.see_uid ? that.see_uid : that.uid,
        tag: 2,
        type: 2,
        // status: 1, 1.点赞 2.取消
      };
      page.status = is_point_my_card == 1 ? 2 : 1;
      this.$axios
        .post("/api/userinfooperate/create", page)
        .then((res) => {
          if (res.code == 0) {
            that.$message.success({
              message: "操作成功",
            });
            that.getUserProfile();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 分享按钮点击  1 复制链接  2 微博
    clickShareWent(i) {
      const that = this;
      const title = "【自猎网】"; // 标题
      let page = {
        uid: that.see_uid ? that.see_uid : that.uid,
        tag: 2,
        type: 3,
        status: 1,
      };
      this.$axios
        .post("/api/userinfooperate/create", page)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
      if (i == 2) {
        let images = encodeURIComponent(that.infoData.avatar);
        let shareUrl = encodeURIComponent(window.location.href);
        const url = `https://service.weibo.com/share/share.php?url=${shareUrl}&type=3&count=1&appkey=&title=${title}&pic=${images}&searchPic=false&ralateUid=&language=zh_cn&rnd=`;
        window.open(url, "_blank");
        this.show_share = false;
        return;
      }
      if (i == 3) {
        that.$axios
          .post("/api/user/friend/list", {
            page: 1,
            tag: "attention",
            see_uid: localStorage.getItem("realUid"),
          })
          .then((res) => {
            if (res.code == 0) {
              that.friendList = res.data;
              that.show_share = false;
              that.friendVisible = true;
              console.log(that.friendList);
            } else {
              that.$message.error({
                message: res.msg,
              });
            }
          });
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

    clickAttentionTab(name) {
      let state = this.$route.query.see_uid;
      let isCareer = localStorage.getItem("isCareer");
      localStorage.setItem("isCareer", 0);
        this.$router.push({
          path: "/attentionFans", //跳转的路径
          query: {
            //路由传参时push和query搭配使用 ，作用时传递参数
            tag: name,
            see_uid: this.see_uid,
          },
        });
      // if (state == undefined) {
      //   localStorage.setItem("isCareer", 0);
      //   this.$router.push({
      //     path: "/attentionFans", //跳转的路径
      //     query: {
      //       //路由传参时push和query搭配使用 ，作用时传递参数
      //       tag: name,
      //       see_uid: this.see_uid,
      //     },
      //   });
      //   return;
      // }
      // if (isCareer == 0) {
      //   localStorage.setItem("isCareer", 1);
      //   this.$router.push({
      //     path: "/attentionFans", //跳转的路径
      //     query: {
      //       //路由传参时push和query搭配使用 ，作用时传递参数
      //       tag: name,
      //       see_uid: this.see_uid,
      //     },
      //   });
      //   return;
      // }
    },
    // 聊一聊
    clickChitchat() {
      const that = this;
      let infoData = {
        position_id: "", // 岗位id
        company_id: "", // 企业id
        id: "c_" + that.infoData.uid,
        user_number: that.infoData.user_number,
        uid: that.infoData.uid,
        name: that.infoData.real_name || "BOSS",
        avatar:
          that.infoData.avatar ||
          "https://zlw0720.oss-cn-beijing.aliyuncs.com/avatar/20240127/e4ffd5fcef38311336c5676416b317fa.jpg",
      };
      that.$bus.$emit("talentSide_receiveParams", {
        type: "JobDetails",
        laiyuan: "nav",
        infoData: infoData,
      });
      that.$bus.$emit("talentSide_clickSidebar", { type: "clickChat" });
    },
    // 点击关注按钮
    clickAttention() {
      console.log(1);
      this.$axios
        // .post("/api/user-attention/attention", {
          .post("/api/user/attention/create", {
          attention_uid: this.see_uid,
        })
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("关注成功！");
            this.getUserProfile();
          } else {
            this.$message.error({
              message: res.msg,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 取消关注
    clickCancelAttention() {
      console.log(1);
      this.$axios
        // .post("/api/user-attention/cancel-attention", {
          .post("/api/user/attention/cancel", {
          attention_uid: this.see_uid,
        })
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("取消成功！");
          } else {
            this.$message.error({
              message: res.msg,
            });
          }
          this.getUserProfile();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 加入黑名单
    clickAddBlacklist() {
      this.$axios
        .post("/api/user-defriend/create", {
          defriend_uid: this.see_uid,
        })
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("加入黑名单成功！");
            this.getUserProfile();
          } else {
            this.$message.error({
              message: res.msg,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 取消黑名单
    clickCancelBlacklist() {
      this.$axios
        .post("/api/user-defriend/delete", {
          defriend_uid: this.see_uid,
        })
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("取消成功！");
          } else {
            this.$message.error({
              message: res.msg,
            });
          }
          this.getUserProfile();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 获取用户职圈信息
    getUserProfile() {
      this.$axios
        .post("/api/profession-circle/my", {
          see_uid: this.see_uid,
        })
        .then((res) => {
          if (res.code == 0) {
            this.infoData = res.data.users;
            this.infoList = res.data.list;
            this.count_list = res.data.count_list;
          } else {
            this.$message.error({
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
.view-box {
  background: #ffffff;
  border-radius: 6px;
  opacity: 1;
  overflow: hidden;
  margin-top: 10px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
}

.mt2,
.mv2 {
  margin-top: 10px;
}

.relative {
  position: relative !important;
}

.new-title-box {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);

  .live-video-hero-image {
    width: 100%;
    height: 146px;
    position: relative;
    overflow: hidden;

    .profile-background-image {
      position: relative;
      width: 100%;
      padding-bottom: 146px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      background: 50% / cover;
      background: url("../../../assets/image/circle-info-bg.svg") 50% / cover;
    }
  }

  .ph5 {
    padding: 5px 20px 0 20px;
    position: relative;

    .display-flex {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .pv-top-card--photo {
        margin-top: -112px;
        z-index: 4;

        .pv-top-card__photo-wrapper {
          width: 140px;
          height: 140px;
          box-sizing: border-box;
          background-clip: border-box;
          border-radius: 50%;
          background-color: #fff;
          border: 4px solid #fff;
          box-shadow: none;
          margin: auto;
          position: relative;

          & img {
            width: 132px;
            height: 132px;
            border-radius: 50%;
          }
        }

        .div-id {
          font-size: 15px;
          font-weight: bold;
          text-align: center;
        }
      }

      .gz-sx-btn {
        width: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 50px;

        & > div {
          flex: 1;
          padding: 0 10px;
          border-radius: 2px;
          font-size: 13px;
          text-align: center;
          cursor: pointer;

          & > div {
            padding: 8px 0;

            img {
              width: 12px;
              height: 12px;
            }
          }

          .left {
            background: $g_color;
            color: #fff;

            img {
              margin-right: 4px;
            }
          }

          .right {
            border: 1px solid #e5e6eb;
            box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.04);
            color: $g_textColor;
          }
        }
      }
    }

    .name-box {
      width: 100%;

      .name-title {
        display: flex;
        align-items: center;

        .name-1 {
          font-size: 24px;
          color: #333;
          font-weight: bold;
        }
      }
    }

    .user-top-num {
      display: flex;
      align-items: center;

      div {
        text-align: center;
        padding: 10px 0;
        margin-right: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .title {
          font-size: 16px;
          font-family: DIN Alternate-Bold, DIN Alternate;
          font-weight: bold;
          color: #4e5969;
        }

        .text {
          font-size: 16px;
          font-weight: 400;
          color: #6d747e;
          line-height: 22px;
          padding-left: 10px;
        }
      }
    }

    .share-content {
      font-size: 14px;
      color: #505050;
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
      display: flex;
      justify-content: flex-end;
    }
  }
}

.experience-top {
  width: 100%;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  position: relative;
  padding: 10px 20px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .experience-title {
    font-size: 20px;
    font-weight: bold;
  }
}

.experience-container {
  width: 100%;

  .row-options-detail-box {
    padding: 10px 20px;

    .options-item {
      display: flex;
      margin-top: 10px;

      .image-box {
        width: 42px;
        height: 42px;
        background: #b9b9b9;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 30px;
          height: 30px;
        }
      }

      .education-image-box {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .item-info {
        flex: 1;
        padding-left: 12px;
        border-bottom: 1px solid #f0f3f7;

        div {
          font-size: 14px;
          line-height: 20px;
        }

        p {
          font-size: 13px;
          line-height: 20px;
          color: #6b6b6b;
        }
      }
    }
  }
}

.recommendation-showbox {
  padding: 10px 20px 20px;
}

// 评论展示
.items-review-box {
  transition: all 0.5s linear;
  padding-left: 10px;
  padding-right: 10px;
  background: #f6f6f694;
  height: 0;
  overflow: auto;
  margin-top: 20px;

  &.show-box {
    height: auto;
    padding-top: 10px;
    padding-bottom: 14px;
    max-height: 450px;
    margin-right: 50px;
  }
  .fabu-box {
    width: 80%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /deep/ .el-button {
      padding: 0;
      width: 100px;
      height: 35px;
      line-height: 35px;
      margin-left: 20px;
    }
    /deep/ .el-button--primary {
      background-color: $g_color;
      border-color: $g_color;
    }
    /deep/ .el-input__inner {
      height: 35px;
      line-height: 35px;
      font-size: 13px;
    }
  }
  .comment-box {
    width: 100%;
    margin-top: 20px;
    .comment-title-box {
      font-size: 14px;
      font-weight: bold;
      color: $g_textColor;
      line-height: 24px;
      position: relative;
      display: flex;
      align-items: center;
      &::after {
        width: 3px;
        height: 70%;
        content: "";
        background: $g_bg;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      span {
        padding: 0 8px;
      }
    }
    .comment-list-box {
      width: 100%;
      margin-top: 14px;
      ul {
        width: 100%;
        li {
          width: 100%;
          margin-top: 10px;
          .items-bottom-btn {
            margin-top: 6px;
          }
        }
      }
    }
  }
  .share-list {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .share-item {
      font-size: 12px;
      color: #505050;
      line-height: 20px;
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

// 、、、、、、、、、、、、、、、   新版样式  ↑  、、、、、、、、、、、、

.recommendation {
  .listview-box {
    background: #ffffff;
    border-radius: 6px;
    opacity: 1;
    overflow: hidden;
  }

  .dynamicState-box {
    width: 100%;
    margin-top: 10px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);

    .dynamicState-top {
      width: 100%;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      position: relative;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #dedfe0;

      .dynamicState-title {
        font-size: 20px;
        font-weight: bold;
      }

      .fb-btn {
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

    .dynamicState-container {
      .container-items-box {
        background: #fff;
        margin-top: 10px;
        position: relative;
        padding: 10px 20px;
        .right-container-item {
          margin-top: 0;
          border-bottom: 1px solid #eee;
          &:nth-child(1) {
            margin-top: 0;
          }

          .title.list-title-box {
            .title-left {
              img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
              }

              span {
                font-size: 14px;
              }

              .name-id-box {
                padding-left: 4px;
                display: flex;
                flex-direction: column;

                .span-id {
                  font-weight: bold;
                }
              }
            }
          }

          .title {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title-left {
              display: flex;
              align-items: center;

              img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin-right: 8px;
              }

              span {
                font-size: 12px;
                font-weight: 400;
                color: #4e5969;
                line-height: 22px;
              }
            }

            .title-t {
              font-size: 12px;
              font-weight: 400;
              color: #86909c;
              line-height: 22px;
            }
          }

          .items-c-box {
            .items-c-p {
              font-weight: 400;
              line-height: 22px;
              font-size: 12px;
              color: #666;
              padding-top: 4px;
              padding-left: 4px;
            }
          }

          .items-dt-box {
            width: 100%;
            padding-left: 20px;
            .items-dt-p {
              font-size: 14px;
              font-weight: 400;
              color: #1f2e4d;
              line-height: 28px;
            }
            .items-review-box {
              margin: 0;
            }
            .tu-box {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
            }

            .items-img-box {
              height: auto;
              display: flex;
              flex-wrap: wrap;
              margin-top: 14px;
              margin-left: 10px;

              img {
                width: 140px;
                // height: 100px;
                margin-left: 0.5rem;

                &:nth-child(1) {
                  margin: 0;
                }
              }

              & > a {
                width: 140px;
                height: 100px;
                margin-left: 0.5rem;

                &:nth-child(1) {
                  margin: 0;
                }
              }
            }

            .items-img-box:nth-of-type(1) {
              margin-left: 0;
            }
          }

          .items-bottom-btn {
            display: flex;
            align-items: center;
            margin-top: 0.8rem;
            position: relative;

            .bottom-btn-items {
              margin-right: 16px;
              display: flex;
              align-items: center;
              cursor: pointer;

              img {
                width: 14px;
                height: 14px;
                margin-right: 4px;
                display: inline-block;
              }

              span {
                font-size: 12px;
                font-weight: 400;
                color: #86909c;
                line-height: 22px;
              }
            }

            .item-delete-img {
              width: 20px;
              height: 20px;
              position: absolute;
              right: 20px;
              bottom: 4px;
              display: none;
              cursor: pointer;
            }
          }
        }

        &:hover .items-bottom-btn .item-delete-img {
          display: block;
        }
      }
    }
  }

  .publish-box {
    width: 100%;
    padding: 0 10px;

    .dialog-bodybox {
      width: 100%;
      padding: 12px;

      .dialog-img-box {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;

        .img-item {
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

          &:nth-of-type(1) {
            margin-left: 0;
          }
        }

        .img-item.add {
          transition: all 0.2s ease-in-out;
          border: 1px dashed #dedfe0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          color: $g_textColor;

          .avatar-uploader {
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

            .el-upload-dragger {
              width: 100%;
              height: 100%;
              background: none;
              border: none;
            }
          }
        }
      }

      .dialog-content-box {
        width: 100%;
        height: 100%;

        .el-textarea__inner {
          font-size: 14px;
          padding: 0;
          border: none;
        }

        /deep/ .el-textarea__inner:focus {
          border-color: $g_color;
        }
      }
    }

    .dialog-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;

      .el-button {
        padding: 0;
        width: 100px;
        height: 35px;
        line-height: 35px;
      }

      .el-button--primary {
        background-color: $g_color;
        border-color: $g_color;
      }
    }
  }

  .sec-footer {
    width: 100%;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .sec-content--more {
      width: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      padding: 10px 20px;
      cursor: pointer;

      i {
        margin-left: 10px;
      }
    }

    .sec-content--more:hover {
      color: $g_color;
    }
  }
}
.friend-item-box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 5px 5px 2px 0px rgba(209, 209, 209, 0.75);

  img {
    width: 50px;
    height: 50px;
    border-radius: 2px;
    margin-right: 12px;
    overflow: hidden;
  }
}

// 评论回复弹窗
.recoverVisible {
  /deep/ .el-dialog {
    min-width: 420px;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 0 !important;
    .el-dialog__header {
      text-align: left;
      .el-dialog__title {
        font-size: 15px;
        color: $g_textColor;
      }
    }
    .el-dialog__body {
      height: auto;
      overflow: hidden;
      padding: 20px;
      .cententinfo-box {
        width: 100%;
        margin-top: 10px;
        .cententinfo-title {
          font-size: 14px;
          font-weight: 400;
          color: $g_textColor;
          line-height: 22px;
          text-align: left;
        }
        .demo-input-suffix {
          width: 100%;
          display: flex;
          align-items: center;
          span {
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
            transition: border 0.3s;
            background-color: #fff;
            resize: none;
          }
          .el-input__inner:hover {
            border-color: $g_color;
          }
          .el-input.is-active .el-input__inner,
          .el-input__inner:focus {
            border-color: $g_color;
            outline: 0;
          }
        }
      }
    }
    .el-button {
      padding: 0;
      width: 100px;
      height: 40px;
      line-height: 40px;
    }
    .el-button--primary {
      background-color: $g_color;
      border-color: $g_color;
    }
  }
}
// 、、、、、、、、、、、、、、、   新版样式  ↑  、、、、、、、、、、、、
</style>
