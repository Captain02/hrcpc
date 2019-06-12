<template>
  <div class="list-wrapper">
    <div class="list-empty" v-if="isEmpty">{{emptyText}}</div>
    <template v-else>
      <list-item v-for="item in listData" :key="item.actid" :item="item" :user-id="userId" @on-process-state-chnage="processStateChnage" @on-details="handleDetails" @on-add-like="handleAddLike" @on-cancel-like="handleCancelLike" @on-add-collect="handleAddCollect" @on-cancel-collect="handleCancelCollect">
        <slot name="actions" slot="actions" :scope="item"></slot>
      </list-item>
    </template>
  </div>
</template>
<script>
import ListItem from './ListItem'
export default {
  name: 'SList',
  components: {
    ListItem
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    userId: {
      type: Number,
      required: true
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    listData() {
      return this.data
    },
    isEmpty() {
      return this.data.length <= 0
    }
  },
  methods: {
    handleDetails(actid) {
      this.$emit('on-details', actid)
    },
    handleAddLike(actid, status) {
      this.$emit('on-add-like', actid, status)
    },
    handleCancelLike(actid, status) {
      this.$emit('on-cancel-like', actid, status)
    },
    handleAddCollect(actid, status) {
      this.$emit('on-add-collect', actid, status)
    },
    handleCancelCollect(actid, status) {
      this.$emit('on-cancel-collect', actid, status)
    },
    processStateChnage(proceNodes) {
      this.$emit('on-process-state-chnage', proceNodes)
    }
  }
}
</script>
<style lang="less" scoped>
.list-wrapper {
  .list-empty {
    min-height: 60px;
    line-height: 60px;
    text-align: center;
    color:#909399;
    border-bottom: 1px solid #e8e8e8;
  }
}
</style>
