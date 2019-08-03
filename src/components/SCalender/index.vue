<template>
  <div class="calender">
    <div class="calender-title-wrapper">
      <div class="calender-title">
        <div class="calender-arrow-item left2" v-if="false"></div>
        <div class="calender-arrow-item" @click="month--">
          <icon-svg icon-class="arrow-left"></icon-svg>
        </div>
        <div class="calender-Date-text">{{year}}年{{month}}月</div>
        <div class="calender-arrow-item" @click="month++">
          <icon-svg icon-class="arrow-right"></icon-svg>
        </div>
        <div class="calender-arrow-item right2" v-if="false"></div>
      </div>
    </div>
    <div class="calender-content-wrapper">
      <div class="calender-days-wrapper">
        <div class="calender-days">日</div>
        <div class="calender-days">一</div>
        <div class="calender-days">二</div>
        <div class="calender-days">三</div>
        <div class="calender-days">四</div>
        <div class="calender-days">五</div>
        <div class="calender-days">六</div>
      </div>
      <div class="calender-content clearfix">
        <div class="calender-item-wrapper"
            v-for="(item, index) in daysArr"
            :key="index"
            :class="{'no-current-day': item.month != month,
                      active:item === activeItem,
                      'current-day':item.day ===currentDate.day &&
                                item.month === currentDate.month &&
                                item.year === currentDate.year}"
            @click="handleClick(item)"
        >
          <div class="calender-item">{{item.day}}</div>
          <!-- <div class="tem-wrapper">
            <span class="temp" v-for="(d, i) in markArr" :key="i" :style="{background: d.color}" v-if="_visibleTemp(d,item)"></span>
          </div> -->
        </div>
      </div>
      <!-- <div class="calender-mask-wrapper clearfix">
        <div class="calender-mask-item" v-for="(item, index) in markArr" :key="index">
          <span class="tem" :style="{background:item.color}"></span>
          <span class="text">{{item.name}}</span>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "calender",
  data(){
    return {
      day: '',
      month: '',
      year: '',
      currentMonthDays: '',
      daysArr: [],
      activeItem: {}
    }
  },
  mounted() {
    this.getCurrentDate()
  },
  methods:{
    //获取月份天数
    getMonthDays(year, month){
      return new Date(year, month, 0).getDate()
    },
    //获取当前日期
    getCurrentDate(){
      let date = new Date()
      this.day = date.getDate()
      this.month = date.getMonth() + 1
      this.year = date.getFullYear()
      this.currentMonthDays = this.getMonthDays(this.year, this.month)
      this.getFirstDaysForMonth(this.year, this.month)
    },
    fillMonthDays(year, month) {
      let res = []
      let days = this.getMonthDays(year, month)
      for(let i = 0; i < days; i++) {
        res.push({
          year,
          month,
          day: i + 1
        })
      }
      return res
    },
    //获取切换页月份第一天是周几与最后一天并获取月前与月后填补数组
    getFirstDaysForMonth(year, month){
      let weekdays = new Date(`${year}-${month}-01`).getDay()
      let beforeMonthDaysArr = []
      let currentMonthDaysArr = []
      let afterMonthDaysArr = []
      // 获取上一月总天数
      beforeMonthDaysArr = this.fillMonthDays(year, month - 1)
      beforeMonthDaysArr.splice(0, beforeMonthDaysArr.length - weekdays)

      // 获取当前月总天数
      currentMonthDaysArr = this.fillMonthDays(year, month)

      // 获取下个月总天数
      let afterWeekdays = new Date(`${year}-${month}-${this.getMonthDays(year, month)}`).getDay()
      if(beforeMonthDaysArr.length + currentMonthDaysArr.length + 6 - afterWeekdays === 35){
        for(let i = 0; i < 13 - afterWeekdays; i++){
          afterMonthDaysArr.push({
            year:year,
            month:month + 1,
            day: i + 1
          })
        }
      }else{
        for(let i = 0; i < 6 - afterWeekdays; i++){
          afterMonthDaysArr.push({
            year: year,
            month: month + 1,
            day: i + 1
          })
        }
      }
      this.daysArr = [...beforeMonthDaysArr,...currentMonthDaysArr,...afterMonthDaysArr]
      //获取下一月总天数
    },
    handleClick(item){
    //选中日期标记与解除标记
      if(this.activeItem === item){
        this.activeItem = {}
      }else {
        this.activeItem = item
      }
      //非当前月份跳转
      if(item.month != this.month){
        this.month = item.month
      }
    },
  },
  watch:{
    'month'(){
      if(this.month === 0){
        this.month = 12
        this.year--
      }
      if(this.month === 13){
        this.month = 1
        this.year++
      }
      this.currentMonthDays = this.getMonthDays(this.year, this.month)
      this.getFirstDaysForMonth(this.year, this.month)
    }
  },
  computed:{
    currentDate(){
      let date = new Date()
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.calender{
  text-align: center;
  min-width: 280px;
  height: 400px;
  .calender-title-wrapper{
    height: 44px;
    line-height: 44px;
    .calender-title{
      display: flex;
      margin: 0 auto;
      width: 280px;
      .calender-arrow-item{
        flex: 0 0 40px;
        cursor: pointer;
        transition: color .3s;
        &:hover {
          color: #409eff;
        }
        
      }
      .calender-Date-text{
        flex: 1;
        color: #424242;
        font-size: 16px;
      }
    }
  }
  .calender-content-wrapper{
    .calender-days-wrapper{
      display: flex;
      height: 44px;
      line-height: 44px;
      margin-bottom: 11px;
      .calender-days{
        flex: 1;
        color: #A7A7A7;
        font-size: 14px;
      }
    }
    .calender-content{
      .calender-item-wrapper{
        position: relative;
        float: left;
        width: 14.285%;
        height: 44px;
        line-height: 44px;
        color: #686868;
        cursor: pointer;
        .calender-item{
          position: absolute;
          left: calc(50% - 20px);
          top: calc(50% - 20px);
          height: 40px;
          width: 40px;
          border-radius: 20px;
          line-height: 40px;
          &:hover{
            // background: #FFC912;
            background: #409eff;
          }
        }
        &.no-current-day{
          color: #DCDCDC;
        }
        &.current-day, &.active{
          color: #ffffff;
          .calender-item{
            // background: #FFC912;
            background: #409eff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
