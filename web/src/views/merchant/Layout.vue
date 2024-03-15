<script setup lang="ts">
import MerchantSideBar from "@/components/merchant/SideBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div>
    <MerchantSideBar />
    <RouterView />
  </div>
</template>
