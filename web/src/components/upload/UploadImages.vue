<script setup lang="ts">
import { useStore } from '@/store';
import { Loader2, Upload, UploadCloud, X } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';

const store = useStore();

const emits = defineEmits(['imagesChange']);

const fileInput = ref();
const images = ref<any[]>([]);
const hoveredImage = ref<number | null>();
const imageToDelete = ref('');

const uploadPending = computed(() => store.state.upload.uploadPending);
const error = computed(() => store.state.upload.error);
const deletePending = computed(() => store.state.upload.deletePending);
const deleteSuccess = computed(() => store.state.upload.deleteSuccess);
const image =  computed(() => store.state.upload.image);

const handleSelectImage = () => {
  fileInput.value.click();
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);
    store.dispatch('upload/image', formData);
  }
}

const handleDeleteImage = (filename: string) => {
  imageToDelete.value = filename;
  store.dispatch('upload/deleteImage', filename);
}

watch(deleteSuccess, (success) => {
  if(!success) return;
  images.value = images.value.filter((item: any) => item.fileName !== imageToDelete.value);
  store.commit('upload/deleteSuccess', false);
});

watch(image, (image) => {
  if(!image) return;
  images.value = [...images.value, image];
});

watch(images, (images) => {
  emits('imagesChange', images)
})
</script>

<template>
  <div class="border border-zinc-100 p-5 rounded-lg">
    <div class="flex flex-wrap gap-5">
      <div 
        v-for="(image, index) in images"
        class="relative w-[100px] h-[100px] border border-zinc-200 rounded-md p-2"
        @mouseover="hoveredImage = index"
        @mouseleave="hoveredImage = null"
      >
        <img 
          :src="image.imageUrl" 
          class="w-full h-full object-cover"
          alt=""
        >
        <div
          v-if="(imageToDelete === image.fileName) && deletePending"
          class="absolute top-0 left-0 w-[100px] h-[100px] flex justify-center items-center bg-zinc-800 bg-opacity-50 rounded-md p-2"
        >
          <div class="flex flex-col items-center">
            <Loader2 :size="20" class="animate-spin text-white"/>
            <p class="text-white text-[14px]">Deleting...</p>
          </div>
        </div>
        <div
          v-else
          v-if="hoveredImage === index"
          class="absolute top-0 left-0 w-[100px] h-[100px] bg-zinc-800 bg-opacity-50 rounded-md p-2"
        >
          <div class="flex justify-end">
            <X 
              @click="handleDeleteImage(image.fileName)"
              :size="20" class="cursor-pointer text-white"
            />
          </div>
        </div>
      </div>
      <div
        v-if="uploadPending"
        class="flex flex-col items-center justify-center w-[100px] h-[100px] border border-dashed border-zinc-200 rounded-md animate-pulse">
        <UploadCloud :size="18"/>
        <span class="text-[14px]">Uploading...</span>
      </div>
      <div
        v-else
        class="flex flex-col items-center justify-center w-[100px] h-[100px] border border-dashed border-zinc-200 rounded-md cursor-pointer hover:border-zinc-800"
        @click="handleSelectImage"
      >
        <Upload :size="18"/>
        <span class="text-[14px]">Upload</span>
      </div>
    </div>
    <input  type="file" ref="fileInput" accept="image/*" @change="handleFileChange" hidden>
    <p v-if="error" class="text-[12px] text-red-500 text-center mt-5">
      {{ error }}
    </p>
  </div>
</template>
