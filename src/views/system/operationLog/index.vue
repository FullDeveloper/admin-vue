<template>
    <div class="app-container calendar-list-container">
        <!--过滤条件-->
        <div class="filter-container">
            <el-input style="width: 200px;" v-model="listQuery.logName" class="filter-item" placeholder="名称"/>

            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
            <!--<el-button class="filter-item" type="primary" v-waves icon="el-icon-download">导出</el-button>-->
        </div>

        <!--表格主体-->
        <el-table key='tableKey' :data="list" align="center" label="序号" width="100px" v-loading="listLoading"
                  element-loading-text="loading...." @row-click="handleShow"
                  border fit highlight-current-row style="width: 100%">

                    <el-table-column align="center" label="Id" width="65">
                        <template slot-scope="scope">
                            <span>{{scope.row.id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="日志名称">
                        <template slot-scope="scope">
                            <span>{{scope.row.logName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="日志类型">
                        <template slot-scope="scope">
                            <span>{{scope.row.logType}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="请求api的名称">
                        <template slot-scope="scope">
                            <span>{{scope.row.apiUrl}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="请求参数">
                        <template slot-scope="scope">
                            <span>{{scope.row.params | paramsFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="返回结果">
                        <template slot-scope="scope">
                            <span>{{scope.row.result | paramsFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="请求方式">
                        <template slot-scope="scope">
                            <span>{{scope.row.method}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="响应码">
                        <template slot-scope="scope">
                            <span>{{scope.row.responseCode}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="请求开始时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.startTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="请求结束时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.endTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="请求耗时">
                      <template slot-scope="scope">
                        <span>{{scope.row.milliseconds}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column  align="center" label="创建人">
                      <template slot-scope="scope">
                        <span>{{scope.row.optionId}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column  align="center" label="备注">
                        <template slot-scope="scope">
                            <span>{{scope.row.message}}</span>
                        </template>
                    </el-table-column>

        </el-table>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="listQuery.page" :page-sizes="[10,20,30,40]" :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

      <el-dialog title="查看详情" :visible.sync="dialogFormVisible">
          <tree-view :data="jsonSource" :options="{maxDepth: 3}"></tree-view>
      </el-dialog>

    </div>
</template>

<script>
    import { fetchList } from '@/api/admin/operationLog'
    import waves from '@/directive/waves' // 水波纹指令
    export default {
      name: 'operationLog',
      directives: {
        waves
      },
      data() {
        return {
          jsonSource: null,
          list: null,
          total: null,
          listLoading: true,
          listQuery: {
            page: 1,
            limit: 20,
            logName: undefined
          },
          dialogFormVisible: false
        }
      },
      created() {
        this.getList()
      },
      computed: {

      },
      filters: {
        paramsFilter(value) {
          if (value && value.length > 20) {
            return value.substring(0, 20) + '...'
          }
          return value
        }
      },
      methods: {
        handleShow(row, event, column) {
          console.log('row=>', row)
          var temp = Object.assign({}, row)
          temp.params = JSON.parse(row.params)
          temp.result = JSON.parse(row.result)
          this.jsonSource = temp
          this.dialogFormVisible = true
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
