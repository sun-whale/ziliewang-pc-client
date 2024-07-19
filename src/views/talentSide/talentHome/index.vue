<template>
  <div class="container">
    <div class="job-search-box">
      <!-- 筛选模块 开始-->
      <filterOptionsContainer @getfilterInfo="getfilterInfo"/>
      <!-- 筛选模块 开始-->
    </div>

    <div class="home-box margin-top-20">
      <!-- 左侧列表模块 开始 -->
      <div class="info-list-box">
        <!-- 列表开始 -->
        <div class="list-items" v-for="(item,index) in infoList" :key="index">
          <!-- agent 职位icon -->
           <img src="../../../assets/image/agent-post.gif" v-if="item.is_automation == 2" style="position: absolute;width: 60px;height: auto;top: -5px;right: -10px;">
          <div class="items-left-box" @click.stop="clickItems(item)">
            <p class="items-title">
              {{ item.position_name }} 
              <span class="items-title-span">{{ item.salary }}K 
                <!-- <span class="span-1">/月</span> -->
                <span v-if="item.months != 12 && item.months">· {{ item.months }}薪</span>
              </span>
            </p>
            <div class="items-tag-box">
              <el-rate
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>
            <div class="items-tag-box">
              <el-tag v-if="item.work_address">{{ item.work_address }}</el-tag>
              <el-tag>{{ item.educational_experience }}</el-tag>
            </div>
            <div class="items-firm-info" v-if="item.company">
              <span class="firm-info-1">{{ item.company.company_name }}</span>
              <span class="firm-info-2">{{ item.company.corporate_finance }} <span v-if="item.company.company_scale">{{ item.company.company_scale }}人</span></span>
            </div>
          </div>
          <div class="items-right-box" style="flex-direction: column;justify-content: center;">
            <img :src="item.avatar?item.avatar:require('../../../assets/image/img-user.jpg')" alt="" class="items-boss-img" />
            <div class="items-boss-name">ID: {{ item.staff_number }}</div>
            <div class="items-boss-g">{{ item.role_desc?item.role_desc:'人事' }}</div>
          </div>
        </div>
        <el-empty el-empty description="暂无数据..." v-if="infoList.length<=0"></el-empty>
        <!-- 列表结束 -->

        <!-- <jobList :data="infoData" :tag="tag"/> -->
            
        <!-- 分页控制 -->
        <mPagination :data="paginationData" @pageChangeEvent="pageHasChanged" v-if="infoList.length>0"></mPagination>
      </div>
      <!-- 左侧列表模块 结束 -->
      <!-- 右侧 个人信息操作模块 开始 -->
      <div class="info-right-box">
        
        <personalInfo />

        <div class="m-box margin-top-20">
          <a href="http://59.110.24.172:8012" target="_brak" class="zlhx-box">
            <p class="p-1">cometgpt</p>
            <p class="p-2">自猎彗星</p>
          </a>
        </div>
      </div>
      <!-- 右侧 个人信息操作模块 结束 -->
    </div>

  </div>

</template>

<script>
import personalInfo from '../components/personalInfo.vue';
import mPagination from '@/components/m-pagination';
import filterOptionsContainer from '../components/filterOptionsContainer.vue';

import { getPerfectionDegree } from "../../../utils/index";

export default {
  name: 'talentHome',
  components: {
    personalInfo,
    mPagination,
    filterOptionsContainer,
  },
  data(){
    return{
      region:'',
      input_name:'', // 搜索框value
      hotJob_options: [],
      tag: '',
      infoList: [], // 列表
      // 分页数据
      paginationData: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      filterInfo:{}
    }
  },
  created(){
    // this.getSearchinfo();
    // 获取个人信息
    this.getUserProfile();
  },
  computed: {
    
  },
  methods: {
    // 筛选
    getfilterInfo(e){
      let info = JSON.parse(e);
      this.input_name = info.input_name;
      this.filterInfo = info.info;
      this.infoList = [];
      this.paginationData= {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      };
      this.getSearchinfo();
    },
    // 获取个人信息
    getUserProfile(){
      let that = this;
      that.$axios.post('/api/user/profile',{}).then(res =>{
        if(res.code == 0){
          this.infoData = res.data;
          // 简历完善度、
         that.perfection_degree = getPerfectionDegree(res.data);
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    clickItems(i){
      let that = this;
      // 获取个人信息
      that.$axios.post('/api/user/profile',{}).then(res =>{
        if(res.code == 0){
          // 简历完善度、
          let perfection_degree = getPerfectionDegree(res.data);
          if(perfection_degree.degree_num != 100){
            that.$message.error({
              message: '请先完善个人简历！'
            })
            return
          }
          that.$router.push({
            path:'/JobDetails',
            query:{
              id: i.id
            }
          })
        }
      }).catch(e =>{
        console.log(e)
      })
      
    },
    // 分页事件
    pageHasChanged() {
      this.getSearchinfo();
    },

    // 搜索
    getSearchinfo(){
      let that = this;
      let p = {
        page: that.paginationData.currentPage,
        pagesize: that.paginationData.pageSize,
        search: that.input_name,
        many_search:{}
      }
      let filterInfo = that.filterInfo;
      for(let key in filterInfo){
        if(filterInfo[key]){
          p.many_search[key] = filterInfo[key]
        }
      }
      if(p.many_search.work_address == '全国'){
        p.many_search.work_address = ''
      }
      that.$axios.post('/api/talents/index',p).then( res =>{
        if(res.code == 0){
          that.infoList = res.data.list;
          that.paginationData.total = res.data.total;
          that.scrollToTop();
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    //滚动到顶部
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        // behavior: 'smooth' // 平滑滚动
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .job-search-box{
    width: 100%;
  }
  .home-box{
    width: 100%;
    display: flex;
    .info-list-box{
      flex: 1;
    }
    .info-right-box{
      width: 300px;
      padding-left: 0.8rem;
      .zlhx-box{
        width: 100%;
        cursor: pointer;
        &>p{
          color: transparent;
          background-image: linear-gradient(45deg, gold, purple, cyan, deeppink);
          -webkit-background-clip: text;
          background-clip: text;
          font-weight: bold;
        }
        .p-1{
          line-height: 22px;
          font-size: 18px;
        }
        .p-2{
          line-height: 22px;
          font-size: 20px;
          margin-top:2px;
        }
      }
        
    }
  }



  .filter-box{
    width: 100%;
    padding: 1rem;
    .filter-item-box{
      width: 100%;
      padding: 10px 0;
      border-bottom: 1px solid #F2F3F5;
    }
  }

  .list-items{
    margin-top: 16px;
    background: #fff;
    border-radius: 6px;
    padding: 16px;
    display: flex;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    .items-left-box{
      flex: 1;
      text-align: left;
      .items-title{
        font-size: 16px;
        font-weight: bold;
        color: #000000;
        line-height: 22px;
        .items-title-span{
          color: #FF4D4F;
          padding-left: 10px;
        }
        .span-1{
          font-size: 12px;
          color: #999;
          padding-left: 6px;
        }
      }
      .items-tag-box{
        margin-top: 6px;
        .el-tag{
          background-color: #F7F8FA;
          border-color: #F7F8FA;
          color: #1F2E4DFF;
          height: 22px;
          padding: 0 10px;
          line-height: 22px;
          font-size: 12px;
          border-radius: 2px;
          margin-left: 10px;
          &:nth-of-type(1){
            margin-left: 0;
          }
        }
      }
      .items-firm-info{
        margin-top: 20px;
        .firm-info-1{
          font-size: 14px;
          font-weight: 400;
          color: $g_textColor;
        }
        .firm-info-2{
          margin-left: 16px;
          font-size: 14px;
          font-weight: 400;
          color: #86909C;
        }
      }
    }
    .items-right-box{
      width: 168px;
      position: relative;
      display: flex;
      align-items: center;
      .right-c{
        width: 0;
        height: 100%;
        opacity: 0.5;
        border: 1px dashed;
        border-image: linear-gradient(180deg, rgba(255, 117, 26, 0), rgba(255, 100, 0, 1), rgba(255, 117, 26, 0)) 1 1;
      }
      .quan{
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #FF751A;
        position: absolute;
        left: -3px;
        top: 50%;
        transform: translateY(-50%);
      }
      .right-status-box{
        padding-left: 10px;
        .right-status-text{
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: bold;
          color: #FF751A;
          line-height: 22px;
          cursor: pointer;
          i{
            margin-left: 4px;
          }
        }
        .status-time{
          font-size: 12px;
          font-weight: 400;
          color: #86909C;
          line-height: 20px;
        }
      }
      .items-boss-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .items-boss-name{
        font-size: 14px;
        font-weight: 400;
        color: #1D2129;
        line-height: 22px;
      }
      .items-boss-g{
        font-size: 12px;
        font-weight: 400;
        color: #86909C;
        line-height: 20px;
      }
      
    }

  }
  .list-items:nth-of-type(1){
    margin-top: 0 !important;
  }

</style>
