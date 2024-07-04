import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import talentSide from '../views/talentSide/Main.vue';
import msgDemo from '../views/demo/Main.vue';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true则不会显示在侧边菜单
 * alwaysShow: true               设置为true一直显示根路由
 * redirect: noRedirect           当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    设置该路由进入的权限，支持多个权限叠加
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/example/list'  如果设置了激活菜单，则侧边菜单会默认选中
    parentBreadcrumb: '['父级路由path']'    如果设置了会在面包屑中作为父级路由，添加到面包屑中间
    noredirect: true   如果设置了true，择控制面包屑点击路由不跳转
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
//所有人可见

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/bossSignIn',
    component: () => import('@/views/bossSignIn/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',  // 企业端
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/bossSide/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' },
      },
    ]
  },
  {
    path: '/jobCenter',
    component: Layout,
    redirect: '/jobCenter',
    children: [
      {
        path: '/jobCenter',
        name: 'JobCenter',
        component: () => import('@/views/bossSide/jobCenter/index'),
        meta: { title: '职位中心', icon: 'example' },
      },
    ]
  },
  // {
  //   path: '/recommendTalents',
  //   component: Layout,
  //   redirect: '/recommendTalents',
  //   children: [
  //     {
  //       path: '/recommendTalents',
  //       name: 'RecommendTalents',
  //       component: () => import('@/views/bossSide/recommendTalents/index'),
  //       meta: { title: '推荐人才', icon: 'dashboard' },
  //     },
  //   ]
  // },
  {
    path: '/searchTalent',
    component: Layout,
    redirect: '/searchTalent',
    children: [
      {
        path: '/searchTalent',
        name: 'SearchTalent',
        component: () => import('@/views/bossSide/searchTalent/index'),
        meta: { title: '搜索人才', icon: 'chazhao' },
      },
    ]
  },
  {
    path: '/interaction',
    component: Layout,
    redirect: '/interaction',
    children: [
      {
        path: '/interaction',
        name: 'Interaction',
        component: () => import('@/views/bossSide/interaction/index'),
        meta: { title: '互动', icon: 'hudong' },
      },
    ]
  },
  {
    path: '/agentPublish',
    component: Layout,
    redirect: '/agentPublish',
    children: [
      {
        path: '/agentPublish',
        name: 'AgentPublish',
        component: () => import('@/views/bossSide/agentPublish/index'),
        meta: { title: 'Agent招聘', icon: 'example' },
      },
    ]
  },
  // {
  //   path: '/talentManagement',
  //   component: Layout,
  //   redirect: '/talentManagement',
  //   children: [
  //     {
  //       path: '/talentManagement',
  //       name: 'TalentManagement',
  //       component: () => import('@/views/bossSide/talentManagement/index'),
  //       meta: { title: '人才管理', icon: 'dashboard' },
  //     },
  //   ]
  // },
  {
    path: '/myRecruitmentData',
    component: Layout,
    redirect: '/myRecruitmentData',
    children: [
      {
        path: '/myRecruitmentData',
        name: 'MyRecruitmentData',
        component: () => import('@/views/bossSide/myRecruitmentData/index'),
        meta: { title: '我的招聘数据', icon: 'shuju' },
      },
      {
        path: '/resumeViewNum',
        name: 'resumeViewNum',
        hidden: true,
        component: () => import('@/views/bossSide/myRecruitmentData/resumeViewNum'),
        meta: { title: '简历浏览量', icon: '',parentBreadcrumb:['MyRecruitmentData'] },
      },
      {
        path: '/numberAcquisitionNum',
        name: 'numberAcquisitionNum',
        hidden: true,
        component: () => import('@/views/bossSide/myRecruitmentData/numberAcquisitionNum'),
        meta: { title: '虚拟号码获取量', icon: '',parentBreadcrumb:['MyRecruitmentData'] },
      },
      
    ]
  },
  
  {
    path: '/myInterviewSchedule',
    component: Layout,
    redirect: '/myInterviewSchedule',
    children: [
      {
        path: '/myInterviewSchedule',
        name: 'MyInterviewSchedule',
        component: () => import('@/views/bossSide/myInterviewSchedule/index'),
        meta: { title: '我的面试安排', icon: 'anpai' },
      },
    ]
  },
  
  {
    path:'/postJob',
    component: Layout,
    redirect: '/postJob',
    hidden: true,
    children: [
      {
        path: '/postJob',
        name: 'PostJob',
        component: () => import('@/views/bossSide/postJob/index'),
        meta: { title: '发布职位' },
      },
    ]
  },
  {
    path:'/corporateHome',
    component: Layout,
    redirect: '/corporateHome',
    hidden: true,
    children: [
      {
        path: '/corporateHome',
        name: 'corporateHome',
        component: () => import('@/views/bossSide/corporateHome/index'),
        meta: { title: '企业主页' },
      },
    ]
  },
  {
    path:'/perfectInfoPage',
    component: Layout,
    redirect: '/perfectInfoPage',
    hidden: true,
    children: [
      {
        path: '/perfectInfoPage',
        name: 'perfectInfoPage',
        component: () => import('@/views/bossSide/corporateHome/perfectInfoPage.vue'),
        meta: { title: '完善信息' },
      },
    ]
  },
  {
    path:'/enterpriseInfoEdit',
    component: Layout,
    redirect: '/enterpriseInfoEdit',
    hidden: true,
    children: [
      {
        path: '/enterpriseInfoEdit',
        name: 'enterpriseInfoEdit',
        component: () => import('@/views/bossSide/corporateHome/enterpriseInfoEdit.vue'),
        meta: { title: '企业信息修改',parentBreadcrumb:['corporateHome'] },
      },
    ]
  },
  {
    path:'/individualCenter',
    component: Layout,
    redirect: '/individualCenter',
    hidden: true,
    children: [
      {
        path: '/individualCenter',
        name: 'individualCenter',
        component: () => import('@/views/bossSide/individualCenter/index'),
        meta: { title: '个人中心' },
      },
    ]
  },
  {
    path:'/assist',
    component: Layout,
    redirect: '/assist',
    hidden: true,
    children: [
      {
        path: '/assist',
        name: 'assist',
        component: () => import('@/views/bossSide/assist/index'),
        meta: { title: '帮助' },
      },
    ]
  },
  {
    path:'/myCollect',
    component: Layout,
    redirect: 'myCollect',
    hidden: true,
    children: [
      {
        path: '/myCollect',
        name: 'myCollect',
        component: () => import('@/views/bossSide/myCollect/index'),
        meta: { title: '我收藏的' },
      },
    ]
  },
  {
    path:'/topUpBuy',
    component: Layout,
    redirect: 'topUpBuy',
    hidden: true,
    children: [
      {
        path: '/topUpBuy',
        name: 'topUpBuy',
        component: () => import('@/views/topUpBuy/index'),
        meta: { title: '充值' },
      },
    ]
  },
  {
    path:'/liveBroadcast',
    component: Layout,
    redirect: 'liveBroadcast',
    hidden: true,
    children: [
      {
        path: '/liveBroadcast',
        name: 'liveBroadcast',
        component: () => import('@/views/bossSide/liveBroadcast/index'),
        meta: { title: '直播' },
      },
    ]
  },
  {
    path: '/staffManagement',
    component: Layout,
    redirect: '/staffManagement',
    hidden: true,
    children: [
      {
        path: '/staffManagement',
        name: '',
        component: () => import('@/views/bossSide/staffManagement/index'),
        meta: { title: '员工管理', icon: 'user',role: ['boss'] },
      }
    ]
  },
  {
    path: '/myAssets',
    component: Layout,
    redirect: '/myAssets',
    hidden: true,
    children: [
      {
        path: '/myAssets',
        name: 'myAssets',
        component: () => import('@/views/myAssets/index'),
        meta: { title: '我的资产'},
      }
    ]
  },
  {
    path: '/agencyRecruitment',
    component: Layout,
    hidden: true,
    redirect: '/agencyRecruitment',
    children: [
      {
        path: '/agencyRecruitment',
        name: 'agencyRecruitment',
        component: () => import('@/views/bossSide/agencyRecruitment/index'),
        meta: { title: 'Agent职位列表', icon: 'example' },
      },
    ]
  },
  {
    path: '/agentTalents',
    component: Layout,
    hidden: true,
    redirect: '/agentTalents',
    children: [
      {
        path: '/agentTalents',
        name: 'agentTalents',
        component: () => import('@/views/bossSide/agentTalents/index'),
        meta: { title: 'Agent职位列表-人才列表', icon: 'example' },
      },
    ]
  },
  
  
  //-------------------- 人才端
  {
    path: "/talentSide",
    component: talentSide,
    redirect: '/talentHome',
    meta: { title: '人才端', icon: 'dashboard' },
    hidden: true,
    children: [
      {
        path: '/talentHome',
        name: 'talentHome',
        component: () => import('@/views/talentSide/talentHome'),
        meta: { 
          title: '首页',
          keepAlive: true,
        },
      },
      {
        path: '/position',
        name: 'position',
        component: () => import('@/views/talentSide/position'),
        meta: { 
          title: '职位',
          keepAlive: true,
        },
      },
      {
        path: '/myResume',
        name: 'myResume',
        component: () => import('@/views/talentSide/myResume'),
        meta: { 
          title: '我的简历',
          keepAlive: true,
        },
      },
      {
        path: '/myDelivery',
        name: 'myDelivery',
        component: () => import('@/views/talentSide/myDelivery'),
        meta: { 
          title: '我的投递',
          keepAlive: true,
        },
      },
      {
        path: '/careerIdentity',
        name: 'careerIdentity',
        component: () => import('@/views/talentSide/careerIdentity/index.vue'),
        meta: { 
          title: '职业身份',
        },
      },
      {
        path: '/talentSideSettings',
        name: 'talentSideSettings',
        component: () => import('@/views/talentSide/talentSideSettings'),
        meta: { 
          title: '设置',
        },
      },
      {
        path: '/professionalCircle',
        name: 'professionalCircle',
        component: () => import('@/views/talentSide/professionalCircle'),
        meta: { 
          title: '职圈',
          keepAlive: true,
        },
      },
      {
        path: '/professionalCircle/circleDetails',
        name: 'circleDetails',
        component: () => import('@/views/talentSide/professionalCircle/circleDetails'),
        meta: { 
          title: '帖子详情',
          keepAlive: false,
        },
      },
      {
        path: '/myGoodFriend',
        name: 'myGoodFriend',
        component: () => import('@/views/talentSide/myGoodFriend'),
        meta: { 
          title: '我的好友',
          keepAlive: true,
        },
      },
      {
        path: '/attentionFans',
        name: 'attentionFans',
        component: () => import('@/views/talentSide/attentionFans'),
        meta: { 
          title: '关注',
          // keepAlive: true,
        },
      },
      {
        path: '/JobDetails',
        name: 'JobDetails',
        component: () => import('@/views/talentSide/JobDetails'),
        meta: { 
          title: '岗位详情',
          // keepAlive: true,
        },
      },
      {
        path: '/companyDetails',
        name: 'companyDetails',
        component: () => import('@/views/talentSide/companyDetails'),
        meta: { 
          title: '公司详情',
          // keepAlive: true,
        },
      },
      {
        path: 'myAssets',
        name: 'talentSide_myAssets',
        component: () => import('@/views/myAssets/index'),
        meta: { 
          title: '我的资产',
        },
      },
      {
        path: 'topUpBuy',
        name: 'talentSide_topUpBuy',
        component: () => import('@/views/topUpBuy/index'),
        meta: { 
          title: '充值',
        },
      },
      {
        path: '/liveList',
        name: 'liveList',
        component: () => import('@/views/talentSide/liveList'),
        meta: { 
          title: '直播',
          // keepAlive: true,
        },
      },
      {
        path: '/liveRoom/:id',
        name: 'liveRoom',
        component: () => import('@/views/talentSide/liveRoom'),
        meta: { 
          title: '直播间',
        },
      },
      {
        path: '/qualityTest',
        name: 'qualityTest',
        component: () => import('@/views/talentSide/qualityTest'),
        meta: { 
          title: '素质评测'
        },
      },
      {
        path: '/qualityResult',
        name: 'qualityResult',
        component: () => import('@/views/talentSide/qualityTest/qualityResult'),
        meta: { 
          title: '评测结果'
        },
      },
      {
        path: '/interviewAssess',
        name: 'interviewAssess',
        component: () => import('@/views/talentSide/interviewAssess'),
        meta: { 
          title: '面试评估'
        },
      },
      
      // {
      //   path: 'liveBroadcast',
      //   name: 'talentSide_liveBroadcast',
      //   component: () => import('@/views/talentSide/liveBroadcast/index'),
      //   meta: { 
      //     title: '直播',
      //   },
      // },
    ]
  },
  // demo
  {
    path:'/messageDemo',
    component: msgDemo,
    meta: { title: '消息demo'},
    hidden: true,
  }

]
//相应权限人员可见
export const asyncRouterMap = [
  {
    path: '/staffManagement',
    component: Layout,
    redirect: '/staffManagement',
    children: [
      {
        path: '/staffManagement',
        name: 'staffManagement',
        component: () => import('@/views/bossSide/staffManagement/index'),
        meta: { title: '员工管理', icon: 'user',role: ['BOSS'] },
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
