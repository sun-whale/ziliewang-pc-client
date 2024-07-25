<template>
  <div>
    <!-- 搜索框模块 开始 -->
    <div class="search-box">
      <div class="search-left-box" @click="clickCityOther">
        <span style="flex: 1;text-align: center;">{{ city == '全国'?'全国': selectCityList[0] }} <span class="span-icon" v-if=" selectCityList.length>0">+{{ selectCityList.length }}</span></span>
        <i class="el-icon-caret-right"></i>
      </div>
      <el-input placeholder="搜索职位/公司/内容关键词" v-model="input_name" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
        <el-button slot="append" @click="getSearchinfo">搜索</el-button>
      </el-input>
    </div>
    <div class="hotJob-box">
      <span class="hotJob-span">热门岗位</span>
      <div class="hotJob-item-box">
        <a href="javascript:0;" class="hotJob-item" v-for="(item,index) in hotJob_options" :key="index" @click="clickTagname(item.position_name)">{{item.position_name}}</a>
      </div>
    </div>

    <!-- 搜索框模块 j结束 -->
    <div class="filter-options-container">
      <div class="filter-options-row-section">
        <div class="options-row">
          <div class="row-title">城市</div>
          <ul class="row-options-detail-box">
            <li class="options-item" :class="city == '全国'? 'selected':''" data-code="410" data-name="全国" @click="clickCity('全国')">全国</li>
            <li class="options-item" :class="selectCityList.indexOf(item.label) != -1? 'selected':''" :data-code="item.code" :data-name="item.label" @click="clickCity(item.label)" v-for="(item,index) in showCityList" :key="index">{{ item.label }}</li>
            <li class="options-item" id="filter-option-other-city"><span @click="clickCityOther">其他</span><div class="antd-lp-city"></div></li>
          </ul>
        </div>
        <!-- <div class="options-row">
          <div class="row-title">区域</div>
          <ul class="row-options-detail-box">
            <li class="options-item" v-for="(item,index) in areaList" :key="index">和平区</li>
          </ul>
        </div> -->
        <div class="options-row">
          <div class="row-title">薪资</div>
          <ul class="row-options-detail-box">
            <li class="options-item" :class="pay.value == '3K以下'? 'selected':''" @click="clickPay('3K以下','0-3')">3K以下</li>
            <li class="options-item" :class="pay.value == '5K-10k'? 'selected':''" @click="clickPay('5K-10k','5-10')">5K-10k</li>
            <li class="options-item" :class="pay.value == '10K-20k'? 'selected':''" @click="clickPay('10K-20k','10-20')">10K-20k</li>
            <li class="options-item" :class="pay.value == '20K-40k'? 'selected':''" @click="clickPay('20K-40k','20-40')">20K-40k</li>
            <li class="options-item" :class="pay.value == '40K-60k'? 'selected':''" @click="clickPay('40K-60k','40-60')">40K-60k</li>
            <li class="options-item" :class="pay.value == '60k以上'? 'selected':''" @click="clickPay('60k以上','60-0')">60k以上</li>
            <!-- <div class="jsx-1824882820 search-job-custom-salary-box">
              <span class="jsx-1824882820 salary-name">自定义</span>
            </div> -->
          </ul>
        </div>
        <div class="options-row">
          <div class="row-title">发布时间</div>
          <ul class="row-options-detail-box">
            <li class="options-item" :class="release_time.value == ''? 'selected':''" @click="clickrelease_time('')">不限</li>
            <li class="options-item" :class="release_time.value == '一天以内'? 'selected':''" @click="clickrelease_time('一天以内','1day')">一天以内</li>
            <li class="options-item" :class="release_time.value == '三天以内'? 'selected':''" @click="clickrelease_time('三天以内','3day')">三天以内</li>
            <li class="options-item" :class="release_time.value == '一周以内'? 'selected':''" @click="clickrelease_time('一周以内','1week')">一周以内</li>
            <li class="options-item" :class="release_time.value == '一个月以内'? 'selected':''" @click="clickrelease_time('一个月以内','1month')">一个月以内</li>
          </ul>
        </div>
        <div class="options-row">
          <div class="row-title">经验</div>
          <ul class="row-options-detail-box">
            <li class="options-item" :class="exp.value == ''? 'selected':''" @click="clickexp('',0)">不限</li>
            <li class="options-item" :class="exp.value == '应届生'? 'selected':''" @click="clickexp('应届生',3)">应届生</li>
            <li class="options-item" :class="exp.value == '实习生'? 'selected':''" @click="clickexp('实习生',2)">实习生</li>
            <li class="options-item" :class="exp.value == '1年以内'? 'selected':''" @click="clickexp('1年以内','0-1')">1年以内</li>
            <li class="options-item" :class="exp.value == '1-3年'? 'selected':''" @click="clickexp('1-3年','1-3')">1-3年</li>
            <li class="options-item" :class="exp.value == '3-5年'? 'selected':''" @click="clickexp('3-5年','3-5')">3-5年</li>
            <li class="options-item" :class="exp.value == '5-10年'? 'selected':''" @click="clickexp('5-10年','5-10')">5-10年</li>
            <li class="options-item" :class="exp.value == '10-15年'? 'selected':''" @click="clickexp('10-15年','10-15')">10-15年</li>
            <li class="options-item" :class="exp.value == '15年以上'? 'selected':''" @click="clickexp('15年以上','15-100')">15年以上</li>
          </ul>
        </div>
      </div>
      <div class="options-row">
        <div class="row-title">年龄</div>
        <div style="width: 90%;">
          <el-slider
            v-model="ageVal"
            range
            show-stops
            :marks="ageList"
            :min="18"
            @change="age_scale_change"
            :max="60">
          </el-slider>
        </div>
      </div>
      <div class="filter-options-selector-section">
        <div class="options-row">
          <div class="row-title">更多</div>
          <div class="row-options-detail-box">
            <div id="filter-options-selector-bar">
              <div class="jsx-2644757290 filter-option-selector-bar-container">
                <div class="jsx-2644757290 select-box">
                  <el-select v-model="educational_experience.value" placeholder="学历" @change="educational_experience_change">
                    <el-option
                      v-for="item in educational_experienceList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div class="jsx-2644757290 select-box">
                  <el-select v-model="company_scale.value" placeholder="企业规模" @change="company_scale_change">
                    <el-option
                      v-for="item in company_scaleList"
                      :key="item"
                      :label="`${item}人`"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div class="jsx-2644757290 select-box">
                  <el-select v-model="corporate_finance.value" placeholder="融资阶段" @change="corporate_finance_change">
                    <el-option
                      v-for="item in corporate_financeList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div class="jsx-2644757290 select-box">
                  <el-select v-model="business_nature.value" placeholder="企业性质" @change="business_nature_change">
                    <el-option
                      v-for="item in firm_natureList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div class="jsx-2644757290 select-box">
                  <el-select v-model="industry_requirement.value" placeholder="行业" @change="industry_scale_change">
                    <el-option
                      v-for="item in industryList"
                      :key="item.id"
                      :label="item.industry"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="jsx-2644757290 select-box">
                  <el-select v-model="position_type.value" placeholder="职位" @change="company_scale_change">
                    <el-option
                      v-for="item in industryCategory"
                      :key="item.id"
                      :label="item.category_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <!-- <div class="jsx-2644757290 select-box">
                  <el-select v-model="age.value" placeholder="年龄">
                    <el-option
                      v-for="(item,index) in ageList"
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div> -->
                <div class="jsx-2644757290 select-box">
                  <el-select v-model="gender.value" placeholder="性别"  @change="set_scale_change">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
                  <el-option label="不限" value="3"></el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="selected-options-box" v-if=" selectCityList.length>0 || city == '全国' || pay.value || release_time.value || exp.value || educational_experience.value || company_scale.value || corporate_finance.value || business_nature.value">
        <div class="selected-options-title">已选条件：</div>
        <ul class="selected-options-list-box">
          <template v-for="(item,index) in selectCityList">
            <li class="selected-item" :key="index">
              <span class="anticon anticon-close">{{ item }}</span>
              <i class="el-icon-close" @click="clickselectCityList(index)"></i>
            </li>
          </template>
          <li class="selected-item" v-if=" city == '全国' ">
            <span class="anticon anticon-close">全国</span>
            <!-- <i class="el-icon-close" @click="clickAnticon(-1)"></i> -->
          </li>
          <li class="selected-item" v-if="pay.value">
            <span class="anticon anticon-close">{{ pay.value }}</span>
            <i class="el-icon-close" @click="clickAnticon('pay')"></i>
          </li>
          <li class="selected-item" v-if="release_time.value">
            <span class="anticon anticon-close">{{ release_time.value }}</span>
            <i class="el-icon-close" @click="clickAnticon('release_time')"></i>
          </li>
          <li class="selected-item" v-if="exp.value">
            <span class="anticon anticon-close">{{ exp.value }}</span>
            <i class="el-icon-close" @click="clickAnticon('exp')"></i>
          </li>
          <li class="selected-item" v-if="educational_experience.value">
            <span class="anticon anticon-close">{{ educational_experience.value }}</span>
            <i class="el-icon-close" @click="clickAnticon('educational_experience')"></i>
          </li>
          <li class="selected-item" v-if="company_scale.value">
            <span class="anticon anticon-close">{{ company_scale.value }}人</span>
            <i class="el-icon-close" @click="clickAnticon('company_scale')"></i>
          </li>
          <li class="selected-item" v-if="corporate_finance.value">
            <span class="anticon anticon-close">{{ corporate_finance.value }}</span>
            <i class="el-icon-close" @click="clickAnticon('corporate_finance')"></i>
          </li>
          <li class="selected-item" v-if="business_nature.value">
            <span class="anticon anticon-close">{{ business_nature.value }}</span>
            <i class="el-icon-close" @click="clickAnticon('business_nature')"></i>
          </li>
            
        </ul>
        <div class="selected-clear" ref="search-jobs-clear-options" id="search-jobs-clear-options" @click="clickALLAnticon">清空筛选条件</div>
      </div>

      <!-- 选择城市弹窗 -->
      <div class="dialogVisible-pop-box" v-if="dialogVisible && position.length >=0 ">
        <div class="mask-box"></div>
        <div class="dialog-container">
          <div class="dialog-header">
            <h3 class="title">请选择城市</h3>
            <div class="dialog-header-input">
              <!-- <el-input type="text" v-model="dialogVisible_seach"></el-input> -->
            </div>
            <img src="../../../assets/image/icon-close.png" alt="" @click="clickClose"/>
          </div>
          <div class="dialog-body">
            <div class="body-left-box">
              <div class="left-list-box">
                <ul>
                  <li :class="selt_item == index? 'active':'' " v-for="(item,index) in position" :key="index" @click="click_industryListLi(item,index)">{{ item.label }}</li>
                </ul>
              </div>
            </div>
            <div class="body-right-box">
              <div class="right-list-box">
                <div class="category-list-items">
                  <ul>
                    <li :class="selectCityList.indexOf(items.label) != -1 ? 'active':'' " v-for="(items,idx) in position_list" :key="idx" @click="click_position_list(items,idx)">{{ items.label }}</li>
                  </ul>
                </div>
                
              </div>
              
            </div>
          </div>
          
        </div>
      </div>

    </div>
  </div>

</template>
<script>
import pcas from '../../../assets/json/pc-code.json'
export default {
  name:'filterOptionsContainer',
   components: {

  },
  data(){
    return {
      input_name:'', // 搜索框value
      hotJob_options: [],
      dialogVisible: false,
      position: pcas,
      industryList: [],
      industryCategory: [],
      ageList:{
        '18': '18',
        '19': '19',
        '20': '20',
        '21': '21',
        '22': '22',
        '23': '23',
        '24': '24',
        '25': '25',
        '26': '26',
        '27': '27',
        '28': '28',
        '29': '29',
        '30': '30',
        '31': '31',
        '32': '32',
        '33': '33',
        '34': '34',
        '35': '35',
        '36': '36',
        '37': '37',
        '38': '38',
        '39': '39',
        '40': '40',
        '41': '41',
        '42': '42',
        '43': '43',
        '44': '44',
        '45': '45',
        '46': '46',
        '47': '47',
        '48': '48',
        '49': '49',
        '50': '50',
        '51': '51',
        '52': '52',
        '53': '53',
        '54': '54',
        '55': '55',
        '56': '56',
        '57': '57',
        '58': '58',
        '59': '59',
        '60': '60'
      },
      ageVal: [18,60],
      position: [],
      showCityList:[
        {label:'北京',code:'010'},
        {label:'上海',code:'020'},
        {label:'天津',code:'030'},
        {label:'重庆',code:'040'},
        {label:'广州',code:'050020'},
        {label:'深圳',code:'050090'},
        {label:'苏州',code:'060080'},
        {label:'南京',code:'060020'},
        {label:'杭州',code:'070020'},
        {label:'大连',code:'210040'},
        {label:'成都',code:'280020'},
        {label:'武汉',code:'170020'},
        {label:'西安',code:'270020'},
      ],
      selectCityList: [], // 选中的城市
      selt_item: 0,
      selt_listItems: -1,
      position_list:[], // 省会列表
      city: '全国',
      work_times_type: 1, //工作时长类型 1.正常 2.实习生 3.应届生
      work_times: '', // 工作时长
      createtime:'', // 发布时间
      salary: '', // 薪资范围
      pay:{value:''},
      release_time:{value:''},
      exp:{value:''},
      educational_experience:{value:''}, // 学历
      company_scale:{value:''}, // 企业规模
      corporate_finance:{value:''},// 融资阶段
      business_nature:{value:''}, // 企业性质
      industry_requirement:{value:''}, // 行业
      position_type:{value:''}, // 职位
      age:{value:''}, // 年龄
      gender:{value:''}, // 性别
      areaList:[],
      educational_experienceList:['博士','硕士','研究生','本科','大专','中专/中技','高中','初中及以下'],
      company_scaleList:['0-20','20-50','50-99','100-599','600-1999','2000人以上',],
      corporate_financeList: ['天使轮','A轮','B轮','C轮','已上市','未上市'], // 融资阶段
      firm_natureList: ['有限责任','股份制','国有企业','合伙企业','个体工商户','私营企业','合资企业','外资企业','独资企业','政府机关/非盈利机构','事业单位'],
    }
  },
  async created(){
    let position = JSON.parse(JSON.stringify(pcas));
    position.splice(0,1);
    this.position =position;
    this.position_list = position[this.selt_item].children;
    this.gethotJobList();
     let res = await this.$axios.post('/api/user/at/city',{});
     if(res.code == 0){
     let ipCity = res.data.current_city || '北京';
      this.clickCity(ipCity)
     }
     this.getPositionList();
  },
  methods:{
    
    // 获取职位列表信息
    getPositionList() {
      const that = this;
      that.$axios
        .post("/api/position/list", {})
        .then((res) => {
          that.industryList = res.data;
          console.log(that.industryList);
        })
        .catch((e) => {
          console.log(e);
        });
    },


    gethotJobList(){
      let that = this;
      that.$axios.post('/api/company-position/hot',{}).then( res =>{
        if(res.code == 0){
          that.hotJob_options = res.data;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 回车键点击
    searchEnterFun(e){
      var keyCode = window.event?e.keyCode:e.which;
      if(keyCode == 13){
        this.getSearchinfo();
      }
    },
    clickTagname(n){
      this.input_name = n;
      this.getSearchinfo();
    },
    getSearchinfo(){
      this.getfilterInfo();
    },
    // 点击城市其他
    clickCityOther(){
      this.dialogVisible = true;
    },
    // 点击左侧省项
    click_industryListLi(ele,index){
      let position = this.position;
      this.position_list = ele.children;
      this.selt_item = index;
    },
    // 点击城市
    click_position_list(item,index){
      let selectCityList = this.selectCityList;
      if( selectCityList.length >=5 ){
        this.$message.error('最多可选择五个城市！');
        return
      }
      this.selt_cityName = item.label;
      this.selt_listItems = index;
      if(selectCityList.indexOf('全国') != -1 ){
        selectCityList = []
        // this.city = '';
        selectCityList.push(item.label)
      }else{
        if( selectCityList.indexOf(item.label) == -1){
          selectCityList.push(item.label)
        }
       
      }
      this.selectCityList = selectCityList;
      this.city = selectCityList.join(',')
      this.getfilterInfo();

      // let showCityList = this.showCityList;
      // showCityList.forEach( ele =>{
      //   if(ele.code == item.code){
      //     this.showCityList[4] = item;
      //   }
      // })
    },
    clickClose(){
      this.dialogVisible = false;
    },
    clickCity(n){
      console.log(n)
      let selectCityList = this.selectCityList;
      if(n == '全国'){
        selectCityList = [];
        this.city = n;
      }else{
        if( selectCityList.length >=5 ){
          this.$message.error('最多可选择五个城市！');
          return
        }
        if( selectCityList.indexOf(n) == -1){
          selectCityList.push(n)
        }
        this.city = selectCityList.join(',')
      }
      this.selectCityList = selectCityList;
      this.getfilterInfo();
      
    },
    clickPay(n,value){
      this.pay.value = n;
      this.salary = value;
      this.getfilterInfo();

    },
    clickrelease_time(n,v){
      this.release_time.value = n;
      this.createtime = v;
      this.getfilterInfo();

    },
    clickexp(n,value){
      if(value == 2 || value == 3){
        this.work_times_type = value;
        this.work_times = '';
      }else{
        this.work_times_type = 1;
        this.work_times = value;
      }
      this.exp.value = n;
      this.getfilterInfo();
     
    },
    // 点击已选项 删除
    clickAnticon(v){
      if(v == -1){
        this.city = '';
        this.getfilterInfo();

      }else{
        if(v =='pay'){
          this.salary = '';
        }
        if(v =='release_time'){
          this.createtime = '';
        }
        if(v =='exp'){
          this.work_times_type = 1;
          this.work_times = '';
        }
        this[v].value = '';
        this.getfilterInfo();
      }
      
    },
    // 点击选择的城市删除
    clickselectCityList(v){
      let selectCityList = this.selectCityList;
      selectCityList.splice(v,1);
      this.selectCityList = selectCityList;
      if(selectCityList.length <= 0){
        this.city = '全国'
      }else{
        this.city = this.selectCityList.join(',');
      }
      this.getfilterInfo();
    },
    // 点击清空筛选条件
    clickALLAnticon(){
      this.selectCityList = [],
      this.city= '全国';
      this.work_times_type= 1;
      this.work_times='';
      this.createtime='';
      this.salary=''; // 薪资范围
      this.pay = {value:''};
      this.release_time={value:''};
      this.exp={value:''};
      this.educational_experience={value:''}; // 学历
      this.company_scale={value:''}; // 企业规模
      this.corporate_finance={value:''};// 融资阶段
      this.business_nature={value:''}; // 企业性质
      this.industryCategory = [];
      this.industry_requirement = {value:''}; // 行业
      this.position_type = {value:''}; // 职位
      this.age = {value:''}; // 年龄
      this.gender = {value:''}; // 性别
      this.getfilterInfo();
    },
    educational_experience_change(){
      this.getfilterInfo();
    },
    company_scale_change(){
      this.getfilterInfo();
    },
    set_scale_change(){
      this.getfilterInfo();
    },
    age_scale_change(){
      this.age.value = this.ageVal[0] + '-' + this.ageVal[1];
      this.getfilterInfo();
    },
    industry_requirement_change(){
      this.getfilterInfo();
    },
    position_type_change(){
      this.getfilterInfo();
    },
    gender_change(){
      this.getfilterInfo();
    },
    salary_change(){
      this.getfilterInfo();
      this.getfilterInfo();
    },
    industry_scale_change(row){
      let index = row -1;
      this.industryCategory = this.industryList[index].category_list;
    },
    corporate_finance_change(){
      this.getfilterInfo();
    },
    business_nature_change(){
      this.getfilterInfo();
    },
    getfilterInfo(){
      let info = {
        input_name:this.input_name,
        info:{
          work_address: this.city,
          salary: this.salary,
          work_times: this.work_times,
          createtime: this.createtime,
          work_times_type: this.work_times_type,
          educational_experience: this.educational_experience.value,
          company_scale: this.company_scale.value,
          corporate_finance: this.corporate_finance.value,
          business_nature: this.business_nature.value,
          age:this.age.value,
          sex:this.gender.value,
          industry_requirement:this.industry_requirement.value,
          position_type:this.position_type.value,
        }
        
      };
      console.log(info)
      this.$emit('getfilterInfo',JSON.stringify(info))
    },
  }
}
</script>
<style lang="scss" scoped>
  .filter-options-container{
    padding: 16px;
    background: #fff;
    box-shadow: 0 1px 8px 0 rgba(234,232,232,.06);
    border-radius: 6px;
    .options-row {
      display: flex;
      align-items: center;
      padding-bottom: 12px;
      margin-bottom: 12px;
      line-height: 20px;
      border-bottom: 1px solid #f0f3f7;
      .row-title {
        flex-shrink: 0;
        width: 84px;
        font-size: 14px;
        font-weight: 700;
        color: #000;
      }
      .row-options-detail-box {
        display: flex;
        flex-wrap: wrap;
        .options-item {
          padding-right: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #666;
          cursor: pointer;
        }
        .options-item.selected,.options-item:hover {
          font-weight: 700;
          color: #FF4D4F;
        }
      }
    }
    .selected-options-box {
      padding-top: 20px;
      display: flex;
    }
    .filter-options-selector-section .options-row {
      margin-bottom: 0;
      padding-bottom: 0;
      border: none;
    }
  }
  .filter-options-container dl, .filter-options-container ol, .filter-options-container p, .filter-options-container ul {
    margin: 0;
  }
  .search-job-custom-salary-box.jsx-1824882820 .salary-name.jsx-1824882820 {
    padding-right: 8px;
    color: rgb(102, 102, 102);
    cursor: pointer;
  }
  .search-job-custom-salary-box.jsx-1824882820 span.jsx-1824882820 {
    flex-shrink: 0;
  }
  .search-job-custom-salary-box.jsx-1824882820 .salary-name.on.jsx-1824882820 {
    font-weight: bold;
    color: #FF4D4F;
  }
  .search-job-custom-salary-box.jsx-1824882820 .salary-name.jsx-1824882820:hover {
    color: #FF4D4F;
  }
  .filter-options-container .options-row .row-options-detail-box {
    display: flex;
    flex-wrap: wrap;
  }
  .filter-option-selector-bar-container.jsx-2644757290 {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }
  .filter-option-selector-bar-container.jsx-2644757290 .select-box.jsx-2644757290 {
    padding-right: 10px;
    /deep/ .el-input__inner{
      height: 30px;
      line-height: 30px;
      
    }
    /deep/ .el-input__icon{
      height: 30px;
      line-height: 30px;
    }
    /deep/ .el-range-editor.is-active, /deep/ .el-range-editor.is-active:hover,/deep/ .el-select .el-input__inner:focus,/deep/ .el-select .el-input.is-focus .el-input__inner{
      border-color: $g_color;
    }
    

  }
  .filter-options-container .selected-options-box .selected-options-title {
    flex-shrink: 0;
    padding-right: 4px;
    font-size: 12px;
    line-height: 25px;
    color: #07132b;
  } 
  .selected-options-box .selected-options-list-box {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .selected-options-box .selected-clear {
    flex-shrink: 0;
    padding-right: 16px;
    font-size: 12px;
    line-height: 25px;
    color: #666;
    cursor: pointer;
  }
  .selected-options-box .selected-options-list-box .selected-item {
    display: flex;
    align-items: center;
    margin: 0 12px 10px 0;
    padding: 0 6px;
    line-height: 25px;
    border-radius: 6px;
    background: #FF4D4F;
    color: #fff;
  }
  .selected-options-box .selected-options-list-box .selected-item span {
    font-size: 12px;
  }
  .selected-options-box .selected-options-list-box .selected-item i{
    font-size: 13px;
    color: #fff;
    margin-left: 10px;
    cursor: pointer;
  }
  .anticon {
    cursor: pointer;
  }




  /* 弹窗 */
  .dialogVisible-pop-box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
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
                  text-align: center;
                  line-height: 32px;
                  background: #F7F8FA;
                  border-radius: 4px 4px 4px 4px;
                  font-size: 14px;
                  color: $g_textColor;
                  margin-top: 6px;
                  margin-right: 6px;
                  padding: 0 12px;
                  cursor: pointer;
                  &.active,&:hover{
                    background: #FF4D4F;
                    color: #fff;
                  }
                }
                
              }
            }
          }
        }
      }

    }
  }


  .search-box{
      width: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;
      position: relative;
      .search-left-box{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #000;
        z-index: 1;
        width: 120px;
        padding: 0 10px;
        font-size: 14px;
        cursor: pointer;
        &::after{
          content: '';
          width: 1px;
          height: 45%;
          position: absolute;
          top: 50%;
          right: 4px;
          transform: translateY(-50%);
          background: #DCDFE6;
        }
        .span-icon{
          color: #99b8e0;
        }
      }
      /deep/ .input-with-select {
        width: 100%;
        display: flex;
        align-items: center;
        height: 50px;
        line-height: 50px;
        background: $g_bg;
        border-radius: 6px;
        overflow: hidden;
      }
      /deep/ .el-input-group--append .el-input__inner {
        flex: 1;
        border: 3px solid $g_bg;
        height: 100%;
        line-height: 50px;
        border-radius: 6px;
        padding-left: 130px;
      }
      /deep/ .el-input-group__append{
        width: 140px;
        height: 100%;
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        .el-button {
          width: 100%;
          height: 100%;
          background: $g_bg;
          color: #fff;
          border: 1px solid $g_bg;
          border-radius: 0;
          font-size: 16px;
        }
      }
     
    }
    .hotJob-box{
      width: 100%;
      display: flex;
      margin-top: 10px;
      .hotJob-span{
        width: auto;
        font-size: 14px;
        font-weight: bold;
        color: #1D2129;
        line-height: 22px;
      }
      .hotJob-item-box{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        a{
          padding: 4px 10px;
          border-radius: 4px;
          background: #fff;
          text-align: center;
          font-size: 14px;
          color: $g_color;
          margin-left: 8px;
          margin-bottom: 10px;
        }
      }
    }
</style>