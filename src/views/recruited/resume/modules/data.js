import { parseTime } from '@/utils'
/**
 * 表格列属性
 */
export const columns = [
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
      label: '用户名',
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
      prop: 'persionnum',
      label: '学号',
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
    hidden: false,
    slot: 'status',
    attrs: {
      prop: 'status',
      label: '状态',
      align: 'center'
    }
  },
  {
    hidden: true,
    attrs: {
      prop: 'create_time',
      label: '创建时间',
      align: 'center',
      formatter: (row, column, cellValue, index) => parseTime(cellValue, '{y}-{m}-{d}')
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

/**
 * 状态列
 */
export const options = [
  { id: 1, text: '全部', value: '', tagType: null },
  { id: 2, text: '录用', value: 1 , tagType: 'success'},
  { id: 3, text: '未录用', value: 2 , tagType: 'danger'},
  { id: 4, text: '面试', value: 3 , tagType: 'warning'},
  { id: 5, text: '笔试', value: 4 , tagType: 'info'},
  { id: 6, text: '未处理', value: 5, tagType: 'default' }
]