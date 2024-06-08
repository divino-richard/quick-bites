<template>
  <div class="bg-white p-5 rounded-lg max-w-[1250px] mx-auto space-y-5">
    <h1 class="font-medium">Customer's Profile</h1>

    <div class="grid grid-cols-2">
      <div>
        <Avatar class="w-[150px] h-[150px]">
          <AvatarFallback class="text-[35px] font-semibold">
            {{ session?.userData.firstName[0] + " " + session?.userData.lastName[0] }}
          </AvatarFallback>
        </Avatar>
        <h1 class="font-semibold">
          {{ session?.userData.firstName + " " + session?.userData.lastName }}
        </h1>
        <div class="flex gap-x-2 items-center text-zinc-600">
          <User :size="16" />
          <span>{{ session?.userData.userType }}</span>
        </div>
        <div class="flex gap-x-2 items-center text-zinc-600">
          <Mail :size="16" />
          <span>{{ session?.userData.email }}</span>
        </div>
        <div class="flex gap-x-2 items-center text-zinc-600">
          <Phone :size="16" />
          <span>{{ session?.userData.phoneNumber }}</span>
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStore } from "@/store";
import { User, Mail, Phone } from "lucide-vue-next";
import { computed } from "vue";

const store = useStore();

const session = computed(() => store.state.auth.session);
</script>
