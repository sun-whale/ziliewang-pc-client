import talentSide from '@/views/talentSide/Main.vue';

export const bossSideRoutes = [
  // 人才端
  {
    path: "/",
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
        path: '/myProfessionalCircle',
        name: 'myProfessionalCircle',
        component: () => import('@/views/talentSide/myProfessionalCircle/index.vue'),
        meta: { 
          title: '我的职圈',
          // keepAlive: true,
        },
      },
      {
        path: '/talentSideSettings',
        name: 'talentSideSettings',
        component: () => import('@/views/talentSide/talentSideSettings'),
        meta: { 
          title: '设置',
          keepAlive: true,
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
        path: '/circleDetails',
        name: 'circleDetails',
        component: () => import('@/views/talentSide/professionalCircle/circleDetails'),
        meta: { 
          title: '帖子详情',
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
    ]
  },
]