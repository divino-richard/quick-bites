<script setup lang="ts">
import { useStore } from "@/store";
import { computed, watch } from "vue";
import { RouterView } from "vue-router";
import { useToast } from "@/components/ui/toast/use-toast";
import SideBar from "@/components/SideBar.vue";

const { toast } = useToast();

const store = useStore();
const networkError = computed(() => store.getters["getNetworkError"]);

watch(networkError, (error) => {
  if (error) {
    toast({
      title: error,
      description:
        "There was a problem while connecting to the server. You can check your network connection too.",
      variant: "destructive",
    });
  }
});
</script>

<template>
  <div class="min-h-screen flex">
    <SideBar />
    <RouterView class="flex-1" />
  </div>
</template>
