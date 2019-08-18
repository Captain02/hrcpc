import { parseTime } from '@/utils'
export const columns = [
    {
      hiddenInCheck: true,          // 是否在"更改显示列"中显示
      attrs: {
        type: 'selection',
        width: '35'
      }
    },
    {
      hidden: true,
      slot: 'avatar',
      attrs: {
        prop: 'filepath',
        width: '60',
        label: '头像',
        align: 'center'
      }
    },
    {
      hidden: false,
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
      hidden: false,
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
      hidden: true,
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
      hidden: true,
      attrs: {
        prop: 'create_time',
        label: '加入时间',
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

