import CreateRestaurant from "@/views/merchant/CreateRestaurant.vue";
import Dashboard from "@/views/merchant/Dashboard.vue";
import Layout from "@/views/merchant/Layout.vue";
import Restaurant from "@/views/merchant/Restaurant.vue";
import Restaurants from "@/views/merchant/Restaurants.vue";
import Settings from "@/views/merchant/Settings.vue";
import { RouteRecordRaw } from "vue-router";

const merchantRouter: RouteRecordRaw = {   
  path: '/merchant',
  name: "merchant-layout",
  component: Layout,
  meta: {
    authorize: ['Merchant']
  },
  children: [
    {
      path: "",
      name: 'merchant-dashboard',
      component: Dashboard,
    },
    {
      path: 'restaurants',
      name: 'merchant-restaurants',
      component: Restaurants
    },
    {
      path: 'restaurants/:id',
      name: 'merchant-restaurant',
      component: Restaurant
    },
    {
      path: 'restaurants/create',
      name: 'merchant-create-restaurant',
      component: CreateRestaurant
    },
    {
      path: "settings",
      name: "merchant-settings",
      component: Settings
    }
  ],
}

export default merchantRouter;
