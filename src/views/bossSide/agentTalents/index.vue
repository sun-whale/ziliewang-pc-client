<!-- 职位中心页 -->
<template>
  <div class="bossSide-container">
    <!-- 列表项 开始 -->
    <talentsMessage />
    <!-- 列表项 结束 -->
    <el-empty description="暂无数据..." v-if="jobList.length == 0"></el-empty>
  </div>
</template>
  
  <script>
import talentsMessage from "../components/jobAgent/talentsMessage.vue";
export default {
  data() {
    return {
      jobList: [],
    };
  },
  components: { talentsMessage },
  created() {},
  methods: {},
};
</script>
  
  <style lang="scss" scoped>
</style>