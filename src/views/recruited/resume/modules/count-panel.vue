<template>
  <el-row :gutter="30" type="flex" justify="center" class="count-panel">
    <el-col :span="4" class="count-panel-col">
      <el-card shadow="hover" class="count-card">
        <div class="count-card-icon-wrapper icon-quanbu">
          <icon-svg icon-class="peoples" class-name="count-card-icon"></icon-svg>
        </div>
        <div class="count-card-description">
          <div class="count-card-text">全部</div>
          <count-to class="count-card-number" :startVal='0' :endVal="+countData.total"></count-to>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4" class="count-panel-col">
      <el-card shadow="hover" class="count-card">
        <div class="count-card-icon-wrapper icon-luyong">
          <icon-svg icon-class="luyong" class-name="count-card-icon"></icon-svg>
        </div>
        <div class="count-card-description">
          <div class="count-card-text">录用</div>
          <count-to class="count-card-number" :startVal='0' :endVal="+countData['1']"></count-to>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4" class="count-panel-col">
      <el-card shadow="hover" class="count-card">
        <div class="count-card-icon-wrapper icon-weiluyong">
          <icon-svg icon-class="weiluyong" class-name="count-card-icon"></icon-svg>
        </div>
        <div class="count-card-description">
          <div class="count-card-text">未录用</div>
          <count-to class="count-card-number" :startVal='0' :endVal="+countData['2']"></count-to>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4" class="count-panel-col">
      <el-card shadow="hover" class="count-card">
        <div class="count-card-icon-wrapper icon-mianshi">
          <icon-svg icon-class="mianshi1" class-name="count-card-icon"></icon-svg>
        </div>
        <div class="count-card-description">
          <div class="count-card-text">面试</div>
          <count-to class="count-card-number" :startVal='0' :endVal="+countData['3']"></count-to>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4" class="count-panel-col">
      <el-card shadow="hover" class="count-card">
        <div class="count-card-icon-wrapper icon-bishi">
          <icon-svg icon-class="bishi" class-name="count-card-icon"></icon-svg>
        </div>
        <div class="count-card-description">
          <div class="count-card-text">笔试</div>
          <count-to class="count-card-number" :startVal='0' :endVal="+countData['4']"></count-to>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4" class="count-panel-col">
      <el-card shadow="hover" class="count-card">
        <div class="count-card-icon-wrapper icon-weichuli">
          <icon-svg icon-class="weichuli" class-name="count-card-icon"></icon-svg>
        </div>
        <div class="count-card-description">
          <div class="count-card-text">未处理</div>
          <count-to class="count-card-number" :startVal='0' :endVal="+countData['5']"></count-to>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import countTo from 'vue-count-to'
export default {
  name: 'count-panel',
  components: {
    countTo
  },
  props: {
    countData: {
      type: Object,
      default: () => ({
        'total': 2019,         // 全部
        '1': 2019,             // 录用
        '2': 2019,             // 未录用
        '3': 2019,             // 面试
        '4': 2019,             // 笔试
        '5': 2019              // 未处理
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .count-panel {
    margin-top: 15px;
    .count-card{
      cursor: pointer;
      .count-card-icon {
        transition: all .8s;
      }
      .icon-quanbu {
        color: #409eff;
      }
      .icon-luyong {
        color: #34bfa3;
      }
      .icon-weiluyong {
        color: #f4516c;
      }
      .icon-bishi {
        color: #E6A23C;
      }
      .icon-mianshi {
        color: #67C23A;
      }
     .icon-weichuli {
       color: #f4ea2a;
     }
      &:hover {
        .icon-quanbu{
          background: #409eff;
        }
        .icon-luyong {
          background: #34bfa3;
        }
        .icon-weiluyong {
          background: #f4516c;
        }
        .icon-bishi {
          background: #E6A23C;
        }
        .icon-mianshi {
          background: #67C23A;
        }
        .icon-weichuli {
          background: #f4ea2a;
        }
        .count-card-icon{
          color: #fff;
        }
      }
    }
    .count-card-icon-wrapper {
      // float: left;
      display: inline-block;
      padding: 10px;
      transition: all .6s;
      border-radius: 6px;
      font-size: 30px;
      vertical-align: text-bottom;
    }
    .count-card-description {
      display: inline-block;
      padding-left: 20px;
      .count-card-text {
        color: rgba(0,0,0,.45);
        font-size: 14px;
        margin-bottom: 10px;
      }
      .count-card-number {
        color: #666;
        margin-top: 5px;
        font-size: 23px;
      }
    }
  }
</style>