export default {
  data() {
    return {
      dialogFormVisible: false,
      defaultProps: {
        label: 'name'
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称！', trigger: 'blur' },
        ]
      },
    }
  },
}