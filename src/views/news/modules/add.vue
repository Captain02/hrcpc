<template>
  <div class="app-container">
    <div class="page-title">添加新闻</div>
    <el-card class="form-wrapper" shadow="never">
      <el-form :model="news" :rules="rules" label-width="100px" size="small" ref="newsForm" :hide-required-asterisk="true">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="news.title" placeholder="请输入新闻标题"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="发布人：">
              <span> {{name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布部门：" prop="pubDeptId">
              <tree-select v-model="news.pubDeptId" :clearable="false" :options="deptOptions" :normalizer="normalizer" placeholder="发布部门"></tree-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="内容：">
          <mce-editor v-model="news.content" ></mce-editor>
        </el-form-item>
        <el-form-item>
          <el-col :offset="5">
            <el-button type="primary" @click="addNews">添加</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { addNews as addNewsApi } from '@/api/news'
import { getDepts as getDeptsApi } from '@/api/comm'
import { mapState } from 'vuex'
import { transferData2Tree } from '@/utils'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import MceEditor from '_c/MceEditor'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'

export default {
  name: 'add-news',
  components: {
    TreeSelect,
    MceEditor
  },
  data() {
    return {
      news: {
        pubDeptId: null,  // 发布部门
        title: '',
        content: '',       
      },
      rules: {
        title: [
          { required: true, message: '请输入新闻标题', trgger: 'blur' }
        ],
        pubDeptId: [
          { required: true, message: '请选择发布部门', trigger: 'change' }
        ]
      },
      deptOptions: [],              // 发布部门选项
      normalizer(node) {
        return {
          id: node.dept_id,
          label: node.name
        }
      },
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
      name: (state) => state.user.name
    })
  },
  methods: {
    addNews() {
      this.$refs['newsForm'].validate((valid) => {
        if(!valid) {
          this.$message.error('请填写相关项目')
          return
        }
        addNewsApi(this.userId, this.news.pubDeptId, this.news.title, this.news.content).then((result) => {
          console.log(result)
          this.$message.success('添加成功')
          setTimeout(() => {
            this.$router.push({
              name: 'news-list'
            })
          }, 1500)
        }).catch((err) => { })
      })
    },
    getDepts() {
      getDeptsApi().then((result) => {
        let { data: depts } = result
        // depts.unshift({ name: '本社团', dept_id: '', parent_id: 0 })
        this.deptOptions = transferData2Tree(0, depts, 'parent_id', 'dept_id', 'children')
      }).catch((err) => { console.log(err) })
    }
  },
  mounted() {
    this.getDepts()
  }
}
</script>
<style lang="less" scoped>
.form-wrapper {
  margin-top: 30px;
  padding: 0 40px 0 20px;
}
</style>
