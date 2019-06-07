<template>
  <div class="app-container">
    <h1 class="page-title">活动列表</h1>
     <div class="filter-container">
       <el-select v-model="listQuery.isAct" size="small" style="width: 100px;">
         <el-option :value="1" label="有效"></el-option>
         <el-option :value="0" label="无效"></el-option>
       </el-select>
       <el-select v-model="listQuery.corid" size="small" style="width: 130px;">
         <el-option value="1" label="本社团活动"></el-option>
         <el-option value="" label="全部社团活动"></el-option>
       </el-select>
       <el-input class="filter-item" v-model="listQuery.actName" placeholder="请输入活动名称" style="width: 200px;" size="small"></el-input>
       <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
     </div>
     <div class="activity-list">
        <s-list>
        </s-list>
        <!-- <el-collapse class="list-wrapper">
          <el-collapse-item class="list-item">
            <div slot="title" class="list-item-info">
              <div class="list-item-meta">meta</div>
              <div class="list-item-content">content</div>
              <div class="list-item-action">
                <div>132</div>
                <div>465</div>
              </div>
            </div>
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item class="list-item">
            <template slot="title">
              一致性 Consistency<i class="header-icon el-icon-info"></i>
            </template>
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
        </el-collapse> -->
     </div>
  </div>
</template>
<script>
import { getActivitys as getActivitysApi } from '@/api/activity'
import SList from '_c/SList'
export default {
  name: 'activity-list',
  components: {
    SList
  },
  data() {
    return {
      listQuery: {
        corid: this.$store.state.user.corid,
        isAct: 1,
        actName: '',
        currPage: 1,
        pageSize: 20
      }
    }
  },
  methods: {
    getActivityList() {
      getActivitysApi(this.listQuery.corid, this.listQuery.actName, this.listQuery.isAct, this.listQuery.currPage, this.listQuery.pageSize).then((result) => {
        console.log(result)
      }).catch((err) => { })
    },
    handleSearch() {
      this.getActivityList()
    }
  },
  mounted() {
    this.getActivityList()
  }
}
</script>
<style lang="less">
.list-wrapper {
  .el-collapse-item__header {
    display: block;
    line-height: 25px;
    height: auto;
    position: relative;
  }
  .el-collapse-item__arrow {
    position: absolute;
  }
}

</style>

<style lang="less" scoped>
.list-wrapper {
  .el-collapse-item__header {
    height: 100%;
    line-height: 20px;
  }
  .list-item-info {
    display: flex;
    // align-items: center;
    .list-item-meta {
      flex: 3;
    }
    .list-item-content {
      flex: 2;
    }
    .list-item-action {
      flex: 1;
    }
  }
}
</style>
