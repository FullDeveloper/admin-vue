<template>
    <div class="app-container calendar-list-container">
        <!--过滤条件-->
        <div class="filter-container">
            <el-input style="width: 200px;" v-model="listQuery.name" class="filter-item" placeholder="名称"/>

            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
            <!--<el-button class="filter-item" type="primary" v-waves icon="el-icon-download">导出</el-button>-->
        </div>

        <!--表格主体-->
        <el-table key='tableKey' :data="list" align="center" label="序号" width="65" v-loading="listLoading"
                  element-loading-text="loading...."
                  border fit highlight-current-row style="width: 100%">

                    <el-table-column align="center" label="Id" width="100px">
                        <template slot-scope="scope">
                            <span>{{scope.row.id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="通知标题">
                        <template slot-scope="scope">
                            <span>{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="通知类型">
                        <template slot-scope="scope">
                            <span>{{scope.row.type}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="通知内容">
                        <template slot-scope="scope">
                            <span>{{scope.row.content}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="创建时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="创建人">
                        <template slot-scope="scope">
                            <span>{{scope.row.createUser}}</span>
                        </template>
                    </el-table-column>

            <el-table-column align="center" label="操作" width="148" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button type="danger"  size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="listQuery.page" :page-sizes="[10,20,30,40]" :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="80px"
                     style='margin-left:50px;'>
                <el-form-item label="通知标题" prop="title">
                    <el-input v-model="temp.title" placeholder="请输入通知标题"></el-input>
                </el-form-item>
                <el-form-item label="通知类型" prop="type">
                    <el-input v-model="temp.type" placeholder="请输入通知类型"></el-input>
                </el-form-item>
                <el-form-item label="通知内容" prop="content">
                    <el-input v-model="temp.content" placeholder="请输入通知内容"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="createTime">
                    <el-input v-model="temp.createTime" placeholder="请输入创建时间"></el-input>
                </el-form-item>
                <el-form-item label="创建人" prop="createUser">
                    <el-input v-model="temp.createUser" placeholder="请输入创建人"></el-input>
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
    import { fetchList, delObj, putObj, addObj } from '@/api/admin/notice'
    import waves from '@/directive/waves' // 水波纹指令
    export default {
      name: 'notice',
      directives: {
        waves
      },
      data() {
        return {
          temp: {
            title: undefined,
            type: undefined,
            content: undefined,
            createTime: undefined,
            createUser: undefined
          },
          rules: {
            title: [{ required: true, message: '请输入通知标题', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            type: [{ required: true, message: '请输入通知类型', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            content: [{ required: true, message: '请输入通知内容', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            createTime: [{ required: true, message: '请输入创建时间', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            createUser: [{ required: true, message: '请输入创建人', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }]
          },
          list: null,
          total: null,
          listLoading: true,
          listQuery: {
            page: 1,
            limit: 20,
            name: undefined
          },
          dialogFormVisible: false,
          dialogStatus: '',
          textMap: {
            update: '编辑',
            create: '创建'
          }
        }
      },
      created() {
        this.getList()
      },
      computed: {

      },
      filters: {

      },
      methods: {
        handleCreate() {
          this.resetTemp()
          this.dialogStatus = 'create'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        },
        createData() {
          const set = this.$refs
          set['dataForm'].validate((valid) => {
            if (valid) {
              addObj(this.temp).then(() => {
                this.getList()
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success',
                  duration: 2000
                })
              })
            }
          })
        },
        handleUpdate(row) {
          this.temp = Object.assign({}, row)
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        },
        updateData() {
          const set = this.$refs
          set['dataForm'].validate((valid) => {
            if (valid) {
              const tempData = Object.assign({}, this.temp)
              putObj(tempData.id, tempData).then(() => {
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
        handleDelete(row) {
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delObj(row.id).then(() => {
              this.getList()
              this.$message({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
            })
          }).catch(() => {

          })
        },
        resetTemp() {
          this.temp = {
            title: undefined,
            type: undefined,
            content: undefined,
            createTime: undefined,
            createUser: undefined
          }
        },
        getList() {
          this.listLoading = true
          fetchList(this.listQuery).then(response => {
            this.listLoading = false
            this.list = response.data.rows
            this.total = response.data.total
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
