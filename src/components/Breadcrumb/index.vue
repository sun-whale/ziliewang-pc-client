<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // 只显示带有meta.title的路由
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      console.log(matched)
      const first = matched[0];
      const last = matched[matched.length - 1];
      if (!this.isDashboard(first)) {
        matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      //根据findRoute() 找到路由中的parentBreadcrumb配置，返回路由数据。添加到面包屑数组中, this.levelList.splice(1, 0, ...pushlist);
      const pushlist = [];
      if (last.meta.parentBreadcrumb && last.meta.parentBreadcrumb.length > 0) {
        last.meta.parentBreadcrumb.forEach((element) => {
          const selectroute = this.findRoute(element);
          if (selectroute != null) {
            pushlist.push(selectroute);
          }
        });
      }
      this.levelList.splice(1, 0, ...pushlist);
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === '首页'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
    findRoute(name) {
      console.log(name)
      let routes = null;
      for (var i = 0; i < this.routes.length - 1; i++) {
        if (this.routes[i].children) {
          console.log(this.routes[i].children)
          this.routes[i].children.forEach( ele =>{
            if(ele.name == name){
              routes = ele
            }
          })
        }
      }
      console.log(routes)

      return routes;
    },
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
