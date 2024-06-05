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
  </div>
</template>
<script>
export default {
  name: "qualityResult",
  data() {
    return {};
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
</style>