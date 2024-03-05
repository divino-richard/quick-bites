<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/ui/button/Button.vue";
import DropdownMenu from "@/components/ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuContent from "@/components/ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuItem from "@/components/ui/dropdown-menu/DropdownMenuItem.vue";
import DropdownMenuLabel from "@/components/ui/dropdown-menu/DropdownMenuLabel.vue";
import DropdownMenuSeparator from "@/components/ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuTrigger from "@/components/ui/dropdown-menu/DropdownMenuTrigger.vue";
import router from "@/router";
import { getSession, logout } from "@/utils/session.utils";

const session = getSession();
const userData = session?.userData;
</script>

<template>
  <div className="flex justify-between items-center p-5">
    <h1 className="font-semibold text-sm">Quick Bites</h1>

    <div v-if="userData">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[200px] mr-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant="outline"
              class="w-full"
              @click="
                () => {
                  logout();
                  router.push('/auth/login');
                }
              "
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
