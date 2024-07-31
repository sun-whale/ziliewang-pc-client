<template>
  <div class="container">
    <div class="title-text">MBTI性格测试结果</div>
    <div class="title-hint">图表分析结果</div>
    <div ref="demo1" id="barChart" style="width: 100%; height: 400px"></div>
    <div class="title-hint">具体测试结果</div>
    <div class="result-conent">
      性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果
      性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果性格测试结果
    </div>
    <div class="title-hint">测试题目分析</div>
    <div v-for="(item, index) in 10" :key="index" style="margin-top: 10px;">
      <div class="topic-title">
        <!-- <span>单选题</span> -->
        <div>1、当您置身于熟悉得社交场合中时，您更倾向于：</div>
      </div>
      <div
        class="topic-answer"
        v-for="(item_item, index_item) in topicList"
        :key="index_item"
      >
        <!-- <div
          class="answer-item"
          :class="index == 1 ? 'is-checked' : index == 3 ? 'checked' : ''"
        > -->
        <div class="answer-item" :class="index_item == 1 ? 'is-checked' : ''">
          <span>{{ item_item }}</span>
        </div>
      </div>
      <div class="tips">
        <span>注解：</span>这道题旨在了解您在社交场合中得舒适程度。
      </div>
      <div class="tips">
        <span>评价总结：</span
        >1-3分：更偏向内向，喜欢独处或小范围交流。<br />4-6分：在社交场合中有平衡，有时喜欢独处，有时也愿意与人交流。<br />7-10分：更偏向于外向，喜欢社交，享受与人交谈的过程
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "qualityResult",
  data() {
    return {
      topicList: [
        "A.与大家交谈、参与话题(10分)",
        "B.找一个角落静静观察(7分)",
        "C.见到熟悉得人就打招呼，但不主动交谈(4分)",
        "D.尽量避免社交场合，更喜欢独处(2分)",
      ],
    };
  },
  mounted() {
    this.getEchartDate();
  },
  methods: {
    getEchartDate() {
      const chartContainer = document.getElementById("barChart");
      const chart = this.$echarts.init(chartContainer);
      const options = {
        radar: {
          indicator: [
            { name: "勇气", max: 100 },
            { name: "智慧", max: 100 },
            { name: "冷静", max: 100 },
            { name: "内向", max: 100 },
            { name: "感觉", max: 100 },
            { name: "心理", max: 100 },
          ],
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: [90, 75, 78, 70, 72, 92],
              },
            ],
          },
        ],
      };

      // 渲染图表
      chart.setOption(options);
    },
  },
};
</script>

<style scoped lang="scss">
.tips {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
  font-size: 14px;
  line-height: 20px;
  color: #555;
  letter-spacing: 1px;
  span {
    color: #000;
  }
}
#main {
  width: 200px;
  height: 200px;
  margin: 40px auto;
}
.title-text,
.title-hint {
  letter-spacing: 2px;
  font-size: 30px;
  font-weight: bold;
  color: #1f2e4d;
  line-height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.title-hint {
  margin-top: 20px;
  margin-bottom: 16px;
  font-size: 28px;
}
.result-conent {
  font-size: 14px;
  line-height: 20px;
  color: #555;
  letter-spacing: 1px;
}
.topic-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
  span {
    color: #1ec5d8;
    font-size: 12px;
    padding: 4px 6px;
    margin-right: 6px;
    border: 1px solid #1ec5d8;
  }
  p {
    font-size: 14px;
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
    font-size: 14px;
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
  .checked {
    border: 1px solid #e9e9e9;
    background-color: #e9e9e9;
    span {
      color: #000 !important;
    }
  }
}
</style>
