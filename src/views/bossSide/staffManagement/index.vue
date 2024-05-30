<template>
  <div class="bossSide-container">
    <div class="m-box staffManagement">
      <!-- <div class="search-bar">
        <el-form ref="form" size="small" :model="search" inline label-width="120px">
          <el-form-item label="姓名">
            <el-input v-model="search.name" />
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="search.email" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getTableData">查询</el-button>
          </el-form-item>
        </el-form>
      </div> -->
      <div class="btn">
        <el-button type="primary" size="small" @click="addAccount">新增员工</el-button>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 + (paginationData.currentPage - 1) * paginationData.pageSize }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="staff_name" label="姓名"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="company_name" label="公司"></el-table-column>
          <el-table-column label="岗位">
            <template slot-scope="scope">
              <span>{{ scope.row.role_desc?scope.row.role_desc:'暂无' }}</span>
              <!-- <span class="blue">导出</span> -->
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80px">
            <template slot-scope="scope">
              <span class="blue" @click.stop="handleUpdateInfo(scope.row)">修改</span>
              <span class="blue" @click.stop="deleteDateInfo(scope.row)" v-if="scope.row.is_boss == 2">删除</span>
              <!-- <span class="blue">导出</span> -->
            </template>
          </el-table-column>
        </el-table>
          <!-- 分页控制 -->
          <!-- <mPagination :data="paginationData" @pageChangeEvent="pageHasChanged"></mPagination> -->
      </div>
    </div>

    <div class="centent-dialog">
      <el-dialog :title="dialog_title" :visible.sync="addDialog.visible" width="600px">
        <el-form
          ref="addForm"
          :model="addDialog.form"
          :rules="addRules"
          size="small"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addDialog.form.staff_name" />
          </el-form-item>
          <el-form-item label="电话" prop="phone" style="margin-top: 12px">
            <el-input v-model="addDialog.form.phone" />
          </el-form-item>
          <el-form-item label="密码" prop="phone">
            <el-input v-model="addDialog.form.password" type="password" name="password" placeholder="密码：8-16位字母、数字、字符，不支持空格" show-password></el-input>
          </el-form-item>
          <el-form-item label="岗位" prop="role_id" style="margin-top: 12px">
            <el-select
              v-model="addDialog.form.role_id"
              style="width: 100%"
            >
              <el-option
                v-for="item in roleList"
                :key="item.role_name"
                :label="item.role_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="岗位" prop="role_id" style="margin-top: 12px">
            <el-radio-group v-model="addDialog.form.is_core_team_member">
              <el-radio label="2">非核心成员</el-radio>
              <el-radio label="1">核心成员</el-radio>
            </el-radio-group>
          </el-form-item>
          
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            size="small"
            @click="addDialog.visible = false"
          >取消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="handleAddAcount"
          >确认</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mPagination from '@/components/m-pagination';
export default {
  name: 'staffManagement',
  components: {
    mPagination,
  },
  data() {
    return {
      loading: false,
      search: {
        name: '',
      },
      tableData: [],
      roleList: [],
      // 分页数据
      paginationData: {
        total: 10,
        currentPage: 1,
        pageSize: 20,
      },
      dialog: {
        visible: false,
        row: {
          role_value: []
        }
      },
      addDialog: {
        visible: false,
        form: {

        },
        row: {
          role_value: []
        }
      },
      addRules: {
        staff_name : [{ required: true, message: '填写姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '填写电话', trigger: 'blur' }],
        password: [{ required: true, message: '填写密码', trigger: 'blur' }],
      },
      type:'create', // create 新增；  edit 修改
      id: '',
      dialog_title:'新增员工'
    }
  },
  created() {
  },
  mounted() {
    this.getTableData();
    // 获取企业角色
    this.getRoleList();
  },
  methods: {
    // 获取员工列表
    getTableData() {
      let that = this;
      that.$axios.post('/api/staff/index',{}).then( res =>{
        if(res.code == 0){
          that.tableData = res.data
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 获取企业角色
    getRoleList() {
      let that = this;
      that.$axios.post('/api/staff/role',{}).then( res =>{
        if(res.code == 0){
          that.roleList = res.data
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    handleUpdateInfo(row) {
      console.log(row)
      this.addDialog.form = {
        staff_name: row.staff_name,
        phone: row.phone,
        role_id: row.role_id,
        is_core_team_member:row.is_core_team_member + '', 
        password: row.password?row.password:'',
      }
      this.id = row.id;
      this.type = 'edit';
      this.dialog_title = '修改信息';
      this.addDialog.visible = true
    },
    // 删除用户
    deleteDateInfo(row){
      console.log(row)
      let that = this;
      if(row.is_boss == 1){
        that.$message.error('BOSS角色信息不可删除！');
        return
      }
      that.$axios.post('/api/staff/delete',{
        id: row.id
      }).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message: '删除成功！',
          })
          setTimeout(()=>{
            that.getTableData();
          },1000)
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch( e =>{
        console.log(e)
      })

    },
    // 分页事件
    pageHasChanged() {
      this.getTableData();
    },
    async addAccount() {

      let res =  await this.$axios.post('/api/staff/profile',{});
      if(res.data.vip_rank < 3){
        this.$message.error({
          message: '购买会员后才可操作！'
        })
        setTimeout( () =>{
          this.$router.push('/topUpBuy');
        },1000)
        return
      }
      this.dialog_title = '新增员工';
      this.addDialog.form = {};
      this.addDialog.visible = true;
      
    },
    handleAddAcount() {
      let that = this;
      let type = this.type;
      let form = that.addDialog.form;
      let url = '';
      let message = '';
      if(type == 'create'){
        url = '/api/staff/create';
        message = '添加成功!';
      }
      if(type == 'edit'){
        url = '/api/staff/edit';
        message = '修改成功!';
        form.id = that.id
      }
      that.$axios.post(url,form).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message,
          })
          setTimeout(()=>{
            that.addDialog.visible = false;
            that.getTableData();
          },1000)
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch( e =>{
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.staffManagement {
  height: 100%;
  display: flex;
  flex-direction: column;
  .btn {
    padding: 10px 0px;
    & /deep/ .el-button--primary{
      background: $g_bg;
      border-color: $g_bg;
    }
  }
  .table {
    flex: 1;
    overflow: hidden;
    .blue {
      color: $g_color;
      cursor: pointer;
    }
  }
  .pagination {
    text-align: right;
    padding-top: 10px;
  }
}
.centent-dialog{
  & /deep/ .el-button.el-button--primary{
    background: $g_bg;
    border-color: $g_bg;
  }
  
}
.centent-dialog /deep/ .el-form-item--mini.el-form-item, .centent-dialog /deep/ .el-form-item--small.el-form-item{
    margin-bottom: 0;
  }

</style>
