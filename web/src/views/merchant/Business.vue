<script setup lang="ts">
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Hash, MapPin, List, Utensils, Image } from "lucide-vue-next";
import { Ref, computed, onMounted, ref, watch } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/toast";

const store = useStore();
const business = computed(() => store.getters["merchantBusiness/getBusinessInfo"]);
const loadingBusiness = computed(() => store.state.merchantBusiness.loadingBusiness);
const addFoodMenuLoading = computed(() => store.state.merchantFoodMenu.addLoading);
const addFoodMenuError = computed(() => store.state.merchantFoodMenu.addError);
const addFoodMenuSuccess = computed(() => store.state.merchantFoodMenu.addItemSuccess);

const foodMenuImages: Ref<HTMLInputElement | null> = ref(null);
const selectedImageUrl = ref("");
const openAddFoodMenuModal = ref(false);

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

watch(addFoodMenuSuccess, () => {
  openAddFoodMenuModal.value = false;
});

onMounted(() => {
  store.dispatch("merchantBusiness/fetchBusiness");
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

const invoices = [{}];
</script>

<template>
  <div>
    <div v-if="loadingBusiness">
      <h1>Loading....</h1>
    </div>

    <div v-else>
      <div v-if="business" class="w-full max-w-[900px] m-auto">
        <div class="flex gap-x-2 py-5">
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
        <div class="py-2">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-x-2">
              <List :size="18" />
              <h1 class="text-[14px] font-medium">Menu List</h1>
            </div>
            <Button class="text-[12px] h-[35px] py-[2px] bg-zinc-900" @click="() => openAddFoodMenuModal = true">
              Add Menu
            </Button>
            <Dialog :open="addFoodMenuSuccess ? false : true">
              <DialogContent>
                <DialogHeader>
                  <DialogTitle class="flex gap-x-2">
                    <Utensils :size="18" class="text-orange-600" />
                    <h1>Add Food Menu</h1>
                  </DialogTitle>
                </DialogHeader>
                <p v-if="addFoodMenuError" class="text-[red] text-center">{{ addFoodMenuError }}</p>
                <p v-if="addFoodMenuSuccess" class="text-[green] text-center">Food menu added successfully</p>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[100px]"> Invoice </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead class="text-right"> Amount </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <!-- <TableRow v-for="invoice in invoices" :key="invoice.invoice">
                <TableCell class="font-medium">
                  {{ invoice.invoice }}
                </TableCell>
                <TableCell>{{ invoice.paymentStatus }}</TableCell>
                <TableCell>{{ invoice.paymentMethod }}</TableCell>
                <TableCell class="text-right">
                  {{ invoice.totalAmount }}
                </TableCell>
              </TableRow> -->
            </TableBody>
          </Table>
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
