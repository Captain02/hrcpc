<template>
  <div class="app-container">
    <h1 class="page-title"> 社团部门 </h1>
    <div class="filter-container">
      <el-input class="filter-item" v-model="listQuery.deptName" placeholder="请输入部门名字" style="width: 200px;" size="medium"></el-input>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <!-- <el-button class="filter-item" type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="() => this.$router.push({name: 'add-user'})">添加部门</el-button> -->
      <add-depart class="filter-item" v-slot:btn-label :departs-tree="departList">添加部门</add-depart>
      <el-button class="filter-item filter-delete-btn" type="danger" size="medium" icon="el-icon-delete" :disabled="!selectedItemsCount" @click="deleteSelectedItems">删除</el-button>
    </div>
    <s-table :data="departList" :columns="columns" row-key="dept_id"  @selection-change="handleSelectionChange">
      <template v-slot:action="{scope}">
        <el-button type="text" size="small" @click="handleEdit(scope.row.dept_id)">编辑</el-button>
        <el-button type="text" size="small" @click="handleDelete([scope.row])">删除</el-button>
      </template>
    </s-table>
    <pagination v-show="total>0" :total="total" :curr.sync="listQuery.currPage" :size.sync="listQuery.pageSize" @on-page-change="getDepartList" />
  </div>
</template>
<script>
import { getDeparts as getDepartsApi, deleteDeparts as deleteDepartsApi } from "@/api/depart"
import { transferDepartToTree } from '@/utils'
import { mapState } from 'vuex'
import STable from '_c/STable'
import Pagination from '_c/Pagination'
import addDepart from './add'
export default {
  name: "depart",
  components: {
    STable,
    Pagination,
    addDepart
  },
  data() {
    return {
      listQuery: {
        deptName: '',
        currPage: 1,
        pageSize: 10,
      },
      columns: [
        {
          attrs: {
            type: 'selection',
            width: '150',
            align: 'center'
          }
        },
        {
          attrs: {
            prop: 'name',
            label: '部门名称',
            sortable: true,
          }
        },
        {
          attrs: {
            prop: 'order_num',
            label: '排序',
            align: "center"
          }
        },
        {
          slot: 'action',
          attrs: {
            prop: 'action',
            label: '操作',
            align: "center"
          }
        }
      ],
      total: 0,
      selectedItems:[],
      departList: []
    }
  },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid
    }),
    selectedItemsCount() {
      return this.selectedItems.length
    }
  },
  methods: {
    getDepartList() {
      let data =  [
        {
          dept_id: 1,
          parent_id: 0,
          name: "开源",
          order_num: 0,
        },
        {
          dept_id: 2,
          parent_id: 1,
          name: "长沙分公司",
          order_num: 1,
        },
        {
          dept_id: 3,
          parent_id: 1,
          name: "上海分公司",
          order_num: 2,
        },
        {
          dept_id: 4,
          parent_id: 3,
          name: "技术部",
          order_num: 0,
        },
        {
          dept_id: 5,
          parent_id: 3,
          name: "销售部",
          order_num: 1,
        }
      ]
      setTimeout(() => {
        this.departList = transferDepartToTree(data)
      }, 1500)
      // console.log(this.departList)
      // getDepartsApi(this.corid, this.listQuery).then(result => {
      //   console.log(result)
      //   let { data, page } = result
      //   // this.departList = data
      //   this.total = page.totalCount
      //   this.departList = transferDepartToTree(data)
      //     // console.log(this.departList)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    handleSearch() {
      // 搜索
      this.getDepartList()
    },
    handleSelectionChange(val) {
      this.selectedItems = val
      // console.log(val)
    },
    deleteSelectedItems() {
      // 删除
      this.handleDelete(this.selectedItems)
    },
    handleDelete(items) {
      // 删除
      if(this.hasChildren(items)){
        this.$message.error('您要删除的部门中包含下属部门，请先删除其下属部门')
        return
      }
      let ids = []
      items.forEach((item) => {
        ids.push(item.dept_id)
      })
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDepartsApi(ids).then((result) => {
          this.$message.success('删除成功')
          this.getDepartList()
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {})
    },
    handleEdit(id) {
      // 修改
    },
    hasChildren(depts) {
      return depts.some((item) => {
        return item.children.length
      })
    }
  },
  mounted() {
    this.getDepartList()
  }
}
</script>