import { getCollegeInfo as getCollegeInfoApi } from '@/api/comm'
export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写密码'))
      } else {
        if (this.user.password !== '') {
          this.$refs['userForm'].validateField('confirmPwd')
        }
        callback()
      }
    }
    const validateConfirmPassword= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次填写密码'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        confirmPwd: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请填写学号', trigger: 'blur' },
          { pattern: /^\d{12}$/,  message: '请填写正确的学号', trigger: ['blur', 'change'] }
        ],
        college: [
          { required: true, message: '请选择院系', trigger: 'change' }
        ],
        collegetie: [
          { required: true, message: '请选择专业', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          { pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请填写正确的手机号', trigger: ['blur', 'change'] }
        ],
        wechart: [
          { required: true, message: '请填写微信号', trigger: 'blur' },
          { pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,  message: '请填写正确的微信号', trigger: ['blur', 'change'] }
        ],
        qq: [
          { required: true, message: '请填写QQ号', trigger: 'blur' },
          { pattern: /^[1-9][0-9]{4,10}$/, message: '请填写正确的QQ号', trigger: ['blur', 'change'] }
        ],
        QQ: [
          { required: true, message: '请填写QQ号', trigger: 'blur' },
          { pattern: /^[1-9][0-9]{4,10}$/, message: '请填写正确的QQ号', trigger: ['blur', 'change'] }
        ],
        email: [
          { required: true, message: '请填写邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      collegeOptions: [],
      collegetieOptions: [],
    }
  },
  methods: {
    handleChange(checkId) {
      this.user.collegetie = ''
      this.getCollegetieOptions(checkId)
    },
    formatCollegeData(list) {
      return list.map((item) => {
        return { id: item.id, value: item.id, label: item.value }
      })
    },
    getCollegeOptions() {
      getCollegeInfoApi(1, null).then((res) => {
        let { data } = res
        this.collegeOptions = this.formatCollegeData(data)
      })
    },
    getCollegetieOptions(id) {
      getCollegeInfoApi(null, id).then((result) => {
        let { data } = result
        this.collegetieOptions = this.formatCollegeData(data)
      })
    },
    findCollegeName(list, id) {
      let res = ''
      list.some((item) => {
        if(item.id === id){
          res = item.label
          return true
        }
      })
      return res
    },
  },
}