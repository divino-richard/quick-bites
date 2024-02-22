const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We
    // are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/'
        }
    ], // short for `routes: routes`
  })