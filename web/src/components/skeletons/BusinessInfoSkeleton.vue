<script setup lang="ts">
import { Skeleton } from "../ui/skeleton";
</script>

<template>
  <div class="flex gap-x-2">
    <Skeleton class="w-[75px] h-[75px] rounded-full" />
    <div class="flex-1 space-y-2 py-2">
      <Skeleton class="w-full max-w-[200px] h-[30px]" />
      <Skeleton class="w-full max-w-[150px] h-[20px]" />
      <Skeleton class="w-full max-w-[100px] h-[30px]" />
    </div>
  </div>
</template>
