<template>
  <div class="app-container">
    <count-panel :count-data="countNum"/>

    <h1 class="page-title"> 纳新信息 </h1>

    <div class="filter-container">
      <el-select class="filter-item" v-model="listQuery.status" placeholder="状态" style="width: 100px;" size="small">
        <el-option v-for="item in options" :key="item.id" :label="item.text" :value="item.value"></el-option>
      </el-select>
      <el-input class="filter-item" v-model="listQuery.name" placeholder="姓名" style="width: 200px;" size="small "></el-input>
      <el-input class="filter-item" v-model="listQuery.persionNum" placeholder="学号" style="width: 200px;" size="small"></el-input>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-circle-plus-outline">添加新简历</el-button>
      <el-button type="success" class="filter-right-btn" size="small">导出Excel</el-button>
      <el-dropdown trigger="click" style="float: right;">
        <el-button type="primary" size="small">选择隐藏列</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-checkbox v-model="column.hidden" class="el-dropdown-menu__item dropdown-check" v-for="column in columns" :key="column.attrs.prop">{{column.attrs.label}}</el-checkbox>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <s-table :columns="columns" :data="resumeList" size="medium">
      <template v-slot:avatar="{scope}">
        <div class="avatar-wrapper">
          <img :src="scope.row.filepath" alt="头像">
        </div>
      </template>
      <template v-slot:status="{scope}">
        <template v-for="item in options">
          <el-tag v-if="item.value == scope.row.status" size="small" :key="item.id" :type="item.tagType">{{item.text}}</el-tag>
        </template>
      </template>
      <template v-slot:action="{scope}">
        <details-resume class="handle-btn" :data="scope.row">
          <template v-slot:action-btn>
            <el-button type="text" size="small" >查看</el-button>
          </template>
        </details-resume>
        <edit-resume class="handle-btn" :data="scope.row" @on-edit-success="getResumeList">
          <template v-slot:action-btn>
            <el-button type="text" size="small" >编辑</el-button>
          </template>
        </edit-resume>
        <el-button type="text" size="small" @click="deleteResume(scope.row)">删除</el-button>
      </template>
    </s-table>
    <pagination v-show="total>0" :total="total" :curr.sync="listQuery.currPage" :size.sync="listQuery.pageSize" @on-page-change="getResumeList" />
    <el-dialog></el-dialog>
  </div>
</template>
<script>
import { getResumes as getResumesApi, deleteResume as deleteResumeApi } from '@/api/recruited/resume'
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
import { columns, options } from './data'
import STable from '_c/STable'
import Pagination from '_c/Pagination'
import countPanel from './count-panel'
import detailsResume from './details'
import editResume from './edit'
export default {
  name: 'resume-list',
  components: {
    STable,
    Pagination,
    countPanel,
    detailsResume,
    editResume
  },
  data() {
    return {
      listQuery: {
        status: '',
        name: '',
        persionNum: '',
        currPage: 1,
        pageSize: 10
      },
      countNum: {},
      resumeList: [],
      total: 0,
      columns,
      options
    }
  },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid
    })
  },
  methods: {
    handleSearch() {
      this.getResumeList()
    },
    getResumeList() {
      getResumesApi(this.corid, this.listQuery).then((result) => {
        console.log('简历列表', result)
        let { data, page, count } = result
        this.resumeList = data
        this.total = page.totalCount
        this.countNum = count
      }).catch((err) => {})
    },
    deleteResume(resume) {
      let id = resume.user_id
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteResumeApi(id).then((result) => {
          console.log('删除简历信息', result)
          this.$message.success('删除成功')
          this.getResumeList()
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {})
    }
  },
  mounted() {
    this.getResumeList()
  }
}
</script>
<style lang="less" scoped>
.avatar-wrapper {
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
  }
}
.dropdown-check {
  display: block;
  margin-right: 0;
}
</style>
<style lang="less">
.count-card{
  .el-card__body{
     padding: 10px;
  }
}
</style>
