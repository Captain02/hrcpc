<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'collegetieCharts',
   props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '400px'
    },
    height: {
      type: String,
      default: '100%'
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    chartData: {
      handler(val) {
        this.setOptions(this.transferData(val))
      },
      deep: true
    }
  },
  methods: {
    transferData(arr) {
      let keys = []
      let values = []
      arr.forEach((item) => {
        keys.push(item.collegetie)
        values.push(item.num)
      })
      return {
        keys,
        values
      }
    },
    init() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.transferData(this.chartData))
    },
    setOptions({keys, values}) {
      this.chart.setOption({
        title: {
          text: '专业分布'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // grid: {
        //   top: 10,
        //   left: '2%',
        //   right: '2%',
        //   bottom: '3%',
        //   containLabel: true
        // },
        xAxis: [{
          type: 'category',
          data: keys,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        toolbox: {
          show : true,
          feature : {
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        series: [
          {
            name: '人数',
            type: 'bar',
            // stack: 'vistors',
            // barWidth: '60%',
            data: values,
            animationDuration: 4000
          }
        ]
      })
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    if(this.chart){
      this.chart.dispose()
      this.chart = null
    }
  }
}
</script>