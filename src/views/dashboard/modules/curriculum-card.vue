<template>
  <el-card>
    <!-- <table>
      <thead>
        <tr>
          <th>时间段</th>
          <th>节次</th>
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th>周六</th>
          <th>周天</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>-->
    <!-- <table class="table">
      <tbody>
        <tr>
          <td colspan="9">
            <div class="timetable_title">
              <h6 class="pull-left">2018-2019学年第1学期</h6>马春晖的课表
              <h6 class="pull-right">学号：201631000015</h6>
            </div>
            <div>
              <span class="pull-left">☆-讲课※-实践▲-上机★-实验</span>
              <span class="pull-right">
                <font color="red" size="3">
                  <b>注：</b>
                </font>
                <font color="red" size="3">
                  <i>红色斜体为待筛选</i>
                </font>，
                <font color="blue" size="3">蓝色为已选上</font>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <span class="time">时间段</span>
          </td>
          <td>
            <span class="time">节次</span>
          </td>
          <td>
            <span class="time">星期一</span>
          </td>
          <td>
            <span class="time">星期二</span>
          </td>
          <td>
            <span class="time">星期三</span>
          </td>
          <td>
            <span class="time">星期四</span>
          </td>
          <td>
            <span class="time">星期五</span>
          </td>
          <td>
            <span class="time">星期六</span>
          </td>
          <td>
            <span class="time">星期日</span>
          </td>
        </tr>
        <tr>
          <td rowspan="5">
            <span class="time">上午</span>
          </td>
          <td>
            <span class="festival">1</span>
          </td>
          <td class="td_wrap"></td>
          <td  id="2-1" class="td_wrap"></td>
          <td  id="3-1" class="td_wrap"></td>
          <td  id="4-1" class="td_wrap"></td>
          <td  id="5-1" class="td_wrap"></td>
          <td  id="6-1" class="td_wrap"></td>
          <td  id="7-1" class="td_wrap"></td>
        </tr>
        <tr>
          <td>
            <span class="festival">2</span>
          </td>
          <td  id="1-2" class="td_wrap"></td>
          <td  id="2-2" class="td_wrap"></td>
          <td  id="3-2" class="td_wrap"></td>
          <td  id="4-2" class="td_wrap"></td>
          <td  id="5-2" class="td_wrap"></td>
          <td  id="6-2" class="td_wrap"></td>
          <td  id="7-2" class="td_wrap"></td>
        </tr>
        <tr>
          <td>
            <span class="festival">3</span>
          </td>
          <td  id="1-3" class="td_wrap"></td>
          <td  id="2-3" class="td_wrap"></td>
          <td  id="3-3" class="td_wrap"></td>
          <td  id="4-3" class="td_wrap"></td>
          <td  id="5-3" class="td_wrap"></td>
          <td  id="6-3" class="td_wrap"></td>
          <td  id="7-3" class="td_wrap"></td>
        </tr>
        <tr>
          <td>
            <span class="festival">4</span>
          </td>
          <td  id="1-4" class="td_wrap"></td>
          <td  id="2-4" class="td_wrap"></td>
          <td  id="3-4" class="td_wrap"></td>
          <td  id="4-4" class="td_wrap"></td>
          <td  id="5-4" class="td_wrap"></td>
          <td  id="6-4" class="td_wrap"></td>
          <td  id="7-4" class="td_wrap"></td>
        </tr>
        <tr>
          <td>
            <span class="festival">5</span>
          </td>
          <td  id="1-5" class="td_wrap"></td>
          <td  id="2-5" class="td_wrap"></td>
          <td  id="3-5" class="td_wrap"></td>
          <td  id="4-5" class="td_wrap"></td>
          <td  id="5-5" class="td_wrap"></td>
          <td  id="6-5" class="td_wrap"></td>
          <td  id="7-5" class="td_wrap"></td>
        </tr>
        <tr>
          <td rowspan="4">
            <span class="time">下午</span>
          </td>
          <td>
            <span class="festival">6</span>
          </td>
          <td  id="1-6" class="td_wrap"></td>
          <td  id="2-6" class="td_wrap"></td>
          <td  id="3-6" class="td_wrap"></td>
          <td  id="4-6" class="td_wrap"></td>
          <td  id="5-6" class="td_wrap"></td>
          <td  id="6-6" class="td_wrap"></td>
          <td  id="7-6" class="td_wrap"></td>
        </tr>
        <tr>
          <td>
            <span class="festival">7</span>
          </td>
          <td  id="1-7" class="td_wrap"></td>
          <td  id="2-7" class="td_wrap"></td>
          <td  id="3-7" class="td_wrap"></td>
          <td  id="4-7" class="td_wrap"></td>
          <td  id="5-7" class="td_wrap"></td>
          <td  id="6-7" class="td_wrap"></td>
          <td  id="7-7" class="td_wrap"></td>
        </tr>
        <tr>
          <td>
            <span class="festival">8</span>
          </td>
          <td  id="1-8" class="td_wrap"></td>
          <td  id="2-8" class="td_wrap"></td>
          <td  id="3-8" class="td_wrap"></td>
          <td  id="4-8" class="td_wrap"></td>
          <td  id="5-8" class="td_wrap"></td>
          <td  id="6-8" class="td_wrap"></td>
          <td  id="7-8" class="td_wrap"></td>
        </tr>
        <tr>
          <td>
            <span class="festival">9</span>
          </td>
          <td  id="1-9" class="td_wrap"></td>
          <td  id="2-9" class="td_wrap"></td>
          <td  id="3-9" class="td_wrap"></td>
          <td  id="4-9" class="td_wrap"></td>
          <td  id="5-9" class="td_wrap"></td>
          <td  id="6-9" class="td_wrap"></td>
          <td  id="7-9" class="td_wrap"></td>
        </tr>
        <tr>
          <td rowspan="4">
            <span class="time">晚上</span>
          </td>
          <td>
            <span class="festival">10</span>
          </td>
          <td  id="1-10" class="td_wrap"></td>
          <td  id="2-10" class="td_wrap"></td>
          <td  id="3-10" class="td_wrap"></td>
          <td  id="4-10" class="td_wrap"></td>
          <td  id="5-10" class="td_wrap"></td>
          <td  id="6-10" class="td_wrap"></td>
          <td  id="7-10" class="td_wrap"></td>
        </tr>
        <tr>
          <td>
            <span class="festival">11</span>
          </td>
          <td  id="1-11" class="td_wrap"></td>
          <td  id="2-11" class="td_wrap"></td>
          <td  id="3-11" class="td_wrap"></td>
          <td  id="4-11" class="td_wrap"></td>
          <td  id="5-11" class="td_wrap"></td>
          <td  id="6-11" class="td_wrap"></td>
          <td  id="7-11" class="td_wrap"></td>
        </tr>
        <tr>
          <td>
            <span class="festival">12</span>
          </td>
          <td  id="1-12" class="td_wrap"></td>
          <td  id="2-12" class="td_wrap"></td>
          <td  id="3-12" class="td_wrap"></td>
          <td  id="4-12" class="td_wrap"></td>
          <td  id="5-12" class="td_wrap"></td>
          <td  id="6-12" class="td_wrap"></td>
          <td  id="7-12" class="td_wrap"></td>
        </tr>
        <tr>
          <td>
            <span class="festival">13</span>
          </td>
          <td  id="1-13" class="td_wrap"></td>
          <td  id="2-13" class="td_wrap"></td>
          <td  id="3-13" class="td_wrap"></td>
          <td  id="4-13" class="td_wrap"></td>
          <td  id="5-13" class="td_wrap"></td>
          <td  id="6-13" class="td_wrap"></td>
          <td  id="7-13" class="td_wrap"></td>
        </tr>
      </tbody>
    </table> -->
    <table class="table">
      <tbody>
        <tr v-for="(row, index) in map" :key="index">
          <td v-for="(col, index) in row" :key="index">
            <span class="time">{{col['title']}}</span>
          </td>
        </tr>
        
      </tbody>
    </table>
  </el-card>
</template>
<script>
export default {
  name: "curriculumCard",
  data() {
    return {
      map: [
        [                   // 第一行表头信息tr
          {                 // td
            title: '时间段',
          },
          {
            title: '节次',
          },
          {
            title: '星期一',
          },
          {
            title: '星期二',
          },
          {
            title: '星期四',
          },
          {
            title: '星期五',
          },
          {
            title: '星期六',
          },
          {
            title: '星期天',
          }
        ],
        [
          {
            title: ''
          }
        ]
      ]
    }
  },
}
</script>
<style lang="less" scoped>
.table {
  width: 100%;
  td {
    padding: 10px;
    border: 1px solid #ebeef5;
    vertical-align: middle;
    text-align: center;
  }
}
</style>
