<template>
  <div :class="className" :style="{height:height,width:width}"> </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'genderCharts',
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
        keys.push(item.gender)
        values.push({value: item.num, name: item.gender})
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
          text: '男女比例'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: keys
        },
        toolbox: {
          show : true,
          feature : {
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        series: [
          {
            name: '男女比例',
            type: 'pie',
            // roseType: 'area',
            radius: ['0', '50%'],
            center: ['50%', '38%'],
            data: values,
            animationEasing: 'cubicInOut',
            animationDuration: 3500
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