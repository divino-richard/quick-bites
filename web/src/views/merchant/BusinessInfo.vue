<script setup lang="ts">
import MapAutocomplete from '@/components/googlemap/MapAutocomplete.vue';
import { Separator } from '@/components/ui/separator';
</script>

<template>
  <main class="p-5">
    <div class="w-full max-w-[900px] mx-auto border border-zinc-200 p-5 rounded-lg">
      <h1 class="pb-2">Business Information</h1>
      <Separator />
      <div>
        <MapAutocomplete />
      </div>
    </div>
  </main>
</template>