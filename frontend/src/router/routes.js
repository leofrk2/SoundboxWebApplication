const routes = [
  {
    path: '/',
    component: () => import('layouts/DisconnectedLayout.vue'),
    children: [
      { path: '', name: 'LoginPage', component: () => import('pages/disconnected/LoginPage.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/ConnectedLayout.vue'),
    children: [
      { path: 'login', name: 'IndexPage', component: () => import('pages/connected/IndexPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
