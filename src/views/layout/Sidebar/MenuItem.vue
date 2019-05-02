<template>
  <router-link :to="resolvePath(firstChildren.path)">
    <el-menu-item :index="resolvePath(firstChildren.path)">
      <icon-svg v-if="firstChildren.meta && firstChildren.meta.icon" :icon-class="firstChildren.meta.icon" />
      <span v-if="firstChildren.meta && firstChildren.meta.title" slot="title">{{firstChildren.meta.title}}</span>
    </el-menu-item>
  </router-link>
</template>
<script>
import path from 'path'
export default {
  name: 'MenuItem',
  props: {
    itemInfo: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
    firstChildren() {
      return this.itemInfo.children[0]
    }
  },
  methods: {
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths)
    }
  }
}
</script>