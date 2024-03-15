<script setup lang="ts">
import api from "@/utils/api";
import { AxiosError } from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const fetchBusinessLoading = ref(false);
const fetchBusinessError = ref("");
const business = ref();

const router = useRouter();

const fetchBusiness = async () => {
  fetchBusinessLoading.value = true;
  try {
    const response = await api.get("/api/merchant/business");
    business.value = response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      fetchBusinessError.value = error.response?.data?.message;
    } else {
      fetchBusinessError.value = "Something went wrong. Please try again later";
    }
  } finally {
    fetchBusinessLoading.value = false;
  }
};

// if (!business) {
//   router.push("/merchant/registration/completion");
// }

// onMounted(() => {
//   fetchBusiness();
// });
</script>

<template>
  <div>
    <h1>Merchant Dashboard</h1>
  </div>
</template>
