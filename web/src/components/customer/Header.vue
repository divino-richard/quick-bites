<template>
  <div className="flex bg-white justify-between items-center h-[55px] px-5">
    <RouterLink to="/">
      <h1 className="font-semibold text-sm">Quick Bites</h1>
    </RouterLink>

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
          <DropdownMenuLabel class="space-x-2">
            <Avatar>
              <AvatarFallback>
                {{
                  session.userData.firstName[0].toUpperCase() +
                  session.userData.lastName[0].toUpperCase()
                }}
              </AvatarFallback>
            </Avatar>
            <span>
              {{ session.userData.firstName + " " + session.userData.lastName }}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="cursor-pointer">
            <RouterLink to="/customer/profile" class="flex items-center space-x-2">
              <User :size="16" />
              <span>Your Profile</span>
            </RouterLink>
          </DropdownMenuItem>
          <DropdownMenuItem class="cursor-pointer">
            <Button
              variant="ghost"
              class="w-full font-normal p-0 justify-start gap-2 h-fit"
              @click="store.commit('auth/logOut')"
            >
              <LogOut :size="16" />
              <span>Logout</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div v-else class="space-x-5">
      <RouterLink to="/auth/register" class="font-semibold text-sm">
        Register
      </RouterLink>
      <RouterLink to="/auth/login" class="font-semibold text-sm"> Login </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { RouterLink } from "vue-router";
import { User, LogOut } from "lucide-vue-next";
import { computed } from "vue";

import { useStore } from "../../store";
const store = useStore();
const session = computed(() => store.getters["auth/getSession"]);
</script>
