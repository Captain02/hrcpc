<template>
  <el-form :ref="form" v-bind="$attrs" :model="formModel">
    <template v-for="(item, index) in _formItems">
      
      <slot v-if="item.slot" :name="item.slot" />

      <el-form-item 
        v-else-if="item._hasRender"
        v-bind="item.itemAttrs || {}"
        :prop="item.key"
        :key="index"
        :class="item.itemAttrs.className"
      >
        <component
          :is="item.tag"
          
          :class="item.itemAttrs.className"
          v-bind="item.attrs || {}"
          v-model="formModel[item.key]"
          v-on="item.listeners || {}"
        ></component>
      </el-form-item>
    </template>
    <el-form-item v-if="submit || reset">
      <el-button @click="handleSubmit" type="primary" v-if="submit">{{
        $attrs.submitContext || "搜索"
      }}</el-button>
      <el-button @click="handleReset" v-if="reset">{{
        $attrs.resetContext || "重置"
      }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { findComponentByProp, proxyProp } from '@/utils'
import BaseCheckboxGroup from './BaseFormItem/BaseCheckboxGroup'
import BaseRadioGroup from './BaseFormItem/BaseRadioGroup'
import BaseSelect from './BaseFormItem/BaseSelect'
import { baseItem } from './BaseFormItem'

const form = Symbol("form") //保证每个实例有独一无二的标志位

export default {
  name: "SForm",
  components: {
    BaseCheckboxGroup,
    BaseRadioGroup,
    BaseSelect
  },
  props: {
    formItems: {
      type: Array,
      required: true
    },
    submit: {
      type: Boolean,
      default: true
    },
    reset: {
      type: Boolean,
      default: false
    },
    api: {
      type: Function,
      required: true
    },
    //传入mergeForm允许父组件修改内部Model对象
    mergeForm: {
      type: Object,
      default: () => {}
    }
    // refName: {
    //   type: String,
    //   required: true
    // }
  },
  data() {
    return {
      formModel: {},
      originModel: {},
      form
    }
  },
  computed: {
    _formItems() {
      let items = []

      // 当formModel改变时触发
      items = this.formItems.map((item) => {
        return this.computeformItem(item, this.formModel)
      })
      // console.log(items)
      return items
    }
  },
  watch: {
    formItems: {
      handler() {
        this.formItems.forEach((item) => {
          if (!item.attrs || !item.key) return       //跳过没有key的属性(插槽)
          let value = (item.attrs &&  item.attrs.value) ? item.attrs.value : ''
          // console.log(item.key, value)
          this.$set(this.formModel, item.key ,value)
        })
        console.log('formItems', this.formModel) 
        this.originModel = JSON.parse(JSON.stringify(this.formModel))
      },
      deep: true,
      immediate: true
    },
    mergeForm: {
      handler() {
        this.mergeModel()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    computeformItem(formItem, model) {
      let item = {...formItem}
      
      let tag = baseItem[item.tag || 'input']
      item.tag = tag.component

      item.attrs = Object.assign({}, tag.attrs, item.attrs)
      //动态获取attribute
      if(item.getters){
        item.attrs = Object.assign({}, item.attrs, item.getters(model))
      }
      // 条件渲染
      item._hasRender = item.hasRender ? item.hasRender(model) : true
      // 删除不渲染的key，防止提交时出现多余的key
      if(!item._hasRender){
        delete model[formItem.key]
      }
      // console.log(item)
      return item
    },
    mergeModel() {
      this.formModel = Object.assign({}, this.formModel, this.mergeForm)
      console.log('form', this.formModel)
    },
    handleSubmit() {
      this.$refs[form].validate((valid) => {
        if(!valid){
          this.$message.error('请填写相关项目')
          return 
        }
        console.log('submit', this.formModel)
        this.api(this.formModel).then((result) => {
          let {data} = result
          this.$emit('after-submit', data)
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    handleReset() {
      this.$refs[form].clearValidate()
      // this.formModel = JSON.parse(JSON.stringify(this.originModel))
    }
  },
  mounted() {
    //代理父组件的mergeForm属性
    let parentComponent = findComponentByProp(this, "mergeForm")
    if (parentComponent) {
      parentComponent.mergeForm = proxyProp(parentComponent.mergeForm)
    } else {
      throw new Error("can not find parentComponent")
    }
    //mounted钩子中formItems是空数组,所以不在mounted里面操作formItems
  },
}
</script>