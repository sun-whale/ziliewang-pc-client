import Layout from '@/layout'

export const bossSideRoutes = [
  {
    path: '/',
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
        meta: { title: '职位中心', icon: 'dashboard' },
      },
    ]
  },
  {
    path: '/recommendTalents',
    component: Layout,
    redirect: '/recommendTalents',
    children: [
      {
        path: '/recommendTalents',
        name: 'RecommendTalents',
        component: () => import('@/views/bossSide/recommendTalents/index'),
        meta: { title: '推荐人才', icon: 'dashboard' },
      },
    ]
  },
  {
    path: '/searchTalent',
    component: Layout,
    redirect: '/searchTalent',
    children: [
      {
        path: '/searchTalent',
        name: 'SearchTalent',
        component: () => import('@/views/bossSide/searchTalent/index'),
        meta: { title: '搜索人才', icon: 'dashboard' },
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
        meta: { title: '互动', icon: 'dashboard' },
      },
    ]
  },
  {
    path: '/talentManagement',
    component: Layout,
    redirect: '/talentManagement',
    children: [
      {
        path: '/talentManagement',
        name: 'TalentManagement',
        component: () => import('@/views/bossSide/talentManagement/index'),
        meta: { title: '人才管理', icon: 'dashboard' },
      },
    ]
  },
  {
    path: '/myRecruitmentData',
    component: Layout,
    redirect: '/myRecruitmentData',
    children: [
      {
        path: '/myRecruitmentData',
        name: 'MyRecruitmentData',
        component: () => import('@/views/bossSide/myRecruitmentData/index'),
        meta: { title: '我的招聘数据', icon: 'dashboard' },
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
        meta: { title: '我的面试安排', icon: 'dashboard' },
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
]