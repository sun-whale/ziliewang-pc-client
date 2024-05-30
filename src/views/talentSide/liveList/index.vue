<template>
  <div class="container">
    <div class="sec-hd">
      <h3>精选直播</h3>
      <p>体验沉浸式求职</p>
    </div>  
    <div class="sec-bd">
      <div v-for="(item,index) in liveList" :key="index" class="liveList-box">
        <div class="liveList-box-item" @click="clickItems(item)">
          <div class="more-live-item-img">
            <div class="item-status item-status-0">
              <i></i>
              <span>直播预告</span>
            </div>
            <img src="https://image0.lietou-static.com/img/65d86e09eb61c74ef2d7a4ab08u.jpg" alt="" class="content-img"/>
          </div>
          <div class="more-live-item-title">
            <h2 class="ellipsis-1">亚玛芬体育2024届管培生招募空中宣讲会</h2>
            <p>直播日期 3月4日 19:00</p>
          </div>
        </div>
      </div>
    </div>
    <div class="sec-footer">
      <div class="sec-content--more" @click="clickMore">
        <span>查看更多</span>
        <i class="el-icon-arrow-down"></i>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'liveList',
  components: {

  },
  data(){
    return{
      liveList: [
        {id:1,title:''},{id:1,title:''},{id:1,title:''},{id:1,title:''},{id:1,title:''},{id:1,title:''}],
      // 分页数据
      paginationData: {
        total: 10,
        currentPage: 1,
        pageSize: 20,
      },
    }
  },
  created(){
    this.getLiveList();
  },
  computed: {
    
  },
  methods: {
    clickMore(){
      this.paginationData.currentPage = this.paginationData.currentPage+1;
      this.getLiveList();
    },
    // 获取列表信息
    getLiveList(){
      let that = this;
      that.$axios.post('',{
        page: that.paginationData.currentPage,
        pageSize: that.paginationData.pageSize,
      }).then( res =>{
        if( res.code == 0 ){
          that.liveList = res.data;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch( e=>{
        console.log(e)
      })
    },
    // 点击列表跳转直播页
    clickItems(i){
      let item = i;
      this.$router.push({
        name:'liveRoom',
        params:{
          id: item.id
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
  .container-box{
    background: #fff;
  }
  .sec-hd{
    display: flex;
    margin-bottom: 10px;
    height: 34px;
    padding: 0 10px;
  }
  .sec-hd h3 {
    font-weight: 600;
    font-size: 24px;
    height: 34px;
    line-height: 34px;
    color: #3e454d;
    margin-right: 12px;
  }
  .sec-hd p {
    font-size: 14px;
    color: #667280;
    align-self: flex-end;
    padding-bottom: 3px;
  }
  .sec-bd{
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
  }
  .sec-bd>div.liveList-box{
    width: 25%;
    padding: 5px;
    margin-top: 10px;
    overflow: hidden;
    cursor: pointer;
    .liveList-box-item{
      width: 100%;
      background: #fff;
      border-radius: 6px;
      .more-live-item-img {
        height: 166px;
        width: 100%;
        position: relative;
        overflow: hidden;
        background: #f1f1f1;
        box-sizing: border-box;
        border: none;
        border-radius: 6px;

        .item-status {
          position: absolute;
          top: 0;
          left: 0;
          text-align: center;
          z-index: 1;
          font-size: 0;
          padding: 6px 8px;
          border-radius: 6px 0;
          background: rgba(0, 0, 0, .5);
          display: flex;
          align-items: center;
          justify-content: center;
          span{
            font-size: 12px;
          }
        }
        .item-status-0 {
          color: #fff;
        }
        .content-img {
          transition: all .5s;
          width: 100%;
          height: 100%;
        }
        .content-img:hover{
          transform: scale(1.1);
        }
      }
      .more-live-item-title {
        padding: 16px 16px 24px;
        font-size: 0;
        h2 {
          height: 22px;
          font-size: 16px;
          font-weight: 500;
          color: #000;
          line-height: 22px;
          margin: 0;
        }
        p {
          margin-top: 8px;
          margin-bottom: 0;
          height: 17px;
          font-size: 12px;
          font-weight: 400;
          color: #999;
          line-height: 17px;
        }
      }
    }
    .ellipsis-1{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;  
    }
  }
  .sec-footer{
    width: 100%;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .sec-content--more{
      width: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      padding: 10px 20px;
      cursor: pointer;
      i{
        margin-left: 10px;
      }
    }
    .sec-content--more:hover{
      color: $g_color;
    }
  }
  
</style>
