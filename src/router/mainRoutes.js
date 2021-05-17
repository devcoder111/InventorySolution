import inventory from '@/router/inventory'
const Default = () => import('@/views/Default')
const Pricing = () => import('@/views/Pricing')
const Subscription = () => import('@/views/subscription/Subscription')
const Thankyou = () => import('@/views/subscription/Thankyou')
const Failed = () => import('@/views/subscription/Failed')
const mainRoutes = [
  {
    path: '/static',
    name: 'Static',
    component: () => import('../components/Static.vue')
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: Pricing
  },
  {
    path: '/mobile/pricing',
    name: 'Pricing',
    component: Pricing
  },
  {
    path: '/success',
    name: 'Thankyou',
    meta: { requiresAuth: true },
    component: Thankyou
  },
  {
    path: '/failed',
    name: 'Failed',
    meta: { requiresAuth: true },
    component: Failed
  },
  {
    path: '/subscription/:plan',
    name: 'Subscription',
    meta: { requiresAuth: true },
    component: Subscription
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/user/Login.vue'),
    meta: {
      title: 'Britecheck - Login Page to log into your account',
      metaTags: [
        {
          name: 'description',
          content: 'Inventory management software. Britecheck login page.'
        }
      ]
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/user/Register.vue'),
    meta: {
      title: 'Britecheck - Register Page to log into your account',
      metaTags: [
        {
          name: 'description',
          content: 'Inventory management software. Britecheck Register page.'
        }
      ]
    }
  },
  {
    path: '/resetpassword',
    name: 'ResetPassword',
    component: () => import('../views/user/ResetPassword.vue')
  },
  {
    path: '/policy',
    name: 'Policy',
    component: () => import('../views/Policy.vue'),
    meta: {
      breadcrumbs: [{ name: 'Policy' }]
    }
  },
  {
    path: '/passwordForgot',
    name: 'passwordForgot',
    component: () => import('../views/user/ForgotPassword.vue'),
    meta: {
      breadcrumbs: [{ name: 'Forgot Password' }]
    }
  },
  {
    path: '/setPassword',
    name: 'SetPassword',
    component: () => import('../views/user/SetPassword.vue'),
    meta: {
      breadcrumbs: [{ name: 'Set Password' }]
    }
  },
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Index.vue'),
    meta: {
      breadcrumbs: [{ name: 'Main' }]
    }
  },
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: true },
    redirect: 'inventory/categories',
    component: Default,
    children: [
      {
        path: '/history',
        name: 'ActivityHistory',
        component: () => import('../views/history/ActivityHistory.vue'),
        meta: {
          breadcrumbs: [{ name: 'Activity History' }]
        }
      },
      {
        path: '/reports',
        name: 'Reports',
        component: () => import('../views/reports/Reports.vue'),
        meta: {
          breadcrumbs: [{ name: 'Reports' }]
        },
        children: [
          {
            path: 'stock-balances-date',
            name: 'ReportStockBalancesDate',
            component: () => import('../views/reports/ReportStockBalancesDate'),
            meta: {
              breadcrumbs: [{ name: 'Report Stock Balances Date' }]
            }
          },
          {
            path: 'stock-balances-range',
            name: 'ReportStockBalancesRange',
            component: () => import('../views/reports/ReportStockBalancesRange'),
            meta: {
              breadcrumbs: [{ name: 'Report Stock Balances Range' }]
            }
          }
        ]
      },
      {
        path: '/inventory',
        name: 'Inventory',
        component: () => import('../views/inventory/Inventory.vue'),
        meta: {
          breadcrumbs: [{ name: 'Inventory' }]
        },
        children: [...inventory]
      },
      {
        path: '/item/createItem',
        name: 'CreateItem',
        component: () => import('../views/inventory/CreateItem.vue')
      },
      {
        path: '/item/editItem/:id',
        name: 'EditItem',
        component: () => import('../views/inventory/EditItem.vue')
      },
      {
        path: '/editFolder/:id',
        name: 'EditFolder',
        component: () => import('../views/inventory/EditFolder.vue')
      },
      {
        path: '/createFolder',
        name: 'CreateFolder',
        component: () => import('../views/inventory/CreateFolder.vue')
      },
      {
        path: '/activityhistory',
        name: 'ActivityHistory',
        component: () => import('../views/ActivityHistory.vue'),
        meta: {
          breadcrumbs: [{ name: 'Activity History' }]
        }
      },
      {
        path: '/tags',
        name: 'Tags',
        component: () => import('../views/Tags.vue'),
        meta: {
          breadcrumbs: [{ name: 'Tags' }]
        }
      },
      {
        path: '/users',
        name: 'Users',
        component: () => {
          if (JSON.parse(localStorage.getItem('curUserData')) !== null) {
            if (JSON.parse(localStorage.getItem('curUserData')).role === 'user') {
              window.location.href = '/inventory'
            } else {
              return import('../views/Users')
            }
          }
        },
        meta: {
          breadcrumbs: [{ name: 'Users' }]
        }
      },
      {
        path: '/alerts',
        name: 'Alerts',
        component: () => import('../views/Alerts.vue')
      },
      {
        path: '/usersOld',
        name: 'UsersOld',
        component: () => import('../views/UsersOld'),
        meta: {
          breadcrumbs: [{ name: 'UsersOld' }]
        }
      },
      {
        path: '/adduser',
        name: 'AddUser',
        component: () => import('../views/user/InviteUsers'),
        meta: {
          breadcrumbs: [{ name: 'Users' }]
        }
      },
      {
        path: '/usersettings',
        name: 'UserSettings',
        component: () => import('../views/user/UserSettings.vue'),
        meta: {
          breadcrumbs: [{ name: 'User Settings' }]
        }
      },
      {
        path: '/userTest',
        name: 'TestUsers',
        component: () => import('../views/user/Users')
      },
      {
        path: '/import',
        name: 'Import',
        component: () => import('../views/Import.vue'),
        meta: {
          breadcrumbs: [{ name: 'Import' }]
        }
      },
      {
        path: '/usersettings',
        name: 'UserSettings',
        component: () => import('../views/UserSettings.vue'),
        meta: {
          breadcrumbs: [{ name: 'User Settings' }]
        }
      },
      {
        path: '/help',
        name: 'HelpCenter',
        component: () => import('../views/HelpCenter.vue'),
        meta: {
          breadcrumbs: [{ name: 'Help Center' }]
        }
      },
      {
        path: '*',
        name: 'not-found',
        component: () => import('../views/NotFound.vue'),
        meta: {
          breadcrumbs: [{ name: 'Not Found' }]
        }
      }
    ]
  }
]
export default mainRoutes
