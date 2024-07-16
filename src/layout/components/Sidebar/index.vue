<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
      <div>
        <a href="http://59.110.24.172:8012" target="_brak" class="zlhx-box">
          <p class="p-1">cometgpt</p>
          <p class="p-2">自猎彗星</p>
        </a>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routes'
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss"  scoped>
  .zlhx-box{
    padding: 10px 20px;
    padding-left: 40px;
    color: rgb(191, 203, 217);
    background-color: rgb(48, 65, 86);
    width: 100%;
    cursor: pointer;
    &>p{
      color: transparent;
      background-image: linear-gradient(45deg, gold, #ff76ff, cyan, deeppink);
      -webkit-background-clip: text;
      background-clip: text;
      font-weight: bold;
    }
    .p-1{
      line-height: 22px;
      font-size: 14px;
    }
    .p-2{
      line-height: 22px;
      font-size: 14px;
    }
  }
  .zlhx-box:hover{
    background: #263445;
  }
</style>
