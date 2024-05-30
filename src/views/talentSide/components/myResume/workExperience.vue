<template>
  <div class="container">
    <div class="workExperience-box myResume-plate">
      <div class="myResume-plate-title-box">
        <span class="info-t" :class="data.length<= 0 ?'hover':''">工作经历</span>
        <img src="../../../../assets/image/Frame_7.png" alt="" class="info-icon-img" v-if="!is_creat" @click="clickCreat"/>
      </div>
      <div class="myResume-plate-list" v-if="!is_creat">
        <ul class="plate-list-ul">
          <li v-for="(item,index) in data" :key="index">
            <div class="li-title-box">
              <div class="li-name">
                <span class="li-name-1">{{ item.company_name }}</span>
                <span class="li-name-2">{{ item.begin_date }} - {{ item.end_date }}</span>
              </div>
              <div class="info-set">
                <span @click="clickDelete(item.id,index)">删除</span>
                <span>/</span>
                <span @click="clickUpdate(item)">编辑</span>
              </div>
            </div>
            <div class="items-sub-box">{{ item.position }}</div>
            <div class="items-text-box">
              {{ item.responsibility_performance }}
            </div>
          </li>
        </ul>

      </div>

      <!-- 编辑状态模块 开始 -->
      <div class="redact-title-bottom" v-if="is_creat">
        <div class="redact-title-box">
          <span class="info-t">添加工作经历</span>
        </div>
        <div class="redact-item-box">

          <div class="mb20 redact-item">
            <div class="item-label">公司名称</div>
            <div class="item-content">
              <el-input v-model="infoData.company_name" placeholder="公司名称"></el-input>
            </div>
            <div class="login-check-box">
                <el-checkbox v-model="infoData.checked"></el-checkbox>
                <div class="login-check-text">对该公司屏蔽我的简历</div>
              </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">所属行业</div>
            <div class="item-content">
              <!-- <el-input v-model="infoData.industry_involved" autocomplete="on" spellcheck="false" placeholder="请选择" readonly="readonly"></el-input>
              <img src="../../../../assets/image/Frame_8.png" alt="" /> -->
              <el-select v-model="infoData.industry_involved" placeholder="请选择">
                <el-option
                  v-for="item in industry.industryList"
                  :key="item.industry"
                  :label="item.industry"
                  :value="item.industry">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">工作时间</div>
            <div class="item-content">
              <el-date-picker
                v-model="infoData.begin_date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="开始时间">
              </el-date-picker>
              <span class="span-line"> 至 </span>
              <el-date-picker
                v-model="infoData.end_date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="结束时间">
              </el-date-picker>
            </div>
          </div>
          <div class="mb20 redact-item"></div>
          <div class="mb20 redact-item">
            <div class="item-label">职位名称</div>
            <div class="item-content" @click="clickInvolved">
              <el-input v-model="infoData.position" autocomplete="on" spellcheck="false" placeholder="请选择" readonly="readonly"></el-input>
              <img src="../../../../assets/image/Frame_8.png" alt="" />
            </div>
          </div>

          <div class="mb20 redact-item redact-item1">
            <div class="item-label">职责业绩</div>
            <div class="item-content">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="infoData.responsibility_performance">
              </el-input>
            </div>
          </div>

          <div class="form-btns">
            <el-button @click="clickInfoCancelBtn">取消</el-button>
            <el-button type="primary" @click="clickInfoVerifyBtn">确定</el-button>
          </div>

        </div>

      </div>
      <!-- 编辑状态模块 结束 -->


    </div>

    <!-- 职位弹窗 -->
    <industryList :data="position" ref="industryList" @clickSearchItem="clickSearchItem"/>
  </div>

</template>

<script>
import industryList from "./industryList.vue";

export default {
  components: {
    industryList
  },
  props:{
    data:{
      // 数组/对象的默认值应当由一个工厂函数返回
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return{
      infoData: {
        company_name: '', // 公司名称
        industry_involved: '互联网', // 所属行业
        begin_date: '', // 开始时间
        end_date: '', // 结束时间
        position: '', // 职位
        responsibility_performance: '' // 职责业绩
      },
      is_creat: false,
      list_id: '', // 选中的列表id
      position:{
        industryList: [], // 获取行业职位信息
        category_list: [], // 点击行业匹配到对应的岗位数组
      },
      selt_item: 0,
      industry:{ // 行业信息
        industryList:[]
      },
    }
  },
  mounted(){
    // 点击所属行业项
    this.getIndustryList();
    // 获取职位列表信息
    this.getPositionList();
  },
  computed: {
    
  },
  methods: {

    clickCreat(){
      this.is_creat = true;
    },
    // 点击新建取消按钮
    clickInfoCancelBtn(){
      this.is_creat = false;
      this.list_id = '';
    },
    // 点击创建、编辑确认按钮
    clickInfoVerifyBtn(){
      const p = Object.assign({},this.infoData);
      if(p.company_name == ''){
        this.$message.warning('公司名称不能为空!');
        return
      }
      if(p.industry_involved == ''){
        this.$message.warning('所属行业不能为空!');
        return
      }
      if(p.begin_date == ''){
        this.$message.warning('开始时间不能为空!');
        return
      }
      if(p.end_date == ''){
        this.$message.warning('结束时间不能为空!');
        return
      }
      if(p.position == ''){
        this.$message.warning('职位不能为空!');
        return
      }
      if(p.responsibility_performance == ''){
        this.$message.warning('职责业绩不能为空!');
        return
      }
      const subCallback= ()=>{
        setTimeout(() => {
          this.is_creat = false;
          this.list_id = '';
          this.$emit('refreshInfo');
        }, 1000);
      }
      let api = '';
      let text = '';
      if(this.list_id){
        p.id = this.list_id;
        // 编辑修改
        api = '/api/work-experience/update';
        text = '修改成功'
      }else{
        // 创建项目
        api = '/api/work-experience/create';
        text = '创建成功'
      }
      this.createWorkExperience(p,api,text,subCallback);
    },
    // 创建工作经历
    createWorkExperience(data,api,text,f){
      let that = this;
      let p = Object.assign({},data);
      that.$axios.post(api,p).then( res =>{
        if(res.code == 0){
          that.$message.success( text );
          return f()
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    //点击删除
    clickDelete(id,idx){
      let that = this;
      let data = that.data;
      that.$axios.post('/api/work-experience/delete',{
        id,
      }).then( res =>{
        if(res.code == 0){
          that.$message.success( '删除成功！' );
          data.splice(idx);
          that.data = data;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 点击列表编辑
    clickUpdate(e){
      const infoData = this.infoData;
      const obj= Object.assign({},e);
      this.list_id = obj.id;
      for(var key in infoData){
        infoData[key] = obj[key]
      }
      this.infoData = infoData;
      this.is_creat = true;
    },
    // 点击选择职位
    clickInvolved(){
      // this.getPositionList();
      this.$refs.industryList._data.dialogVisible = true;
    },
    // 点击职位弹窗关闭按钮
    clickClose(){
      this.dialogVisible = false;
    },
    //接收组件方法
    clickSearchItem(e){
      console.log(e)
      this.infoData.position = e.name;
    },
    // 获取行业列表信息
    getIndustryList(){
      let that = this;
      that.$axios.post('/api/industry/list',{}).then( res =>{
        that.industry.industryList = res.data;
      }).catch( e=>{
        console.log(e)
      })
    },
    // 获取职位列表信息
    getPositionList(){
      let that = this;
      var loadingInstance = this.$Loading.service({
        lock: false,
        customClass: 'z-index999',
        text: '加载中，请稍后...',
        spinner: 'ui-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      that.$axios.post('/api/position/list',{}).then( res =>{
        loadingInstance.close();
        that.position.industryList = res.data;
        that.position.category_list = that.position.industryList[that.selt_item].category_list;

      }).catch( e=>{
        loadingInstance.close();
        console.log(e)
      })
    },

    // 高亮方法text 要查找的对象，keyword 高亮关键字
    highLighWorld(text, keyword){
      const _reg = new RegExp(keyword,'g');
      const newText = text.replace(_reg,`<span style="color: red;">${keyword}</span>`);
      return newText
    }
    
  },
};
</script>

<style lang="scss" scoped>
  @import '../../../../styles/myResume.scss';

</style>
