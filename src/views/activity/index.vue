<template>
  <div class="app-container">
    <h1 class="page-title">活动列表</h1>
     <div class="filter-container">
       <el-select class="filter-item" v-model="listQuery.isAct" size="small" style="width: 100px;">
         <el-option :value="1" label="有效"></el-option>
         <el-option :value="0" label="无效"></el-option>
       </el-select>
       <el-select class="filter-item" v-model="listQuery.actcorid" size="small" style="width: 130px;">
         <el-option :value="corid" label="本社团活动"></el-option>
         <el-option value="" label="全部社团活动"></el-option>
       </el-select>
       <el-tooltip content='不选择则面向人群默认为"全校"' placement="top">
        <el-select class="filter-item" multiple clearable v-model="listQuery.crowdids" size="small" placeholder="面向人群">
          <el-option v-for="item in options" :key="item.id" :value="item.id" :label="item.label"></el-option>
        </el-select>
       </el-tooltip>
       <el-input class="filter-item" v-model="listQuery.actName" placeholder="活动名称" style="width: 200px;" size="small"></el-input>
       <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
     </div>
     <div class="activity-list">
        <s-list :data="listData" :user-id="userId" @on-details="handleDetails" @on-add-like="handleAddLike" @on-cancel-like="handleCancelLike" @on-add-collect="handleAddCollect" @on-cancel-collect="handleCancelCollect">
          <template v-slot:actions="{scope}">
            <template v-if="scope.actcorid === corid">
              <qr-code style="display: inline-block; margin-right: 10px;">
                <template v-slot:action-btn>
                  <el-button size="small" type="primary">二维码</el-button>
                </template>
              </qr-code>
              <el-button size="small" type="primary" @click="handleEdit(scope)">修改</el-button>
              <el-button size="small" @click="handleInActivity(scope.actid)">报名统计</el-button>
            </template>
          </template>
          <template v-slot:process-nodes="{scope}">
            <el-steps space="20%" :active="countActives(scope.processnodes)" finish-status="success">
              <el-step v-for="(node, index) in scope.processnodes" :key="node.proid" >
                <el-button v-if="scope.actcorid === corid" type="text" class="process-text" slot="title" @click="processStateChnage(index, scope.processnodes)">{{node.processnode}}</el-button>
                <span v-else slot="title">{{node.processnode}}</span>
              </el-step>
            </el-steps>
          </template>
        </s-list>
     </div>
     <pagination v-show="total>0" :total="total" :curr.sync="listQuery.currPage" :size.sync="listQuery.pageSize" @on-page-change="getActivityList" />
  </div>
</template>
<script>
import { getCollegeInfo as getCollegeInfoApi } from '@/api/comm'
import { getActivitys as getActivitysApi, changeProcessState as changeProcessStateApi, changeLike as changeLikeApi, changeCollect as changeCollectApi } from '@/api/activity'
import { mapState } from 'vuex'
import SList from '_c/SList'
import Pagination from '_c/Pagination'
import QrCode from './modules/qrcode'
export default {
  name: 'activity-list',
  components: {
    SList,
    Pagination,
    QrCode
  },
  data() {
    return {
      listQuery: {
        actcorid: this.$store.state.user.corid,
        isAct: 1,
        actName: '',
        crowdids: [],          // 
        currPage: 1,
        pageSize: 10
      },
      total: 0,
      options: [],
      listData: []
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
      corid: (state) => state.user.corid
    })
  },
  methods: {
    initListData(data) {
      return data.map((item) => {
        let data =  {
          actcorid: item.actcorid,
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
          deptInfo: item.deptInfo && item.deptInfo.length ? item.deptInfo[0] : null,
          processnodes: item.processnodes && item.processnodes.length ? item.processnodes : [],
          video: item.video && item.video.length ? item.video[0] : null,
          image: item.image && item.image.length ? item.image[0] : null
        }
        // console.log(data)
        return data
      })
    },
    getActivityList() {
      getActivitysApi(this.listQuery.actcorid, this.listQuery.actName, this.listQuery.isAct, this
      .listQuery.crowdids, this.listQuery.currPage, this.listQuery.pageSize).then((result) => {
        console.log(result)
        let { data, page } = result
        this.listData = this.initListData(data)
        this.total = page.totalCount
      }).catch((err) => { })
    },
    handleSearch() {
      this.getActivityList()
    },
    handleEdit(data) {
      console.log(data)
    },
    handleInActivity(actid) {
      this.$router.push({
        name: 'activity-report',
        params: {
          id: actid
        }
      })
    },
    handleDetails(actid) {
      // console.log(actid)
      this.$router.push({
        name: 'details-activity',
        params: {
          id: actid
        }
      })
    },
    handleAddLike(actid, status) {
      changeLikeApi(Number(status), this.userId, actid).then((result) => {
        let activity = this.listData.find((item) => {
          return item.actid === actid
        })
        activity.likePeople.push(this.userId)
        activity.bbs_like.num++
      })
    },
    handleCancelLike(actid, status) {
      changeLikeApi(Number(status), this.userId, actid).then((result) => {
        let activity = this.listData.find((item) => {
          return item.actid === actid
        })
        let index = activity.likePeople.findIndex((item) => {
          return item === this.userId
        })
        activity.likePeople.splice(index, 1)
        activity.bbs_like.num--
      })
    },
    handleAddCollect(actid, status) {
      changeCollectApi(Number(status), this.userId, actid).then((result) => {
        // console.log(result)
        let activity = this.listData.find((item) => {
          return item.actid === actid
        })
        activity.collectionPeople.push(this.userId)
        activity.bbs_collection.num++
      })
    },
    handleCancelCollect(actid, status) {
      changeCollectApi(Number(status), this.userId, actid).then((result) => {
        let activity = this.listData.find((item) => {
          return item.actid === actid
        })
        let index = activity.collectionPeople.findIndex((item) => {
          return item === this.userId
        })
        activity.collectionPeople.splice(index, 1)
        activity.bbs_collection.num--
      })
    },
    processStateChnage(index, processNodes) {
      let proceNodes = processNodes.map((item, i) => {
        return i <= index ? { proid: item.proid, type: 1 } : { proid: item.proid, type: 0 }
      })
      changeProcessStateApi(proceNodes).then((result) => {
        this.$message.success('更新状态成功!')
        this.getActivityList()
      }).catch((err) => {})
    },
    countActives(nodes) {
      let count = 0
      nodes.forEach((item) => {
        if(item.states){
          count++
        }
      })
      return count
    }
  },
  mounted() {
    getCollegeInfoApi(1, null).then((result) => {
      let { data } = result
      this.options = data.map((item) => {
        return { id: item.id, label: item.value, value: item.id }
      })
    })
    this.getActivityList()
  }
}
</script>
<style lang="less" scoped>
.activity-list {
  border-top: 1px solid #e8e8e8;
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
</style>
