import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue';
import Register from '@/views/auth/Register.vue';
import Login from '@/views/auth/Login.vue';
import MerchantDashboard from '@/views/merchant/Dashboard.vue';
import MerchantRegistration from '@/views/auth/MerchantRegistration.vue';
import AdminDashboard from '@/views/admin/Dashboard.vue';
import User from "@/views/admin/User.vue";
import { getSession } from "@/utils/session.utils";

const checkRegistration = () => {
    const session = getSession();
    if(!session) return false;

    const { userType, registration } = session?.userData;

    if(registration !== 'completed') {
        switch (userType) {
            case 'merchant':
                router.push('/merchant/registration/completion')
                break;
        }
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/auth/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/auth/register/merchant',
            name: 'merchant-registration',
            component: MerchantRegistration,
        },
        {
            path: '/auth/login',
            name: 'login',
            component: Login
        },
        {
            path: '/admin',
            name: 'admin-dashboard',
            component: AdminDashboard,
            meta: {
                authorize: ['admin']
            }
        },
        {
            path: '/admin/user',
            name: 'user',
            component: User,
            meta: {
                authorized: ['admin']
            }
        },
        {   
            path: '/merchant',
            name: 'merchant-dashboard',
            component: MerchantDashboard,
            meta: {
                authorize: ['merchant']
            },
            beforeEnter: checkRegistration
        },
    ],
})

router.beforeEach((to, from, next) => {
    const authorize = to.meta.authorize as string[];

    if(authorize) {
        const session = getSession();
        if(!session || !authorize.includes(session.userData.userType)) {
            return next({
                path: '/auth/login', 
                query: { 
                    returnUrl: to.path 
                }
            })
        }
    }

    next();
})

export default router
