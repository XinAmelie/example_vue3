import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('../views/login/index')
  },
  {
    path: '/',
    component: () => import('../layout'),
    redirect: '/user_page',
    meta: { title: '首页' },
    children: [{
      path: 'profile',
      meta: { title: '个人中心' },
      component: () => import('../views/profile')
    },
    {
      path: 'art',
      meta: { title: '文章' },
      children: [
        {
          path: 'artdetail',
          meta: { title: '文章详情页' },
          component: () => import('../views/ArtPage/art-detail')
        },
        {
          path: 'artcreate/editor',
          meta: { title: '文章创作页面' },
          component: () => import('../views/ArtPage/art-create')

        },
        {
          path: 'artdetail/:id',
          meta: { title: '文章内容页' },
          component: () => import('../views/ArtPage/article-content')

        },
        {
          path: 'artcreate/editor/:id',
          meta: { title: '文章编辑页' },
          component: () => import('../views/ArtPage/art-create')

        }

      ]

    },
    {
      // 首页自定义跳转路由
      path: 'user_page',
      meta: { title: '用户页' },
      component: () => import('../views/user_index')
    },
    {
      path: 'user',
      meta: { title: '用户' },
      children: [
        // 员工管理
        {
          path: 'manage',
          meta: { title: '员工管理' },
          component: () => import('../views/UserManage/user-manage')

        },
        // 角色列表
        {
          path: 'roulelist',
          meta: { title: '角色列表' },
          component: () => import('../views/role-list')

        },
        {
          path: 'import',
          name: 'import',
          component: () => import('../views/import/index'),
          meta: {
            title: 'excelImport'
          }
        }

      ]
    }
    ]

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
