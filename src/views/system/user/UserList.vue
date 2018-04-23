<template>
  <div class="app-container calendar-list-container">
    <!--过滤条件-->
    <div class="filter-container">
      <el-input style="width: 200px;" v-model="listQuery.name" class="filter-item" placeholder="姓名"/>

      <el-select clearable v-model="listQuery.status" placeholder="状态" style="width: 140px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.value" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">添加
      </el-button>
      <!--<el-button class="filter-item" type="primary" v-waves icon="el-icon-download">导出</el-button>-->
    </div>

    <!--表格主体-->
    <el-table key='tableKey' :data="list" align="center" label="序号" width="65" v-loading="listLoading"
              element-loading-text="loading...."
              border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" width="120" label="账号">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="50px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sex === 1 ? '男':'女'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="120" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status === 0 ? '未审核':(scope.row.status === 1 ?
            '启用' : '禁用')}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="148" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30,40]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='margin-left:50px;'>
        <el-form-item label="账号" prop="username" v-if="dialogStatus=='create'">
          <el-input v-model="temp.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="dialogStatus=='create'">
          <el-input v-model="temp.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="temp.phone"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="temp.birthday" type="date" placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select clearable v-model="temp.sex" placeholder="性别" style="width: 140px" class="filter-item">
            <el-option v-for="item in sexOptions" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确认</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import { fetchList, createUser, updateUser, deleteUser } from '@/api/user'
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    name: 'UserList',
    directives: {
      waves
    },
    data() {
      return {
        dialogStatus: 'create',
        sexOptions: [{ key: '1', value: '男' }, { key: '0', value: '女' }],
        statusOptions: [{ key: '0', value: '未审核' }, { key: '1', value: '启用' }, { key: '2', value: '已删除' }],
        listLoading: false,
        listQuery: {
          status: '',
          name: '',
          page: 1,
          limit: 10
        },
        textMap: {
          update: '修改',
          create: '新增'
        },
        dialogFormVisible: false,
        temp: {
          id: null,
          username: '',
          password: '',
          email: '',
          phone: '',
          name: '',
          birthday: '',
          sex: ''
        },
        list: null,
        total: null,
        rules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }],
          phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
          birthday: [{ required: true, message: '请选择日期', trigger: 'blur' }]
        }
      }
    },
    created() {
      this.getList()
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          0: 'gray',
          2: 'danger'
        }
        console.log('==>', statusMap[status])
        return statusMap[status]
      }
    },
    methods: {
      handleDelete(row) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser(row).then(() => {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        }).catch(() => {
          /* this.$message({
            type: 'info',
            message: '已取消删除'
          })*/
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            createUser(this.temp).then(() => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleUpdate(row) {
        console.log(row)
        this.temp = Object.assign({}, row) // copy obj
        this.temp.sex = row.sex + ''
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            updateUser(tempData).then(() => {
              /* for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }*/
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          username: '',
          name: '',
          password: '',
          email: '',
          phone: '',
          birthday: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.rows
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      }
    }
  }

</script>

<style scoped>

</style>
