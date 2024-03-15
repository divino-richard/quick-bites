import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue';
import Register from '@/views/auth/Register.vue';
import Login from '@/views/auth/Login.vue';
import MerchantDashboard from '@/views/merchant/Dashboard.vue';
import MerchantLayout from '@/views/merchant/Layout.vue';
import MerchantRegistration from '@/views/auth/MerchantRegistration.vue';
import AdminDashboard from '@/views/admin/Dashboard.vue';
import User from "@/views/admin/User.vue";
import CreateBusiness from "@/views/merchant/CreateBusiness.vue";
import { checkRegistration } from "@/utils/user.utils";

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
            name: "merchant-layout",
            component: MerchantLayout,
            meta: {
                authorize: ['merchant']
            },
            // beforeEnter: checkRegistration
            children: [
                {
                    path: "",
                    name: 'merchant-dashboard',
                    component: MerchantDashboard,
                }
            ],
        },
        {
            path: '/merchant/create-business',
            name: 'merchant-create-business',
            component: CreateBusiness
        }
    ],
})

export default router
