<template>
  <div>
    <div class="filter-container">
      <slot name="filter-btn"></slot>
      <el-tooltip class="item" effect="dark" content="导出列：姓名、性别、学号、手机号、学院、专业、QQ、微信、状态" placement="top">
        <el-button type="success" class="filter-right-btn" @click="exportExcel" size="small">导出Excel</el-button>
      </el-tooltip>
      <el-dropdown trigger="click" style="float: right;">
        <el-button type="primary" size="small">更改显示列</el-button>
        <el-dropdown-menu slot="dropdown">
          <template v-for="column in columns">
            <el-checkbox v-if="!column.hiddenInCheck" :value="!column.hidden" @change="handleChange($event, column)" class="el-dropdown-menu__item dropdown-check" :key="column.attrs.prop">{{column.attrs.label}}</el-checkbox>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <s-table :columns="columns" :data="data" size="medium">
      <template v-slot:avatar="{scope}">
        <div class="table-avatar">
          <el-image :src="scope.row.filepath" alt="头像" >
            <div slot="error" class="image-slot">
              <icon-svg icon-class="img-load-fail"></icon-svg>
            </div>
          </el-image>
        </div>
      </template>
      <template v-slot:action="{scope}">
        <el-button type="text" size="small">删除</el-button>
      </template>
    </s-table>
    <slot name="pagination"></slot>
  </div>
</template>
<script>
import STable from '_c/STable'
export default {
  name: 'table-panel',
  components: {
    STable
  },
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      columns: [
        {
          hidden: false,
          slot: 'avatar',
          attrs: {
            prop: 'filepath',
            width: '60',
            label: '头像',
            align: 'center'
          }
        },
        {
          hidden: true,
          attrs: {
            prop: 'username',
            label: '学号',
            align: 'center'
          }
        },
        {
          hidden: false,
          attrs: {
            prop: 'name',
            label: '姓名',
            align: 'center'
          }
        },
        {
          hidden: true,
          attrs: {
            prop: 'gender',
            label: '性别',
            align: 'center'
          }
        },
        {
          hidden: false,
          attrs: {
            prop: 'college',
            label: '院系',
            align: 'center'
          }
        },
        {
          hidden: false,
          attrs: {
            prop: 'collegetie',
            label: '专业',
            align: 'center'
          }
        },
        {
          hidden: false,
          attrs: {
            prop: 'mobile',
            label: '手机号',
            align: 'center'
          }
        },
        {
          hidden: false,
          attrs: {
            prop: 'QQ',
            label: 'QQ',
            align: 'center'
          }
        },
        {
          hidden: false,
          attrs: {
            prop: 'wechart',
            label: '微信',
            align: 'center'
          }
        },
        {
          hidden: true,
          attrs: {
            prop: 'email',
            label: '邮箱',
            align: 'center'
          }
        },
        {
          slot: 'action',
          hidden: false,
          attrs: {
            prop: 'action',
            label: '操作',
            align: 'center'
          }
        }
      ]
    }
  },
  computed: {
    tableData() {
      return this.data
    }
  },
  methods: {
    handleChange(value, column) {
      column.hidden = !value
    },
    exportExcel() {

    }
  }
}
</script>