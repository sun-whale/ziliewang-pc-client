<template>
  <div class="container">
    <div class="jobExpectation-box myResume-plate">
      <div class="myResume-plate-title-box">
        <span class="info-t" :class="data.length<= 0 ?'hover':''">求职期望</span>
        <img src="../../../../assets/image/Frame_7.png" alt="" class="info-icon-img" v-if="!is_creat" @click="clickCreat"/>
      </div>
      
      <div class="myResume-plate-list" v-if="!is_creat">
        <ul class="plate-list-ul">
          <li v-for="(item,index) in data" :key="index">
            <div class="li-title-box">
              <div class="li-name">
                <span class="li-name-1">{{ item.desired_position }}/{{ item.job_preference }}</span>
                <span class="li-name-3">
                  <span>{{ item.expected_salary }}</span>
                  <span>|</span>
                  <span>{{ item.desired_location }}</span>
                  <span>|</span>
                  <span>{{ item.desired_industry }}</span>
                </span>
              </div>
              <div class="info-set">
                <span @click="clickDelete(item.id,index)">删除</span>
                <span>/</span>
                <span @click="clickUpdate(item)">编辑</span>
              </div>
            </div>

          </li>
        </ul>

      </div>

      <!-- 编辑状态模块 开始 -->
      <div class="redact-title-bottom" v-if="is_creat">
        <div class="redact-title-box">
          <span class="info-t">添加求职期望</span>
        </div>

        <div class="redact-item-box">

          <div class="mb20 redact-item">
            <div class="item-label">期待职位</div>
            <div class="item-content" @click="clickInvolved">
              <el-input v-model="infoData.desired_position" autocomplete="on" spellcheck="false" placeholder="请选择" readonly="readonly"></el-input>
              <img src="../../../../assets/image/Frame_8.png" alt="" />
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">期望地点</div>
            <div class="item-content">
              <!-- <el-input v-model="infoData.desired_location" autocomplete="on" spellcheck="false" placeholder="请选择" readonly="readonly"></el-input>
              <img src="../../../../assets/image/Frame_8.png" alt="" /> -->
              <el-cascader
                :options="options"
                ref="cascaderAddr" 
                v-model="selectedOptions"
                :props="{ value: 'label' }"
                :show-all-levels="false"
                @change="handleChange">
              </el-cascader>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">期望行业</div>
            <div class="item-content">
              <!-- <el-input v-model="infoData.desired_industry" autocomplete="on" spellcheck="false" placeholder="请选择" readonly="readonly"></el-input>
              <img src="../../../../assets/image/Frame_8.png" alt="" /> -->
              <el-select v-model="infoData.desired_industry" placeholder="请选择">
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
            <div class="item-label">期望月薪</div>
            <div class="item-content">
              <el-select v-model="expected_salary_st" placeholder="最低月薪" @change="expected_salary_st_change">
                <el-option
                  v-for="item in option_salary_st"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <span class="span-line"> - </span>
              <el-select v-model="expected_salary_end" placeholder="最高月薪">
                <el-option
                  v-for="item in option_salary_end"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">职位偏好</div>
            <div class="item-content">
              <el-input v-model="infoData.job_preference" placeholder="职位偏好"></el-input>
              <!-- <el-input v-model="infoData.job_preference" autocomplete="on" spellcheck="false" placeholder="请选择" readonly="readonly"></el-input>
              <img src="../../../../assets/image/Frame_8.png" alt="" /> -->
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
let pcas = require('../../../../assets/json/pc-code.json');
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
        desired_position: '', // 期待职位
        desired_location:'', // 期望地点
        desired_industry: '', // 期望行业
        expected_salary: '', // 期望月薪
        job_preference: '', // 职位偏好
      },
      is_creat: false,
      dialogVisible: false,
      dialogVisible_seach:'',
      list_id: '', // 选中的列表id
      position:{
        industryList: [], // 获取行业职位信息
        category_list: [], // 点击行业匹配到对应的岗位数组
      },
      industry:{ // 行业信息
        industryList:[]
      },
      selt_item: 0,
      option_salary_st: ['1K','2K','3K','4K','5k','6K','7K','8K','9K','10k','11K','12K','13K','14K','15k','16K','17K','18K','19K','20K','30K','50K','100K','150K','200K'],
      option_salary_end: [],
      options: [],
      expected_salary_st:'',
      expected_salary_end:'',
      selectedOptions: [],
    }
  },
  created(){
    let options = JSON.parse(JSON.stringify(pcas));
    options.splice(0,1);
    this.options =options;
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
     // 获取省市区地址级联
     handleChange(thsAreaCode) {
      // console.log(thsAreaCode) // 注意3： 最终结果是个一维数组对象
      // thsAreaCode = this.$refs['cascaderAddr'].getCheckedNodes()[0].pathLabels// 注意2： 获取label值
      this.infoData.desired_location = thsAreaCode[1];
    },
    //接收组件方法
    clickSearchItem(e){
      console.log(e)
      this.infoData.desired_position = e.name;
    },
    clickCreat(){
      this.infoData = {
        desired_position: '', // 期待职位
        desired_location:'', // 期望地点
        desired_industry: '', // 期望行业
        expected_salary: '', // 期望月薪
        job_preference: '', // 职位偏好
      },
      this.dialogVisible_seach = '';
      this.expected_salary_st = '';
      this.expected_salary_end = '';
      this.selectedOptions = [];
      this.is_creat = true;
    },
    // 点击新建取消按钮
    clickInfoCancelBtn(){
      this.is_creat = false;
      this.list_id = '';
    },
    // 点击创建、编辑确认按钮
    clickInfoVerifyBtn(){
      let infoData = this.infoData;
      infoData.expected_salary = this.expected_salary_st+'-'+this.expected_salary_end;
      const p = Object.assign({},this.infoData);
      console.log(p)
      if(p.desired_position == ''){
        this.$message.warning('期待职位不能为空!');
        return
      }
      if(p.desired_location == ''){
        this.$message.warning('期望地点不能为空!');
        return
      }
      if(p.desired_industry == ''){
        this.$message.warning('期望行业不能为空!');
        return
      }
      if(p.expected_salary == ''){
        this.$message.warning('期望月薪不能为空!');
        return
      }
      if(p.job_preference == ''){
        this.$message.warning('职位不能为空!');
        return
      }
      if(p.responsibility_performance == ''){
        this.$message.warning('职位偏好不能为空!');
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
        api = '/api/job-expectation/update';
        text = '修改成功'
      }else{
        // 创建项目
        api = '/api/job-expectation/create';
        text = '创建成功'
      }
      this.createWorkExperience(p,api,text,subCallback);
    },
    // 创建
    createWorkExperience(data,api,text,f){
      let that = this;
      let p = Object.assign({},data);
      that.$axios.post(api,p).then( res =>{
        if(res.code == 0){
          that.$message.success( text );
          that.infoData = {
            desired_position: '', // 期待职位
            desired_location:'', // 期望地点
            desired_industry: '', // 期望行业
            expected_salary: '', // 期望月薪
            job_preference: '', // 职位偏好
          },
          that.dialogVisible_seach = '';
          that.expected_salary_st = '';
          that.expected_salary_end = '';
          that.selectedOptions = [];
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
      that.$axios.post('/api/job-expectation/delete',{
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
      let e_arr = infoData.expected_salary.split('-');
      this.expected_salary_st = e_arr[0];
      this.expected_salary_end = e_arr[1];
      this.infoData = infoData;
      console.log(this.infoData )
      let desired_location = this.infoData.desired_location;
      let selectedOptions = this.selectedOptions;
      selectedOptions.push(desired_location)
      this.selectedOptions = selectedOptions;
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
    expected_salary_st_change(){
      let expected_salary_st = this.expected_salary_st;
      this.expected_salary_end = '';
      let option_salary_end = JSON.parse(JSON.stringify(this.option_salary_st));
      let index = option_salary_end.indexOf(expected_salary_st);
      let arr = option_salary_end.splice(index+1,option_salary_end.length+ 1);
      arr.push('300K');
      this.option_salary_end = arr;
    }
  },
};
</script>

<style lang="scss" scoped>
  @import '../../../../styles/myResume.scss';
</style>
