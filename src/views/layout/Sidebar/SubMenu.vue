<template>
  <el-submenu
    :index="menuInfo.path"
    v-bind="$props"
    v-on="$listeners"
  >
    <template slot="title">
      <icon-svg v-if="menuInfo.meta && menuInfo.meta.icon" :icon-class="menuInfo.meta.icon" />
      <span v-if="menuInfo.meta && menuInfo.meta.title">{{menuInfo.meta.title}}</span>
    </template>
    
    <template v-for="item in menuInfo.children">
      <router-link 
        :to="resolvePath(item.path)" 
        v-if="!item.children && !item.hidden"
        :key="resolvePath(item.path)"
      >
        <el-menu-item
          :index="resolvePath(item.path)"
        >
          <icon-svg v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon" />
          <span v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
        </el-menu-item>
      </router-link>
      <sub-menu
        v-else
        :key="resolvePath(item.path)"
        :base-path="resolvePath(item.path)"
        :menu-info="item"
      />
    </template>
  </el-submenu>
</template>
<script>
import path from 'path'
export default {
  name: 'SubMenu',
  props: {
    menuInfo: { 
      type: Object,
      default: ()=>({}),
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths)
    }
  }
};
</script>