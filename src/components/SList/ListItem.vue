<template>
  <div class="list-item">
    <div class="list-item-header">
      <div class="trigger" @click="handleShow">
        <icon-svg icon-class="arrow-down1" :class="{'trigger-icon': true, 'isActive': this.isShow}"></icon-svg>
      </div>
      <div class="list-item-info">
        <div class="list-item-meta">
          <div class="list-item-meta-avatar">
            <el-image src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"></el-image>
          </div>
          <div class="list-item-meta-content">
            <h1 class="list-item-meta-title">
              <span class="list-item-meta-text">
                活动名称
              </span>
            </h1>
            <div class="list-item-meta-description">
              就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时就哈萨克计划好时看时
            </div>
          </div>
        </div>
        <div class="list-item-content">
          <el-steps space="20%" :active="1" finish-status="success">
            <el-step title="已完成"></el-step>
            <el-step title="进行中"></el-step>
            <el-step title="步骤 3"></el-step>
          </el-steps>
        </div>
        <div class="list-item-action">789</div>
      </div>
    </div>
    <collapse-transition>
      <div class="list-item-body" v-show="isShow">
        就哈萨克计划好时看时
      </div>
    </collapse-transition>
  </div>
</template>
<script>
import CollapseTransition from './CollapseTransition'
export default {
  name: 'ListItem',
  components: {
    CollapseTransition
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    handleShow(event) {
      event.preventDefault()
      this.isShow = !this.isShow
    }
  }
}
</script>
<style lang="less">
.list-item-content {
  .el-step__title {
    font-size: 13px;
    line-height: 20px;
  }
}
</style>

<style lang="less" scoped>
.list-item {
  border-bottom: 1px solid #e8e8e8;
  .list-item-header {
    .list-item-info {
      display: flex;
      padding: 12px 0;
      align-items: center;
      .list-item-meta {
        display: flex;
        flex: 3;
        align-items: flex-start;
        .list-item-meta-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          overflow: hidden;
          margin-right: 16px;
        }
        .list-item-meta-content {
          flex: 1 0;
          .list-item-meta-title {
            margin-bottom: 5px;
          }
          .list-item-meta-description {
            color: rgba(0, 0, 0, 0.45);
            font-size: 12px;
            line-height: 20px;
          }
        }
      }
      .list-item-content {
        // display: flex;
        flex: 2;
        padding: 0 20px;
      }
      .list-item-action {
        display: flex;
        flex: 1;
      }
    }
    .trigger {
      width: 30px;
      height: 30px;
      margin: 0 8px 0 auto;
      background: #EBEEF5;
      text-align: center;
      border-radius: 5px;
      line-height: 30px;
      cursor: pointer;
      font-size: 12px;
    }
    .trigger-icon {
      transition: all .3s;
    }
    .isActive {
      transform: rotate(180deg)
    }
  }
}
</style>
