<template>
  <div class="app-container">
    <h1 class="page-title"> 社团部门 </h1>
    <div class="filter-container">
      <!-- <el-input class="filter-item" v-model="listQuery.deptName" placeholder="请输入部门名字" style="width: 200px;" size="medium"></el-input>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleSearch">搜索</el-button> -->
      <!-- <el-button class="filter-item" type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="() => this.$router.push({name: 'add-user'})">添加部门</el-button> -->
      <add-depart class="filter-item" :departs-tree="departList" @on-add-success="getDepartList">
        <template v-slot:action-btn>
          <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" >添加部门</el-button>
        </template>
      </add-depart>
      <el-button class="filter-item filter-right-btn" type="danger" size="small" icon="el-icon-delete" :disabled="!selectedItemsCount" @click="deleteSelectedItems">删除</el-button>
    </div>
    <s-table :data="departList" :columns="columns" row-key="dept_id"  @selection-change="handleSelectionChange" size="medium">
      <template v-slot:action="{scope}">
        <edit-depart :data="scope.row" :departs-tree="departList" class="handle-btn" @on-edit-success="getDepartList">
          <template v-slot:action-btn>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </edit-depart>
        <el-button type="text" size="small" @click="handleDelete([scope.row])">删除</el-button>
      </template>
    </s-table>
  </div>
</template>
<script>
import { getDeparts as getDepartsApi, deleteDeparts as deleteDepartsApi } from "@/api/depart"
import { transferData2Tree } from '@/utils'
import { mapState } from 'vuex'
import STable from '_c/STable'
import addDepart from './modules/add'
import editDepart from './modules/edit'
export default {
  name: "depart",
  components: {
    STable,
    addDepart,
    editDepart
  },
  data() {
    return {
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
    selectedItemsCount() {
      return this.selectedItems.length
    }
  },
  methods: {
    getDepartList() {
      getDepartsApi().then(result => {
        console.log('获取部门列表', result)
        let { data, page } = result
        this.total = page.totalCount
        this.departList = transferData2Tree(0, data, 'parent_id', 'dept_id', 'children')
        // console.log(this.departList)
      }).catch(err => {
        console.log(err)
      })
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
      console.log(items)
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
    hasChildren(depts) {
      return depts.some((item) => {
        return item.children && item.children.length
      })
    }
  },
  mounted() {
    this.getDepartList()
  }
}
</script>