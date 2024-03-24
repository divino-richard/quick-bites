<script setup lang="ts">
const props = defineProps({
  size: {
    type: Number,
    default: 25,
  },
});
</script>

<template>
  <div class="flex justify-center items-center h-auto">
    <div
      :style="{ width: props.size + 'px', height: props.size + 'px' }"
      class="spinner border-l-2 border-t-2 border-orange-600"
    />
  </div>
</template>

<style scoped>
.spinner {
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
