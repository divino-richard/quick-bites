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
import { User, LogOut, Search } from "lucide-vue-next";
import { computed } from "vue";
import { store } from "@/store";

const session = computed(() => store.getters['auth/getSession']);

const handleLogout = () => {
  store.commit('auth/logOut')
}
</script>

<template>
  <header class="shadow-md">
    <div className="flex max-w-[1300px] m-auto bg-white justify-between items-center h-[75px] px-5">
      <RouterLink to="/">
        <h1 className="font-semibold text-sm text-[#EA580C]">Quick Bites</h1>
      </RouterLink>

      <div class="flex items-center gap-5">
        <Search :size="18" class="cursor-pointer"/>
        <div v-if="session" class="flex items-center">
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
                  @click="handleLogout"
                >
                  <LogOut :size="16" />
                  <span>Logout</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div v-else class="space-x-5">
          <RouterLink to="/auth/register" class="text-sm text-zinc-800">
            Register
          </RouterLink>
          <RouterLink to="/auth/login" class="text-sm text-zinc-800"> 
            Login 
          </RouterLink>
        </div>
      </div>
    </div>
  </header>

</template>
