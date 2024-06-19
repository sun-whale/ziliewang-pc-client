<template>
  <div class="bossSide-container">
    <div class="m-box">
      <div class="postJob-box">
        <div class="title">{{ position_id ? "修改职位" : "发布职位" }}</div>
        <div class="postJob-form-box">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="职位名称" prop="position_name">
              <el-input
                v-model="ruleForm.position_name"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item label="工作性质" prop="work_type">
              <el-radio-group v-model="ruleForm.work_type">
                <el-radio label="1">全职</el-radio>
                <el-radio label="2">兼职</el-radio>
                <el-radio label="3">实习</el-radio>
                <el-radio label="4">校园</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="职位描述" prop="position_desc">
              <span class="desc-title"
                >请勿输入邮箱、电话、链接,请不要包含性别歧视语
                请参考职位描述规范</span
              >
              <el-input
                type="textarea"
                :rows="10"
                v-model="ruleForm.position_desc"
                :placeholder="desc_placeholder"
              ></el-input>
            </el-form-item>

            <el-form-item label="职位亮点" prop="position_lightspot">
              <span class="desc-title"
                >求职端展示效果，向求职者介绍您的职位亮点，增加独特的吸引力，让您的职位脱颖而出!</span
              >
              <el-input
                type="textarea"
                :rows="3"
                v-model="ruleForm.position_lightspot"
                :placeholder="hight_placeholder"
              ></el-input>
            </el-form-item>

            <el-form-item label="行业要求" prop="industry_requirement">
              <el-select
                v-model="ruleForm.industry_requirement"
                placeholder="请选择您期望候选人来自于哪些行业"
                @change="changeIndustry"
              >
                <el-option
                  :label="item.industry"
                  :value="item.industry"
                  v-for="(item, index) in industryList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="职位类别" prop="position_type">
              <el-select
                v-model="ruleForm.position_type"
                placeholder="请选择职位类别"
                @change="changePositionType"
              >
                <el-option
                  :label="item.category_name"
                  :value="item.category_name"
                  v-for="(item, index) in category_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="职位偏好" prop="job_preference">
              <el-select
                v-model="ruleForm.job_preference"
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

            <el-form-item label="学历要求" required>
              <el-col :span="7">
                <el-form-item prop="educational_experience">
                  <el-select
                    v-model="ruleForm.educational_experience"
                    placeholder="请选择学历要求"
                  >
                    <el-option label="博士" value="博士"></el-option>
                    <el-option label="研究生" value="研究生"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="大专" value="大专"></el-option>
                    <el-option label="高中" value="高中"></el-option>
                    <el-option label="初中" value="初中"></el-option>
                    <el-option label="最低学历" value="最低学历"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="工作地址" prop="work_address">
              <!-- <el-input v-model="ruleForm.work_address" placeholder="请输入工作地址"></el-input> -->
              <el-cascader
                :options="options"
                ref="cascaderAddr"
                v-model="ruleForm.selectedOptions"
                :props="{ value: 'label' }"
                :show-all-levels="false"
                placeholder="请选择城市"
                @change="handleChange"
              >
              </el-cascader>
            </el-form-item>

            <el-form-item label="新资范围" required>
              <el-col :span="5" class="xzfw-box">
                <el-select
                  @change="changeMoney"
                  v-model="ruleForm.xz_status"
                  placeholder="最低月薪"
                >
                  <el-option label="1K" value="1"></el-option>
                  <el-option label="2K" value="2"></el-option>
                  <el-option label="3K" value="3"></el-option>
                  <el-option label="4K" value="4"></el-option>
                  <el-option label="5K" value="5"></el-option>
                  <el-option label="6k" value="6"></el-option>
                  <el-option label="7K" value="7"></el-option>
                  <el-option label="8K" value="8"></el-option>
                  <el-option label="9K" value="9"></el-option>
                  <el-option label="10K" value="10"></el-option>
                  <el-option label="11K" value="11"></el-option>
                  <el-option label="12K" value="12"></el-option>
                  <el-option label="13K" value="13"></el-option>
                  <el-option label="14K" value="14"></el-option>
                  <el-option label="15K" value="15"></el-option>
                  <el-option label="16K" value="16"></el-option>
                  <el-option label="17K" value="17"></el-option>
                  <el-option label="18K" value="18"></el-option>
                  <el-option label="19K" value="19"></el-option>
                  <el-option label="20K" value="20"></el-option>
                  <el-option label="25K" value="25"></el-option>
                  <el-option label="30K" value="30"></el-option>
                  <el-option label="40K" value="40"></el-option>
                  <el-option label="50K" value="50"></el-option>
                  <el-option label="70K" value="70"></el-option>
                  <el-option label="100K" value="100"></el-option>
                </el-select>
              </el-col>
              <el-col :span="5" class="xzfw-box">
                <el-select
                  @change="changeMoney"
                  v-model="ruleForm.xz_end"
                  placeholder="最高月薪"
                >
                  <el-option label="2K" value="2"></el-option>
                  <el-option label="3K" value="3"></el-option>
                  <el-option label="4K" value="4"></el-option>
                  <el-option label="5K" value="5"></el-option>
                  <el-option label="6k" value="6"></el-option>
                  <el-option label="7K" value="7"></el-option>
                  <el-option label="8K" value="8"></el-option>
                  <el-option label="9K" value="9"></el-option>
                  <el-option label="10K" value="10"></el-option>
                  <el-option label="11K" value="11"></el-option>
                  <el-option label="12K" value="12"></el-option>
                  <el-option label="13K" value="13"></el-option>
                  <el-option label="14K" value="14"></el-option>
                  <el-option label="15K" value="15"></el-option>
                  <el-option label="16K" value="16"></el-option>
                  <el-option label="17K" value="17"></el-option>
                  <el-option label="18K" value="18"></el-option>
                  <el-option label="19K" value="19"></el-option>
                  <el-option label="20K" value="20"></el-option>
                  <el-option label="25K" value="25"></el-option>
                  <el-option label="30K" value="30"></el-option>
                  <el-option label="40K" value="40"></el-option>
                  <el-option label="50K" value="50"></el-option>
                  <el-option label="70K" value="70"></el-option>
                  <el-option label="100K" value="100"></el-option>
                  <el-option label="150K" value="150"></el-option>
                </el-select>
              </el-col>
              <el-col :span="5" class="xzfw-box">
                <el-select v-model="ruleForm.months" placeholder="请选择">
                  <el-option label="x12月" value="12"></el-option>
                  <el-option label="x13月" value="13"></el-option>
                  <el-option label="x14月" value="14"></el-option>
                  <el-option label="x15月" value="15"></el-option>
                  <el-option label="x16月" value="16"></el-option>
                  <el-option label="x17月" value="17"></el-option>
                  <el-option label="x18月" value="18"></el-option>
                  <el-option label="x19月" value="19"></el-option>
                  <el-option label="x20月" value="20"></el-option>
                  <el-option label="x21月" value="21"></el-option>
                  <el-option label="x22月" value="22"></el-option>
                  <el-option label="x23月" value="23"></el-option>
                  <el-option label="x24月" value="24"></el-option>
                </el-select>
              </el-col>
            </el-form-item>

            <el-form-item label="工作时间" required>
              <el-col :span="5">
                <el-select
                  v-model="ruleForm.work_times"
                  placeholder="工作时间"
                  style="width: 100%"
                >
                  <el-option label="无经验要求" value="3"></el-option>
                  <el-option label="0-1年" value="0-1"></el-option>
                  <el-option label="1-3年" value="1-3"></el-option>
                  <el-option label="3-5年" value="3-5"></el-option>
                  <el-option label="5-10年" value="5-10"></el-option>
                  <el-option label="10-15年" value="10-15"></el-option>
                  <el-option label="15年以上" value="15"></el-option>
                </el-select>
              </el-col>
            </el-form-item>

            <el-form-item label="职位福利" prop="job_benefits">
              <el-col :span="15">
                <el-select
                  v-model="ruleForm.job_benefits"
                  multiple
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option label="五险一金" value="五险一金"></el-option>
                  <el-option label="绩效奖金" value="绩效奖金"></el-option>
                  <el-option label="餐补" value="餐补"></el-option>
                  <el-option label="交通补" value="交通补"></el-option>
                  <el-option label="住房补" value="住房补"></el-option>
                </el-select>
              </el-col>
            </el-form-item>

            <el-form-item label="招聘人数" prop="need_nums">
              <el-col :span="7">
                <el-input
                  v-model="ruleForm.need_nums"
                  placeholder="招聘人数"
                ></el-input>
              </el-col>
              <span style="padding-left: 10px; font-size: 14px">人</span>
            </el-form-item>

            <el-form-item label="年龄范围" required>
              <el-col :span="5" class="xzfw-box">
                <el-input
                  v-model="ruleForm.age_status"
                  placeholder="最低年龄"
                ></el-input>
              </el-col>
              <el-col :span="5" class="xzfw-box">
                <el-input
                  v-model="ruleForm.age_end"
                  placeholder="最高年龄"
                ></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="简历同步至" prop="sync_workmate">
              <span class="desc-title"
                >我的同事
                TA将与您一起管理该职位，可以通过平台和邮箱接收简历</span
              >
              <el-col :span="15">
                <el-select
                  v-model="ruleForm.sync_workmate"
                  multiple
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    :label="item.staff_name"
                    :value="item.staff_name"
                    v-for="(item, index) in staffList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-col>
            </el-form-item>

            <el-form-item label="简历要求" prop="resume_demand">
              <span class="desc-title"
                >设置后，不满足要求的简历，将被自动标记为不合适，该部分简历可在下人才管理-不合适，中查看!</span
              >
              <el-col :span="15">
                <el-select
                  v-model="ruleForm.resume_demand"
                  multiple
                  placeholder="设置期望简历要求"
                  style="width: 100%"
                >
                  <el-option label="三年" value="三年"></el-option>
                  <el-option label="北京" value="北京"></el-option>
                  <el-option label="本科" value="本科"></el-option>
                </el-select>
              </el-col>
            </el-form-item>

            <el-form-item label="补充信息" prop="supplementary_information">
              <el-checkbox-group v-model="ruleForm.supplementary_information">
                <el-checkbox label="可转正" name="可转正"></el-checkbox>
                <el-checkbox label="可远程实习" name="可远程实习"></el-checkbox>
                <el-checkbox
                  label="提供实习证明"
                  name="提供实习证明"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="上传入职offer">
              <el-col :span="20"
                ><el-upload
                  class="upload-demo"
                  action="none"
                  :http-request="uploadArticleCover"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    <a
                      href="https://zlw0720.oss-cn-beijing.aliyuncs.com/avatar/20240618/61d3be0077537fd904391b0d04c66042.docx"
                      >点击下载入职offer模板</a
                    >
                  </div>
                </el-upload></el-col
              >
            </el-form-item>

            <el-form-item label="素质评估">
              <el-col :span="5">
                <el-switch
                  style="margin-top: 5px"
                  v-model="ruleForm.qualityVal"
                  active-color="#1ec5d8"
                />
              </el-col>
            </el-form-item>

            <el-form-item label="面试评估">
              <el-col :span="24">
                <el-table
                  :data="ruleForm.assessList"
                  :border="true"
                  style="width: 100%"
                >
                  <el-table-column label="问题描述">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.question"
                        placeholder="请输入问题描述"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="回答方式" width="180">
                    <template slot-scope="scope">
                      <el-select
                        v-model="scope.row.answer"
                        placeholder="请选择回答方式"
                        style="width: 100%"
                      >
                        <el-option label="录音" value="录音"></el-option>
                        <el-option label="视频" value="视频"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button
                        @click="handleClickAssess(scope.row, scope.$index)"
                        type="text"
                        size="small"
                        class="assess-del"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="24">
                <el-button
                  @click="addAssess"
                  type="primary"
                  class="assess-button"
                  >添加面试评估</el-button
                >
              </el-col>
            </el-form-item>

            <el-form-item class="btn-box">
              <el-button type="primary" @click="submitForm">{{
                position_id ? "修改" : "发布"
              }}</el-button>
              <el-button @click="resetForm">重置</el-button>
              <!-- <el-button @click="liaot">聊天</el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import pcas from "../../../assets/json/pc-code.json";

export default {
  data() {
    return {
      fileList: [],
      position_id: "",
      staffList: [], // 员工列表
      industryList: [], //行业列表
      category_list: [], // 职位列表
      position_list: [], // 职位偏好
      selt_industry_item: "", // 选中的行业名称
      selt_positionType_item: "", // 选中的职位名称
      ruleForm: {
        entry_offer: "", //offer存放入口
        is_automation: "2", // 1.手动 2.自动
        assessList: [], // 面试评估
        qualityVal: false, // 素质评估
        position_name: "", // 职位名称
        work_type: "", // 工作性质
        position_desc: "", // 职位描述
        position_lightspot: "", // 职位亮点
        position_type: "", // 职位类别
        industry_requirement: "", // 行业要求
        educational_experience: "",
        job_preference: "", // 职位偏好
        work_address: "", // 工作地址
        xz_status: "",
        xz_end: "",
        months: "12",
        work_times: "",
        age_status: "", // 年龄范围
        age_end: "",
        supplementary_information: [], // 补充信息
        sync_workmate: "", // 同事
        need_nums: "", // 招聘人数
        job_benefits: "", // 职位福利
        resume_demand: "", // 简历要求
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        selectedOptions: [], // 选中的地址
      },
      options: pcas, // 地址数据
      rules: {
        // 必填提示
        position_name: [
          { required: true, message: "请输入职位名称", trigger: "blur" },
        ],
        work_address: [
          { required: true, message: "请输入工作地址", trigger: "blur" },
        ],
        work_type: [
          { required: true, message: "请选择工作性质", trigger: "change" },
        ],
        position_desc: [
          { required: true, message: "请填写职位描述", trigger: "blur" },
        ],
        position_lightspot: [
          { required: true, message: "请填写职业亮点", trigger: "blur" },
        ],
        position_type: [
          { required: true, message: "请选择职位类别", trigger: "change" },
        ],
        industry_requirement: [
          { required: true, message: "请选择行业要求", trigger: "change" },
        ],
        educational_experience: [
          { required: true, message: "请选择学历要求", trigger: "change" },
        ],
        work_times: [
          { required: true, message: "请选择工作时间", trigger: "change" },
        ],
        xz_status: [
          { required: true, message: "请选择薪资范围", trigger: "change" },
        ],
        xz_end: [
          { required: true, message: "请选择薪资范围", trigger: "change" },
        ],
        age_status: [
          { required: true, message: "最低年龄要求", trigger: "blur" },
        ],
        age_end: [{ required: true, message: "最高年龄要求", trigger: "blur" }],
        months: [{ required: true, message: "请选择", trigger: "change" }],
        need_nums: [
          { required: true, message: "请填写招聘人数", trigger: "blur" },
        ],
        job_preference: [
          { required: true, message: "请选择职位偏好", trigger: "change" },
        ],
        job_preference: [
          { required: true, message: "请选择职位偏好", trigger: "change" },
        ],
      },
      desc_placeholder: `请输入岗位职责、任职要求等描述，至少10个字，建议使用以下格式逐条列出岗位职责
        职责描述:
        1...
        2...
        任职要求:
        1...
        2...
        补充说明
        晋升说明、培训情况等工作时间、
        `,
      hight_placeholder: `1.您可以问下招聘需求方，他们更懂得如何用有趣且个性化的方式来吸引该类人才。
  2. 建议填写调薪机制&晋升通道、是否牛人带队、团队氛围、企业发展潜力等.
        `,
    };
  },
  mounted() {
    // console.log(this.$root.positionItems);
    // 获取员工列表
    this.getStaffList();
    let uids = [10, 20, 31, 36];
    this.setAssessMessage(63, uids);
  },
  created() {
    if (this.$route.query.id) {
      this.position_id = this.$route.query.id;
      this.getDetails(this.position_id, this.getPositionList);
    } else {
      // 获取行业列表信息
      this.getPositionList();
    }
  },
  methods: {
    setAssessMessage(positionId, uids) {
      console.log(positionId);
      console.log(uids);
    },

    liaot() {
      let infoData = {
        avatar:
          "https://zlw0720.oss-cn-beijing.aliyuncs.com/avatar/20240417/9f8f0f393c4179b1e4359661acb7e888.png",
        company_id: 22,
        id: "u_33",
        name: "仇登耀",
        position_id: 43,
        position_name: "python开发",
        uid: 33,
        assessShow: true,
        assessList: this.ruleForm.assessList,
      };

      this.$bus.$emit("receiveParams", {
        type: "searchTalent",
        laiyuan: "nav",
        infoData,
      });

      // 发送消息
    },
    // 上传图片文件
    uploadArticleCover(param) {
      console.log(param.file);
      const that = this;
      const formData = new FormData();
      formData.append("file[]", param.file);
      formData.append("pictureCategory", "articleCover");
      formData.append("up_tag", "avatar");
      this.$axios
        .post("/api/upload", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          let file = [
            {
              name: "文件已上传",
              url: res.data.upload_files,
            },
          ];
          console.log(res.data);
          console.log(res.data.upload_files);
          that.ruleForm.entry_offer = res.data.upload_files;
          that.fileList = file;
        })
        .catch((e) => {
          console.log("erro");
          this.$refs["upload"].clearFiles();
        });
    },
    // 最大薪资不能小于最低薪资
    changeMoney() {
      if (this.ruleForm.xz_status != "" && this.ruleForm.xz_end != "") {
        if (this.ruleForm.xz_status > this.ruleForm.xz_end) {
          this.ruleForm.xz_end = "";
          this.$message.error({
            message: "最低薪资不能大于最高薪资！",
          });
        }
      }
    },
    // 删除一条面试评估
    handleClickAssess(item, index) {
      this.ruleForm.assessList.splice(index, 1);
    },
    // 添加一条面试评估
    addAssess() {
      const that = this;
      let assessObj = {
        question: "",
        answer: "",
      };
      that.ruleForm.assessList = [...that.ruleForm.assessList, assessObj];
    },
    // 点击选择行业要求
    changeIndustry(e) {
      this.selt_industry_item = e;
      let industryList = this.industryList;
      this.selt_positionType_item = ""; // 选中的职位类别名称
      (this.ruleForm.position_type = ""),
        (this.ruleForm.job_preference = ""),
        industryList.forEach((ele) => {
          if (ele.industry == e) {
            this.category_list = ele.category_list;
          }
        });
    },
    // 点击选择职位类别
    changePositionType(e) {
      this.selt_positionType_item = e;
      let category_list = this.category_list;
      category_list.forEach((ele) => {
        if (ele.category_name == e) {
          this.position_list = ele.position_list;
        }
      });
    },
    // 获取职位列表信息
    getPositionList(i) {
      let that = this;
      that.$axios
        .post("/api/position/list", {})
        .then((res) => {
          let industryList = res.data;
          if (i) {
            that.industryList = industryList;
            let ruleForm = that.ruleForm;
            let selt_industry_item = ruleForm.industry_requirement; // 选中的行业名称
            let selt_positionType_item = ruleForm.position_type; // 选中的职位类别名称
            that.selt_industry_item = selt_industry_item;
            that.selt_positionType_item = selt_positionType_item;
            industryList.forEach((ele) => {
              if (ele.industry == selt_industry_item) {
                that.category_list = ele.category_list; // 职位列表
              }
            });
            that.category_list.forEach((ele) => {
              if (ele.category_name == selt_positionType_item) {
                that.position_list = ele.position_list;
              }
            });
          } else {
            that.industryList = industryList;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 获取员工列表
    getStaffList() {
      let that = this;
      that.$axios.post("/api/staff/index", {}).then((res) => {
        if (res.code == 0) {
          that.staffList = res.data;
        } else {
          that.$message.error({
            message: res.data.msg,
          });
        }
      });
    },
    // 获取详情
    getDetails(i, f) {
      let that = this;
      let id = i;
      let p = {
        position_id: id,
      };
      that.$axios.post("/api/company-position/detail", p).then((res) => {
        if (res.code == 0) {
          let ruleForm = JSON.parse(JSON.stringify(res.data));
          let salary = res.data.salary.split("-");
          let limit_age = res.data.limit_age.split("-");
          ruleForm.selectedOptions = res.data.work_address.split("/");
          ruleForm.xz_status = salary[0];
          ruleForm.xz_end = salary[1];
          ruleForm.age_status = limit_age[0];
          ruleForm.age_end = limit_age[1];
          ruleForm.job_benefits = res.data.job_benefits.split(",");
          ruleForm.supplementary_information =
            res.data.supplementary_information.split(",");
          ruleForm.sync_workmate = res.data.sync_workmate.split(",");
          ruleForm.resume_demand = res.data.resume_demand.split(",");
          ruleForm.work_type = res.data.work_type + "";
          ruleForm.months = res.data.months ? res.data.months : "12";
          that.ruleForm = ruleForm;
          return f(id);
        } else {
          that.$message.error({
            message: res.msg,
          });
        }
      });
    },
    // 获取省市区地址级联
    handleChange(thsAreaCode) {
      // thsAreaCode = this.$refs['cascaderAddr'].getCheckedNodes()[0].pathLabels// 注意2： 获取label值
      this.selectedOptions = thsAreaCode;
    },
    radioGroup(v) {
      console.log(v);
    },
    // 点击重置
    resetForm() {
      this.fileList = [];
      this.ruleForm = {
        entry_offer: "",
        assessList: [],
        qualityVal: false, // 素质评估
        position_name: "", // 职位名称
        work_type: "", // 工作性质
        position_desc: "", // 职位描述
        position_lightspot: "", // 职位亮点
        position_type: "", // 职位类别
        industry_requirement: "", // 行业要求
        educational_experience: "", // 学历要求
        job_preference: "", // 职位偏好
        work_address: "", // 工作地址
        xz_status: "",
        xz_end: "",
        age_status: "",
        age_end: "",
        months: "12",
        work_times: "", // 工作要求
        supplementary_information: [], // 补充信息
        sync_workmate: "", // 同事
        need_nums: "", // 招聘人数
        job_benefits: "", // 职位福利
        resume_demand: "", // 简历要求
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
      };
    },
    // 点击提交
    submitForm() {
      let that = this;
      let ruleForm = that.ruleForm;

      let p = {
        is_automation: "2",
        entry_offer: ruleForm.entry_offer, // offer 存放地址
        interview_evaluation: JSON.stringify(ruleForm.assessList), // 面试评估
        quality_assessment: ruleForm.qualityVal ? 1 : 2, // 素质评估 1.开启 2.关闭
        position_name: ruleForm.position_name,
        work_type: ruleForm.work_type,
        position_desc: ruleForm.position_desc,
        position_lightspot: ruleForm.position_lightspot,
        position_type: ruleForm.position_type,
        industry_requirement: ruleForm.industry_requirement,
        educational_experience: ruleForm.educational_experience,
        job_preference: ruleForm.job_preference,
        months: ruleForm.months,
        work_address: ruleForm.selectedOptions.join("/"),
        salary: ruleForm.xz_status + "-" + ruleForm.xz_end,
        limit_age: ruleForm.age_status + "-" + ruleForm.age_end,
        job_benefits: ruleForm.job_benefits.join(","),
        need_nums: ruleForm.need_nums,
        supplementary_information: ruleForm.supplementary_information.join(","),
        sync_workmate: ruleForm.sync_workmate.join(","),
        resume_demand: ruleForm.resume_demand.join(","),
        work_times: ruleForm.work_times,
      };
      let url = "";
      let position_id = that.position_id;
      if (position_id) {
        // 修改编辑
        p.id = position_id;
        url = "/api/company-position/edit";
      } else {
        // 新发布
        url = "/api/company-position/publish";
      }
      console.log(p);
      that.$axios.post(url, p).then((res) => {
        if (res.code == 0) {
          that.$message.success(" 发布成功！");
          // if (res.data.length > 0) {
          //   that.setAssessMessage(res.data.position_id, res.data.uids);
          //   return;
          // }
          setTimeout(() => {
            that.$router.push("/jobCenter");
          }, 1500);
        } else {
          that.$message.error({
            message: res.msg,
          });
        }
      });
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
  margin-top: 20px;
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

  .postJob-form-box {
    width: 100%;
    margin-top: 16px;
    .desc-title {
      font-size: 14px;
      font-weight: 400;
      color: $g_textColor;
      line-height: 22px;
    }
    .line {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 10px;
    }
    .span-padd {
      float: left;
    }
    /deep/ .el-form-item__content {
      line-height: 32px;
    }
    /deep/ .el-form-item__label {
      padding-right: 20px;
      line-height: 32px;
    }
    /deep/ .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
    /deep/ .el-input__icon {
      line-height: 32px;
    }
    .xzfw-box {
      margin-left: 12px;
      &:nth-of-type(1) {
        margin-left: 0;
      }
    }
  }
}
.btn-box {
  display: flex;
  align-items: center;
  margin-top: 20px;
  & /deep/ .el-form-item__content {
    margin-left: 40px !important;
  }
  & /deep/ .el-button {
    width: 114px;
    height: 40px;
    margin-right: 20px;
  }
  & /deep/ .el-button--primary {
    background-color: $g_bg;
    border-color: $g_color;
  }
}
.el-upload__tip {
  a {
    color: $g_bg;
  }
}
</style>