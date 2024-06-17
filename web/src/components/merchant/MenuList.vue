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
import { useStore } from "../../store";
import { computed, onMounted } from "vue";
import { formatPrice } from "@/utils/format.utils";
import CreateMenuModal from "./CreateMenuModal.vue";
import { Badge } from "../ui/badge";
import DeleteMenuAlert from "./DeleteMenuAlert.vue";

const store = useStore();

const { restaurantId } = defineProps({
  restaurantId: {
    type: String,
    required: true
  }
});

const menus = computed(() => store.state.menu.items);

onMounted(() => {
  getMenus();
});

const getMenus = () => {
  store.dispatch('menu/getItems', restaurantId);
}
</script>

<template>
  <div class="py-2">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-x-2">
        <List :size="18" />
        <h1 class="text-[14px] font-medium">Menu List</h1>
      </div>
      <CreateMenuModal 
        :restaurantId="restaurantId"
        @createSuccess="getMenus"
      />
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
            <Badge :class="{'bg-green-600' : menu.status === 'available', 'bg-zinc-500' : menu.status === 'unavailable'}">{{ menu.status }}</Badge>
          </TableCell>
          <TableCell class="flex justify-center">
            <Button variant="ghost" class="flex items-center gap-2">
              <Edit :size="16"/>
              Edit
            </Button>
            <DeleteMenuAlert 
              :menuId="menu._id"
              @deleteSuccess="getMenus"
            />
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