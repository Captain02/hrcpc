<template>
  <div class="s-list-item">
    <div class="list-item-header">
      <div class="list-item-meta">
        <div class="list-item-meta-avatar">
          <el-image :src="item.actlead ? item.actlead.filepath : null"></el-image>
        </div>
        <div class="list-item-meta-content">
          <h1 class="list-item-meta-title">
            <span class="list-item-meta-corname">
              {{item.corname}}
            </span>
            <span class="list-item-meta-actname" @click="handleDetails">
              {{item.actname}}
            </span>
          </h1>
          <div class="list-item-meta-description">
            {{profile}}
          </div>
        </div>
      </div>
      <div class="list-item-content">
        <el-steps space="20%" :active="computeActive" finish-status="success">
          <el-step v-for="(proces, index) in item.processnodes" :key="proces.proid" >
            <el-button type="text" class="process-text" slot="title" @click="handleChangeProcessState(index)">{{proces.processnode}}</el-button>
          </el-step>
        </el-steps>
      </div>
      <div class="list-item-action">
        <div class="list-item-action-btn">
          <div class="slot-action">
            <slot name="actions"></slot>
          </div>
          <div class="trigger" @click="handleShow">
            <icon-svg icon-class="arrow-down1" :class="{'trigger-icon': true, 'isActive': this.isShow}"></icon-svg>
          </div>
        </div>
        <div class="list-item-message">
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
      <!-- </div> -->
    </div>
    <collapse-transition>
      <div class="list-item-body" v-show="isShow">
        <div class="video-wrapper">
          <video-player :video-source="item.video ? item.video.filepath : ''"></video-player>
        </div>
        <div class="image-wrapper">
          <el-image :src="item.image ? item.image.filepath : ''"></el-image>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
import cloneDeep from 'clonedeep'
import CollapseTransition from './CollapseTransition'
import VideoPlayer from '_c/VideoPlayer'
export default {
  name: 'ListItem',
  components: {
    CollapseTransition,
    VideoPlayer
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
    profile() {
      // console.log(this.item.profile)
      return (this.item.profile && this.item.profile.length > 65) ? (this.item.profile.substring(0, 66) + '...') : this.item.profile
    },
    hasLike() {
      let flag = this.item.likePeople.some((item) => {
        item === this.userId
      })
      return flag ?  'full-like' : 'like'
    },
    hasCollect() {
      let flag = this.item.collectionPeople.some((item) => {
        item === this.userId
      })
      return flag ?  'full-collect' : 'collect'
    }
  },
  methods: {
    parseTime,
    handleShow(event) {
      event.preventDefault()
      this.isShow = !this.isShow
    },
    handleDetails() {
      this.$emit('on-details', this.item.actid)
    },
    handleChangeProcessState(index) {
      let proceNodes = this.item.processnodes.map((item, i) => {
        return i <= index ? { proid: item.proid, type: 1 } :{ proid: item.proid, type: 0 }
      })
      this.$emit('on-process-state-chnage', proceNodes)
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
.s-list-item {
  border-bottom: 1px solid #e8e8e8;
  padding: 15px 10px;
  .list-item-header{
    display: flex;
    .list-item-meta {
      display: flex;
      flex: 3;
      // align-items: flex-start;
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
          .list-item-meta-corname {
            font-weight: bold;
          } 
          .list-item-meta-actname {
            margin-left: 8px;
            cursor: pointer;
            transition: color .3s;
            &:hover {
              color: #409eff;
            }
          }
        }
        .list-item-meta-description {
          letter-spacing: 2px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 12px;
          line-height: 25px;
          padding-right: 30px;
        }
      }
    }
    .list-item-content {
      // display: flex;
      flex: 2;
      padding: 0 20px;
      align-self: center;
      .process-text {
        padding: 5px 0 0 0;
        font-size: 13px;
        color: #2c3e50;
        font-weight: bold;
        transition: color .4s;
        &:hover {
          color: #409eff;
        }
      }
    }
    .list-item-action {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      .list-item-action-btn {
        display: flex;
        .trigger {
          width: 30px;
          height: 30px;
          margin-left: 10px;
          background: #EBEEF5;
          text-align: center;
          border-radius: 5px;
          line-height: 30px;
          cursor: pointer;
          font-size: 12px;
        }
      }
      .list-item-message {
        display: flex;
        justify-content: space-around;
        line-height: 22px;
        color: rgba(0, 0, 0, .5);
        margin-top: 10px;
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
  .list-item-body {
    padding: 20px;
    border-top: 1px solid #e8e8e8;
    display: flex;
    // height: 300px;
    .video-wrapper {
      // flex: 1 1 0;
      width: 300px;
      // display: inline-block;
    }
    .image-wrapper {
      // display: inline-block;
      margin-left: 25px;
      width: 300px;
      // flex: 1 1 0;
    }
  }
  // .list-item-header {
  //   .list-item-action {
  //     display: flex;
  //     .slot-action {
  //       margin-left: auto;
  //     }
  //   }
  //   .list-item-info {
  //     display: flex;
  //     padding-top: 10px;
  //     align-items: center;
  //     .list-item-meta {
  //       display: flex;
  //       flex: 3;
  //       align-items: flex-start;
  //       .list-item-meta-avatar {
  //         width: 40px;
  //         height: 40px;
  //         border-radius: 10px;
  //         overflow: hidden;
  //         margin-right: 16px;
  //       }
  //       .list-item-meta-content {
  //         flex: 1 0;
  //         .list-item-meta-title {
  //           margin-bottom: 5px;
  //           .list-item-meta-corname {
  //             font-weight: bold;
  //           } 
  //           .list-item-meta-actname {
  //             margin-left: 8px;
  //           }
  //         }
  //         .list-item-meta-description {
  //           color: rgba(0, 0, 0, 0.45);
  //           font-size: 12px;
  //           line-height: 19px;
  //           letter-spacing: 2px;
  //         }
  //       }
  //     }
  //     .list-item-content {
  //       // display: flex;
  //       flex: 2;
  //       padding: 0 20px;
  //       .process-text {
  //         padding: 5px 0 0 0;
  //         font-size: 13px;
  //         color: #2c3e50;
  //         font-weight: bold;
  //         transition: color .4s;
  //         &:hover {
  //           color: #409eff;
  //         }
  //       }
  //     }
  //     .list-item-message {
  //       display: flex;
  //       flex: 1;
  //       flex-direction: column;
  //       align-self: flex-start;
  //       .list-item-message-crowds {
  //         line-height: 20px;
  //         font-size: 13px;
  //         margin-bottom: 10px;
  //         .label {
  //           font-weight: bold;
  //         }
  //       }
  //       .list-item-message-date {
  //         display: flex;
  //         justify-content: space-around;
  //         line-height: 22px;
  //         color: rgba(0, 0, 0, .5);
  //         .like-wrapper, .collect-wrapper {
  //           cursor: pointer;
  //           transition: color .4s;
  //           &:hover {
  //             color: #2c3e50;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   .trigger {
  //     width: 30px;
  //     height: 30px;
  //     margin-left: 10px;
  //     background: #EBEEF5;
  //     text-align: center;
  //     border-radius: 5px;
  //     line-height: 30px;
  //     cursor: pointer;
  //     font-size: 12px;
  //   }
  //   .trigger-icon {
  //     transition: all .3s;
  //   }
  //   .isActive {
  //     transform: rotate(180deg)
  //   }
  // }
  
}
</style>
