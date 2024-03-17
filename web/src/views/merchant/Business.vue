<script setup lang="ts">
import { useStore } from "@/store";
import { computed, onMounted } from "vue";

const store = useStore();
const business = computed(() => store.getters["merchantBusiness/getBusinessInfo"]);
const loadingBusiness = computed(() => store.state.merchantBusiness.loadingBusiness);
onMounted(() => {
  store.dispatch("merchantBusiness/fetchBusiness");
});
</script>

<template>
  <div>
    <div v-if="loadingBusiness">
      <h1>Loading....</h1>
    </div>

    <div v-else>
      <div v-if="business">
        {{ business }}
      </div>

      <div
        v-else
        class="w-full h-screen flex flex-col items-center justify-center gap-y-5"
      >
        <div
          class="w-[200px] h-[200px] rounded-full bg-orange-100 flex items-center justify-center"
        >
          <img src="../../assets/restaurant.png" class="w-[100px] h-[100px]" />
        </div>
        <RouterLink
          to="/merchant/create-business"
          class="bg-orange-600 text-white py-2 px-5 rounded-md"
        >
          Create a Business
        </RouterLink>
      </div>
    </div>
  </div>
</template>
