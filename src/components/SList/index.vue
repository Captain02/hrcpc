<template>
  <div class="list-wrapper">
    <div class="list-empty" v-if="isEmpty">{{emptyText}}</div>
    <template v-else>
      <list-item v-for="item in listData" :key="item.actid" :item="item" :user-id="userId" @on-process-state-chnage="processStateChnage">
        <slot name="actions" slot="actions" :scope="item"></slot>
      </list-item>
    </template>
  </div>
</template>
<script>
import ListItem from './ListItem'
export default {
  name: 'SList',
  components: {
    ListItem
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    userId: {
      type: Number,
      required: true
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    listData() {
     return this.data.map((item) => {
        let data =  {
          actid: item.actid,
          actname: item.actname,
          actstarttame: item.actstarttame,
          actendtime: item.actendtime,
          createtime: item.createtime,
          profile: item.profile,
          corname: item.corname,
          actlead: item.actlead && item.actlead.length ?  item.actlead[0] : null,
          likePeople: item.likePeople,
          collectionPeople: item.collectionPeople,
          crowdpeople: item.crowdpeople,
          bbs_like: item.bbs_like && item.bbs_like.length ? item.bbs_like[0] : null,
          bbs_collection: item.bbs_collection &&  item.bbs_collection.length ? item.bbs_collection[0] : null,
          processnodes: item.processnodes && item.processnodes.length ? item.processnodes : [],
          video: item.video && item.video.length ? item.video[0] : null,
          image: item.image && item.image.length ? item.image[0] : null
        }
        // console.log(data)
        return data
      })
    },
    isEmpty() {
      return this.data.length <= 0
    }
  },
  methods: {
    processStateChnage(status, proid) {
      this.$emit('on-process-state-chnage', status, proid)
    }
  }
}
</script>
<style lang="less" scoped>
.list-wrapper {
  border-top: 1px solid #e8e8e8;
  .list-empty {
    min-height: 60px;
    line-height: 60px;
    text-align: center;
    color:#909399;
    border-bottom: 1px solid #e8e8e8;
  }
}
</style>
