import { getUser as getUserApi } from '@/api/user'
import { getCollegeInfo as getCollegeInfoApi } from '@/api/comm'
export default {
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
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
        // wechart: [
        //   { required: true, message: '请填写微信号', trigger: 'blur' },
        //   { pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,  message: '请填写正确的微信号', trigger: ['blur', 'change'] }
        // ],
        // qq: [
        //   { required: true, message: '请填写QQ号', trigger: 'blur' },
        //   { pattern: /^[1-9][0-9]{4,10}$/, message: '请填写正确的QQ号', trigger: ['blur', 'change'] }
        // ],
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
    getCollegetieOptions(id) {
      getCollegeInfoApi(null, id).then((result) => {
        let { data } = result
        this.collegetieOptions = this.formatCollegeData(data)
      })
    },
    formatCollegeData(list) {
      return list.map((item) => {
        return { id: item.id, value: item.id, label: item.value }
      })
    },
    findCollegeId(list, name) {
      let res = []
      list.some((item) => {
        if(item.label === name){
          res = item.id
          return true
        }
      })
      return res
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
    getUserAndCollegeInfo() {
      Promise.all([getCollegeInfoApi(1, null), getUserApi(this.userId)]).then((result) => {
        console.log(result)
        this.collegeOptions = this.formatCollegeData(result[0].data)
  
        this.user = result[1].data
        this.user.college = this.findCollegeId(this.collegeOptions, this.user.college)
        
        getCollegeInfoApi(null, this.user.college).then((result) => {
          let { data } = result
          this.collegetieOptions = this.formatCollegeData(data)
          // 将专业名称转换为相应的id
          this.user.collegetie = this.findCollegeId(this.collegetieOptions, this.user.collegetie)
        })
      }).catch((err) => console.log(err))
    }
  },
}