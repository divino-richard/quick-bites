import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue';
import Register from '@/views/auth/Register.vue';
import Login from '@/views/auth/Login.vue';
import MerchantDashboard from '@/views/merchant/Dashboard.vue';
import MerchantLayout from '@/views/merchant/Layout.vue';
import AdminDashboard from '@/views/admin/Dashboard.vue';
import User from "@/views/admin/User.vue";
import CreateRestaurant from "@/views/merchant/CreateRestaurant.vue";
import CustomerLayout from "@/views/customer/Layout.vue";
import MerchantRestaurants from '@/views/merchant/Restaurants.vue';
import MerchantRestaurant from '@/views/merchant/Restaurant.vue';
import MerchantSettings from '@/views/merchant/Settings.vue';
import CustomerProfile from '@/views/customer/Profile.vue';
import AdminLayout from "@/views/admin/Layout.vue";

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
            name: 'admin-layout',
            component: AdminLayout,
            meta: {
                authorize: ['Admin']
            },
            children: [
                {
                    path: "",
                    name: 'admin-dashboard',
                    component: AdminDashboard,
                },
                {
                    path: '/admin/users',
                    name: 'admin-users',
                    component: User,
                },
            ]
        },
        {   
            path: '/merchant',
            name: "merchant-layout",
            component: MerchantLayout,
            meta: {
                authorize: ['Merchant']
            },
            children: [
                {
                    path: "",
                    name: 'merchant-dashboard',
                    component: MerchantDashboard,
                },
                {
                    path: 'restaurants',
                    name: 'merchant-restaurants',
                    component: MerchantRestaurants
                },
                {
                    path: 'restaurants/create',
                    name: 'merchant-create-restaurant',
                    component: CreateRestaurant
                },
                {
                    path: 'restaurants/:id',
                    name: 'merchant-restaurant',
                    component: MerchantRestaurant
                },
                {
                    path: "settings",
                    name: "merchant-settings",
                    component: MerchantSettings
                }
            ],
        },
        {
            path: '/customer',
            name: 'customer-layout',
            component: CustomerLayout,
            children: [
                {
                    path: 'profile',
                    name: 'customer-profile',
                    component: CustomerProfile
                }
            ]
        }
    ],
})

export default router
