<doc>
  @author: yuezhonghao
  @title: 测试组件
  @desp:
         1，保持template、script、style这个顺序
         2，保持template最外层的div class名称和style包裹的class名称保持一致
</doc>
<template>
  <div class="CompTest">

  </div>
</template>

<script>
  //   导入请求接口
  //   导入工具方法
  //   导入组件

  export default {
    // 组件名称
    name: 'CompTest',
    // 使用的组件
    components: {//和上面的导入组件保持一样的顺序-----------
    },
    // 静态属性
    props:{

    },
    // 动态属性
    data() {
      return {
      };
    },
    // 计算属性
    computed: {
    },
    // 侦听属性
    watch: {
    },
    // 过滤器
    filters:{

    },
    // 绑定方法
    methods: {
      //获取信息
      getDemo(){

      }
    },
    // vue生命周期-vue实例挂载到dom之后
    mounted() {
    },
    // vue生命周期-vue实例数据变化更新DOM之后
    updated() {
    },
    // vue生命周期-vue实例销毁之后
    destroyed() {
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .CompTest {

  }
</style>

