<template>
  <el-form :ref="refName" v-bind="$attrs" :model="formModel">
    <template v-for="(item, index) in _formItems">
      <el-form-item v-bind="item.itemAttrs || {}" :prop="item.key" :key="index">
        <component
          :is="item.tag"
          v-if="item._hasRender"
          v-bind="item.attrs || {}"
          v-model="formModel[item.key]"
          v-on="item.listeners || {}"
        ></component>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" @click="handleClick">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import BaseCheckboxGroup from './BaseFormItem/BaseCheckboxGroup'
import BaseRadioGroup from './BaseFormItem/BaseRadioGroup'
import BaseSelect from './BaseFormItem/BaseSelect'
import { baseItem } from './BaseFormItem'
export default {
  name: "STable",
  props: {
    formItems: {
      type: Array,
      required: true
    },
    api: {
      type: Function,
      required: true
    },
    refName: {
      type: String,
      required: true
    }
  },
  components: {
    BaseCheckboxGroup,
    BaseRadioGroup,
    BaseSelect
  },
  data() {
    return {
      formModel: {},
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
          let value = (item.attrs &&  item.attrs.value) ? item.attrs.value : ''
          // console.log(item.key, value)
          this.$set(this.formModel, item.key ,value)
        })
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
    handleClick() {
      this.$refs[this.refName].validate((valid) => {
        if(!valid){
          this.$message.error('请填写相关项目')
          return 
        }
        this.api(this.formModel).then((result) => {
          let {data} = result
          this.$emit('after-submit', data)
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  },
}
</script>