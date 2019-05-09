<template>
  <div class="app-container">
    <h1 class="page-title"> 添加新成员 </h1>
    <el-card class="form-wrapper" shadow="never">
      <el-form :model="user" label-width="100px" :rules="rules" :hide-required-asterisk="true">
        <el-form-item prop="fileId" label="上传头像：">
          <div v-if="avatar" class="avatar-view" @click="deleteAvatar">
            <img :src="avatar" alt="avatar">
            <div class="avatar-mark">
              <i class="el-icon-delete"></i>
            </div>
          </div>
          <el-upload
            v-else
            class="avatar-uploader"
            action="http://192.168.137.182:8081/HBO/img/save"
            :data="{corid: corId}"
            name="fileId"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            >
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M，不上传则使用默认头像</div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="username" label="姓名：">
          <el-input v-model="user.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别：">
          <el-radio-group v-model="user.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="studentId" label="学号：">
          <el-input v-model="user.studentId" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item prop="collegeInfo" label="院系：">
          <el-cascader
            v-model="user.collegeInfo"
            class="college-cascader"
            placeholder="请选择院系、系别、专业信息"
            clearable
            :options="options"
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="email" label="邮箱：">
          <el-input v-model="user.email" type="email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号：">
          <el-input v-model="user.mobile" type="number" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="wechart" label="微信：">
          <el-input v-model="user.wechart" type="number" placeholder="请输入微信"></el-input>
        </el-form-item>
        <el-form-item prop="QQ" label="QQ：">
          <el-input v-model="user.QQ" type="number" placeholder="请输入QQ"></el-input>
        </el-form-item>
        <el-form-item prop="descs" label="自我描述：">
          <mce-editor v-model="user.descs" ></mce-editor>
        </el-form-item>
        <el-form-item class="">
          <el-col :offset="5">
            <el-button type="primary" @click="addUser">添加</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <!-- {{user}} -->
    </el-card>
  </div>
</template>
<script>
import { addUser as addUserApi } from '@/api/user'
import { mapState } from 'vuex'
import MceEditor from '@/components/MceEditor'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'
export default {
  name: 'add-user',
  components: {
    MceEditor
  },
  data() {
    const validateCollegeInfo = (rule, value, callback) => {
      if(value.length < 3) {
        return callback(new Error('请选择完整的院系信息！'))
      }
      callback()
    }
    return {
      user: {
        fileId: '',
        username: '',           // 成员名
        sex: '男',              // 性别
        studentId: '',          // 学号
        // college: '',            // 所在学院
        // collegetie: '',         // 所在系别
        // major: '',              // 所在专业
        collegeInfo: [],
        email: '',              // 邮箱
        mobile: '',             // 手机号
        wechart: '',            // 微信
        qq: '',                 // qq
        descs: ''               // 简介
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名！', trigger: 'blur' },
        ],
        studentId: [
          { required: true, message: '请输入学号！', trigger: 'blur' },
        ],
        collegeInfo: [
          { validator: validateCollegeInfo, trigger: 'change' }
        ]
      },
      avatar: null,
      avatarId: null,
      imagename: '',
      options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
    }
  },
  computed: {
    ...mapState({
      corId: (state) => state.user.corId
    })
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res, file)
      if(res.data.code !== 0){
        this.$message.error('上传失败，请重新上传!')
        return
      }
      this.avatar = URL.createObjectURL(file.raw)
      this.avatarId = res.data.id
      this.imagename = res.data.imagename
      this.user.fileId = res.data.url
    },
    beforeAvatarUpload(file) {
      let typeWhiteList = ['image/jpeg', 'image/png']
      const isJPG = typeWhiteList.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式或PNG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    deleteAvatar() {
      // 删除头像
    },
    addUser() {
      // 添加成员
    }
  }
}
</script>
<style lang="less" scoped>
.form-wrapper {
  // width: 800px;
  margin-top: 30px;
  padding: 0 40px 0 20px;
  .avatar-view {
    position: relative;
    width: 150px;
    height: 150px;
    overflow: hidden;
    cursor: pointer;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    &:hover .avatar-mark{
      opacity: 1;
      color: #409EFF;
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .avatar-mark {
      position:absolute;
      width: 100%;
      height: 100%;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      opacity: 0;
      background: rgba(0, 0, 0, 0.25);
      transition: all .3s;
      i {
        font-size: 25px;
        line-height: 150px;
        margin-left: 60px;
      }
    }
  }
}
.college-cascader {
  width: 100%;
}
</style>
<style lang="less">
  /** 头像上传样式 **/
.avatar-uploader{
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .el-upload__tip {
    margin-top: 0;
    line-height: 30px;
  }
}


</style>
