<template>
  <div class="step2">
    <el-form :model="form" :rules="rules" size="medium">
      <el-form-item>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-select v-model="key">
              <el-option value="email" label="邮箱"></el-option>
              <el-option value="mobile" label="手机号"></el-option>
            </el-select>
          </el-col>
          <el-col :span="16">
            <el-input :value="value" disabled></el-input>
          </el-col>
          </el-row>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="10">
          <el-col :span="13">
            <el-input v-model="form.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :span="11">
            <el-button class="full-width" :loading="loading" @click="handleClick">{{ !loading ? btnText : _btnText }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="full-width" >下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'step2',
  props: {
    email: {
      type: String,
      default: ''
    },
    mobile: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      key: 'email',
      form: {
        code: ''
      },
      loading: false,
      timer: 60,
      btnText: '获取验证码',
      rules: {

      }
    }
  },
  computed: {
    value() {
      return this[this.key]
    },
    _btnText() {
      return `${this.timer}秒后重新获取`
    }
  },
  methods: {
    handleClick() {
      this.loading = true
      this.timer = 60
      let timer = setInterval(() => {
        if(this.timer === 0){
          clearInterval(timer)
          this.loading = false
        }else{
          this.timer--
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.step2 {
  width: 360px;
  margin: 55px auto;

}
</style>
