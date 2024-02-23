import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue';
import Register from '@/views/auth/Register.vue';
import Login from '@/views/auth/Login.vue';
import MerchantDashboard from '@/views/merchant/Dashboard.vue';
import AdminDashboard from '@/views/admin/Dashboard.vue';
import User from "@/views/admin/User.vue";

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
            path: '/auth/login',
            name: 'login',
            component: Login
        },
        {
            path: '/admin',
            name: 'admin-dashboard',
            component: AdminDashboard,
            children: [
                {
                    path: '/admin/user',
                    name: 'user',
                    component: User
                }
            ]
        },
        {   
            path: '/merchant',
            name: 'merchant-dashboard',
            component: MerchantDashboard
        }
    ],
})

export default router