<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router";
import { Button } from "@/components/ui/button";

const route = useRoute();
const router = useRouter();

const menus = [
  {
    label: "Dashboard",
    path: "/admin",
  },
  {
    label: "User",
    path: "/admin/user",
  },
];

const handleLogout = () => {
  localStorage.removeItem("user-session");
  router.replace("/");
};
</script>

<template>
  <div className="bg-zinc-950 w-[300px] h-screen p-5">
    <div className="mb-10">
      <h1 className="text-white text-lg">Welcome back</h1>
      <p className="text-slate-400 text-sm">Richard Divino</p>
    </div>
    <div className="space-y-1">
      <div v-for="(menuItem, index) in menus" :key="index">
        <RouterLink :to="menuItem.path">
          <div
            :class="`p-2 ${
              menuItem.path === route.fullPath ? 'bg-zinc-900' : ''
            } rounded-sm hover:bg-zinc-800`"
          >
            <p className="text-sm text-white">{{ menuItem.label }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
    <Button
      @click="handleLogout"
      className="w-full text-left text-white text-sm p-2 rounded-sm hover:bg-zinc-800"
    >
      Logout
    </Button>
  </div>
</template>
