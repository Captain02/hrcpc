<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea" />
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'

export default {
  name: 'Tinymce',
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 400
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    url: {
      default: 'https://www.btzmpro.com:8081/HBO/sys/comm/upload',
      type: String
    },
    name: {
      type: String,
      default: 'picture'
    },
    accept: {
      default: () => (['image/jpeg', 'image/png']),
      type: Array
    },
    maxSize: {
      default: 2097152,
      type: Number
    },
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      },
      fontFormats: `
        微软雅黑=微软雅黑;
        宋体=宋体;
        黑体=黑体;
        仿宋=仿宋;
        楷体=楷体;
        隶书=隶书;
        幼圆=幼圆;
        Andale Mono=andale mono,times;
        Arial=arial, helvetica,
        sans-serif;
        Arial Black=arial black, avant garde;
        Book Antiqua=book antiqua,palatino;
        Comic Sans MS=comic sans ms,sans-serif;
        Courier New=courier new,courier;
        Georgia=georgia,palatino;
        Helvetica=helvetica;
        Impact=impact,chicago;
        Symbol=symbol;
        Tahoma=tahoma,arial,helvetica,sans-serif;
        Terminal=terminal,monaco;
        Times New Roman=times new roman,times;
        Trebuchet MS=trebuchet ms,geneva;
        Verdana=verdana,geneva;
        Webdings=webdings;
        Wingdings=wingdings,zapf dingbats`
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList['zh'],
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        // FontSelect
        font_formats: this.fontFormats,
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        // 图片上传
        images_upload_handler(blobInfo, success, failure) {
          // console.log("blobInfo我被调用了")
          if (blobInfo.blob().size > _this.maxSize) {
            failure("上传图片大小不能超过 2MB!")
            return
          }

          if (_this.accept.includes(blobInfo.blob().type)) {
            uploadPic()
          } else {
            failure("上传图片只能是 JPG 或 PNG 格式!")
            return
          }
          function uploadPic() {
            const xhr = new XMLHttpRequest()
            const formData = new FormData()
            // xhr.withCredentials = _this.withCredentials
            xhr.open("POST", _this.url)
            xhr.onload = function() {
              if (xhr.status !== 200) {
                // 抛出 'on-upload-fail' 钩子
                _this.$emit("on-upload-fail")
                failure("上传失败: " + xhr.status)
                return
              }

              const result = JSON.parse(xhr.responseText)
              // 抛出 'on-upload-success' 钩子
              if(result.code !== 0) {
                _this.$emit("on-upload-fail")
                failure("上传失败: " + xhr.status)
                return
              }
              
              _this.$emit("on-upload-success", [result, success, failure])
              window.tinymce.get(_this.tinymceId).insertContent(`<img src="${result.data}" >`)
              success()
              
            }
            formData.append(_this.name, blobInfo.blob())
            xhr.send(formData)
          }
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    }
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
