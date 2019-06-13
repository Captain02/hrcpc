<template>
  <div>
    <el-row class="charts-row" :gutter="25">
      <el-col :span="12">
        <el-card >
          <level-charts :chart-data="data.groupPersonNum || []" width="100%" height="300px"></level-charts>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card >
        <gender-charts :chart-data="data.groupGender || []" width="100%" height="300px"></gender-charts>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="charts-row" :gutter="25">
      <el-col :span="24">
        <el-card >
        <college-charts :chart-data="data.groupCollege || []" width="100%" height="300px"></college-charts>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="charts-row" :gutter="25">
      <el-col :span="24">
        <el-card >
        <collegetie-charts :chart-data="data.groupcollegetie || []" width="100%" height="300px"></collegetie-charts>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import levelCharts from '../../recruited/report/modules/levelCharts'
import collegeCharts from '../../recruited/report/modules/collegeCharts'
import genderCharts from '../../recruited/report/modules/genderCharts'
import collegetieCharts from '../../recruited/report/modules/collegetieCharts'
export default {
  name: 'charts-panel',
  components: {
    levelCharts,
    collegeCharts,
    genderCharts,
    collegetieCharts
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      
    }
  }
}
</script>
<style scoped>
.charts-row {
  margin-top: 25px;
}
</style>
