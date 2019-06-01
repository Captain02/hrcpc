import { getCollegeInfo as getCollegeInfoApi } from '@/api/comm'
export default {
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请填写姓名!', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '请填写学号', trigger: 'blur' },
          { pattern: /^\d{12}$/,  message: '请输入正确的学号', trigger: ['blur', 'change'] }
        ],
        persionnum: [
          { required: true, message: '请填写学号', trigger: 'blur' },
          { pattern: /^\d{12}$/,  message: '请输入正确的学号', trigger: ['blur', 'change'] }
        ],
        email: [
          { required: true, message: '请填写邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          { pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        qq: [
          { pattern: /^[1-9][0-9]{4,10}$/, message: '请输入正确的QQ号', trigger: ['blur', 'change'] }
        ],
        wechart: [
          { pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,  message: '请输入正确的微信号', trigger: ['blur', 'change'] }
        ],
        college: [
          { required: true, message: '请选择院系', trigger: 'change' }
        ],
        collegetie: [
          { required: true, message: '请选择专业', trigger: 'change' }
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
    getCollegetieOptions(id) {
      getCollegeInfoApi(null, id).then((result) => {
        let { data: list } = result
        this.collegetieOptions = list.map((item) => {
          return { id: item.id, value: item.id, label: item.value }
        })
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
  mounted() {
    getCollegeInfoApi(1, null).then((result) => {
      let { data: list } = result
      this.collegeOptions = list.map((item) => {
        return { id: item.id, value: item.id, label: item.value }
      })
    })
  },
}