import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken,removeToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/bossSignIn','/messageDemo'] // 路由白名单

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken();
  let tag = localStorage.getItem('tag');
  console.log(hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      removeToken();
      next(`/login`);
      NProgress.done()
    } else {
      try {
        // get user info
        // await store.dispatch('user/getInfo')
        const {role_desc} = await store.dispatch('user/getStaffProfileInfo')
        // 在角色权限基础上生成动态路由表
        const accessedRoutes = await store.dispatch('generateRoutes',role_desc)
        for( let i=0; i<accessedRoutes.length; i++){
          router.addRoute(accessedRoutes[i]);
        } // 添加路由
        next({...to,replace:true})
      } catch (error) {
        // remove token and go to login page to re-login
        // await store.dispatch('user/resetToken')
        next();
        NProgress.done()
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      removeToken();
      next(`/login`);
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
