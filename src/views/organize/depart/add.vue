<template>
  <div>
    <el-button class="filter-item" type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="handleAdd">
      <slot name="btn-label"></slot>
    </el-button>
    <el-dialog
      title="添加新部门"
      :visible.sync="dialogFormVisible"
      width="700px"
      :append-to-body="true"
    >
      <el-row>
        <el-col :span="8">
          <el-tree
            :default-expand-all="true"
            :data="departsTree"
            :expand-on-click-node="false"
            :highlight-current="true"
            :props="defaultProps"
            @node-click="handleClick"
            node-key="dept_id"
          ></el-tree>
        </el-col>
        <el-col :span="16">
          <el-form
           :model="depart" label-width="100px" :rules="rules" ref="departForm" :hide-required-asterisk="true"
          >
            <el-form-item label="部门名称：">
              <el-input v-model="depart.name" placeholder="请输入部门姓名"></el-input>
            </el-form-item>
            <el-form-item label="上级部门：">
              {{depart.parentName}}
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'add-depart',
  props: {
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
      depart: {
        name: '',
        parentId: 0,
        parentName: '独立部门'
      },
    }
  },
  computed: {
    rules() {
      name: [
        { required: true, message: '请输入部门名称！', trigger: 'blur' },
      ]
    }
  },
  methods: {
    resetForm() {
      this.depart = {
        name: '',
        parentId: 0,
        parentName: '独立部门'
      }
    },
    handleAdd() {
      this.resetForm()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['departForm'].clearValidate()
      })
    },
    handleClick(data) {
      // console.log(data)
      this.depart.parentId = data.parent_id
      this.depart.parentName = data.name
    }
  }
}
</script>