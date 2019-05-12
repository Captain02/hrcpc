<template>
  <!-- 打开标签的容器 -->
  <div class="tags">
    <ul>
      <li
        class="tags-li"
        v-for="(item,index) in tagsList"
        :key="index"
        :class="{'active': isActive(item.path)}"
      >
        <router-link :to="{ path: item.path, query: item.query, fullPath: item.fullPath }" class="tags-li-title">{{item.title}}{{item.params.id ? '-' + item.params.id : ''}}</router-link>
        <span class="tags-li-icon" @click="closeTags(index,item.path)">
          <icon-svg icon-class="close"></icon-svg>
        </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleCommand">
        <el-button size="mini" type="primary">
          标签选项
          <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
          <icon-svg icon-class="arrow-down1" class="el-icon--right"></icon-svg>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
          <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tags',
  computed: {
    //computed 方法里面没有set方法因此不能使用mapState,需要重新定义set方法
    tagsList: {
      get: function() {
        return this.$store.state.app.tagsList
      },
      set: function(newValue) {
        this.$store.commit("SET_TAGS", newValue)
      }
    }
  },
  watch: {
    //监听路由变化
    $route(newValue, oldValue) {
      this.setTags(newValue)
    }
  },
  methods: {
    //选中的高亮
    isActive(path) {
      return path === this.$route.fullPath
    },
    findIndexTag() {
      return  this.tagsList.filter((item) => {
        return item.path === '/dashboard'
      })
    },
    handleCommand(command) {
      if (command === "closeOther") {
        // 关闭其他标签
        const curItem = this.tagsList.filter(item => {
          return item.path === this.$route.fullPath
        });
        this.tagsList = curItem
      }else{
        if(command === 'closeAll'){
          let list = this.findIndexTag()
          if(list.length) {
            this.tagsList = list
          }else{
            this.tagsList = []
          }
          this.$router.push({path: '/dashboard'})
        }
      }
    },
    //添加标签
    setTags(route) {
      
      let isIn = this.tagsList.some(item => {
        //判断标签是否存在
        return item.path === route.fullPath
      })
      //不存在
      if (!isIn) {
        // console.log('tags', route)
        // 判断当前的标签个数
        if (this.tagsList.length >= 10) {
          // 大于十个标签时删除前边的标签
          this.tagsList.shift()
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.name,
          params: route.params ? route.params : null,
          useCache: route.meta.useCache
        })
        //存到vuex
        this.$store.commit("SET_TAGS", this.tagsList)
        
      }
    },
    closeTags(index, path) {
      if (this.tagsList.length == 1) {
        let list = this.findIndexTag()
        if(list.length){
          return
        }else{
          //只有一个路由并且不是首页时删除后跳转至首页
          this.tagsList.splice(index, 1)
          this.$store.commit("SET_TAGS", this.tagsList)
          this.$router.push({
            path: '/dashboard'
          })
        }
        
      } else {
        //删除当前
        this.tagsList.splice(index, 1);
        this.$store.commit("SET_TAGS", this.tagsList)
      }
      if (path === this.$route.fullPath) {
        //如果关闭当前直接跳到下一个
        this.$nextTick(() => {
          // let next = this.$store.state.app.tagsList[this.$store.state.app.tagsList.length - 1]
          // console.log('next', next)
          this.$router.push(this.$store.state.app.tagsList[this.$store.state.app.tagsList.length - 1])
        }) 
      }
    }
  },
  created() {
    //判断标签里面是否有值 有的话直接加载
    if (this.tagsList.length == 0) {
      this.setTags(this.$route)
    }
  }
};
</script>
<style lang="less" scoped>
.tags {
  position: relative;
  overflow: hidden;
  background: #fff;
  padding: 2px 120px 2px 0;
  // box-shadow: 0 5px 10px #ddd;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  // border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
  border: 1px solid #42b983;
  background-color: #42b983;
}

.tags-li-title {
  float: left;
  max-width: 95px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 2px;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  height: 30px;
  background: #ffffff;
  z-index: 10;
}
</style>

