<template>
  <div class="content">
    <div v-for="(item, index) in 4" :key="index" class="talents-item">
      <div class="items-left-box">
        <div class="left-info-box">
          <div class="left-info-t">
            <img
              class="avatar-box"
              src="@/assets/image/bossSide/img-user.png"
            />
            <div class="name-id-box">
              <div class="left-info-name">
                <span class="span-name">韩******乘</span>
                <img src="@/assets/image/bossSide/sex-1.png" alt="" />
                <span class="icon-span">今日活跃</span>
              </div>
              <span class="span-id">ID: z54730423085506909</span>
            </div>
          </div>
          <div class="sub-title">生日：2000-12-02</div>

          <div class="sub-title">参加工作：2024-05-01 北京</div>
          <div class="sub-title">
            求职期望：<span style="color: #ff4d4f">web前端开发</span>
          </div>
          <div class="bottom-box">
            <span>IT互联网技术</span>
          </div>
        </div>
      </div>
      <div class="items-m-box">
        <div class="items-m-p professional">
          <div>
            北京菁苗健康有限公司<span style="color: rgb(255, 77, 79)"
              >·web前端开发</span
            ><span class="time-span">2020-03-19-2024-03-14</span>
          </div>
        </div>
        <div class="items-m-p educational">
          <div>
            北京大学·web·本科<span class="time-span"
              >2024-05-01-2024-05-01</span
            >
          </div>
        </div>
      </div>
      <div class="items-right-box">
        <div
          class="hover"
          @click.stop="clickChat()"
          style="width: auto; padding: 0 10px"
        >
          查看素质评估结果
        </div>
        <div
          class="hover"
          @click.stop="clickChat()"
          style="width: auto; padding: 0 10px"
        >
          查看面试评估结果
        </div>
        <div class="hover" @click.stop="clickChat()">打招呼</div>
      </div>
      <div class="steps-box">
        <div class="steps-item active">面试评估</div>
        <div class="steps-item">素质评估</div>
        <div class="steps-item">已入职</div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    // 点击打招呼
    clickChat() {},
  },
};
</script>
  
  <style lang="scss" scoped>
.talents-item {
  padding: 1rem 1.3rem;
  border-radius: 6px;
  background: #fff;
  margin-top: 20px;
  position: relative;
  display: flex;
  justify-content: space-between;
  .items-left-box {
    width: 20rem;
    display: flex;
    .left-info-box {
      padding-left: 14px;
      & > div {
        display: flex;
        align-items: center;
      }
      .left-info-t {
        img.avatar-box {
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }
        .name-id-box {
          padding-left: 6px;
          .left-info-name {
            display: flex;
            align-items: center;
            .span-name {
              font-size: 16px;
              color: $g_textColor;
              line-height: 24px;
            }
            & > img {
              width: 16px;
              height: 16px;
              margin: 0 2px;
            }
            .icon-span {
              width: 62px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              font-size: 10px;
              background: #f6ffed;
              border-radius: 2px;
              color: #b7eb8f;
              border: 1px solid #b7eb8f;
              margin-left: 6px;
            }
          }
          .span-id {
            padding-top: 4px;
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
      .sub-title {
        font-size: 14px;
        font-weight: 400;
        color: #86909c;
        line-height: 22px;
        margin-top: 4px;
      }
      .bottom-box {
        margin-top: 10px;
        span {
          width: auto;
          height: 22px;
          line-height: 22px;
          text-align: center;
          background: #f7f8fa;
          border-radius: 2px;
          padding: 0 6px;
          margin-right: 10px;
          color: $g_textColor;
          font-size: 12px;
        }
      }
    }
  }
  .items-m-box {
    flex: 1;
    padding-left: 6rem;
    .items-m-p {
      margin-top: 8px;
      &:nth-of-type(1) {
        margin-top: 0;
      }
      & > div {
        font-size: 14px;
        font-weight: 400;
        color: $g_textColor;
        line-height: 22px;
        margin-top: 8px;
        &:nth-of-type(1) {
          margin-top: 0;
        }
        .time-span {
          color: #86909c;
          padding-left: 8px;
        }
      }
    }
  }
  .items-right-box {
    width: auto;
    text-align: right;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    & > div {
      width: 88px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 14px;
      background: #ffffff;
      box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
      border-radius: 2px;
      border: 1px solid $g_color;
      color: $g_color;
      margin-right: 1rem;
      cursor: pointer;
      &.hover {
        background: $g_bg;
        color: #fff;
      }
    }
  }
  .steps-box {
    position: absolute;
    right: 20px;
    font-size: 12px;
    color: #666;
    .steps-item {
      margin-top: 8px;
      position: relative;
    }
    .active {
      color: $g_bg;
    }

    .steps-item::after {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #fff;
      border: 1px solid $g_bg;
      position: absolute;
      top: 50%;
      left: -20px;
      margin-top: -5px;
    }
    .active {
      color: $g_bg;
    }
    .active::after {
      background-color: $g_bg;
    }
    .steps-item::before {
      content: "";
      width: 2px;
      height: 15px;
      position: absolute;
      left: -16px;
      top: 10px;
      background: $g_bg;
    }
    .steps-item:last-child::before {
      background: #fff;
    }
  }
}
</style>