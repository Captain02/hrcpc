<template>
  <div>
    <el-button type="text" size="small" @click="handleEdit">
      <slot name="btn-label"></slot>
    </el-button>
    <el-dialog
      title="修改社团信息"
      :visible.sync="dialogFormVisible"
      width="700px"
      :append-to-body="true"
    >
      <el-row>
        <el-col :span="8">
          <h2 class="title">拖拽更改部门关系</h2>
          <el-tree
            :default-expand-all="true"
            :data="departsData"
            :expand-on-click-node="false"
            :props="defaultProps"
            draggable
            :allow-drag="hasAllowDrag"
            @node-drop="handleDropEnd"
            node-key="dept_id"
          ></el-tree>
        </el-col>
        <el-col :span="16">
          <el-form
            v-if="depart"
           :model="depart"
           label-width="100px"
           :rules="rules"
           ref="departForm" 
           :hide-required-asterisk="true"
          >
            <el-form-item prop="name" label="部门名称：">
              <el-input v-model="depart.name" placeholder="请输入部门名称"></el-input>
            </el-form-item>
            <el-form-item prop="parentName" label="上级部门：">
              <strong class="text-label">{{depart.parentName}}</strong> 
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="editDepart">修改</el-button> 
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import cloneDeep from 'clonedeep'
import { mapState } from 'vuex'
export default {
  name: 'edit-depart',
  props: {
    data: {
      type: Object,
      required: true
    },
    departsTree: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      defaultProps: {
        label: 'name'
      },
      departsData: cloneDeep(this.departsTree),
      depart: null,
      rules: {
        name: [
          { required: true, message: '请输入部门名称！', trigger: 'blur' },
        ]
      }
    }
  },
  // watch: {
  //   'depart.parentId'(newParentId, oldVal) {
  //     if(newParentId === 0){
  //       this.depart.parentName = '无'
  //     }else{
  //       this.depart.parentName = 
  //     }
  //   }
  // },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid
    }),
    computDepart() {
      return cloneDeep(this.departsTree)
    }
  },
  methods: {
    getDepartNameByParentId(id) {
      let name = '无'
      function handle(list, id){
        list.some((item) => {
          if(item.dept_id === id){
            name = item.name
            return true
          }
          if(item.children.length){
            handle(item.children, id)
          }
        })
      }
      handle(this.departsData, id)
      return name
    },
    hasAllowDrag(node) {
      let { data } = node
      if(data.dept_id === this.depart.deptId){
        return true
      }
    },
    handleDropEnd(draggingNode, dropNode, dropType, ev) {
      // console.log('tree drop: ', draggingNode, dropNode, dropType)
      let { data } = dropNode
      if(dropType === 'inner'){
        this.depart.parentId = data.dept_id
      }else{
        this.depart.parentId = data.parent_id
      }
      this.depart.parentName = this.getDepartNameByParentId(this.depart.parentId)
    },
    handleEdit() {
      this.dialogFormVisible = true
      if(this.depart === null){
        setTimeout(() => {
          this.depart = {
            deptId: 3,
            name: '上海分公司',
            parentId: 1,
            parentName: '开源',
            orderNum: 0
          }
        }, 1500)
      }
    },
    editDepart() {
      
    }
  }
}
</script>
<style lang="less" scoped>
  .title{
    font-size: 15px;
    color: #333;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .text-label {
    font-weight: bold;
  }
</style>
