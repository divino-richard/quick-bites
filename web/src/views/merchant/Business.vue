<script setup lang="ts">
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/store";
import { Hash, MapPin } from "lucide-vue-next";
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
        <div class="w-full max-w-[900px] flex gap-x-2 py-5 m-auto">
          <Avatar class="w-[75px] h-[75px]">
            <AvataFallback class="text-[35px]">
              {{ business.name[0].toUpperCase() }}
            </AvataFallback>
          </Avatar>
          <div class="p-2">
            <h1 class="font-semibold text-[18px] text-zinc-900">{{ business.name }}</h1>
            <div class="flex items-center gap-x-2 text-[12px] text-zinc-900 font-normal">
              <MapPin :size="16" />
              <p>{{ business.address }}</p>
            </div>
            <div class="flex items-center gap-x-2 text-[12px] font-normal">
              <Hash :size="16" />
              <p>{{ `Registration number: ${business.registrationNumber}` }}</p>
            </div>
            <div class="flex items-center gap-x-2 text-[12px] font-normal">
              <Hash :size="16" />
              <p>{{ `TIN: ${business.taxIdNumber}` }}</p>
            </div>
          </div>
        </div>
        <Separator class="w-full max-w-[900px] m-auto bg-zinc-100" />
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
