<script setup lang="ts">
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Button from "@/components/ui/button/Button.vue";
import DropdownMenu from "@/components/ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuContent from "@/components/ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuItem from "@/components/ui/dropdown-menu/DropdownMenuItem.vue";
import DropdownMenuLabel from "@/components/ui/dropdown-menu/DropdownMenuLabel.vue";
import DropdownMenuSeparator from "@/components/ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuTrigger from "@/components/ui/dropdown-menu/DropdownMenuTrigger.vue";
import { useStore } from "@/store";
import { computed } from "vue";

const store = useStore();
const session = computed(() => store.getters["auth/getSession"]);
</script>

<template>
  <div className="flex justify-between items-center p-5">
    <h1 className="font-semibold text-sm">Quick Bites</h1>

    <div v-if="session">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>
              {{
                session.userData.firstName[0].toUpperCase() +
                session.userData.lastName[0].toUpperCase()
              }}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[200px] mr-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="outline" class="w-full" @click="store.commit('auth/logOut')"
              >Logout</Button
            >
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div v-else>
      <RouterLink to="/auth/login" class="font-semibold text-sm"> Login </RouterLink>
    </div>
  </div>
</template>
