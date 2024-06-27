<template>
  <div class="container">
    <div class="title-text">MBTI性格测试</div>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card topic-content">
          <div class="topic-title">
            <span>单选题</span>
            <div>{{ topicAt.title }}</div>
          </div>
          <div
            class="topic-answer"
            v-for="(item, index) in topicAt.option"
            :key="index"
          >
            <el-radio
              fill="#fff"
              class="answer-item"
              v-model="topicChecked"
              :label="index"
              ><span>{{ item }}</span>
            </el-radio>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div class="countdown">{{ countdown || "00:00" }}</div>
          <div class="operate-content">
            <div
              :class="item.states == 1 ? 'topic-card active' : 'topic-card'"
              v-for="(item, index) in topicList"
              :key="index"
              @click="clickSelOperate(index)"
            >
              {{ index + 1 }}
            </div>
          </div>
          <div class="operate-explain">
            <p class="explain-left">
              答题进度 {{ topicAt.index + 1 }}/{{ topicList.length }}
            </p>
            <div class="explain-right">
              已做： <span></span> 未做： <span class="active"></span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-button type="primary" @click="nextSub" class="topic-sub">{{
          nextSubVal
        }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>
  
<script>
export default {
  name: "qualityTest",
  data() {
    return {
      categoryId: "",
      topicChecked: "-1",
      nextSubVal: "下一题",
      topicList: [], // 所以题目
      topicAt: {}, // 当前题目
      topicAtIndex: 0,
      timer: null,
      countdownTime: 30 * 60 * 1000, // 30分钟
    };
  },
  computed: {
    countdown() {
      // const hours = this.zeroFill((this.countdownTime / (1000 * 60 * 60)) % 24);
      const minutes = this.zeroFill((this.countdownTime / (1000 * 60)) % 60);
      const seconds = this.zeroFill((this.countdownTime / 1000) % 60);
      return `${minutes}:${seconds}`;
    },
  },
  created() {
    if(this.$route.query.id){
      this.categoryId = this.$route.query.id
    }

    this.startCountdown();
    // this.getTopicList();
    this.getTopic();
  },
  beforeDestroy() {
    this.clearCountdown();
  },
  methods: {
    // 获取数据
    getTopic() {
      const that = this;
      console.log(this.categoryId);
      that.$axios
        .get(
          "api/company-appraisal-title/list?company_appraisal_category_id=" +
            that.categoryId
        )
        .then((res) => {
          for (let j = 0; j < res.data.length; j++) {
            for (let i = 0; i < res.data[j].question_list.length; i++) {
              if (i == 30) {
                return;
              }
              let obj = {
                id: res.data[j].question_list[i].id,
                index: i,
                title: res.data[j].question_list[i].question,
                states: 0,
                checked: "",
                option: [],
              };
              for (
                let k = 0;
                k < res.data[j].question_list[i].answer_list.length;
                k++
              ) {
                obj.option.push(
                  res.data[j].question_list[i].answer_list[k].option +
                    "、" +
                    res.data[j].question_list[i].answer_list[k].answer
                );
              }
              that.topicList.push(obj);
            }
          }
          that.clickSelOperate(0);
        });
    },
    // 设置默认数据
    getTopicList() {
      for (let i = 0; i < 30; i++) {
        let obj = {
          id: i + 1,
          index: i,
          title: "当您需要做决定时，您更倾向于：",
          states: 0,
          checked: "",
          option: [
            i + 1 + " A 向朋友或家人寻求建议",
            i + 1 + " B 仔细思考并权衡利弊",
            i + 1 + " C 凭直觉做出决定",
            i + 1 + " D 依据个人原则和价值观做出决定",
          ],
        };
        this.topicList.push(obj);
      }
      this.clickSelOperate(0);
    },
    // 操作台选择题目
    clickSelOperate(i) {
      this.topicAt = this.topicList[i];
      this.topicAtIndex = i;
      this.topicChecked = this.topicAt.checked;
      if (i == this.topicList.length - 1) {
        this.nextSubVal = "提交";

        return;
      }
      this.nextSubVal = "下一题";
    },
    // 下一步/提交
    nextSub() {
      const that = this;
      if (that.nextSubVal == "下一题") {
        if (that.topicChecked != "-1") {
          that.topicList[that.topicAtIndex].states = 1; // 设置选中状态
          that.topicList[that.topicAtIndex].checked = that.topicChecked; // 设置选择的答案
          that.topicChecked = "-1"; // 清空选中的选项
        }
        that.clickSelOperate(that.topicAtIndex + 1);
        return;
      }
      this.$router.push({ path: "/qualityResult" });
    },
    // 时间格式化
    zeroFill(num) {
      num = parseInt(num);
      return num < 10 ? "0" + num : num == 0 ? "00" : num;
    },
    // 倒计时
    startCountdown() {
      this.timer = setInterval(() => {
        this.countdownTime -= 1000;
        if (this.countdownTime <= 0) {
          this.clearCountdown();
        }
      }, 1000);
    },
    // 倒计时结束
    clearCountdown() {
      if (this.timer) {
        console.log("结束");
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
};
</script>
  
<style scoped lang="scss">
.title-text {
  letter-spacing: 2px;
  font-size: 30px;
  font-weight: bold;
  color: #1f2e4d;
  line-height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.topic-content {
  .topic-title {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    margin-top: 10px;
    span {
      color: #1ec5d8;
      font-size: 12px;
      padding: 4px 6px;
      margin-right: 6px;
      border: 1px solid #1ec5d8;
    }
    p {
      font-size: 16px;
      color: #555;
    }
  }
  .topic-answer {
    .answer-item {
      width: 80%;
      padding: 20px 30px;
      display: block;
      margin-left: 10%;
      margin-bottom: 20px;
      border: 1px solid #efefef;
      border-radius: 50px;
      box-shadow: 4px 4px 5px 2px #eeeeee;
      span {
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
      }
    }
    .el-radio__input {
      display: none;
    }
    .is-checked {
      border: 1px solid #1ec5d8;
      background-color: #1ec5d8;
      span {
        color: #fff !important;
      }
    }
  }
}
.operate-content {
  display: flex;
  flex-wrap: wrap;
  .topic-card {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1ec5d8;
    font-size: 14px;
    margin: 9px;
    cursor: pointer;
    border: 1px solid #1ec5d8;
  }
  .active {
    color: #fff;
    background-color: #1ec5d8;
  }
}
.operate-explain {
  border-top: 1px solid #e5e5e5;
  padding-top: 12px;
  margin: 3px 9px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .explain-left {
    color: #555;
    font-size: 12px;
  }
  .explain-right {
    color: #555;
    font-size: 12px;
    display: flex;
    align-items: center;
    span {
      width: 14px;
      height: 14px;
      margin-left: 2px;
      margin-right: 10px;
      border: 1px solid #1ec5d8;
    }
    .active {
      margin-right: 0;
      background-color: #1ec5d8;
    }
  }
}
.topic-sub {
  width: 100%;
  background-color: #1ec5d8;
  border: 1px solid #1ec5d8;
  margin-top: 20px;
}
.box-card {
  width: 100%;
}
.countdown {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}
</style>