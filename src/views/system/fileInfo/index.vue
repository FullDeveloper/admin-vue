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
                    <el-table-column  align="center" label="系统生成的一个文件标识编号">
                        <template slot-scope="scope">
                            <span>{{scope.row.fileId}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="文件物理名称">
                        <template slot-scope="scope">
                            <span>{{scope.row.physicsName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="文件物理存储路径">
                        <template slot-scope="scope">
                            <span>{{scope.row.physicsRoute}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="文件相对路径">
                        <template slot-scope="scope">
                            <span>{{scope.row.relativePath}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="文件大小">
                        <template slot-scope="scope">
                            <span>{{scope.row.fileSize}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="创建时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="文件类型">
                        <template slot-scope="scope">
                            <span>{{scope.row.fileType}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="创建人">
                        <template slot-scope="scope">
                            <span>{{scope.row.uploadUser}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="标准MIMETYPE">
                        <template slot-scope="scope">
                            <span>{{scope.row.mimeType}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="扩展名">
                        <template slot-scope="scope">
                            <span>{{scope.row.extendName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="封面文件对于流媒体有">
                        <template slot-scope="scope">
                            <span>{{scope.row.faceFile}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="水印文件图片和PDF目前才有">
                        <template slot-scope="scope">
                            <span>{{scope.row.waterMakeFile}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="64x64图片">
                        <template slot-scope="scope">
                            <span>{{scope.row.file64}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="128x128的图片">
                        <template slot-scope="scope">
                            <span>{{scope.row.file128}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="256x256图片">
                        <template slot-scope="scope">
                            <span>{{scope.row.file256}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="512x512图片">
                        <template slot-scope="scope">
                            <span>{{scope.row.file512}}</span>
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
                <el-form-item label="系统生成的一个文件标识编号" prop="fileId">
                    <el-input v-model="temp.fileId" placeholder="请输入系统生成的一个文件标识编号"></el-input>
                </el-form-item>
                <el-form-item label="文件物理名称" prop="physicsName">
                    <el-input v-model="temp.physicsName" placeholder="请输入文件物理名称"></el-input>
                </el-form-item>
                <el-form-item label="文件物理存储路径" prop="physicsRoute">
                    <el-input v-model="temp.physicsRoute" placeholder="请输入文件物理存储路径"></el-input>
                </el-form-item>
                <el-form-item label="文件相对路径" prop="relativePath">
                    <el-input v-model="temp.relativePath" placeholder="请输入文件相对路径"></el-input>
                </el-form-item>
                <el-form-item label="文件大小" prop="fileSize">
                    <el-input v-model="temp.fileSize" placeholder="请输入文件大小"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="createTime">
                    <el-input v-model="temp.createTime" placeholder="请输入创建时间"></el-input>
                </el-form-item>
                <el-form-item label="文件类型" prop="fileType">
                    <el-input v-model="temp.fileType" placeholder="请输入文件类型"></el-input>
                </el-form-item>
                <el-form-item label="创建人" prop="uploadUser">
                    <el-input v-model="temp.uploadUser" placeholder="请输入创建人"></el-input>
                </el-form-item>
                <el-form-item label="标准MIMETYPE" prop="mimeType">
                    <el-input v-model="temp.mimeType" placeholder="请输入标准MIMETYPE"></el-input>
                </el-form-item>
                <el-form-item label="扩展名" prop="extendName">
                    <el-input v-model="temp.extendName" placeholder="请输入扩展名"></el-input>
                </el-form-item>
                <el-form-item label="封面文件对于流媒体有" prop="faceFile">
                    <el-input v-model="temp.faceFile" placeholder="请输入封面文件对于流媒体有"></el-input>
                </el-form-item>
                <el-form-item label="水印文件图片和PDF目前才有" prop="waterMakeFile">
                    <el-input v-model="temp.waterMakeFile" placeholder="请输入水印文件图片和PDF目前才有"></el-input>
                </el-form-item>
                <el-form-item label="64x64图片" prop="file64">
                    <el-input v-model="temp.file64" placeholder="请输入64x64图片"></el-input>
                </el-form-item>
                <el-form-item label="128x128的图片" prop="file128">
                    <el-input v-model="temp.file128" placeholder="请输入128x128的图片"></el-input>
                </el-form-item>
                <el-form-item label="256x256图片" prop="file256">
                    <el-input v-model="temp.file256" placeholder="请输入256x256图片"></el-input>
                </el-form-item>
                <el-form-item label="512x512图片" prop="file512">
                    <el-input v-model="temp.file512" placeholder="请输入512x512图片"></el-input>
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
    import { fetchList, getObj, delObj, putObj, addObj } from '@/api/admin/fileInfo'
    import waves from '@/directive/waves' // 水波纹指令
    export default {
      name: 'fileInfo',
      directives: {
        waves
      },
      data() {
        return {
          temp: {
            fileId: undefined,
            physicsName: undefined,
            physicsRoute: undefined,
            relativePath: undefined,
            fileSize: undefined,
            createTime: undefined,
            fileType: undefined,
            uploadUser: undefined,
            mimeType: undefined,
            extendName: undefined,
            faceFile: undefined,
            waterMakeFile: undefined,
            file64: undefined,
            file128: undefined,
            file256: undefined,
            file512: undefined
          },
          rules: {
            fileId: [{ required: true, message: '请输入系统生成的一个文件标识编号', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            physicsName: [{ required: true, message: '请输入文件物理名称', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            physicsRoute: [{ required: true, message: '请输入文件物理存储路径', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            relativePath: [{ required: true, message: '请输入文件相对路径', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            fileSize: [{ required: true, message: '请输入文件大小', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            createTime: [{ required: true, message: '请输入创建时间', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            fileType: [{ required: true, message: '请输入文件类型', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            uploadUser: [{ required: true, message: '请输入创建人', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            mimeType: [{ required: true, message: '请输入标准MIMETYPE', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            extendName: [{ required: true, message: '请输入扩展名', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            faceFile: [{ required: true, message: '请输入封面文件对于流媒体有', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            waterMakeFile: [{ required: true, message: '请输入水印文件图片和PDF目前才有', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            file64: [{ required: true, message: '请输入64x64图片', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            file128: [{ required: true, message: '请输入128x128的图片', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            file256: [{ required: true, message: '请输入256x256图片', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
            file512: [{ required: true, message: '请输入512x512图片', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }]
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
            fileId: undefined,
            physicsName: undefined,
            physicsRoute: undefined,
            relativePath: undefined,
            fileSize: undefined,
            createTime: undefined,
            fileType: undefined,
            uploadUser: undefined,
            mimeType: undefined,
            extendName: undefined,
            faceFile: undefined,
            waterMakeFile: undefined,
            file64: undefined,
            file128: undefined,
            file256: undefined,
            file512: undefined
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
