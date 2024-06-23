import Dashboard from "@/views/admin/Dashboard.vue";
import Layout from "@/views/admin/Layout.vue";
import User from "@/views/admin/User.vue";
import { RouteRecordRaw } from "vue-router";

const adminRouter: RouteRecordRaw = {
  path: '/admin',
  name: 'admin-layout',
  component: Layout,
  meta: {
    authorize: ['Admin']
  },
  children: [
    {
      path: "",
      name: 'admin-dashboard',
      component: Dashboard,
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: User,
    },
  ]
}

export default adminRouter;
