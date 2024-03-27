<script setup lang="ts">
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStore } from "@/store";
import { Store, MapPin, List, Utensils, Image, Edit } from "lucide-vue-next";
import { Ref, computed, onMounted, ref, watch } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/toast";
import moment from "moment";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverClose } from "radix-vue";
import BusinessInfoSkeleton from "@/components/skeletons/BusinessInfoSkeleton.vue";
import UpdateMenuImageModal from "@/components/merchant/UpdateMenuImageModal.vue";
import UpdateFoodMenuModal from "@/components/merchant/UpdateFoodMenuModal.vue";
import { FoodMenu } from "@/types/foodMenu.type";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const store = useStore();
const business = computed(() => store.getters["merchantBusiness/getBusinessInfo"]);
const loadingBusiness = computed(() => store.state.merchantBusiness.loadingBusiness);
const addFoodMenuLoading = computed(() => store.state.merchantFoodMenu.addLoading);
const addFoodMenuError = computed(() => store.state.merchantFoodMenu.addError);
const addFoodMenuSuccess = computed(() => store.state.merchantFoodMenu.addItemSuccess);
const foodMenus = computed(() => store.getters["merchantFoodMenu/getFoodMenus"]);
const deleteFoodMenuLoading = computed(
  () => store.state.merchantFoodMenu.deleteItemLoading
);
const deleteFoodMenuSuccess = computed(
  () => store.state.merchantFoodMenu.deleteItemSuccess
);
const deleteFoodMenuError = computed(() => store.state.merchantFoodMenu.deleteItemError);

const foodMenuImages: Ref<HTMLInputElement | null> = ref(null);
const selectedImageUrl = ref("");
const openAddFoodMenuModal = ref(false);
const openUpdateImageModal = ref(false);
const selectedFoodMenuId = ref("");
const foodMenuToEdit = ref<FoodMenu | null>(null);
const openUpdateFoodMenuModal = ref(false);

const { toast } = useToast();

const handleUploadClick = () => {
  if (!foodMenuImages?.value) return;
  foodMenuImages?.value?.click();
};

const handleFileChange = (event: any) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      selectedImageUrl.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
};

watch(addFoodMenuSuccess, (success) => {
  if (success) {
    openAddFoodMenuModal.value = false;
    selectedImageUrl.value = "";
    toast({
      title: "Food menu added successfully",
      variant: "default",
      class: "text-[green]",
    });
    store.commit("merchantFoodMenu/resetAddSuccess");
  }
});

watch(deleteFoodMenuError, (error) => {
  if (error) {
    toast({
      title: error,
      variant: "destructive",
    });
    store.commit("merchantFoodMenu/resetDeleteItemError");
  }
});

watch(deleteFoodMenuSuccess, (deleteSuccess) => {
  if (deleteSuccess) {
    toast({
      title: "Food menu deleted successfully",
      variant: "default",
      class: "text-[green]",
    });
    store.commit("merchantFoodMenu/resetDeleteItemSuccess");
  }
});

onMounted(() => {
  store.dispatch("merchantBusiness/fetchBusiness");
  store.dispatch("merchantFoodMenu/getFoodMenus");
});

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    price: z.number(),
    category: z.string().min(2).max(50),
    foodMenuImage: z.any(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((data) => {
  store.dispatch("merchantFoodMenu/addFoodMenu", data);
});

const handleDeleteMenu = (foodMenuId: string) => {
  store.dispatch("merchantFoodMenu/deleteItem", foodMenuId);
};

const handleEditFoodMenu = (foodMenu: FoodMenu) => {
  foodMenuToEdit.value = foodMenu;
  openUpdateFoodMenuModal.value = true;
};

const handleFoodMenuImageUpdate = (id: string) => {
  openUpdateImageModal.value = true;
  selectedFoodMenuId.value = id;
};
</script>

<template>
  <div class="w-full p-5">
    <BusinessInfoSkeleton v-if="loadingBusiness" />

    <div v-else>
      <div v-if="business">
        <div class="flex gap-x-2">
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
            <Button
              variant="ghost"
              class="mt-2 px-[5px] py-0 h-[35px] text-[12px] space-x-2"
            >
              <Store :size="14" class="text-orange-600" />
              <span class="text-zinc-900">View Info</span>
            </Button>
          </div>
        </div>
        <Separator class="w-full bg-zinc-100" />
        <div class="py-5">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-x-2">
              <List :size="18" />
              <h1 class="text-[14px] font-medium">Menu List</h1>
            </div>
            <Button
              class="text-[12px] h-[35px] py-[2px] bg-zinc-900"
              @click="() => (openAddFoodMenuModal = true)"
            >
              Add Menu
            </Button>
            <Dialog
              :open="openAddFoodMenuModal"
              @update:open="(value: boolean) => openAddFoodMenuModal = value"
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle class="flex gap-x-2">
                    <Utensils :size="18" class="text-orange-600" />
                    <h1>Add Food Menu</h1>
                  </DialogTitle>
                </DialogHeader>
                <p v-if="addFoodMenuError" class="text-[red] text-center">
                  {{ addFoodMenuError }}
                </p>
                <form @submit="onSubmit" class="space-y-2" enctype="multipart/form-data">
                  <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="description">
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input type="text" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="price">
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="category">
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input type="text" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="foodMenuImage">
                    <FormItem>
                      <FormLabel>Upload Image</FormLabel>
                      <FormControl>
                        <div
                          class="h-[100px] w-[100px] flex items-center justify-center rounded-md border border-zinc-100 cursor-pointer"
                          @click="handleUploadClick"
                        >
                          <img
                            v-if="selectedImageUrl"
                            :src="selectedImageUrl"
                            class="w-full h-full object-cover"
                          />
                          <Image v-else :size="25" class="text-zinc-200" />
                        </div>
                        <input
                          ref="foodMenuImages"
                          type="file"
                          accept="image/png, image/jpg, image/jpeg, image/gif"
                          hidden
                          v-bind="componentField"
                          @change="handleFileChange"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <DialogFooter class="w-full flex justify-end">
                    <Button type="submit" :disabled="addFoodMenuLoading">
                      {{ addFoodMenuLoading ? "Loading..." : "Submit" }}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Table class="border border-zinc-100">
            <TableHeader>
              <TableRow class="bg-zinc-100">
                <TableHead class="w-[100px]"> # </TableHead>
                <TableHead class="w-[100px]"> Name </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead> Category </TableHead>
                <TableHead> Posted </TableHead>
                <TableHead> Image </TableHead>
                <TableHead class="text-center"> Status </TableHead>
                <TableHead class="text-center"> Actions </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="(foodMenu, index) in foodMenus" :key="foodMenu._id">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell class="font-medium">
                  {{ foodMenu.name }}
                </TableCell>
                <TableCell class="max-w-[200px] truncate">
                  {{ foodMenu.description }}
                </TableCell>
                <TableCell>{{ foodMenu.price }}</TableCell>
                <TableCell>
                  {{ foodMenu.category }}
                </TableCell>
                <TableCell> {{ moment(foodMenu.createdAt).fromNow() }} </TableCell>
                <TableCell>
                  <div class="food-menu-image-container w-[50px] h-[45px] relative">
                    <img
                      class="h-full w-full rounded-md object-cover border border-zinc-200 p-1"
                      :src="foodMenu.image"
                    />
                    <div
                      class="food-menu-image-mask hidden w-[50px] h-[45px] justify-center items-center absolute top-0 left-0 bg-zinc-900 bg-opacity-[0.7] rounded-md"
                    >
                      <Edit
                        :size="18"
                        class="text-orange-600 cursor-pointer"
                        @click="handleFoodMenuImageUpdate(foodMenu._id)"
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div 
                    :class="{'bg-green-600' : foodMenu.status === 'available', 'bg-zinc-400' : foodMenu.status === 'unavailable'}"
                    class="p-[5px] text-white text-[12px] rounded-md text-center"
                  >
                    {{ foodMenu.status.toUpperCase() }}
                </div>
                </TableCell>
                <TableCell class="flex justify-center">
                  <Button variant="ghost" @click="handleEditFoodMenu(foodMenu)">
                    Edit
                  </Button>
                  <Popover>
                    <PopoverTrigger as-child>
                      <Button variant="ghost" class="text-red-500"> Delete </Button>
                    </PopoverTrigger>
                    <PopoverContent class="mx-2">
                      <h4>Are you sure to delete?</h4>
                      <p class="text-[12px]">This menu will be deleted permanently</p>
                      <div class="flex gap-x-2 mt-5 justify-end">
                        <PopoverClose>
                          <Button variant="ghost" class="h-[30px] text-[12px]">
                            Cancel
                          </Button>
                        </PopoverClose>
                        <Button
                          variant="destructive"
                          class="h-[30px] text-[12px]"
                          @click="handleDeleteMenu(foodMenu._id)"
                        >
                          {{ deleteFoodMenuLoading ? "Loading..." : "Delete" }}
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Select>
                    <SelectTrigger class="w-[100px] border-none">
                      <SelectValue placeholder="Mark as" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel class="pl-2">Select status</SelectLabel>
                        <SelectItem value="available" class="pl-2">
                          Available
                        </SelectItem>
                        <SelectItem value="unavailable" class="pl-2">
                          Unavailable
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <UpdateMenuImageModal
            :id="selectedFoodMenuId"
            :open="openUpdateImageModal"
            :onClose="() => (openUpdateImageModal = false)"
          />

          <UpdateFoodMenuModal
            :open="openUpdateFoodMenuModal"
            :onClose="() => (openUpdateFoodMenuModal = false)"
            :currentData="foodMenuToEdit"
          />
        </div>
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

<style scoped>
.food-menu-image-container:hover .food-menu-image-mask {
  display: flex;
}
</style>
