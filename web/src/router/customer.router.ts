import Layout from "@/views/customer/Layout.vue";
import Profile from "@/views/customer/Profile.vue";
import { RouteRecordRaw } from "vue-router";

const customerRouter: RouteRecordRaw = {
  path: '/customer',
  name: 'customer-layout',
  component: Layout,
  children: [
    {
      path: 'profile',
      name: 'customer-profile',
      component: Profile
    }
  ]
}

export default customerRouter;