<script setup lang="ts">
import { Skeleton } from "../../components/ui/skeleton";
</script>

<template>
  <div class="grid grid-cols-5 gap-5">
    <div v-for="number in 15" :key="number" class="space-y-2">
      <Skeleton class="h-[100px]" />
      <Skeleton class="h-[20px]" />
      <Skeleton class="h-[20px]" />
    </div>
  </div>
</template>
