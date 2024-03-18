<script setup lang="ts">
import { Separator } from '@/components/ui/separator';
import { User } from 'lucide-vue-next';
import { computed } from 'vue';
import { useStore } from '@/store';

const store = useStore();
const session = computed(() => store.state.auth.session);
</script>

<template>
  <div class="w-full max-w-[900px] mx-auto">
    <div>
      <div class="flex gap-x-2 py-2">
        <User :size="18"/>
        <h1 class="text-[16px] font-medium text-zinc-900">Account</h1>
      </div>
      <div>
        <h1>{{ session?.userData.firstName }}</h1>
      </div>
      <Separator class="bg-zinc-100"/>
    </div>
  </div>
</template>
