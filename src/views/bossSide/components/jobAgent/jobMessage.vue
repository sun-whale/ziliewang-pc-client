<template>
  <div class="content">
    <div v-for="(item, index) in 4" :key="index" class="jobList-item">
      <div class="title-name">前端开发</div>
      <div class="title-subname">
        薪资范围：1-15K 工作时间：0-1 工作城市: 北京市/北京
      </div>
      <div class="info-bott">
        <img src="@/assets/image/bossSide/img-user.png" alt="" />
        <span>郜喜忠 2024-06-27 11:40:26 ( 30天后下线)</span>
      </div>
      <div class="icon-box">
        <div @click.stop="clickPositionItems()">
          <img src="@/assets/image/bossSide/form-xg.png" alt="" /><span
            >修改</span
          >
        </div>
        <div @click.stop="clickDelItems()">
          <img src="@/assets/image/bossSide/icon-copy.png" alt="" /><span
            >删除</span
          >
        </div>
      </div>
      <el-button class="talents-list" @click="clickTalents"
        >查看人才列表</el-button
      >
    </div>
  </div>
</template>
  
  <script>
export default {
  components: {},
  data() {
    return {
      jobList: [],
    };
  },
  created() {},
  methods: {
    // 修改
    clickPositionItems() {
      // this.$router.push("/postJob?id=" + i.id);
      this.$message.success("修改成功！");
    },
    // 删除
    clickDelItems() {
      this.$message.success("删除成功！");
    },
    // 查看人才列表
    clickTalents() {
      this.$router.push("/agentTalents");
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.jobList-item {
  padding: 1rem 1.3rem;
  border-radius: 6px;
  background: #fff;
  margin-top: 20px;
  position: relative;
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
  .icon-box {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 20px;
    right: 22px;
    font-size: 12px;
    color: #86909c;
    div {
      display: flex;
      align-items: center;
    }
    img {
      width: 16px;
      height: 16px;
      margin: 0 4px 0 10px;
    }
  }
  .talents-list {
    background-color: $g_color;
    width: 100px;
    font-size: 12px;
    padding: 10px 8px;
    color: #fff;
    border-radius: 6px;
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
</style>