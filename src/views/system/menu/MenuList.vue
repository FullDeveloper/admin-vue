<template>
  <div class="app-container calendar-list-container">
    <!--过滤条件-->
    <div class="filter-container">
      <el-input style="width: 200px;" v-model="listQuery.name" class="filter-item" placeholder="名称"/>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">添加
      </el-button>
      <!--<el-button class="filter-item" type="primary" v-waves icon="el-icon-download">导出</el-button>-->
    </div>

    <!--表格主体-->
    <tree-table :data="list" :evalFunc="func" :expandAll="expandAll" border>
      <el-table-column label="菜单名称" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单图标" align="center">
        <template slot-scope="scope">
          {{scope.row.icon}}
        </template>
      </el-table-column>
      <el-table-column label="请求地址" align="center">
        <template slot-scope="scope">
          {{scope.row.url}}
        </template>
      </el-table-column>
      <el-table-column label="菜单层级" align="center">
        <template slot-scope="scope">
          {{scope.row.level}}
        </template>
      </el-table-column>
      <el-table-column label="菜单类型" align="center">
        <template slot-scope="scope">
          {{scope.row.type | typeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="排序字段" align="center">
        <template slot-scope="scope">
          {{scope.row.sort}}
        </template>
      </el-table-column>
      <el-table-column label="菜单状态" align="center">
        <template slot-scope="scope">
          {{scope.row.status === 0 ? '禁用':'启用'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
         </template>
      </el-table-column>
    </tree-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="80px"
               style='margin-left:50px;'>

        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="name">
              <el-input type="text" v-model="temp.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="菜单图标" prop="icon">
              <el-input v-model="temp.icon"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="请求地址" prop="url">
          <el-input v-model="temp.url"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单层级" prop="level">
              <el-input type="number" v-model="temp.level"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单类型" prop="type">
              <el-select clearable v-model="temp.type" placeholder="菜单类型" style="width: 140px" class="filter-item">
                <el-option v-for="item in menuTypes" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单编号" prop="code">
              <el-input v-model="temp.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父级编号" prop="pcode">
              <tree-select
              v-model="temp.pcode"
              :options="source"
              placeholder="请选择父级菜单"
            />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序字段" prop="sort">
              <el-input type="number" v-model="temp.sort"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <el-form-item label="菜单状态" prop="status">
              <el-select clearable v-model="temp.status" placeholder="菜单类型" style="width: 140px" class="filter-item">
                <el-option v-for="item in menuStatus" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="提示信息" prop="tips">
          <el-input v-model="temp.tips"></el-input>
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
  import { fetchTreeList, createMenu, fetchTreeNode, updateMenu } from '@/api/menu'
  import waves from '@/directive/waves' // 水波纹指令
  import treeSelect from '@riophae/vue-treeselect'
  import treeTable from '@/components/TreeTable'
  import treeToArray from '@/components/TreeTable/customEval'

  export default {
    name: 'MenuList',
    components: { treeTable, treeSelect },
    directives: {
      waves
    },
    data() {
      return {
        // args: [null, null, 'timeLine'],
        menuTypes: [{ id: '0', label: '菜单' }, { id: '1', label: '按钮' }, { id: '2', label: 'Api权限' }],
        menuStatus: [{ id: '0', label: '禁用' }, { id: '1', label: '启用' }],
        func: treeToArray,
        source: [{ id: 'node-2', label: 'Node 2' }],
        expandAll: false,
        listLoading: false,
        dialogStatus: 'create',
        textMap: {
          update: '修改',
          create: '新增'
        },
        dialogFormVisible: false,
        listQuery: {
          page: 1,
          limit: 10
        },
        list: null,
        total: null,
        rules: {
          name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          tips: [{ required: true, message: '请输入提示信息', trigger: 'blur' }],
          sort: [{ required: true, message: '请输入排序号', trigger: 'blur' }]
        },
        temp: {
          id: null,
          name: '',
          icon: '',
          url: '',
          level: '',
          type: '',
          code: '',
          pcode: '0',
          sort: '',
          status: '',
          tips: ''
        }
      }
    },
    created() {
      this.getList()
      this.getTreeNode()
    },
    filters: {
      typeFilter(key) {
        console.log(key)
        if (key === 0) {
          return '菜单'
        }
        if (key === 1) {
          return '按钮'
        }
        if (key === 2) {
          return 'Api权限'
        }
      }
    },
    methods: {
      resetTemp() {
        this.temp = {
          id: null,
          name: '',
          icon: '',
          url: '',
          level: '',
          type: '',
          code: '',
          pcode: '0',
          sort: '',
          status: '',
          tips: ''
        }
      },
      handleUpdate(row) {
        console.log('row=>', row)
        this.temp = Object.assign({}, row) // copy obj
        this.temp.level = row.level + ''
        this.temp.type = row.type + ''
        this.temp.sort = row.sort + ''
        this.temp.pcode = row.pcode + ''
        this.temp.status = row.status + ''
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.pcode = this.temp.pcode == null || '' ? '0' : this.temp.pcode
            const tempData = Object.assign({}, this.temp)
            console.log('tempData=>', tempData)
            delete tempData.children
            delete tempData.parent
            updateMenu(tempData).then(() => {
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
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log(this.temp.pcode)
            this.temp.pcode = this.temp.pcode == null || '' ? '0' : this.temp.pcode
            createMenu(this.temp).then(() => {
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
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
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
      },
      getList() {
        this.listLoading = true
        fetchTreeList(this.listQuery).then(response => {
          this.listLoading = false
          this.list = response.data.rows
          this.total = response.data.total
          console.log('response.data==>', response.data)
        })
      },
      getTreeNode() {
        fetchTreeNode().then(response => {
          console.log('response=>', response)
          this.source = response.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
