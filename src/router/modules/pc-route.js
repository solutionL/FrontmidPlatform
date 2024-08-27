const routes = [
    {
        path:'/',
        name:'main',
        component: () => import('@/views/layout/index.vue')
    },
    {
        path:'/pin/:id',
        name:'pins',
        component: () => import('@/views/layout/pins/index.vue'),
    },
    {
        path:'/login',
        name:'login',
        component: () => import('@/views/login-register/login/index.vue')
    }
]

export default routes