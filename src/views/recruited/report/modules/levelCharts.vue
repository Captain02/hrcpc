<template>
  <div :class="className" :style="{height:height,width:width}"> </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'levelCharts',
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
        keys.push(`${item.persionnum}级`)
        values.push({value: item.num, name: `${item.persionnum}级`})
      })
      return {
        keys,
        values
      }
    },
    init() {
      this.chart = echarts.init(this.$el)
      this.setOptions(this.transferData(this.chartData))
    },
    setOptions({keys, values}) {
      this.chart.setOption({
    title : {
        text: '年级比例',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data: keys
    },
    toolbox: {
        show : true,
        feature : {
          saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'年级比例',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:values
        }
    ]
                    
        // title: {
        //   text: '年级比例'
        // },
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)'
        // },
        // legend: {
        //   left: 'center',
        //   bottom: '10',
        //   data: keys
        // },
        // series: [
        //   {
        //     name: '年级比例',
        //     type: 'pie',
        //     // roseType: 'area',
        //     radius: [0, '65%'],
        //     center: ['50%', '38%'],
        //     data: values,
        //     animationEasing: 'cubicInOut',
        //     animationDuration: 3500
        //   }
        // ]
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