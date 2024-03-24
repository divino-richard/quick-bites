<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { Image } from "lucide-vue-next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";

import { useStore } from "../../store";
import { computed } from "vue";
import Spinner from "../ui/Spinner.vue";
import { useToast } from "../ui/toast";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function as PropType<() => void>,
    required: true,
  },
});

const store = useStore();
const { toast } = useToast();

const updateImageLoading = computed(
  () => store.state.merchantFoodMenu.updateImageLoading
);
const updateImageError = computed(() => store.state.merchantFoodMenu.updateImageError);
const updateImageSuccess = computed(() => store.state.merchantFoodMenu.imageUpdated);

const fileInput = ref<HTMLInputElement | null>(null);
const selectedImage = ref<File | null>(null);
const image = ref("");

const handleFileClick = () => {
  fileInput.value?.click();
};

const handleFoodMenuImageChange = (event: any) => {
  const file = event.target.files[0];
  handleReadImage(file);
  selectedImage.value = file;
};

const handleUpdateFoodMenuImage = () => {
  const file = selectedImage.value;
  const formData = new FormData();
  formData.append("foodMenuImage", file as Blob);
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

watch(updateImageError, (error) => {
  if (error) {
    toast({
      title: error,
      variant: "destructive",
    });
    store.commit("merchantFoodMenu/resetImageUpdated");
  }
});

watch(updateImageSuccess, (success) => {
  if (success) {
    toast({
      title: "Image uploaded successfully",
      variant: "default",
      class: "text-[green]",
    });
    image.value = "";
    selectedImage.value = null;
    props.onClose();
    store.commit("merchantFoodMenu/toggleImageUpdated");
  }
});
</script>

<template>
  <Dialog :open="props.open" :modal="true">
    <DialogContent :hideCloseButton="true">
      <DialogHeader>
        <DialogTitle>Update Food menu Image</DialogTitle>
        <DialogDescription>
          Select file with .png, .jpeg, .jpg, or .gif type only
        </DialogDescription>
      </DialogHeader>

      <div
        class="flex justify-center items-center w-[150px] h-[125px] border border-zinc-200 bg-zinc-50 rounded-md cursor-pointer relative"
        @click="handleFileClick"
      >
        <img v-if="image" class="h-full w-full object-cover p-1" :src="image" />
        <Image v-else :size="35" class="text-orange-600" />

        <input
          ref="fileInput"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          type="file"
          hidden
          @change="(event) => handleFoodMenuImageChange(event)"
        />
      </div>

      <DialogFooter>
        <Button variant="ghost" @click="props.onClose">Cancel</Button>
        <Button @click="handleUpdateFoodMenuImage" class="w-[100px]">
          <Spinner v-if="updateImageLoading" />
          <span v-else>Upload</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
