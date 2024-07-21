<template>
  <div>
    <el-dialog
      :visible.sync="isComplaint"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      custom-class="content-box"
    >
      <div class="content-container" :style="'z-index:' + zIndex +';padding-top:' + pdiTop">
        <div class="header">
          <div class="passive">
            <span>{{ uId == "" ? "举报/投诉" : "投诉对象ID：" }}</span
            >{{ uId }}
          </div>
          <i class="el-icon-close" @click="clickClose"></i>
        </div>
        <el-select
          v-model="params.complaintVal"
          class="complaint-sel"
          clearable
          placeholder="请选择投诉类型"
        >
          <el-option
            v-for="item in complaintType"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
        <div class="title">问题描述:</div>
        <el-input
          type="textarea"
          clearable
          rows="6"
          class="complaint-int"
          placeholder="请输入内容"
          v-model="params.complaintText"
          :maxlength="complaintTextNum"
          show-word-limit
        />
        <div class="title">
          图片说明:<span>最多6张，支持jpg、png格式(选填)</span>
        </div>
        <div class="upload">
          <div
            class="complaint-image"
            v-for="(item, index) in params.complaintImage"
            :key="index"
          >
            <img :src="item" />
            <i @click="clickDelDate(index)" class="el-icon-close"></i>
          </div>
          <el-upload
            action="none"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :data="uploadData"
            :http-request="uploadArticleCover"
          >
            <div class="add-image">
              <i slot="default" class="el-icon-plus"></i>
            </div>
          </el-upload>
        </div>
        <div class="service">
          您也可以联系线上客服(<span @click="clickService">点击线上客服</span>)
        </div>
        <div class="tips">
          注：1.您提交得举报投诉信息将在五个工作日内反馈，请留意系统消息或在“自猎网APP”，“我的举报”中查看举报详情及反馈。2.请谨慎选择举报类型和举报内容，所选类型与举报内容不一致讲影响举报结果。3.经核查举报成功后，会根据举报类型对人才进行对应的处置，如举报失败原因有可能选择内容错误，可重新选择投诉类型发起举报。谨防诈骗，遵纪守法。
        </div>
        <div class="passive" v-if="id"><span>我的ID：</span>{{ id }}</div>
        <el-button @click="clickComplaint" class="complaint-sub"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
import { set } from "@vue/composition-api";

export default {
  props: {
    zIndex: {
      type: String,
      default() {
        return "999";
      },
    },
    pdiTop: {
      type: String,
      default() {
        return '0px';
      },
    },
    id: {
      type: String,
      default() {
        return null;
      },
    },
    uId: {
      type: String,
      default() {
        return null;
      },
      // 投诉状态
      // 企业投诉个人 - 0  个人投诉企业 - 1  其他投诉 - 2
      states: {
        type: String,
        default() {
          return null;
        },
      },
    },
  },
  data() {
    return {
      isComplaint: false,
      complaintTextNum: 500,
      complaintType: [],
      enterpriseType: [
        {
          value: "1",
          label: "号码空号或停机",
        },
        {
          value: "2",
          label: "不是本人号码",
        },
        {
          value: "3",
          label: "虚假简历",
        },
        {
          value: "4",
          label: "不正当言论",
        },
        {
          value: "5",
          label: "态度恶劣/辱骂/人身攻击",
        },
        {
          value: "6",
          label: "简历包含广告/色情/违法内容",
        },
        {
          value: "7",
          label: "其他",
        },
      ], // 企业投诉个人
      personageType: [
        {
          value: "1",
          label: "企业信息虚假",
        },
        {
          value: "2",
          label: "虚假招聘职位",
        },
        {
          value: "3",
          label: "恶意诽谤",
        },
        {
          value: "4",
          label: "发布广告",
        },
        {
          value: "5",
          label: "辱骂/人身攻击",
        },
        {
          value: "6",
          label: "涉嫌政治/色情/暴力等违法行为",
        },
        {
          value: "7",
          label: "侵犯个人隐私",
        },
        {
          value: "8",
          label: "歧视行为",
        },
        {
          value: "9",
          label: "恶意骚扰行为",
        },
        {
          value: "10",
          label: "违规收费",
        },
        {
          value: "11",
          label: "虚假电话",
        },
        {
          value: "12",
          label: "虚假公司地址",
        },
        {
          value: "13",
          label: "虚假待遇",
        },
        {
          value: "14",
          label: "欺骗/强迫/威胁",
        },
        {
          value: "15",
          label: "其他",
        },
      ], // 个人投诉企业
      surplusType: [
        {
          value: "1",
          label: "不正当言论",
        },
        {
          value: "2",
          label: "发布虚假内容",
        },
        {
          value: "3",
          label: "恶意诽谤",
        },
        {
          value: "4",
          label: "发布广告",
        },
        {
          value: "5",
          label: "辱骂/人身攻击",
        },
        {
          value: "6",
          label: "暴力色情内容",
        },
        {
          value: "7",
          label: "涉嫌诈骗欺诈",
        },
        {
          value: "8",
          label: "侵犯个人隐私",
        },
        {
          value: "9",
          label: "恶意骚扰行为",
        },
        {
          value: "10",
          label: "恶意发布传播不良信息",
        },
        {
          value: "11",
          label: "恶意评论",
        },
        {
          value: "12",
          label: "其他",
        },
      ], // 其他投诉
      params: {
        complaintVal: "",
        complaintText: "",
        complaintImage: [],
      },
      uploadData: {
        up_tag: "avatar",
      },
      states: "",
    };
  },
  mounted() {
    this.setComplaintType();
  },
  methods: {
    setComplaintType() {
      this.complaintType =
        this.states == 0
          ? this.enterpriseType
          : this.states == 1
          ? this.personageType
          : this.surplusType;
    },
    // 投诉提交
    clickComplaint() {
      const that = this;
      let params = {
        complaint_type: this.states == 0 ? 1 : this.states == 1 ? 2 : 3, //投诉类型 1.企业投诉人才 2.人才投诉企业 3.其他投诉
        receive_complaint_uid: this.uId?this.uId:"", //被投诉用户ID
        company_id: this.states == 1 ? this.id : "", // 企业ID 备注：人才投诉企业的时候传
        images: this.params.complaintImage.join(),
        content: this.params.complaintVal + " - " + this.params.complaintText,
      };
      
      that.$axios
        .post("/api/complaint/create", params)
        .then((res) => {
          if (res.code == 0) {
            this.clickClose();
            return;
          }
          this.$message.error(res.msg);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 上传文件得校验
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG =
        file.type == "image/png" ||
        "image/jpeg" ||
        "image/jpg" ||
        "image/gif" ||
        "image/webp";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 上传图片文件
    uploadArticleCover(param) {
      console.log(param.file);
      const formData = new FormData();
      formData.append("file[]", param.file);
      formData.append("pictureCategory", "articleCover");
      formData.append("up_tag", "avatar");
      this.$axios
        .post("/api/upload", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          this.params.complaintImage = [
            ...this.params.complaintImage,
            res.data.upload_files,
          ];
        })
        .catch((e) => {
          console.log("erro");
          this.$refs["upload"].clearFiles();
        });
    },
    // 删除图片
    clickDelDate(i) {
      this.params.complaintImage.splice(i, 1);
    },
    // 客服
    clickService() {
      this.clickClose();
      this.$bus.$emit("receiveParams", {
        type: "navbarMag",
        laiyuan: "nav",
        infoData: {},
      });
    },
    // 关闭弹窗
    clickClose() {
      this.isComplaint = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.content-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  padding: 20px;
  padding-top: 0;
  border-radius: 4px;
  // box-shadow: 0 0 16px 0 #8b98a9;
  background-color: #fff;

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    i {
      cursor: pointer;
    }
  }

  .passive {
    font-size: 14px;
    color: #555;
    margin-bottom: 16px;
    span {
      font-size: 16px;
      color: #333;
      font-weight: bold;
    }
  }

  .complaint-sel,
  .complaint-int {
    width: 100%;
    margin-bottom: 16px;
  }

  .title {
    margin-bottom: 16px;
    font-size: 16px;
    color: #333;
    font-weight: bold;
    span {
      color: #999;
      font-size: 12px;
      font-weight: normal;
      padding-left: 8px;
    }
  }

  .upload {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 6px;
    .add-image,
    .complaint-image {
      width: 100px;
      height: 100px;
      position: relative;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 6px;
      overflow: hidden;
      border: 1px dashed rgba(30, 197, 216, 0.5);
      img {
        width: 100%;
        height: auto;
      }
    }

    .complaint-image {
      i {
        cursor: pointer;
        position: absolute;
        top: 4px;
        right: 4px;
        color: #999;
      }
    }
    .add-image {
      display: flex;
      margin-right: 0;
      align-items: center;
      justify-content: center;
      background-color: rgba(30, 197, 216, 0.2);
    }
  }

  .service {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0px;
    margin-bottom: 16px;
    font-size: 12px;
    color: #555;
    border: 1px dashed rgba(30, 197, 216, 0.5);
    span {
      cursor: pointer;
      color: rgb(30, 197, 216);
    }
  }

  .tips {
    font-size: 12px;
    color: #999;
    line-height: 18px;
    margin-bottom: 16px;
  }

  .complaint-sub {
    width: 100%;
    color: #fff;
    background-color: rgb(30, 197, 216);
  }
}

.content-box,
.el-dialog__body {
  padding: 0 !important;
}
.el-dialog__header{
  display: none!important;
}
</style>