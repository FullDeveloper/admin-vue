<template>
  <div class="app-container calendar-list-container">
    <!--过滤条件-->
    <div class="filter-container">
      <el-input  style="width: 200px;"
                 class="filter-item"
                 placeholder="用户名称" />

      <el-select clearable v-model="listQuery.status" placeholder="状态" style="width: 140px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" >查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;"  type="primary" icon="el-icon-edit">添加</el-button>
      <el-button class="filter-item" type="primary"  v-waves icon="el-icon-download" >导出</el-button>
    </div>

    <!--表格主体-->
    <el-table key='tableKey' :data="list" align="center" label="序号" width="65" v-loading="listLoading" element-loading-text="loading...."
              border fit highlight-current-row  style="width: 100%">
      <el-table-column>
          <span>1</span>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'UserList',
    data() {
      return {
        statusOptions: ['published', 'draft', 'deleted'],
        listLoading: false,
        listQuery: {
          status: ''
        },
        list: [
          {
            'name': '123'
          }
        ],
        total: 3
      }
    }
  }

</script>

<style scoped>

</style>
