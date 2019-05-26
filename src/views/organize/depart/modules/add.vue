<template>
  <div>
    <div @click="handleAdd">
      <slot name="action-btn"></slot>
    </div>
    <!-- <el-button class="filter-item" type="primary" size="medium" icon="el-icon-circle-plus-outline" >
      <slot name="btn-label"></slot>
    </el-button> -->
    <el-dialog
      title="添加新部门"
      :visible.sync="dialogFormVisible"
      width="700px"
      :append-to-body="true"
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
          <!-- <el-form
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
              <el-button type="primary" @click="addDepart">添加</el-button> 
            </el-form-item>
          </el-form> -->
          <s-form
          label-width="100px"
          ref="addForm"
          :hide-required-asterisk="true"
          :api="addDepartApi"
          :form-items="formItems"
          :merge-form="mergeForm"
          :btn-area="btnArea"
          @after-submit="addSuccess"
          size="small"
          >
            <template v-slot:parent-depart>
              <el-form-item label="上级部门：">
                <strong class="text-label">{{mergeForm.parentName}}</strong> 
              </el-form-item>
            </template>
          </s-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { addDepart as addDepartApi} from '@/api/depart'
import cloneDeep from 'clonedeep'
import { mapState } from 'vuex'
import SForm from '_c/SForm'

export default {
  name: 'add-depart',
  components: {
    SForm
  },
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
      // depart: {
      //   name: '',
      //   parentId: 0,
      //   parentName: '无上级部门'
      // },
      // rules: {
      //   name: [
      //     { required: true, message: '请输入部门名称！', trigger: 'blur' },
      //   ]
      // },




      formItems: [
        {
          tag: "input",
          key: 'name',
          itemAttrs: {
            label: "部门名称：",
            rules: [
              { required: true, message: '请输入部门名称！', trigger: 'blur' }
            ],
          },
          attrs: {
            placeholder: "请输入部门名称",
          },
        },
        {
          slot: 'parent-depart'
        }
      ],
      btnArea: {
        submitBtn: {
          props: {
            type: 'primary'
          },
          text: '添加'
        }
      },
      mergeForm: {
        parentId: 0,
        parentName: '无上级部门'
      }
    }
  },
  computed: {
    // ...mapState({
    //   corid: (state) => state.user.corid
    // }),
    computDeparts() {
      let tree = []
      tree = [{dept_id: 0, name: '无上级部门', parent_id: 0}].concat(cloneDeep(this.departsTree))
      // console.log(tree)
      return tree
    }
  },
  methods: {
    addDepartApi,
    resetForm() {
      this.mergeForm = {
        parentId: 0,
        parentName: '无上级部门'
      }
    },
    handleAdd() {
      this.resetForm()
      // this.mergeForm.parentId = 0
      // this.mergeForm.parentName = '无上级部门'
      this.dialogFormVisible = true
      
      this.$nextTick(() => {
        this.$refs['addForm'].handleReset()
        // this.$refs['departForm'].clearValidate()
      })
    },
    // addDepart() {
    //   this.$refs['departForm'].validate((valid) => {
    //     if(!valid){
    //       this.$message.error('请添加相关项目！')
    //       return 
    //     }
    //     addDepartApi(this.corid, this.depart).then((result) => {
    //       // console.log(result)
    //       this.$message.success('添加成功!')
    //       this.dialogFormVisible = false
    //       this.$emit('on-add-success')
    //     }).catch((err) => { })
    //   })
      
    // },
    addSuccess() {
      this.$message.success('添加成功!')
      this.dialogFormVisible = false
      this.$emit('on-add-success')
    },
    handleClick(data) {
      // console.log(data)
      // this.depart.parentId = data.dept_id
      // this.depart.parentName = data.name
      // 代理
      this.mergeForm.parentId = data.dept_id
      this.mergeForm.parentName = data.name
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