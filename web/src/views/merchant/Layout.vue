<script setup lang="ts">
import MerchantSideBar from "@/components/merchant/SideBar.vue";
import { useStore } from "@/store";
import { computed, watch } from "vue";
import { RouterView } from "vue-router";
import { useToast } from "@/components/ui/toast/use-toast";

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
    <MerchantSideBar />
    <RouterView class="flex-1" />
  </div>
</template>
