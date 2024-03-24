<script setup lang="ts">
import { useStore } from "@/store";
import { Edit } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import Spinner from "@/components/ui/Spinner.vue";

const props = defineProps(["image", "id"]);

const store = useStore();
const updateImageLoading = computed(
  () => store.state.merchantFoodMenu.updateImageLoading
);

const fileInput = ref<HTMLInputElement | null>(null);
const image = ref("");

onMounted(() => {
  image.value = props.image;
});

const handleFileClick = () => {
  fileInput.value?.click();
};

const handleFoodMenuImageChange = (event: any) => {
  const file = event.target.files[0];
  handleReadImage(file);
  handleUpdateFoodMenuImage(file);
};

const handleUpdateFoodMenuImage = (file: File) => {
  const formData = new FormData();
  formData.append("foodMenuImage", file);
  const foodMenuData = {
    formData,
    id: props.id,
  };
  store.dispatch("merchantFoodMenu/updateImage", foodMenuData);
};

const handleReadImage = (file: File) => {
  if (file) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      image.value = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="food-menu-image-container w-[50px] h-[45px] relative">
    <img
      class="h-full w-full rounded-md object-cover border border-zinc-200 p-1"
      :src="image"
    />
    <div
      class="food-menu-image-mask hidden w-[50px] h-[45px] justify-center items-center absolute top-0 left-0 bg-zinc-900 bg-opacity-[0.7] rounded-md"
    >
      <Edit :size="18" class="text-orange-600 cursor-pointer" @click="handleFileClick" />
    </div>
    <input
      ref="fileInput"
      type="file"
      hidden
      @change="(event) => handleFoodMenuImageChange(event)"
    />
    <div
      v-if="updateImageLoading"
      class="absolute top-0 left-0 w-[50px] h-[45px] flex justify-center items-center bg-zinc-900 bg-opacity-[0.7] rounded-md"
    >
      <Spinner :size="18" />
    </div>
  </div>
</template>

<style scoped>
.food-menu-image-container:hover .food-menu-image-mask {
  display: flex;
}
</style>
