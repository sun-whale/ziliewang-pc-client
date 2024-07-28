<!-- 职位中心页 -->
<template>
  <div class="bossSide-container">
    <div class="tab-box">
      <div class="tab-left">
        <div
          :class="tabStatus == 1 ? 'hover-items' : ''"
          @click="clickStatus(1)"
        >
          在线中·{{ jobList.length }}
        </div>
        <div
          :class="tabStatus == 2 ? 'hover-items' : ''"
          @click="clickStatus(2)"
        >
          未上线·0
        </div>
        <!-- <div :class="tabStatus == 3?'hover-items':'' " @click="clickStatus(3)">审核中</div> -->
        <!-- <div :class="tabStatus == 4?'hover-items':'' " @click="clickStatus(4)">审核未通过</div> -->
      </div>
      <div class="tab-right" @click="goToPostJob">
        <img src="../../../assets/image/bossSide/edit.png" alt="" />
        <span>发布职位</span>
      </div>
    </div>
    <div class="job-tab-box m-box margin-top-20">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="不限" name="unlimited"></el-tab-pane>
        <el-tab-pane label="我发布的职位" name="posted"></el-tab-pane>
        <el-tab-pane label="协作给我的职位" name="assist"></el-tab-pane>
      </el-tabs>
      <div class="seach-box">
        <el-input
          v-model="seach_input"
          placeholder="输入职位名称/工作城市"
        ></el-input>
      </div>
    </div>

    <div class="job-list-box">
      <!-- 列表项 开始 -->
      <div
        v-for="(item, index) in jobList"
        :key="index"
        class="jobList-items m-box margin-top-20"
      >
        <div class="items-left-box">
          <div></div>
          <div class="left-info-box">
            <div class="info-title">
              <div class="title-name" @click="clickPositionItems(item)">
                {{ item.position_name }}
              </div>
              <div class="title-subname">
                {{ item.salary }} K {{ item.work_times }} 工作城市:
                {{ item.work_address }}
              </div>
            </div>
            <div class="info-bott">
              <img
                :src="
                  item.avatar
                    ? item.avatar
                    : require('../../../assets/image/bossSide/img-user.png')
                "
                alt=""
              />
              <span
                >{{ item.publish_name }} {{ item.createtime }} (
                30天后下线)</span
              >
            </div>
          </div>
        </div>

        <div class="items-right-box">
          <div class="right-btn-box box-1" v-if="tabStatus == 1">
            <div class="hover" @click="jobPinned">职位置顶</div>
            <div @click="jobRefresh">职位刷新</div>
          </div>
          <div class="right-btn-box box-2" v-if="tabStatus == 2">
            <div class="hover">删除</div>
            <div>修改</div>
            <div>上线</div>
          </div>
          <div class="icon-box">
            <div v-if="tabStatus == 1" @click.stop="clickPositionItems(item)">
              <img
                src="../../../assets/image/bossSide/form-xg.png"
                alt=""
              /><span>修改</span>
            </div>
            <div v-if="tabStatus == 2">
              <img src="../../../assets/image/bossSide/copy.png" alt="" /><span
                >复制</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 列表项 结束 -->
      <el-empty description="暂无数据..." v-if="jobList.length == 0"></el-empty>
      <!-- 发布职位弹出层 -->
      <el-dialog
        title="请选择要发布职位的类型"
        :visible.sync="postVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div class="post-content">
          <div class="post-box" @click="clickPost(0)">
            <img
              style="width: 55%"
              src="../../../assets/image/post-icon.png"
              alt="普通职位"
            />
            <span>发布职位</span>
          </div>
          <div class="post-box" @click="clickPost(1)">
            <img src="../../../assets/image/agent-post.gif" alt="Agent职位" />
            <span>发布Agent职位</span>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: localStorage.getItem("role"),
      tabStatus: 1,
      activeName: "unlimited",
      seach_input: "",
      jobList: [],
      postVisible: false,
    };
  },
  created() {
    this.getinfoList();
  },
  methods: {
    // 点击职位刷新
    jobRefresh() {
      this.$message.success("刷新成功！");
    },
    // 职位置顶
    jobPinned() {
      this.$message.success("置顶成功！");
    },
    getinfoList() {
      let that = this;
      that.$axios.post("/api/company-position/list", {}).then((res) => {
        if (res.code == 0) {
          that.jobList = res.data;
        } else {
          that.$message.error({
            message: res.msg,
          });
        }
      });
    },
    clickStatus(n) {
      this.tabStatus = n;
      this.jobList = [];
      if (n == 2) {
      } else {
        this.getinfoList();
      }
    },
    // 点击列表/ 编辑
    clickPositionItems(i) {
      // let positionItems = i;
      // this.$root.positionItems = positionItems;
      this.$router.push("/postJob?id=" + i.id);
    },
    // 点击发布职位
    goToPostJob() {
      const that = this;
      that.postVisible = !this.postVisible;
      // that.$router.push({ path:'/postJob' })
    },
    // 发布职位
    clickPost(type) {
      const that = this;
      if (type == 0) {
        that.$router.push({ path: "/postJob" });
      } else {
        that.$router.push({ path: "/agentPublish" });
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .tab-left {
    width: auto;
    display: flex;
    align-items: center;
    & > div {
      width: auto;
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #e5e6eb;
      margin-right: 4px;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: $g_textColor;
      cursor: pointer;
    }
    & > div.hover-items {
      color: $g_color;
      border-color: $g_color;
    }
  }
  .tab-right {
    width: 124px;
    height: 32px;
    line-height: 32px;
    border-radius: 6px;
    background: $g_bg;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      width: 14.3px;
      height: 14.3px;
    }
    span {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      padding-left: 4px;
    }
  }
}
.job-tab-box {
  width: 100%;
  height: 3rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  /deep/ .el-tabs {
    height: 100%;
    .el-tabs__header {
      height: 100%;
      .el-tabs__nav-wrap {
        height: 100%;
        line-height: 3rem;
        &::after {
          height: 0;
        }
        .el-tabs__nav-scroll {
          height: 100%;
          padding: 0 20px;
          .el-tabs__item.is-active {
            color: $g_color;
          }
          .el-tabs__active-bar {
            bottom: 1px;
            background-color: $g_bg;
          }
        }
      }
    }
  }
  .seach-box {
    width: auto;
    padding-right: 1.5rem;
    font-size: 14px;
    /deep/ .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }
}
.job-list-box {
  width: 100%;
  .jobList-items {
    padding: 1rem 1.3rem;
    display: flex;
    justify-content: space-between;
    .items-left-box {
      flex: 1;
      display: flex;
      .left-info-box {
        width: 100%;
        font-size: 14px;
        .info-title {
          cursor: pointer;
          .title-name {
            font-size: 16px;
            font-weight: bold;
            color: #1d2129;
            line-height: 24px;
          }
          .title-subname {
            margin-top: 5px;
            font-size: 14px;
            font-weight: 400;
            color: #4e5969;
            line-height: 22px;
          }
        }
        .info-bott {
          margin-top: 1.4rem;
          display: flex;
          align-items: center;
          img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
          }
          span {
            padding-left: 13px;
            font-size: 14px;
            font-weight: 400;
            color: #86909c;
            line-height: 22px;
          }
        }
      }
    }
    .items-right-box {
      width: auto;
      text-align: right;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .right-btn-box {
        display: flex;
        & > div {
          height: 32px;
          text-align: center;
          line-height: 32px;
          font-size: 14px;
          box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
          border-radius: 2px;
          border: 1px solid $g_bg;
          margin-left: 10px;
          cursor: pointer;
        }
        & > div.hover {
          background: $g_bg;
          color: #fff;
        }
      }
      .right-btn-box.box-1 > div {
        width: 92px;
      }
      .right-btn-box.box-2 > div {
        width: 60px;
      }
      .icon-box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        & > div {
          display: flex;
          align-items: center;
          margin-right: 16px;
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
            padding-left: 4px;
          }
        }
      }
    }
  }
  .post-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .post-box {
      width: 240px;
      height: 240px;
      border-radius: 4px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 淡一点的盒子阴影 */
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
      cursor: pointer;
      img {
        width: 80%;
      }
      span {
        width: 100%;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #1d2129;
        line-height: 22px;
        margin-top: 10px;
        position: absolute;
        bottom: 20px;
      }
    }
  }
}
</style>