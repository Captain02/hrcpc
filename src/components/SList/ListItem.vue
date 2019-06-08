<template>
  <div class="list-item">
    <div class="list-item-header">
      <div class="list-item-action">
        <div class="slot-action">
          <slot name="actions"></slot>
        </div>
        <div class="trigger" @click="handleShow">
          <icon-svg icon-class="arrow-down1" :class="{'trigger-icon': true, 'isActive': this.isShow}"></icon-svg>
        </div>
      </div>
      <div class="list-item-info">
        <div class="list-item-meta">
          <div class="list-item-meta-avatar">
            <el-image :src="item.actlead ? item.actlead.filepath : null"></el-image>
          </div>
          <div class="list-item-meta-content">
            <h1 class="list-item-meta-title">
              <span class="list-item-meta-corname">
                {{item.corname}}
              </span>
              <span class="list-item-meta-actname">
                {{item.actname}}
              </span>
            </h1>
            <div class="list-item-meta-description">
              {{item.profile}}
            </div>
          </div>
        </div>
        <div class="list-item-content">
          <el-steps space="20%" :active="computeActive" finish-status="success">
            <el-step v-for="proces in item.processnodes" :key="proces.proid" >
              <el-button type="text" class="process-text" slot="title" @click="handleChangeProcessState(proces.states, proces.proid)">{{proces.processnode}}</el-button>
            </el-step>
          </el-steps>
        </div>
        <div class="list-item-message">
          <div class="list-item-message-crowds">
            <span class="label">面向人群：</span>
            <span class="crowds" v-for="people in item.crowdpeople" :key="people.id">
              {{people.value}}、
            </span>
          </div>
          <div class="list-item-message-date">
            <div class="like-wrapper" title="点赞">
              <icon-svg :icon-class="hasLike"></icon-svg>
              <span class="count">{{item.bbs_like.num}}</span>
            </div>
            <div class="collect-wrapper" title="收藏">
              <icon-svg icon-class="collect"></icon-svg>
              <span class="count">{{item.bbs_collection.num}}</span>
            </div>
            <div class="date">
             {{parseTime(item.createtime, '{y}-{m}-{d}')}}
            </div>
          </div>
        </div>
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
import { changeProcessState as changeProcessStateApi } from '@/api/activity'
import { parseTime } from '@/utils'
import CollapseTransition from './CollapseTransition'
export default {
  name: 'ListItem',
  components: {
    CollapseTransition
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    userId: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    computeActive() {
      let count = 0
      this.item.processnodes.forEach((item) => {
        if(item.states){
          count++
        }
      })
      return count
    },
    hasLike() {
      let iconClass = 'like'
      let flag = this.item.likePeople.some((item) => {
        item === this.userId
      })
      iconClass = flag ?  'full-like' : 'like'
      return iconClass
    },
    hasCollect() {
      let iconClass = 'collect'
      let flag = this.item.collectionPeople.some((item) => {
        item === this.userId
      })
      iconClass = flag ?  'full-collect' : 'collect'
      return iconClass
    }
  },
  methods: {
    parseTime,
    handleShow(event) {
      event.preventDefault()
      this.isShow = !this.isShow
    },
    handleChangeProcessState(status, proid) {
      console.log(status, proid)
      if(status === 1) {
        return
      }
      changeProcessStateApi(1, proid).then((result) => {
        console.log(result)
      }).catch((err) => {  })
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
  padding: 10px 0;
  .list-item-header {
    .list-item-action {
      display: flex;
      .slot-action {
        margin: 0 5px 0 auto;
      }
    }
    .list-item-info {
      display: flex;
      padding-top: 10px;
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
        .process-text {
          padding: 5px 0 0 0;
          font-size: 13px;
        }
      }
      .list-item-message {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-self: flex-start;
        .list-item-message-crowds {
          line-height: 20px;
          font-size: 13px;
          margin-bottom: 10px;
          .label {
            font-weight: bold;
          }
        }
        .list-item-message-date {
          display: flex;
          justify-content: space-around;
          line-height: 22px;
          color: rgba(0, 0, 0, .5);
          .like-wrapper, .collect-wrapper {
            cursor: pointer;
            transition: color .4s;
            &:hover {
              color: #2c3e50;
            }
          }
        }
      }
    }
    .trigger {
      width: 30px;
      height: 30px;
      // margin: 0 8px 0 auto;
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
