<template>
  <!-- 公司信息 -->
  <div class="div-box">
    <div class="title">其他岗位</div>
    <div class="list-box">
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
  </div>  
</template>

<script>
export default {
  props:{
    OtherPositionsList:{
      type: Array,
      default() {
          return []
        }
    }
  },
  data(){
    return {

    }
  },
  methods:{
    clickitems(i){
      this.$router.push({
        path:'/JobDetails',
        query:{
          id: i.id
        }
      })
    },
    
  }
}
</script>

<style lang="scss" scoped>
  .div-box{
    width: 100%;
    &>.title{
      font-size: 16px;
      font-weight: bold;
      color: $g_textColor;
      line-height: 1.2rem;
    }
    .list-box{
      ul{
        margin-top: 1rem;
        width: 100%;
        li{
          width: 100%;
          height: auto;
          padding: 5px 0;
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

  }
</style>
