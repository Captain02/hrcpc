<template>
  <el-form size="small" :model="form" :rules="rules" ref="form">
    <el-form-item prop="corname">
      <el-input v-model="form.corname" placeholder="社团名称"></el-input>
    </el-form-item>
    <el-form-item prop="corleading">
      <el-input v-model="form.corleading" placeholder="社团负责人：学号"></el-input>
    </el-form-item>
    <el-form-item prop="cortercher">
      <el-input v-model="form.cortercher" placeholder="负责老师"></el-input>
    </el-form-item>
    <el-form-item prop="corworkspace">
      <el-input v-model="form.corworkspace" placeholder="工作地点"></el-input>
    </el-form-item>
    <el-form-item prop="corcollege">
      <el-select v-model="form.corcollege" placeholder="所属院系" class="full-width">
        <el-option v-for="item in collegeOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="corscale">
      <el-input type="number" v-model="form.corscale" placeholder="社团规模：人数"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="full-width" type="primary" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getCollegeInfo as getCollegeInfoApi} from '@/api/comm'
import { apply as applyApi } from '@/api/corporation'
export default {
  name: 'apply-form',
  data() {
    const validateCorscale = (min, max) => (rule, value, callback) => {
      if(Number(value) < min){
        callback(new Error(`不能小于${min}人`))
      }else if(Number(value) > max){
        callback(new Error(`不能大于${max}人`))
      }
      // console.log(value, typeof value, Number(value))
      callback()
    }
    return {
      form: {
        corname: '',            // 社团名称
        corleading: '',         // 社团负责人
        cortercher: '',         // 负责老师
        corworkspace: '',       // 工作地点
        corcollege: '',         // 所属院系
        corscale: ''          // 规模
      },
      collegeOptions: [],
      rules: {
        corname: [
          { required: true, message: '请输入社团名称', trigger: 'blur' }
        ],
        corleading: [
          { required: true, message: '请填写学号', trigger: 'blur' },
          { pattern: /^\d{12}$/,  message: '请填写正确的学号', trigger: ['blur', 'change'] }
        ],
        cortercher: [
          { required: true, message: '请输入领导老师', trigger: 'blur' }
        ],
        corworkspace: [
          { required: true, message: '请输入工作地点', trigger: 'blur' }
        ],
        corcollege: [
          { required: true, message: '请选择所属院系', trigger: 'change' }
        ],
        corscale: [
          { validator: validateCorscale(1, 1000), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          this.$message.error('请填写相关项目!')
          return
        }
        applyApi(this.form.corname, this.form.corleading, this.form.cortercher, this.form.corworkspace, this.form.corcollege, this.form.corscale).then((result) => {
          console.log(result)
          this.$message.success('申请成功')
          this.$refs['form'].resetFields()
          this.$emit('success')
        }).catch((err) => { console.log(err) })
      })
    }
  },
  mounted() {
    getCollegeInfoApi(1, null).then((result) => {
      let { data: list } = result
      this.collegeOptions = list.map((item) => {
        return { id: item.id, value: item.id, label: item.value }
      })
    })
  },
}
</script>