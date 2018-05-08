<template>
  <div class="app-container calendar-list-container">
    <!--过滤条件-->
    <div class="filter-container">
      <el-input style="width: 200px;" v-model="listQuery.name" class="filter-item" placeholder="名称"/>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleGenerator()" type="primary" icon="el-icon-edit">代码生成</el-button>
      <!--<el-button class="filter-item" type="primary" v-waves icon="el-icon-download">导出</el-button>-->
    </div>

    <!--表格主体-->
    <el-table key='tableKey' :data="list"
              @selection-change="handleSelectionChange"
              align="center" label="序号" width="65" v-loading="listLoading"
              element-loading-text="loading...."
              border fit highlight-current-row style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center"  label="表名称">
        <template slot-scope="scope">
          <span>{{scope.row.tableName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="表备注">
        <template slot-scope="scope">
          <span>{{scope.row.tableComment}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" >
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="148" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[5,10,15,20]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="代码生成" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="80px"
               style='margin-left:50px;'>
        <el-row>
          <el-col :span="12">
            <el-form-item label="模块名称" prop="moduleName">
              <el-input type="text" v-model="temp.moduleName" placeholder="例如：admin"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="压缩包名" prop="zipName">
              <el-input type="text" v-model="temp.zipName" placeholder="例如：code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="表名前缀" prop="tablePrefixName">
              <el-input type="text" v-model="temp.tablePrefixName" placeholder="例如：sys_"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="包名" prop="packageName">
              <el-input v-model="temp.packageName" placeholder="例如：com.template.provider.admin"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="作者" prop="author">
              <el-input type="text" v-model="temp.author" placeholder="例如：ZhouRunBin"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="temp.email" placeholder="例如：1875222156@qq.com"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="generatorCode">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
    import { fetchTableList, generatorCode } from '@/api/generator'
    import waves from '@/directive/waves' // 水波纹指令
    export default {
      name: 'GeneratorList',
      directives: {
        waves
      },
      data() {
        return {
          multipleSelection: null,
          listLoading: false,
          dialogStatus: 'create',
          dialogFormVisible: false,
          listQuery: {
            name: '',
            page: 1,
            limit: 5
          },
          temp: {
            tableName: '',
            tablePrefixName: '',
            author: '',
            email: '',
            packageName: '',
            moduleName: '',
            zipName: ''

          },
          list: null,
          total: null,
          rules: {
            name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
            tips: [{ required: true, message: '请输入提示信息', trigger: 'blur' }],
            sort: [{ required: true, message: '请输入排序号', trigger: 'blur' }]
          }
        }
      },
      created() {
        this.getList()
      },
      methods: {
        handleGenerator() {
          if (this.multipleSelection == null || this.multipleSelection.length < 1) {
            this.$notify({
              title: '成功',
              message: '没有选中任何记录',
              type: 'warning',
              duration: 2000
            })
            return
          }
          this.dialogFormVisible = true
        },
        generatorCode() {
          var tableName = []
          for (var i = 0; i < this.multipleSelection.length; i++) {
            tableName.push(this.multipleSelection[i].tableName)
          }
          this.temp.tableName = tableName
          generatorCode(this.temp).then(response => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '代码生成成功',
              type: 'success',
              duration: 2000
            })
          })
        },
        handleSelectionChange(val) {
          console.log('val==>', val)
          this.multipleSelection = val
        },
        getList() {
          this.listLoading = true
          fetchTableList(this.listQuery).then(response => {
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
