<template>
    <div class="info-right-top">
      <div class="title">热门职位</div>
      <ul>
        <li v-for="(item,index) in OtherPositionsList" :key="index" @click="clickitems(item)">
          <div class="li-title">
            <span class="li-text">{{ item.position_name }}</span>
            <span class="li-xz">
              {{ item.salary }}K
              <span v-if="item.months != 12 && item.months">·{{ item.months}}薪</span>
            </span>
          </div>
          <div class="li-bottom-box">
            <div>{{ item.position_type }}</div>
            <span>{{ item.work_address }}</span>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>

export default {
  components: {
  },
  data(){
    return{
      OtherPositionsList: [],
    }
  },
  computed: {
    
   
  },
  created(){
  },
  mounted(){
    this.getList();
  },
  methods: {
    clickitems(i){
      this.$router.push({
        path:'/JobDetails',
        query:{
          id: i.id
        }
      })
    },
    getList(){
      let that = this;
      that.$axios.post('/api/profession-circle/hot-recommend-position',{}).then( res =>{
        if(res.code == 0){
          that.OtherPositionsList = res.data
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    }
  },
};
</script>

<style lang="scss" scoped>
  .info-right-top{
    width: 100%;
    height: auto;
    padding: 16px 20px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    .title{
      font-size: 16px;
      font-weight: bold;
      color: $g_textColor;
      line-height: 24px;
    }
    ul{
      margin-top: 1rem;
      width: 100%;
      li{
        width: 100%;
        height: auto;
        padding: 5px 10px;
        font-size: 14px;
        cursor: pointer;
        &:hover{
          background: #F4F8FF;
        }
        .li-title{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: bold;
          .li-text{
            flex: 1;
            color: $g_textColor;
            line-height: 22px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .li-xz{
            width: auto;
            color: #FF4D4F;
            line-height: 22px;
          }
        }
        .li-bottom-box{
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          div{
            font-size: 12px;
            font-weight: 400;
            color: #86909C;
            line-height: 20px;
          }
        }
      }
    }
  }
</style>
