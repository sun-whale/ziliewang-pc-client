<template>
  <!-- 职位弹窗 -->
  <div class="dialogVisible-pop-box" v-if="dialogVisible">
    <div class="mask-box"></div>
    <div class="dialog-container">
      <div class="dialog-header">
        <h3 class="title">请选择职城市</h3>
        <div class="dialog-header-input">
          <!-- <el-input type="text" v-model="dialogVisible_seach"></el-input> -->
        </div>
        <img src="../../assets/image/icon-close.png" alt="" @click="clickClose"/>
      </div>
      <div class="dialog-body">
        <div class="body-left-box">
          <div class="left-list-box">
            <ul>
              <li :class="selt_item == index? 'active':'' " v-for="(item,index) in position.industryList" :key="index" @click="click_industryListLi(item,index)">{{ item.industry }}</li>
            </ul>
          </div>
        </div>
        <div class="body-right-box">
          <div class="right-list-box">
            <div class="category-list-items">
              <ul>
                <li :class="selt_item == index? 'active':'' " v-for="(items,idx) in item.position_list" :key="idx" @click="click_position_list(items.category_name)">{{ items.category_name }}</li>
              </ul>
            </div>
            
          </div>
          
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
let pcas = require('../../assets/json/pc-code.json');
export default {
  props: {
   
  },
  data() {
    return {
      dialogVisible: true,
      position: [],
    }
  },
  created(){
    let position = JSON.parse(JSON.stringify(pcas));
    position.splice(0,1);
    this.position =position;
  },
  methods: {
    clickClose(){
      this.dialogVisible = false;
    },
  }
}
</script>

<style lang="scss" scoped>
  /* 弹窗 */
  .dialogVisible-pop-box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    .mask-box{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: .5;
      background: #000;
    }
    .dialog-container{
      min-width: 320px;
      width: 50%;
      max-height: 100%;
      transform: none;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: #FFF;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
      box-sizing: border-box;
      .dialog-header{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #f5f6f9;
        font-size: 14px;
        padding: 0 24px;
        .title{
          font-size: 16px;
          color: $g_textColor;
          font-weight: bold;
          width: auto;
        }
        .dialog-header-input{
          flex: 1;
          display: flex;
          align-items: center;
          padding-left: 30px;
          /deep/ .el-input{
            width: 320px;
            border: none;
            .el-input__inner{
              background: #F7F8FA;
              height: 38px;
              line-height: 38px;
            }
          }
          /deep/ .el-input.is-focus .el-input__inner{
            border-color: $g_color;
            &:focus{
              border-color: $g_color;
            }
          }
        }
        img{
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
      .dialog-body {
        overflow: visible;
        height: calc(60vh);
        width: 100%;
        display: flex;
        .body-left-box{
          width: 13rem;
          padding: 10px 10px 20px;
          overflow-x: hidden;
          overflow-y: auto;
          border-right: 1px solid #f5f6f9;

          .left-list-box{
            width: 100%;
            height: auto;
            ul{
              width: 100%;
              height: auto;
              li{
                width: 100%;
                height: 40px;
                border-radius: 4px 4px 4px 4px;
                font-size: 14px;
                line-height: 40px;
                color: $g_textColor;
                padding: 0 12px;
                cursor: pointer;
                text-align: left;
              }
              li.active{
                background: #F7F8FA;
              }
            }
          }
        }
        .body-right-box{
          flex: 1;
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          .right-list-box{
            width: 100%;
            height: auto;
            padding: 0 1.2rem 0.8rem;
            .category-list-items{
              margin-top: 20px;
              text-align: left;
              .category-name{
                font-size: 16px;
                font-weight: bold;
                color: $g_textColor;
                line-height: 24px;
                width: 100%;
              }
              ul{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                li{
                  width: auto;
                  height: 36px;
                  text-align: center;
                  line-height: 36px;
                  background: #F7F8FA;
                  border-radius: 4px 4px 4px 4px;
                  font-size: 14px;
                  color: $g_textColor;
                  margin-top: 16px;
                  margin-right: 16px;
                  padding: 0 10px;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

    }
  }
</style>
