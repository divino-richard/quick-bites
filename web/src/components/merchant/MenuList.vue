<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { List, Edit, Search, X } from "lucide-vue-next";
import moment from "moment";
import { useStore } from "../../store";
import { computed, onMounted, ref, watch } from "vue";
import { formatPrice } from "@/utils/format.utils";
import { Badge } from "../ui/badge";
import DeleteMenuAlert from "./DeleteMenuAlert.vue";
import AddUpdateMenuModal from "./AddUpdateMenuModal.vue";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Loading from "../Loading.vue";

type ModalActionType = 'add' | 'edit';

const store = useStore();

const itemToEdit = ref();
const modalAction = ref<ModalActionType>('add');
const openModal = ref(false);
const statusFilter = ref('');
const searchFilter = ref('');

const { restaurantId } = defineProps({
  restaurantId: {
    type: String,
    required: true
  }
});

const loadingMenus = computed(() => store.state.menu.loadingItems);
const menus = computed(() => store.state.menu.items);

onMounted(() => {
  getMenus();
});

const getMenus = () => {
  store.dispatch('menu/getItems', {
    restaurantId,
    status: statusFilter.value,
    search: searchFilter.value
  });
}

const handleEditMenu = (menu: any) => {
  itemToEdit.value = menu;
  modalAction.value = 'edit';
  setTimeout(() => {
    openModal.value = true;
  }, 100)
}

const handleAddMenu = () => {
  modalAction.value = 'add';
  openModal.value = true;
}

const handleModalUpdate = (value: boolean) => {
  openModal.value = value;
}

watch(statusFilter, () => {
  getMenus();
});

watch(searchFilter, () => {
  getMenus();
})
</script>

<template>
  <AddUpdateMenuModal
    :restaurantId="restaurantId"
    :defaultValues="itemToEdit"
    :action="modalAction"
    :openModal="openModal"
    @success="getMenus"
    @modalUpdate="handleModalUpdate"
  />
  <div class="py-2">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-x-2">
        <List :size="18" />
        <h1 class="text-[14px] font-medium text-nowrap">Menu List</h1>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-full max-w-[500px] flex items-center gap-1 px-2 border border-zinc-200 rounded-md">
          <Search :size="18"/>
          <Input 
            v-model="searchFilter"
            type="text"
            class="border-none focus-visible:ring-0 focus-visible:ring-offset-0 "
            placeholder="Search by name"
          />
          <X 
            :size="18"
            class="cursor-pointer hover:text-zinc-500"
            @click="searchFilter = ''"
          />
        </div>
        <Select v-model="statusFilter">
          <SelectTrigger class="w-[300px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          class="flex gap-1"
          @click="handleAddMenu"
        >
          Add Menu
        </Button>
      </div>
    </div>
    <Table class="border border-zinc-100">
      <TableCaption>
        <Loading v-if="loadingMenus"/>
        <span v-else-if="menus.length <= 0">
          Empty menus
        </span>
        <span v-else>
          A list of menus.
        </span>
      </TableCaption>
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
                :src="menu?.images[0]?.imageUrl"
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
            <Button 
              variant="ghost" 
              class="flex items-center gap-2"
              @click="handleEditMenu(menu)"
            >
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
  </div>
</template>