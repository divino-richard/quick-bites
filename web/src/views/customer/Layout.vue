<template>
  <div class="flex-1 min-h-screen bg-zinc-50 space-y-5">
    <Header />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/customer/Header.vue";
</script>
