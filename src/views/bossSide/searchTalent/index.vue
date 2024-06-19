<template>
  <!-- 搜索人才页 -->
  <div class="bossSide-container">

 
    <!-- 高级筛选模块 开始-->
    <div class="screen-box m-box margin-top-20">
      <filterOptionsContainer  @getfilterInfo="getfilterInfo"/>
    </div>
    <!-- 高级筛选模块 结束-->
    <!-- 列表模块 开始  -->
    <div class="job-list-box">
      <div v-for="(item,index) in jobList" :key="index" class="jobList-items m-box margin-top-20" @click.stop="clickItems(item)">
        <div class="items-left-box">
          <div class="left-info-box">
            <div class="left-info-t">
              <img class="avatar-box" :src="item.avatar?item.avatar:require('../../../assets/image/bossSide/img-user.png')" alt="" />
              <div class="name-id-box">
                <div class="left-info-name">
                  <span class="span-name">{{ item.is_name_protect == 1? item.name: item.real_name }}</span>
                  <img :src="require(`../../../assets/image/bossSide/sex-${item.sex == 2? 2 : 1}.png`)" alt="" >
                  <span class="icon-span">今日活跃</span>
                </div>
                <span class="span-id">ID: {{ item.user_number }}</span>
              </div>
            </div>
            <div class="sub-title" v-if="item.birth_year_month">生日：{{ item.birth_year_month }}</div>
            
            <div class="sub-title" v-if="item.begin_work_date">参加工作：{{ item.begin_work_date }} {{ item.live_city }}</div>
            <div class="sub-title" v-if="item.position">求职期望：<span style="color:#FF4D4F;">{{ item.position }}</span></div>
            <div class="bottom-box" v-if=" item.userjobexpectation.length > 0">
              <!-- <span>{{ item.userjobexpectation[0].desired_industry }}</span> -->
              <span v-for="(jobexpect_item,jobexpect_index) in item.userjobexpectation" :key="jobexpect_index">{{ jobexpect_item.desired_industry }}</span>
            </div>
          </div>
        </div>
        <div class="items-m-box">
          <div class="items-m-p professional">
            <div v-for="(work_item,work_index) in item.userworkexperience" :key="work_index">{{ work_item.company_name}}<span style="color:#FF4D4F;">·{{ work_item.position }}</span><span class="time-span">{{ work_item.begin_date }}-{{ work_item.end_date }}</span></div>
          </div>
          <div class="items-m-p educational">
            <div v-for="(ex_item,ex_index) in item.usereducationexperience" :key="ex_index">{{ ex_item.school }}·{{ ex_item.specialty }}·{{ ex_item.education_background }}<span class="time-span">{{ ex_item.school_date }}</span></div>
          </div>
        </div>
        <div class="items-right-box">
          <div class="hover" @click.stop="clickChat(item)">打招呼</div>
          <!-- <div>电话沟通</div> -->
        </div>
      </div>
      <el-empty description="暂无数据..." v-if="jobList.length == 0"></el-empty>

    </div>
    <!-- 列表模块 结束  -->

    <!-- 分页控制 -->
    <mPagination :data="paginationData" @pageChangeEvent="pageHasChanged" v-if="jobList.length > 0"></mPagination>


    <!-- 预览在线简历 弹窗  -->
    <onlineResume ref="onlineResume" :infoData="infoData" :basic_info="basic_info" :is_type="is_type" />
    <!-- 选择岗位 弹窗 -->
    <div class="positionList-dialogbox">
      <el-dialog title="选择岗位" :center="false" :visible.sync="position_dialogVisible" width="300px" :before-close="position_handleClose">
        <div class="positionList-box">
          <ul>
            <li v-for="(item,index) in positionList" :key="index" @click="clickpositionList(item)">{{ item.position_name }}</li>
          </ul>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import mPagination from '@/components/m-pagination';
import filterOptionsContainer from '../components/filterOptionsContainer.vue';
import onlineResume from '../components/onlineResume.vue';

export default {
  name: 'searchTalent',
  components: {
    mPagination,
    filterOptionsContainer,
    onlineResume
  },
  data(){
    return {
      is_type:'searchTalent',
      search_value:'',
      jobList:[],  // 列表
      // 分页数据
      paginationData: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      infoData:{},
      basic_info:{},
      activeName: 'recommended',
      filterInfo:{},
      positionList:[], // 岗位列表
      position_dialogVisible: false,
      seltPositionData: {}
    }
  },
  created(){
    this.search_value = this.$route.query.input_name;
  },
  methods:{
    // 创建岗位会话信息
    createPositionChatRecord(p_i,u_i){
      let that = this;
      let p = {
        position_id: p_i,
        uid: u_i,
        tag: 2,
      }
      that.$axios.post('/api/position-chat-record/create',p).then(res =>{
        if(res.code == 0){
          console.log('保存岗位成功')
        }else{
          
        }
      }).catch(e =>{
        console.log(e)
      })
    }, 
    // 点击岗位列表
    clickpositionList(i){
      let that = this;
      let seltPositionData = that.seltPositionData;
      let name = '';
      if(seltPositionData.is_name_protect == 1){
        name = seltPositionData.name
      }else{
        name = seltPositionData.real_name
      }
      let infoData = {
        id: 'u_' + seltPositionData.uid,
        uid: seltPositionData.uid,
        name: name,
        avatar: seltPositionData.avatar,
        company_id: i.company_id, // 企业id
        position_id: i.id,  // 岗位id
        position_name: i.position_name,
      }
      console.log(infoData);
      debugger
      that.zx_dialogVisible = false;
      that.position_dialogVisible = false;
      that.createPositionChatRecord(i.id,seltPositionData.uid);
      that.$bus.$emit('receiveParams', {type:'searchTalent',laiyuan:'nav',infoData });
    },
    position_handleClose(){
      this.position_dialogVisible = false;
    },
    // 获取职位
    getPositionList(){
      let that = this;
      that.$axios.post('/api/company-interview/recruit/position/list',{
        company_id: localStorage.getItem('company_id')
      }).then(res =>{
        if(res.code == 0){
          that.positionList = res.data;
          if(that.positionList.length <= 0){
            that.$message.error({
              message: '请先发布岗位！'
            })
          }else{
            that.position_dialogVisible = true;
          }
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    
    // 筛选
    getfilterInfo(e){
      let info = JSON.parse(e);
      this.search_value = info.search_value;
      this.filterInfo = info.info;
      this.jobList = [];
      this.paginationData= {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      };
      this.getSearchinfo();
    },
    clickTagname(n){
      this.search_value = n;
      this.getSearchinfo();
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 分页事件
    pageHasChanged() {
      this.getSearchinfo();
    },
    // 获取省市区地址级联
    handleChange(thsAreaCode) {

      let areaCode = thsAreaCode;
      let length = areaCode.length;
      let index = length - 10;
      if(length > 10){
        this.$message.error({
          message: '最多选择10个城市！'
        })

        this.selectedOptions = areaCode.splice(index,length) // 返回被截取的对象
        return
      }
      this.selectedOptions = thsAreaCode;
    },

    // 搜索
    getSearchinfo(){
      let that = this;
      let p = {
        page: that.paginationData.currentPage,
        pagesize: that.paginationData.pageSize,
        search: that.search_value,
        many_search:{}
        // desired_location: desired_location.length>0?desired_location.join(','):'',
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
      that.$axios.post('/api/company-position/search',p).then( res =>{
        if(res.code == 0){
          that.jobList = res.data.list;
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
    },
    // 点击列表
    clickItems(i){
      let that = this;
      
      that.$axios.post('/api/company/resume/detail',{
        uid: i.uid
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
    // 点击聊一聊
    async clickChat(i){
      let that = this;
      let res =  await that.$axios.post('/api/staff/profile',{});
      if(res.data.vip_rank < 1){
        that.$message.error({
          message: '购买会员后才可打招呼！'
        })
        setTimeout( () =>{
          that.$router.push('/topUpBuy');
        },1000)
        return
      }
      that.seltPositionData = i;
      that.getPositionList(); // 获取职位
      return
     
    },
      
    
    
  }
}
</script>

<style lang="scss" scoped>




  // 列表
  .job-list-box{
    width: 100%;
    .jobList-items{
      padding: 1rem 1.3rem;
      display: flex;
      justify-content: space-between;
      position: relative;
      cursor: pointer;
      .items-left-box{
        width: 20rem;
        display: flex;
        .left-info-box{
          padding-left: 14px;
          &>div{
            display: flex;
            align-items: center;
          }
          .left-info-t{
            img.avatar-box{
              width: 42px;
              height: 42px;
              border-radius: 50%;
            }
            .name-id-box{
              padding-left: 6px;
              .left-info-name{
                display: flex;
                align-items: center;
                .span-name{
                  font-size: 16px;
                  color: $g_textColor;
                  line-height: 24px;
                }
                &>img{
                  width: 16px;
                  height: 16px;
                  margin: 0 2px;
                }
                .icon-span{
                  width: 62px;
                  height: 20px;
                  line-height: 20px;
                  text-align: center;
                  font-size: 10px;
                  background: #F6FFED;
                  border-radius: 2px;
                  color: #B7EB8F;
                  border: 1px solid #B7EB8F;
                  margin-left: 6px;
                }
              }
              .span-id{
                padding-top: 4px;
                font-size: 14px;
                font-weight: bold;
              }
            }
          
            

          }
          .sub-title{
            font-size: 14px;
            font-weight: 400;
            color: #86909C;
            line-height: 22px;
            margin-top: 4px;
          }
          .bottom-box{
            margin-top: 10px;
            span{
              width: auto;
              height: 22px;
              line-height: 22px;
              text-align: center;
              background: #F7F8FA;
              border-radius: 2px;
              padding: 0 6px;
              margin-right: 10px;
              color: $g_textColor;
              font-size: 12px;
            }
          }

        }

      }
      .items-m-box{
        flex: 1;
        padding-left: 6rem;
        .items-m-p{
          margin-top: 8px;
          &:nth-of-type(1){
            margin-top: 0;
          }
          &>div{
            font-size: 14px;
            font-weight: 400;
            color: $g_textColor;
            line-height: 22px;
            margin-top: 8px;
            &:nth-of-type(1){
              margin-top: 0;
            }
            .time-span{
              color: #86909C;
              padding-left: 8px;
            }
          }

        }
      }
      .items-right-box{
        width: auto;
        text-align: right;
        display: flex;
        justify-content: space-between;
       align-items: flex-end;
       &>div{
        width: 88px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 14px;
        background: #FFFFFF;
        box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.02);
        border-radius: 2px;
        border: 1px solid $g_color;
        color: $g_color;
        margin-right: 1rem;
        cursor: pointer;
        &.hover{
          background: $g_bg;
          color: #fff;
        }
       }
        
      }
    }

  }




 

  .job-tab-box{
    width: 100%;
    height: 2.8rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    /deep/ .el-tabs{
      height: 100%;
      .el-tabs__header {
        height: 100%;
        .el-tabs__nav-wrap{
          height: 100%;
          line-height: 2.8rem;
          &::after{
            height: 0;
          }
          .el-tabs__nav-scroll {
            height: 100%;
            padding: 0 20px;
            .el-tabs__item.is-active{
              color: $g_color;
            }
            .el-tabs__active-bar{
              bottom: 1px;
              background-color: $g_bg;
            }
          }
        }
      }
    }
    .seach-box{
      width: auto;
      padding-right: 1.5rem;
      font-size: 14px;
      display: flex;
      align-items: center;
      &>div{
        display: flex;
        align-items: center;
        margin-left: 20px;
        cursor: pointer;
        img{
          width: 14px;
          height: 14px;
        }
        span{
          font-size: 14px;
          line-height: 22px;
          padding-left: 4px;
        }
      }
    }
  }
  .tab-right{
    width: 124px;
    line-height: 32px;
    color: #4E5969;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img{
      width: 14px;
      height: 14px;
    }
    span{
      font-size: 14px;
      line-height: 22px;
      padding-left: 4px;
    }
  }
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner, /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background: $g_bg;
    border-color: $g_bg;
  }
  .screen-box {
    padding: 20px 20px 10px 20px;
  }
  .positionList-dialogbox{
    /deep/ .el-dialog{
      .el-dialog__header{
        text-align: left;
        padding: 10px;
        .el-dialog__title{
          font-size: 15px;
          color: $g_textColor;
        }
        .el-dialog__headerbtn{
          top: 10px;
        }
      }
      .el-dialog__body{
        max-height: 400px;
        padding: 0 0 20px 0;
        margin: 0 10px;
        border-top: 1px solid #F2F3F5;
        .positionList-box{
          height: auto;
          width: 100%;
          li{
            font-size: 14px;
            padding: 10px;
            cursor: pointer;
            &:hover{
              background: #e0e0e041;
              color: $g_color;
            }
          }
        }
      }
    }
  }
</style>