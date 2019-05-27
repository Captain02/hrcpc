<template>
  <div class="app-container">
    <h1 class="page-title"> 统计报表 </h1>
    <div class="filter-container">
      <el-select class="filter-item" v-model="status" placeholder="状态" size="small" @change="handleChange">
        <el-option v-for="item in options" :key="item.id" :label="item.text" :value="item.value"></el-option>
      </el-select>
    </div>
    <el-row class="charts-row" :gutter="25">
      <el-col :span="12">
        <el-card >
          <level-charts :chart-data="levelData" width="100%" height="300px"></level-charts>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card >
        <gender-charts :chart-data="genderData" width="100%" height="300px"></gender-charts>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="charts-row" :gutter="25">
      <el-col :span="24">
        <el-card >
        <college-charts :chart-data="collegeData" width="100%" height="300px"></college-charts>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="charts-row" :gutter="25">
      <el-col :span="24">
        <el-card >
        <collegetie-charts :chart-data="collegetieData" width="100%" height="300px"></collegetie-charts>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getCharts as getChartsApi } from '@/api/recruited/report'
import levelCharts from './modules/levelCharts'
import collegeCharts from './modules/collegeCharts'
import genderCharts from './modules/genderCharts'
import collegetieCharts from './modules/collegetieCharts'
export default {
  name: 'report',
  components: {
    levelCharts,
    collegeCharts,
    genderCharts,
    collegetieCharts
  },
  data() {
    return {
      status: '',
      options: [
        { id: 1, text: '全部', value: '' },
        { id: 2, text: '录用', value: 1 },
        { id: 3, text: '未录用', value: 2 },
        { id: 4, text: '面试', value: 3 },
        { id: 5, text: '笔试', value: 4 },
        { id: 6, text: '未处理', value: 5 }
      ],
      levelData: [],
      genderData: [],
      collegeData: [],
      collegetieData: []
    }
  },
  methods: {
    getChartsData() {
      getChartsApi(this.status).then((result) => {
        this.levelData = result.persionnumData
        this.genderData = result.genderData
        this.collegeData = result.collegeData
        this.collegetieData = result.collegetieData
      }).catch((err) => { console.log(err) })
    },
    handleChange(val) {
      this.getChartsData()
    }
  },
  mounted() {
    this.getChartsData()
  }
}
</script>
<style lang="less" scoped>
.charts-row {
  margin-top: 25px;
}
</style>
