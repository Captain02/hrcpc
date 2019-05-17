<template>
  <div class="app-container">
    <h1 class="page-title"> 纳新信息 </h1>

    <count-panel/>

    <div class="filter-container">
      <el-select class="filter-item" v-model="listQuery.status" placeholder="状态" style="width: 100px;" size="small">
        <el-option v-for="item in options" :key="item.id" :label="item.text" :value="item.value"></el-option>
      </el-select>
      <el-input class="filter-item" v-model="listQuery.name" placeholder="姓名" style="width: 200px;" size="small"></el-input>
      <el-input class="filter-item" v-model="listQuery.persionNum" placeholder="学号" style="width: 200px;" size="small"></el-input>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <!-- <el-button class="filter-item filter-delete-btn" type="danger" size="medium" icon="el-icon-delete" :disabled="!selectedItemsCount" @click="deleteSelectedItems">删除</el-button> -->
      <s-table :columns="columns" :data="resumeList">
        <template v-slot:avatar="{scope}">
          <div class="avatar-wrapper">
            <img :src="scope.row.filepath" alt="头像">
          </div>
        </template>
        <template v-slot:action="{scope}">
          <!-- <edit-role :data="scope.row" :departs-tree="departList" class="handle-btn" @on-edit-success="getRoleList" v-slot:btn-label>编辑</edit-role> -->
          <el-button type="text" size="small" >查看</el-button>
        </template>
      </s-table>
      <pagination v-show="total>0" :total="total" :curr.sync="listQuery.currPage" :size.sync="listQuery.pageSize" @on-page-change="getResumeList" />
    </div>
  </div>
</template>
<script>
import { getResumes as getResumesApi } from '@/api/recruited/resume'
import { mapState } from 'vuex'
import STable from '_c/STable'
import Pagination from '_c/Pagination'
import countPanel from './count-panel'
export default {
  name: 'resume-list',
  components: {
    STable,
    Pagination,
    countPanel
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
      resumeList: [],
      total: 0,
      columns: [
        {
          slot: 'avatar',
          attrs: {
            prop: 'filepath',
            label: '头像'
          }
        },
        {
          attrs: {
            prop: 'name',
            label: '姓名',
            align: 'center'
          }
        },
        {
          attrs: {
            prop: 'persionnum',
            label: '学号',
            align: 'center'
          }
        },
        {
          attrs: {
            prop: 'mobile',
            label: '手机号',
            align: 'center'
          }
        },
        {
          attrs: {
            prop: 'college',
            label: '院系',
            align: 'center'
          }
        },
        {
          attrs: {
            prop: 'collegetie',
            label: '专业',
            align: 'center'
          }
        },
        {
          attrs: {
            prop: 'QQ',
            label: 'QQ',
            align: 'center'
          }
        },
        {
          attrs: {
            prop: 'wechart',
            label: '微信',
            align: 'center'
          }
        },
        {
          attrs: {
            prop: 'status',
            label: '状态',
            align: 'center'
          }
        },
        {
          slot: 'action',
          attrs: {
            prop: 'action',
            label: '操作',
            align: 'center'
          }
        }
      ],
      options: [
        { id: 1, text: '全部', value: '' },
        { id: 2, text: '录用', value: 1 },
        { id: 3, text: '未录用', value: 2 },
        { id: 4, text: '面试', value: 3 },
        { id: 5, text: '笔试', value: 4 }
      ]
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
        let { data, page } = result
        this.resumeList = data
        this.total = page.totalCount
      }).catch((err) => {})
    },
  },
  mounted() {
    this.getResumeList()
  }
}
</script>
<style lang="less" scoped>
.avatar-wrapper {
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="less">
.count-card{
  .el-card__body{
     padding: 10px;
  }
}
</style>
