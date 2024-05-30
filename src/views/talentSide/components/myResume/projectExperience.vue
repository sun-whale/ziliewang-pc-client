<template>
  <div class="container">
    <div class="projectExperience-box myResume-plate">
      <div class="myResume-plate-title-box">
        <span class="info-t" :class="data.length<= 0 ?'hover':''">项目经历</span>
        <img src="../../../../assets/image/Frame_7.png" alt="" class="info-icon-img" @click="clickCreat"/>
      </div>
      <div class="myResume-plate-list" v-if="!is_creat">
        <ul class="plate-list-ul">
          <li v-for="(item,index) in data" :key="index">
            <div class="li-title-box">
              <div class="li-name">
                <span class="li-name-1">{{ item.project_name }}</span>
                <span class="li-name-2">{{ item.begin_date}} - {{ item.end_date }}</span>
              </div>
              <div class="info-set">
                <span @click="clickDelete">删除</span>
                <span>/</span>
                <span @click="clickUpdate">编辑</span>
              </div>
            </div>
            <div class="items-sub-box">{{ item.company_name }} · {{ item.position }}</div>
            <div class="items-text-box">
              {{ item.job_content }}
            </div>
          </li>
        </ul>

      </div>
      <!-- 编辑状态模块 开始 -->
      <div class="redact-title-bottom" v-if="is_creat">
        <div class="redact-title-box">
          <span class="info-t">添加项目经历</span>
        </div>
        <div class="redact-item-box">

          <div class="mb20 redact-item">
            <div class="item-label">项目名称</div>
            <div class="item-content">
              <el-input v-model="infoData.project_name" placeholder="例如: 自猎网"></el-input>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">公司名称</div>
            <div class="item-content">
              <el-input v-model="infoData.company_name" placeholder="公司名称"></el-input>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">项目角色</div>
            <div class="item-content">
              <el-input v-model="infoData.position" placeholder="例如: UI 设计师"></el-input>
            </div>
          </div>

          <!-- <div class="mb20 redact-item">
            <div class="item-label">项目链接 (选填)</div>
            <div class="item-content">
              <el-input v-model="infoData.desired_industry" placeholder="例如: github.com/erik"></el-input>
            </div>
          </div> -->

          <div class="mb20 redact-item">
            <div class="item-label">项目开始时间</div>
            <div class="item-content">
              <el-date-picker
                v-model="infoData.begin_date"
                type="month"
                format="yyyy-MM"
                value-format="yyyy-MM"
                placeholder="开始时间">
              </el-date-picker>
              <span class="span-line"> 至 </span>
              <el-date-picker
                v-model="infoData.end_date"
                type="month"
                format="yyyy-MM"
                value-format="yyyy-MM"
                placeholder="结束时间">
              </el-date-picker>
            </div>
          </div>
          <div class="mb20 redact-item redact-item1">
            <div class="item-label">负责工作</div>
            <div class="item-content">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入负责工作内容"
                v-model="infoData.job_content">
              </el-input>
            </div>
          </div>

          <div class="mb20 redact-item redact-item1">
            <div class="item-label">项目描述</div>
            <div class="item-content">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="infoData.project_desc">
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
  </div>

</template>

<script>
export default {
  components: {
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
        project_name: '', // 项目名称
        company_name: '', // 公司名称
        begin_date: '', //开始时间
        end_date: '', // 结束时间
        position: '', //职位
        job_content: '', // 负责工作
        project_desc: '', // 项目描述
      },
      is_creat: false,
      list_id: '', // 选中的列表id

    }
  },
  mounted(){
  
  },
  computed: {
    
  },
  methods: {
   
    // clickRedactBtn(){
    //   this.infoData = JSON.parse(JSON.stringify(this.data));
    // }, 
    clickCreat(){
      this.is_creat = true
    },
    // 点击新建取消按钮
    clickInfoCancelBtn(){
      this.is_creat = false;
      this.list_id = '';

    },
    // 点击创建、编辑确认按钮
    clickInfoVerifyBtn(){
      const p = Object.assign({},this.infoData);
      if(p.project_name == ''){
        this.$message.warning('项目名称不能为空!');
        return
      }
      if(p.company_name == ''){
        this.$message.warning('公司名称不能为空!');
        return
      }
      if(p.position == ''){
        this.$message.warning('职位不能为空!');
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
        api = '/api/project-experience/update';
        text = '修改成功'
      }else{
        // 创建项目
        api = '/api/project-experience/create';
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
      that.$axios.post('/api/project-experience/delete',{
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

  },
};
</script>

<style lang="scss" scoped>
  @import '../../../../styles/myResume.scss';
</style>
