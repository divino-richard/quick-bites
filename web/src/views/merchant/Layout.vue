<script setup lang="ts">
import MerchantSideBar from "@/components/merchant/SideBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen flex">
    <MerchantSideBar />
    <RouterView class="flex-1" />
  </div>
</template>
