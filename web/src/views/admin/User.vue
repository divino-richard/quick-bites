
<script setup lang="ts">
import Loading from '@/components/Loading.vue';
import Pagination from '@/components/Pagination.vue';
import CreateUserModal from '@/components/admin/CreateUserModal.vue';
import DeleteUserPopup from '@/components/admin/DeleteUserPopup.vue';
import UpdateUserModal from '@/components/admin/UpdateUserModal.vue';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/toast';
import { USER_TYPES } from '@/constants/user.constants';
import { useStore } from '@/store';
import { List, Search } from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from "vue";

const store = useStore();
const {toast} = useToast();

const searchMode = ref(false);
const userTypeFilter = ref("");

const skip = ref(0);
const limit = 10;

const users = computed(() => store.state.user.items);
const totalUsers = computed(() => store.state.user.totalItems);
const loadingUsers = computed(() => store.state.user.loading);
const error = computed(() => store.state.user.error);

onMounted(() => {
  getUsers();
});

const getUsers = () => {
  store.dispatch('user/getItems', {
    userType: userTypeFilter.value,
    skip: skip.value, 
    limit
  });
}

const paginateUsers = (page: number) => {
  skip.value = (page - 1) * limit;
  getUsers();
}

const searchUser = (keyword: string | number) => {
  if(!keyword) {
    searchMode.value = false;
    return;
  }
  searchMode.value = true;
  store.dispatch('user/search', keyword);
}

watch(userTypeFilter, () => {
  paginateUsers(1);
});

watch(error, (error) => {
  if(!error) return;
  toast({
    title: error,
    variant: 'destructive'
  });
  store.commit('error', '');
});
</script>

<template>
  <div className="p-5">
    <h1 class="flex items-center gap-2 font-medium mb-2">
      <List :size="18"/>
      Users
    </h1>
    <div class="flex justify-between py-2">
      <div class="w-full flex items-center gap-2">
        <div class="w-full max-w-[500px] flex items-center gap-1 px-2 border border-zinc-200 rounded-md">
          <Search :size="18"/>
          <Input 
            type="text"
            @update:model-value="searchUser"
            class="border-none focus-visible:ring-0 focus-visible:ring-offset-0 "
            placeholder="Search by name"
          />
        </div>
        <Select v-model="userTypeFilter">
          <SelectTrigger class="w-[200px]">
            <SelectValue placeholder="Filter by user type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem 
                v-for="userType in USER_TYPES" 
                :value="userType"
              >
                {{ userType }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <CreateUserModal 
        @createSuccess="getUsers"
      />
    </div>
    <Table class="border border-zinc-100">
      <TableCaption>
        <Loading v-if="loadingUsers"/>
        <span v-else>
          A list of users.
        </span>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone #</TableHead>
          <TableHead>Type</TableHead>
          <TableHead class="w-[200px] text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(user, index) in users">
          <TableCell class="font-medium">
            {{ index + 1 }}
          </TableCell>
          <TableCell class="font-medium">
            {{ user.firstName + ' ' + user.lastName}}
          </TableCell>
          <TableCell class="font-medium">
            {{ user.email }}
          </TableCell>
          <TableCell class="font-medium">
            {{ user.phoneNumber }}
          </TableCell>
          <TableCell class="font-medium">
            {{ user.userType }}
          </TableCell>
          <TableCell class="flex font-medium">
            <UpdateUserModal 
              :defaultValues="user"
              @updateSuccess="getUsers"
            />
            <DeleteUserPopup 
              @deleteSuccess="getUsers" 
              :userId="user._id"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <div 
      v-if="!searchMode"
      class="flex justify-end"
    >
      <Pagination
        :total="totalUsers"
        @pageUpdate="paginateUsers"
      />
    </div>
  </div>
</template>
