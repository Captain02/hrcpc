<template>
  <div>
    <div @click="handleAdd">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="添加新部门"
      :visible.sync="dialogFormVisible"
      width="650px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-row>
        <el-col :span="8">
          <h2 class="title">请选择上级部门</h2>
          <el-tree
            :default-expand-all="true"
            :data="computDeparts"
            :expand-on-click-node="false"
            :props="defaultProps"
            @node-click="handleClick"
            node-key="dept_id"
          ></el-tree>
        </el-col>
        <el-col :span="16">
          <el-form
           :model="depart"
           label-width="100px"
           :rules="rules"
           ref="departForm" 
           size="small"
           :hide-required-asterisk="true"
          >
            <el-form-item prop="name" label="部门名称：">
              <el-input v-model="depart.name" placeholder="请输入部门名称"></el-input>
            </el-form-item>
            <el-form-item prop="parentName" label="上级部门：">
              <strong class="text-label">{{depart.parentName}}</strong> 
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addDepart">添加</el-button> 
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { addDepart as addDepartApi} from '@/api/depart'
import cloneDeep from 'clonedeep'
import mixins from '../mixins'

export default {
  name: 'add-depart',
  props: {
    departsTree: {
      type: Array,
      required: true
    }
  },
  mixins: [mixins],
  data() {
    return {
      depart: {
        name: '',
        parentId: 0,
        parentName: '无上级部门'
      },
    }
  },
  computed: {
    computDeparts() {
      let tree = []
      tree = [{dept_id: 0, name: '无上级部门', parent_id: 0}].concat(cloneDeep(this.departsTree))
      // console.log(tree)
      return tree
    }
  },
  methods: {
    resetForm() {
      this.depart = {
        name: '',
        parentId: 0,
        parentName: '无上级部门'
      }
    },
    handleAdd() {
      this.resetForm()
      this.dialogFormVisible = true
      
      this.$nextTick(() => {
        this.$refs['departForm'].clearValidate()
      })
    },
    addDepart() {
      this.$refs['departForm'].validate((valid) => {
        if(!valid){
          this.$message.error('请添加相关项目！')
          return 
        }
        addDepartApi(this.depart).then((result) => {
          // console.log(result)
          this.$message.success('添加成功!')
          this.dialogFormVisible = false
          this.$emit('on-add-success')
        }).catch((err) => { })
      })
      
    },
    handleClick(data) {
      // console.log(data)
      this.depart.parentId = data.dept_id
      this.depart.parentName = data.name
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