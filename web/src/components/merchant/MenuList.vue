<script setup lang="ts">
import { Button } from "../../components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { List, Edit } from "lucide-vue-next";

import moment from "moment";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useStore } from "../../store";
import { computed, onMounted } from "vue";
import { formatPrice } from "@/utils/format.utils";

const store = useStore();

const restaurant = computed(() => store.state.restaurant.item);
const menus = computed(() => store.state.menu.items);

onMounted(() => {
  if(restaurant?.value) {
    store.dispatch('menu/getItems', restaurant?.value._id);
  }
});
</script>

<template>
  <div class="py-2">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-x-2">
        <List :size="18" />
        <h1 class="text-[14px] font-medium">Menu List</h1>
      </div>
      <!-- <Button
        class="text-[12px] py-[2px] bg-zinc-900"
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
      </Dialog> -->
    </div>
    <Table class="border border-zinc-100">
      <TableHeader>
        <TableRow class="bg-zinc-100">
          <TableHead class="w-[50px]"> # </TableHead>
          <TableHead class="w-[50px]"> Image </TableHead>
          <TableHead> Name </TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Meal</TableHead>
          <TableHead>Posted </TableHead>
          <TableHead class="w-[150px]"> Status </TableHead>
          <TableHead class="w-[200px] text-center"> Actions </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="(menu, index) in menus"
          :key="menu._id"
          class="whitespace-nowrap"
        >
          <TableCell>{{ index + 1 }}</TableCell>
          <TableCell>
            <div class="food-menu-image-container w-[50px] h-[45px] relative">
              <img
                class="h-full w-full rounded-md object-cover border border-zinc-200 p-1"
                :src="menu.images[0].imageUrl"
              />
              <div
                class="food-menu-image-mask hidden w-[50px] h-[45px] justify-center items-center absolute top-0 left-0 bg-zinc-900 bg-opacity-[0.7] rounded-md"
              >
                <Edit
                  :size="18"
                  class="text-orange-600 cursor-pointer"
                />
              </div>
            </div>
          </TableCell>
          <TableCell class="font-medium">
            {{ menu.name }}
          </TableCell>
          <TableCell class="max-w-[200px] truncate">
            {{ menu.description }}
          </TableCell>
          <TableCell>
            {{ menu.price.currency + formatPrice(menu.price.value)}}
          </TableCell>
          <TableCell>
            {{ menu.mealType }}
          </TableCell>
          <TableCell> {{ moment(menu.createdAt).fromNow() }} </TableCell>
          <TableCell>
            <Select
              v-model="menu.status"
            >
              <SelectTrigger
                :class="{
                  'bg-green-200': menu.status === 'available',
                  'bg-zinc-200': menu.status === 'unavailable',
                }"
                class="border-none"
              >
                <!-- <Spinner
                  v-if="
                    updateStatusLoading && menu._id === menuToEditStatus
                  "
                  :size="16"
                /> -->
                <SelectValue :placeholder="menu.status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel class="pl-2">Select status</SelectLabel>
                  <SelectItem value="available"> Available </SelectItem>
                  <SelectItem value="unavailable"> Unavailable </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell class="flex justify-center">
            <Button variant="ghost">
              Edit
            </Button>
            <!-- <Popover>
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
            </Popover> -->
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <!-- <UpdateMenuImageModal
      :id="selectedFoodMenuId"
      :open="openUpdateImageModal"
      :onClose="() => (openUpdateImageModal = false)"
    />

    <UpdateFoodMenuModal
      :open="openUpdateFoodMenuModal"
      :onClose="() => (openUpdateFoodMenuModal = false)"
      :currentData="foodMenuToEdit"
    /> -->
  </div>
</template>