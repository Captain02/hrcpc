<template>
  <div :class="{'hidden': hidden}" class="page-container">
    <el-pagination
      :background="background"
      :total="total"
      v-bind="$attrs"
      :layout="layout"
      :page-sizes="pageSizes"
      :page-size.sync="pageSize"
      :current-page.sync="currPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    background: {
      type: Boolean,
      default: true
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40]
    },
    size: {
      type: Number,
      default: 20
    },
    curr: {
      type: Number,
      default: 1
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pageSize: {
      get() {
        return this.size
      },
      set(val) {
        this.$emit('update:size', val)
      }
    },
    currPage: {
      get() {
        return this.curr
      },
      set(val) {
        this.$emit('update:curr', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('on-page-change', {currentPage: this.curr, pageSize: val})
    },
    handleCurrentChange(val) {
      this.$emit('on-page-change', {currentPage: val, pageSize: this.size})
    }
  }
}
</script>
<style scoped>
.page-container {
  background: #fff;
  padding: 32px 16px;
}
.page-container.hidden {
  display: none;
}
</style>
