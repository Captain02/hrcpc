<template>
  <div :class="avatarClass">
    <el-image :src="url" v-bind="$attrs">
      <div slot="error" class="image-slot">
        <icon-svg icon-class="img-load-fail"></icon-svg>
      </div>
    </el-image>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'SAvatar',
  props: {
    url: {
      // type: [String, Objsect],
      required: true
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      avatarUrl: ''
    }
  },
  computed: {
    avatarClass() {
      return {
        'avatar-wrapper': true,
        'size-default': this.size === 'default',
        'size-medium': this.size === 'medium',
        'size-large': this.size === 'large'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.avatar-wrapper {
  border-radius: 10px;
  overflow: hidden;
}
.size-default {
  width: 40px;
  height: 40px;
}
.size-medium {
  width: 80px;
  height: 80px;
}
.size-large {
  width: 120px;
  height: 120px;
}
</style>
