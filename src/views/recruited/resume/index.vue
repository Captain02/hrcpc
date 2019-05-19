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
      <el-tooltip class="item" effect="dark" content="导出列：姓名、性别、学号、手机号、学院、专业、QQ、微信、状态" placement="top">
        <el-button type="success" class="filter-right-btn" @click="exportExcel" size="small">导出Excel</el-button>
      </el-tooltip>
      <el-dropdown trigger="click" style="float: right;">
        <el-button type="primary" size="small">更改显示列</el-button>
        <el-dropdown-menu slot="dropdown">
          <template v-for="column in columns">
            <el-checkbox v-if="!column.hiddenInCheck" :value="!column.hidden" @change="handleChange($event, column)" class="el-dropdown-menu__item dropdown-check" :key="column.attrs.prop">{{column.attrs.label}}</el-checkbox>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <s-table :columns="columns" :data="resumeList" size="medium">
      <template v-slot:avatar="{scope}">
        <div class="table-avatar">
          <el-image :src="scope.row.filepath" alt="头像" >
            <div slot="error" class="image-slot">
              <icon-svg icon-class="img-load-fail"></icon-svg>
              <!-- <i class="el-icon-picture-outline"></i> -->
            </div>
          </el-image>
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
      countNum: {
        'total': 0,         // 全部
        '1': 0,             // 录用
        '2': 0,             // 未录用
        '3': 0,             // 面试
        '4': 0,             // 笔试
        '5': 0              // 未处理
      },
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
    },
    handleChange(value, column) {
      column.hidden = !value
    },
    exportExcel() {
      window.open(`http://192.168.137.182:8081/HBO/sys/resume/exportExcel?corId=${this.corid}`)
    }
  },
  mounted() {
    this.getResumeList()
  }
}
</script>
<style lang="less">
.count-card{
  .el-card__body{
     padding: 10px;
  }
}
</style>
