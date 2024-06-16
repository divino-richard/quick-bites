<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserSession } from "@/types/user.types";
import { Separator } from "@/components/ui/separator";
import { RouterLink, useRoute } from "vue-router";
import { LogOut } from "lucide-vue-next";
import router from "@/router";
import { useStore } from "@/store";
import { SidebarRoute } from "@/types/routes.types";
import { ADMIN_ROUTES, MERCHANT_ROUTES } from "@/constants/sidebar.constants";

const store = useStore();
const route = useRoute();

const sideBarMenus = ref<SidebarRoute[]>([]);
const session = computed(() => store.getters["auth/getSession"]);
const userSession: UserSession = session.value;
const avatarFallback = userSession.userData.firstName[0] + " " + userSession.userData.lastName[0];

watch(session, (session) => {
  if (!session) {
    router.replace("/auth/login");
  }
});

onMounted(() => {
  if (!session) {
    router.replace("/auth/login");
  }
  const { userData } = session.value;
  switch(userData.userType) {
    case 'Admin':
      sideBarMenus.value = ADMIN_ROUTES;
      break;
    case 'Merchant':
      sideBarMenus.value = MERCHANT_ROUTES;
      break;
  } 
});
</script>

<template>
  <div class="w-[250px] h-screen bg-zinc-900 sticky top-0">
    <div class="flex flex-col items-center gap-y-2 p-5">
      <Avatar class="bg-orange-600 w-[60px] h-[60px]">
        <AvatarFallback class="text-[16px] font-semibold">
          {{ avatarFallback }}
        </AvatarFallback>
      </Avatar>

      <div class="text-center">
        <h1 class="text-white font-normal text-[16px]">
          {{ userSession.userData.firstName + " " + userSession.userData.lastName }}
        </h1>
        <h1 class="text-white font-normal text-[10px]">
          {{ userSession.userData.userType.toUpperCase() }}
        </h1>
      </div>
    </div>
    <Separator class="bg-zinc-800" />
    <div class="space-y-[15px] py-2">
      <div
        v-for="item in sideBarMenus"
        class="flex items-center gap-x-2 px-5 : hover:text-orange-600"
        :class="item.name.includes(String(route.name)) ? 'text-orange-600' : 'text-white'"
      >
        <component :is="item.icon" :size="18" class="" />
        <RouterLink :to="item.link" class="text-[16px]">
          {{ item.label }}
        </RouterLink>
      </div>
    </div>
    <Separator class="bg-zinc-800" />
    <Button
      variant="ghost"
      class="flex gap-x-2 w-full justify-start px-5 text-white hover:bg-transparent hover:text-orange-600 mt-2"
      @click="() => store.commit('auth/logOut')"
    >
      <LogOut :size="18" />
      <p class="text-[16px] font-semibold">Logout</p>
    </Button>
  </div>
</template>
@/constants/sidebar.constants