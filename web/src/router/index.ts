import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue';
import Register from '@/views/auth/Register.vue';
import Login from '@/views/auth/Login.vue';
import customerRouter from "./customer.router"
import merchantRouter from "./merchant.router";
import adminRouter from "./admin.router";

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
      ...adminRouter
    },
    {
      ...merchantRouter
    },
    {
      ...customerRouter
    }
  ],
});

export default router;
