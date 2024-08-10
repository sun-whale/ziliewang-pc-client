<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="bossSide-container">
    <div class="m-box">
      <div class="postJob-box">
        <div class="title">发布Agent职位</div>
        <div class="postJob-form-box">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="160px"
            class="demo-ruleForm"
          >
            <!-- 职位名称 -->
            <el-form-item label="职位名称" prop="position_name">
              <el-input placeholder="请输入职位名称" />
            </el-form-item>
            <!-- 工作性质 -->
            <el-form-item label="工作性质" prop="position_type">
              <el-radio-group>
                <el-radio
                  v-for="(item, index) in workTypeOptions"
                  :key="index"
                  :label="item.value"
                  :value="item.label"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
            <!-- 详细岗位要求 -->
            <el-form-item label="详细岗位要求" prop="position_desc">
              <span class="desc-title"
                >请勿输入邮箱、电话、链接,请不要包含性别歧视语
                请参考职位描述规范</span
              >
              <el-input
                type="textarea"
                :rows="10"
                :placeholder="desc_placeholder"
              />
            </el-form-item>
            <!-- 岗位优势 -->
            <el-form-item label="岗位优势" prop="position_lightspot">
              <span class="desc-title"
                >求职端展示效果，向求职者介绍您的岗位优势，增加独特的吸引力，让您的职位脱颖而出!</span
              >
              <el-input
                type="textarea"
                :rows="3"
                :placeholder="advantage_placeholder"
              ></el-input>
            </el-form-item>
            <!-- 所属行业 -->
            <el-form-item label="所属行业" prop="position_industry">
              <el-select
                style="width: 100%"
                placeholder="请选择您期望候选人来自于哪些行业"
              >
                <el-option
                  :label="item.industry"
                  :value="item.industry"
                  v-for="(item, index) in industry_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 职位类别 -->
            <el-form-item label="职位类别" prop="position_class">
              <el-select style="width: 100%" placeholder="请选择职位类别">
                <el-option
                  :label="item.category_name"
                  :value="item.category_name"
                  v-for="(item, index) in category_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 职位级别 -->
            <el-form-item label="职位级别" prop="position_rank">
              <el-select
                style="width: 100%"
                filterable
                placeholder="请选择职位级别"
              >
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="(item, index) in rank_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 职位偏好 -->
            <el-form-item label="职位偏好" prop="position_job">
              <el-select
                style="width: 100%"
                placeholder="请选择职位偏好，有助于帮您更精准地匹配人才"
              >
                <el-option
                  :label="item.category_name"
                  :value="item.category_name"
                  v-for="(item, index) in position_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 工作职能 -->
            <el-form-item label="工作职能" prop="position_capacity">
              <el-input placeholder="请输入工作职能" />
            </el-form-item>
            <!-- 工作职权 -->
            <el-form-item label="工作职权" prop="position_authority">
              <el-input placeholder="请输入工作职权" />
            </el-form-item>
            <!-- 汇报上级 -->
            <el-form-item label="汇报上级" prop="position_superiors">
              <el-select
                style="width: 100%"
                filterable
                placeholder="请选择汇报上级"
              >
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="(item, index) in superiors_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 下级人数 -->
            <el-form-item label="下级人数" prop="position_subordinate">
              <el-select style="width: 100%" placeholder="请选择下级人数">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in subordinate_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 归属部门 -->
            <el-form-item label="归属部门" prop="position_department">
              <el-select
                style="width: 100%"
                filterable
                placeholder="请选择归属部门"
              >
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="(item, index) in department_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 学历要求 -->
            <el-form-item label="学历要求" prop="position_education">
              <el-select style="width: 100%" placeholder="请选择学历">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in education_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 年龄要求 -->
            <el-form-item label="年龄要求" prop="position_age">
              <el-slider
                v-model="ruleForm.age"
                :marks="age_list"
                range
                :min="18"
                :max="60"
              >
              </el-slider>
              <el-input
                placeholder="年龄"
                popper-class="display-none"
                class="display-none"
              />
              <div style="height: 20px"></div>
            </el-form-item>
            <!-- 风格要求 -->
            <el-form-item label="风格要求" prop="position_style">
              <el-select style="width: 100%" placeholder="请选择风格">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in style_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 入职时间 -->
            <el-form-item label="入职时间" prop="position_entry_time">
              <el-date-picker
                placeholder="请选择入职时间"
                v-model="ruleForm.time"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            <!-- 工作地点 -->
            <el-form-item label="工作地点" prop="position_workplace">
              <div class="address">
                <el-input
                  v-model="ruleForm.workplace"
                  placeholder="请输入工作地点"
                />
                <i
                  class="icon el-icon-map-location"
                  @click="clickIconAddress(0)"
                ></i>
              </div>
            </el-form-item>
            <!-- 薪酬范围 -->
            <el-form-item label="薪酬范围" prop="position_emolument">
              <span class="desc-title"
                >薪资范围以月为单位，薪资单位为K(千元)</span
              >
              <el-slider
                v-model="ruleForm.emolument"
                :marks="emolument_list"
                range
                :min="0"
                :max="100"
              >
              </el-slider>
              <el-input
                placeholder="薪酬范围"
                popper-class="display-none"
                class="display-none"
              />
              <div style="height: 20px"></div>
            </el-form-item>
            <!-- 工龄要求 -->
            <el-form-item label="工龄要求" prop="position_seniority">
              <el-select style="width: 100%" placeholder="请选择工龄">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in seniority_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 试用期时长 -->
            <el-form-item label="试用期时长" prop="position_probation">
              <el-select style="width: 100%" placeholder="请选择试用期时长">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in probation_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 简历同步 -->
            <el-form-item label="简历同步至">
              <span class="desc-title"
                >我的同事
                TA将与您一起管理该职位，可以通过平台和邮箱接收简历</span
              >
              <el-select multiple placeholder="请选择" style="width: 100%">
                <el-option
                  :label="item.staff_name"
                  :value="item.staff_name"
                  v-for="(item, index) in staffList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 福利待遇 -->
            <el-form-item label="福利待遇" prop="position_benefits">
              <el-select
                multiple
                placeholder="请选择福利待遇"
                style="width: 100%"
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in benefits_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 招聘人数 -->
            <el-form-item label="招聘人数" prop="position_num">
              <el-input placeholder="请输入招聘人数" />
            </el-form-item>
            <!-- 办理入职联系人 -->
            <el-form-item label="办理入职联系人" prop="position_name">
              <el-input placeholder="请输入办理入职联系人" />
            </el-form-item>
            <!-- 办理入职联系人电话 -->
            <el-form-item label="办理入职联系人电话" prop="position_phone">
              <el-input placeholder="请输入办理入职联系人电话" />
            </el-form-item>
            <!-- 办理入职地点 -->
            <el-form-item label="办理入职地点" prop="position_address">
              <div class="address">
                <el-input
                  v-model="ruleForm.position_address"
                  placeholder="请输入办理入职地点"
                />
                <i
                  class="icon el-icon-map-location"
                  @click="clickIconAddress(1)"
                ></i>
              </div>
            </el-form-item>
            <!-- 其他补充/备注 -->
            <el-form-item label="其他补充/备注">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请填写其他补充/备注"
              ></el-input>
            </el-form-item>
            <!------------ agent ------------>
            <!-- 素质测评 -->
            <el-form-item label="素质测评">
              <span class="desc-title">在面试完成后将生成报告给企业。 </span>
              <el-select
                multiple
                @change="changeQuality"
                v-model="ruleForm.quality"
                placeholder="请选择素质测评"
                style="width: 100%"
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in quality_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 背景调查 -->
            <el-form-item label="背景调查">
              <span class="desc-title">在面试完成后将生成报告给企业。 </span>
              <el-select
                multiple
                placeholder="请选择背景调查"
                style="width: 100%"
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in investigation_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 入职资料 -->
            <el-form-item label="入职资料">
              <el-select
                multiple
                placeholder="请选择入职资料"
                style="width: 100%"
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in entry_data_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 上传面试官视频 -->
            <!-- <el-form-item label="上传视频">
              <span class="desc-title">请面试官按照示例录制好视频上传。</span>
              <el-upload
                action="your_upload_endpoint_url"
                :accept="'.mp4, .avi'"
                :on-success="handleVideoUploadSuccess"
                :on-remove="handleRemoveVideo"
              >
                <el-button type="primary">点击上传视频</el-button>
              </el-upload>
            </el-form-item> -->
            <!-- 面试评估 -->
            <el-form-item label="面试评估">
              <el-table :data="assessList" :border="true" style="width: 100%">
                <el-table-column prop="title" label="问题标题" width="200" />
                <el-table-column label="问题描述">
                  <template slot-scope="scope">
                    <span class="desc-title"
                      >问题示例：{{ scope.row.tips }}</span
                    >
                    <el-input
                      v-model="scope.row.question"
                      placeholder="请输入问题描述"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleClickAssess(scope.row, scope.$index, index)"
                      type="text"
                      size="small"
                      class="assess-del"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-button type="primary" class="assess-button"
                >添加面试评估</el-button
              >
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item class="btn-box">
              <el-button type="primary" @click="submitForm">发布</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 选择地图 -->
    <el-dialog title="选择位置" :visible.sync="mapVisible" width="40%">
      <Map ref="mapConten" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="mapVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickMapAddress">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Map from "./components/map";
export default {
  components: {
    Map,
  },
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      // 是否显示地图
      mapVisible: false,
      // 地图状态
      addressType: "",
      // 工作类型
      workTypeOptions: [
        { label: "全职", value: "1" },
        { label: "创业", value: "2" },
        { label: "合伙人", value: "3" },
        { label: "兼职", value: "4" },
        { label: "实习", value: "5" },
        { label: "顾问", value: "6" },
      ],
      // 所属行业
      industry_list: [
        {
          industry: "IT互联网技术",
          value: "1",
        },
        {
          industry: "电子/通信/半导体",
          value: "2",
        },
        {
          industry: "销售/客服",
          value: "3",
        },
      ],
      // 职位类别
      category_list: [
        {
          category_name: "产品经理",
          category_id: "1",
        },
        {
          category_name: "UI/UX设计师",
          category_id: "2",
        },
        {
          category_name: "前端工程师",
          category_id: "3",
        },
      ],
      // 职位偏好
      position_list: [
        {
          category_name: "web前端开发",
          position_id: "1",
        },
        {
          category_name: "UI/UX设计师",
          position_id: "2",
        },
        {
          category_name: "前端工程师",
          position_id: "3",
        },
      ],
      // 汇报上级
      superiors_list: [],
      // 下级人数
      subordinate_list: [
        { label: "1-3人", value: "1" },
        { label: "3-5人", value: "2" },
        { label: "5-10人", value: "3" },
        { label: "10-20人", value: "4" },
        { label: "20-50人", value: "5" },
        { label: "50-100人", value: "6" },
        { label: "100-200人", value: "7" },
        { label: "200-500人", value: "8" },
        { label: "500-1000人", value: "9" },
        { label: "1000人以上", value: "10" },
      ],
      // 归属部门
      department_list: [],
      // 职位级别
      rank_list: [],
      // 学历
      education_list: [
        { label: "普通高校", value: "1" },
        { label: "一本院校", value: "2" },
        { label: "211/985", value: "3" },
        { label: "双一流", value: "4" },
        { label: "海外留学", value: "5" },
        { label: "不限", value: "6" },
      ],
      // 年龄
      age_list: {
        18: "18",
        20: "20",
        25: "25",
        30: "30",
        35: "35",
        40: "40",
        45: "45",
        50: "50",
        55: "55",
        60: "60",
      },
      // 风格
      style_list: [
        { label: "无要求", value: "1" },
        { label: "干练", value: "2" },
        { label: "儒雅", value: "3" },
        { label: "文弱", value: "4" },
      ],
      // 薪资
      emolument_list: {
        0: "0K",
        10: "10K",
        20: "20K",
        30: "30K",
        40: "40K",
        50: "50K",
        60: "60K",
        70: "70K",
        80: "80K",
        90: "90K",
        100: "100K",
      },
      // 工龄
      seniority_list: [
        { label: "无要求", value: "1" },
        { label: "1-3年", value: "2" },
        { label: "3-5年", value: "3" },
        { label: "5-8年", value: "4" },
        { label: "8-10年", value: "5" },
        { label: "10-15年", value: "6" },
        { label: "15-20年", value: "7" },
        { label: "20-30年", value: "8" },
        { label: "30年以上", value: "9" },
      ],
      // 试用期时长
      probation_list: [
        { label: "无试用期", value: "1" },
        { label: "1个月", value: "2" },
        { label: "2个月", value: "3" },
        { label: "3个月", value: "4" },
        { label: "4个月", value: "5" },
        { label: "5个月", value: "6" },
        { label: "6个月", value: "7" },
      ],
      // 同步简历
      staffList: [{ staff_name: "郜喜忠" }, { staff_name: "孙家旺" }],
      // 福利待遇
      benefits_list: [
        { label: "五险一金", value: "1" },
        { label: "绩效奖金", value: "2" },
        { label: "餐补", value: "3" },
        { label: "交通补", value: "4" },
        { label: "住房补", value: "5" },
        { label: "业绩提成", value: "6" },
      ],
      // 素质评估
      quality_list: [
        { label: "素质评估1", value: "1" },
        { label: "素质评估2", value: "2" },
        { label: "素质评估3", value: "3" },
        { label: "素质评估4", value: "4" },
      ],
      // 背景调查
      investigation_list: [
        { label: "身份验证", value: "1" },
        { label: "学历验证", value: "2" },
        { label: "学位验证", value: "3" },
        { label: "工商信息验证", value: "4" },
        { label: "涉案法律验证", value: "5" },
        { label: "征信", value: "6" },
        { label: "失信人", value: "7" },
        { label: "执行人", value: "8" },
        { label: "社会舆情", value: "9" },
      ],
      // 入职资料
      entry_data_list: [
        { label: "身份证照片", value: "1" },
        { label: "学历证照片", value: "2" },
        { label: "最近六个月工资单银行流水", value: "3" },
        { label: "最近六个月二级以上医院体检报告", value: "4" },
        { label: "离职证明", value: "5" },
        { label: "2寸白底照片", value: "6" },
      ],
      assessList: [
        {
          question: "",
          title: "面试题1(专业类)",
          tips: "XX机械出现了XX故障，有哪些方法解决？",
        },
        {
          question: "",
          title: "面试题2(管理类)",
          tips: "从利润角度出发，你认为提升公司的经营效率最好的方法有哪些？",
        },
        {
          question: "",
          title: "面试题3(市场类)",
          tips: "谈谈你对市场开拓的有效办法？",
        },
        {
          question: "",
          title: "面试题4(其他综合胜任能力)",
          tips: "我们公司主要是做XX产品的，如果你作为负责人，你以什么为抓手去开支你的工作？业务重心放在哪方面？主要关注那些经营指标的那部分？",
        },
        {
          question: "",
          title: "面试题5(企业文化匹配)",
          tips: "你认为什么样的企业文化和管理风格是和你比较匹配的？",
        },
        {
          question: "",
          title: "面试题6(解决问题能力)",
          tips: "如果你有个下级是公司领导的亲戚，但是工作能力无法满足岗位要求，你会怎么解决？",
        },
        {
          question: "",
          title: "面试题7(入职时间)",
          tips: "如果面试通过了面试，你的具体到岗时间是几月几号？",
        },
        {
          question: "",
          title: "面试题8(意愿度)",
          tips: "如果面试成功了，你是直接选择加盟我公司，还是会再做对比或考虑？",
        },
      ],

      // 必填提示
      rules: {
        position_name: [
          { required: true, message: "请输入职位名称", trigger: "blur" },
        ],
        position_type: [
          { required: true, message: "请选择工作性质", trigger: "change" },
        ],
        position_desc: [
          { required: true, message: "请输入详细岗位要求", trigger: "blur" },
        ],
        position_lightspot: [
          { required: true, message: "请输入职位优势", trigger: "blur" },
        ],
        position_industry: [
          { required: true, message: "请选择所属行业", trigger: "change" },
        ],
        position_class: [
          { required: true, message: "请选择岗位类别", trigger: "change" },
        ],
        position_job: [
          { required: true, message: "请选择职位偏好", trigger: "change" },
        ],
        position_capacity: [
          { required: true, message: "请输入工作职能", trigger: "blur" },
        ],
        position_authority: [
          { required: true, message: "请输入工作职权", trigger: "blur" },
        ],
        position_superiors: [
          { required: true, message: "请选择汇报上级", trigger: "change" },
        ],
        position_subordinate: [
          { required: true, message: "请选择下级人数", trigger: "change" },
        ],
        position_department: [
          { required: true, message: "请选择归属部门", trigger: "change" },
        ],
        position_rank: [
          { required: true, message: "请选择职位级别", trigger: "change" },
        ],
        position_education: [
          { required: true, message: "请选择学历", trigger: "change" },
        ],
        position_age: [
          { required: true, message: "请选择学历", trigger: "blur" },
        ],
        position_style: [
          { required: true, message: "请选择风格", trigger: "change" },
        ],
        position_entry_time: [
          { required: true, message: "请选择入职时间", trigger: "change" },
        ],
        position_emolument: [
          { required: true, message: "请选择薪酬范围", trigger: "blur" },
        ],
        position_seniority: [
          { required: true, message: "请选择工龄", trigger: "change" },
        ],
        position_probation: [
          { required: true, message: "请选择试用期时长", trigger: "change" },
        ],
        position_benefits: [
          { required: true, message: "请选择福利待遇", trigger: "change" },
        ],
        position_num: [
          { required: true, message: "请输入招聘人数", trigger: "blur" },
        ],
        position_name: [
          { required: true, message: "请输入办理入职联系人", trigger: "blur" },
        ],
        position_phone: [
          {
            required: true,
            message: "请输入办理入职联系人电话",
            trigger: "blur",
          },
        ],
        position_workplace: [
          { required: true, message: "请输入工作地点", trigger: "blur" },
        ],
        position_address: [
          { required: true, message: "请输入办理入职地点", trigger: "blur" },
        ],
      },

      // 详细岗位要求-tips
      desc_placeholder: `公司及项目介绍：\n岗位职责：\n岗位要求：\n岗位经验要求：\n福利待遇：\n`,
      // 岗位优势-tips
      advantage_placeholder: `1.您可以问下招聘需求方，他们更懂得如何用有趣且个性化的方式来吸引该类人才。\n2. 建议填写调薪机制&晋升通道、是否牛人带队、团队氛围、企业发展潜力等.`,

      // 表单数据
      ruleForm: {
        quality: [],
        age: [18, 60],
        emolument: [0, 100],
        time: "",
        workplace: "",
        address: "",
      },
    };
  },
  mounted() {
    console.log(123);
    this.getSelectData();
  },
  created() {},
  methods: {
    // 获取数据
    getSelectData() {
      const that = this;
      // 汇报上级
      that.$axios
        .get("/api/company-position/option", {
          type: 1,
        })
        .then((res) => {
          that.superiors_list = res.data;
        })
        .catch((e) => {
          that.$message.error({
            message: e.message,
          });
        });
      // 部门
      that.$axios
        .get("/api/company-position/option", {
          type: 2,
        })
        .then((res) => {
          that.department_list = res.data;
        })
        .catch((e) => {
          that.$message.error({
            message: e.message,
          });
        });
      // 职位
      that.$axios
        .get("/api/company-position/option", {
          type: 3,
        })
        .then((res) => {
          that.rank_list = res.data;
        })
        .catch((e) => {
          that.$message.error({
            message: e.message,
          });
        });
    },
    // 点击图标地址
    clickIconAddress(i) {
      this.addressType = i;
      this.mapVisible = true;
    },
    // 点击弹窗地图地址确认按钮
    clickMapAddress() {
      const that = this;
      this.mapVisible = false;
      let agentAddress = that.$refs.mapConten.agentAddress;
      if (that.addressType == 0) {
        that.ruleForm.workplace = agentAddress;
      } else if (that.addressType == 1) {
        that.ruleForm.address = agentAddress;
      }
    },
    // 素质评估
    changeQuality(e) {
      if (e.length >= 2) {
        this.ruleForm.quality = [];
        this.ruleForm.quality = [e[0], e[1]];
      }
    },
    handleVideoUploadSuccess(response, file) {
      // 假设服务器返回的数据结构如下：
      // { success: true, data: { videoUrl: 'https://example.com/video.mp4' } }
      const videoUrl = response.data.videoUrl;

      // 将视频URL保存到组件状态中，以便后续回显
      this.videoUrl = videoUrl;
    },

    handleRemoveVideo(file, fileList) {
      // 清空回显的视频URL
      this.videoUrl = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.assess-del {
  color: $g_bg;
}
.assess-button {
  width: 100%;
  margin: 20px 0;
  border: 1px dashed $g_bg;
  color: $g_bg;
  border-radius: 6px;
  background-color: #fff;
}
.postJob-box {
  width: 880px;
  padding: 16px 30px;
  .title {
    width: 100%;
    font-size: 0.9rem;
    font-weight: bold;
    color: $g_textColor;
    position: relative;
    padding-left: 10px;
    margin-bottom: 20px;
    &::after {
      content: "";
      width: 3px;
      height: 100%;
      background: $g_bg;
      position: absolute;
      left: 0;
      top: -2px;
    }
  }
}
.desc-title {
  font-size: 12px;
  font-weight: 400;
  color: #999999;
}
.display-none {
  position: fixed !important;
  top: -100px !important;
  width: 0px !important;
  height: 0px !important;
  padding: 0px !important;
}
.address {
  display: flex;
  align-items: center;
  .icon {
    font-size: 20px;
    margin-left: 15px;
    margin-right: 8px;
    cursor: pointer;
  }
}
.btn-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  & /deep/ .el-form-item__content {
    margin-left: 40px !important;
  }
  & /deep/ .el-button {
    width: 200px;
    height: 40px;
    margin-right: 20px;
  }
  & /deep/ .el-button--primary {
    background-color: $g_bg;
    border-color: $g_color;
  }
}
</style>

