<template>
  <div class="contact">
    <div class="contact-left">
      <div class="contact-list-title">好友</div>
      <div class="friend-list">
        <div
          v-for="(friend, key) in friends || []"
          :key="key"
          class="friend-item"
          :class="{
            actived: profile.friend && profile.friend.uid === friend.uid,
          }"
          @click="showFriendProfile(friend)"
        >
          <div class="friend-avatar">
            <img :src="friend.avatar" />
          </div>
          <div class="friend">
            <div class="friend-name">{{ friend.real_name }}</div>
            <div class="friend-mail">{{ friend.real_email }}</div>
          </div>
        </div>
        <div class="tips-box" v-if="friends.length <= 0">
          -暂无关注的好友-
        </div>
      </div>
    </div>
    <div class="contact-main" v-if="!is_chat">
      <div class="profile-card" v-if="profile.friend">
        <div class="profile-card-title">
          <div class="profile-avatar">
            <img :src="profile.friend.avatar" />
          </div>
          <div class="profile-name" style="flex-wrap: wrap">
            <i class="iconfont icon-shenfen"></i>
            <div style="margin-left: 6px">{{ profile.friend.name }}</div>
            <div style="width: 100%; margin-top: 10px">
              ID: {{ profile.friend.user_number }}
            </div>
          </div>
          <i
            class="el-icon-more more-content"
            @click="moreShow = !moreShow"
          ></i>
          <div class="more-box" v-if="moreShow">
            <div class="more-item" @click="clickMore(0)">加入黑名单</div>
            <div class="more-item" @click="clickMore(1)">删除联系人</div>
          </div>
        </div>
        <div class="friend-info">
          <div class="info-name">邮 箱</div>
          <div class="info-text">{{ profile.friend.real_email }}</div>
        </div>
        <div class="friend-info">
          <div class="info-name">手 机</div>
          <div class="info-text">{{ profile.friend.real_phone }}</div>
        </div>
        <div class="button-box">
          <button class="card-button" @click="privateChat">发消息</button>
        </div>
      </div>
    </div>
    <div class="contact-main" v-if="is_chat">
      <PrivateChat :infoData="profile.friend" />
    </div>

    <el-dialog title="提示" :visible.sync="moreVisible" width="30%">
      <span>是否将联系人{{ moreStates == 0 ? "加入黑名单" : "删除" }}?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="moreVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickCancel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PrivateChat from "./PrivateChat.vue";
export default {
  components: {
    PrivateChat,
  },
  props: {
    msgList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      friends: [], // 好友列表
      profile: {
        friend: null,
      },
      is_chat: false,
      moreVisible: false,
      moreShow: false,
      moreStates: "",
      cancelPage: {},
    };
  },
  mounted() {
    this.friends = this.msgList;
  },
  methods: {
    // 校验拉黑 / 删除
    clickMore(type) {
      const that = this;
      let page = {};
      that.cancelPage = {};
      page.tag = type == 0 ? "black" : "delete";
      page.attention_uid = that.profile.friend.uid;
      that.cancelPage = page;
      this.moreShow = false;
      this.moreStates = type;
      this.moreVisible = true;
    },
    clickCancel() {
      const that = this;
      that.$axios
        .post("/api/user/attention/cancel", that.cancelPage)
        .then((res) => {
          if (res.code == 0) {
            that.$message.success({
              message: "操作成功",
            });
            that.getSysMsgList();
            that.is_chat = !that.is_chat;
            that.moreVisible = !that.moreVisible;
          } else {
            that.$message.error({
              message: res.msg,
            });
          }
        });
    },
    // 获取好友列表
    getSysMsgList(){
      let that = this;
      that.$axios.post('/api/user/friend/list', {
        tag: 'attention'
      }).then(res => {
        if (res.code == 0) {
          that.friends = res.data;
        } else {
          that.$message.error({
            message: res.msg
          })
        }
      })},
    showFriendProfile(friend) {
      console.log(friend);
      this.profile.friend = {
        is_friend: true, // 是好友聊天
        id: "u_" + friend.uid,
        uid: friend.uid,
        name: friend.real_name,
        avatar: friend.avatar,
        real_phone: friend.real_phone,
        real_email: friend.real_email,
        user_number: friend.user_number,
      };
    },
    privateChat() {
      this.is_chat = false;
      this.$nextTick(() => {
        this.is_chat = true;
      });
      return;
      this.$router.replace({
        path: "/conversations/privatechat/" + this.profile.friend.uid,
        query: {
          name: this.profile.friend.name,
          avatar: this.profile.friend.avatar,
        },
      });
    },
  },
};
</script>

<style scoped>
.contact {
  width: 100%;
  height: 100%;
  display: flex;
  background: #f7f7f7;
  color: #333333;
}

.contact-left {
  width: 240px;
  height: 100%;
  border-right: #dbd6d6 1px solid;
}

.contact-list-title {
  margin: 10px 20px;
  font-size: 14px;
}

.friend-list {
  display: flex;
  flex-direction: column;
}

.group-list {
  display: flex;
  flex-direction: column;
}

.actived {
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
}

.friend-item {
  display: flex;
  padding: 8px;
  cursor: pointer;
}

.friend-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 10%;
}

.friend {
  flex: 1;
  margin: 0;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-left: 10px;
  font-size: 14px;
}

.friend-name {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
}

.friend-mail {
  line-height: 21px;
  color: #888888;
}

.group-item {
  display: flex;
  padding: 5px 10px;
  cursor: pointer;
  align-items: center;
}

.group-avatar {
  width: 40px;
  height: 40px;
  margin-left: 10px;
}

.group-avatar img {
  width: 40px;
  height: 40px;
}

.group-name {
  margin-left: 10px;
  width: 160px;
  text-align: left;
  font-size: 14px;
  line-height: 40px;
}

.contact-main {
  flex: 1;
  background: #ffffff;
}

.profile-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.profile-card-title {
  width: 90%;
  margin-left: 10%;
  flex: 1;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}
.more-content {
  position: absolute;
  right: 20px;
  margin-top: -50px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.more-content:hover {
  background: #eeeeee;
}
.more-box {
  position: absolute;
  right: 20px;
  margin-top: 50px;
  width: auto;
  height: auto;
  font-size: 13px;
  color: #000000;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.more-box .more-item {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 8px;
  cursor: pointer;
}
.more-box .more-item:hover {
  background: #eeeeee;
}

.profile-name {
  width: calc(100% - 80px);
  padding-left: 20px;
  text-align: left;
  font-size: 18px;
  display: flex;
  align-items: center;
}

.icon-zhanghu {
  font-size: 26px;
  color: #eeeeee;
  margin-right: 10px;
}

.profile-avatar {
  width: 80px;
}

.profile-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 10%;
}

.friend-info {
  padding: 10px 30px;
  display: flex;
  justify-content: space-around;
  text-align: left;
  font-size: 14px;
  line-height: 45px;
}

.info-name {
  width: 100px;
}

.info-text {
  width: 200px;
}

.group-profile-name {
  font-size: 18px;
  padding: 20px 70px;
  border-bottom: 1px solid #eeeeee;
}

.group-members {
  width: 400px;
  min-height: 200px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.group-members .member {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.group-members .member-avatar {
  width: 58px;
  margin-top: 20px;
  border-radius: 5%;
}

.group-members .member-name {
  color: gray;
  margin-top: 10px;
  font-size: 12px;
}

.button-box {
  padding: 40px 0;
}

.card-button {
  background: #eeeeee;
  color: #000000;
  font-size: 14px;
  border: none;
  display: flex;
  width: 120px;
  height: 35px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
}
.tips-box {
  font-size: 12px;
  padding: 30px 10px;
  text-align: center;
  color: #999;
}
</style>
