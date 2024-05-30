<template>
  <!-- 简历浏览量 -->
  <div class="bossSide-container">
    <div class="m-box zp-data">

      <div class="tab-box">
        <div class="left-box">
          <img src="../../../assets/image/bossSide/myRecruitment-search.png" alt="" />
          <span class="title">虚拟号码获取量</span>
          <!-- <span class="title-show">数据周期: 2023.03.30 ~ 2023.04.05</span> -->
        </div>
        <div class="right-box"></div>
      </div>

      <div class="tableData-box margin-top-20">    
        <el-table :data="infoDataList" style="width: 100%">
          <el-table-column type="index" label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 + (paginationData.currentPage - 1) * paginationData.pageSize }}</span>
            </template>
          </el-table-column>
           <el-table-column  prop="users.resume_image" label="头像" width="90" align="center">
            <template slot-scope="scope">
              <img class="list-img" :src="scope.row.users.resume_image?scope.row.users.resume_image:require('../../../assets/image/img-user.jpg')" alt="" />
            </template>
          </el-table-column>
          <el-table-column prop="users.name" label="姓名"></el-table-column>
          <el-table-column prop="users.phone" label="电话"></el-table-column>
          <el-table-column prop="users.position" label="技术"></el-table-column>
          <el-table-column  prop="users.work_status_desc" label="求职状态"></el-table-column>
          <!-- <el-table-column  prop="users.see_me_num" label="查看次数"></el-table-column> -->
          <el-table-column label="操作" width="80px">
            <template slot-scope="scope">
              <span class="blue" @click.stop="handleUpdateInfo(scope.row)">在线简历</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页控制 -->
        <mPagination :data="paginationData" @pageChangeEvent="pageHasChanged"></mPagination>
      </div>
    </div>

    <!-- 预览在线简历 弹窗  -->
    <onlineResume ref="onlineResume" :infoData="infoData" :basic_info="basic_info" :is_type="is_type" />
  </div>
</template>
<script>
import mPagination from '@/components/m-pagination';
import onlineResume from '../components/onlineResume.vue';

export default{
  components: {
    mPagination,
    onlineResume
  },
  data(){
    return {
      type: 2,
      infoDataList: [],
      // 分页数据
      paginationData: {
        total: 10,
        currentPage: 1,
        pageSize: 20,
      },
      is_type: 'searchTalent',
      infoData: {},
      basic_info:{},
    }
  },
  created(){
    this.type = this.$route.query?this.$route.query.type:1;
    this.getInfoData();
  },
  methods:{
    handleUpdateInfo(e){
      let that = this;
      that.$axios.post('/api/company/resume/detail',{
        uid: e.uid
      }).then( res =>{
        if(res.code == 0){
          that.infoData = res.data;
          that.basic_info = res.data.basic_info;
          that.$refs.onlineResume._data.zx_dialogVisible = true;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    getInfoData(){
      let that = this;
      that.$axios.post('/api/company/view/resume/list',{
        type: that.type,
        page: that.paginationData.currentPage,
        pagesize: that.paginationData.pageSize,
      }).then( res =>{
        if(res.code == 0){
          that.infoDataList = res.data.list;
          that.paginationData.total = res.data.count;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 分页事件
    pageHasChanged() {
      this.getInfoData();
    },
  }
}
</script>
<style lang="scss" scoped>
.tab-box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left-box{
    display: flex;
    align-items: center;
    &>img{
      width: 24px;
      height: 24px;
    }
    .title{
      font-size: 18px;
      font-weight: bold;
      color: $g_textColor;
      line-height: 26px;
      padding-left: 5px;
    }
    .title-show{
      font-size: 14px;
      font-weight: 400;
      color: #86909C;
      line-height: 22px;
      padding-left: 24px;
    }
  }
}
.tableData-box{
  .blue {
    color: $g_color;
    cursor: pointer;
  }
  /deep/ .has-gutter tr{
    background: #F7F9FC !important;
  }
  .list-img{
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }
}
</style> 
