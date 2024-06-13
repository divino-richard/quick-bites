
<script setup lang="ts">
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useStore } from '@/store';
import { computed, onMounted } from "vue";

const store = useStore();

const users = computed(() => store.state.user.items);
// const loadingUsers = computed(() => store.state.user.getItemsLoading);
// const getUsersError = computed(() => store.state.user.getItemsError);

onMounted(() => {
  store.dispatch('user/getItems', { skip: 0, limit: 10 });
});
</script>

<template>
  <div className="p-5">
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">
            #
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Phone #</TableHead>
          <TableHead>
            Type
          </TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(user, index) in users?.data">
          <TableCell class="font-medium">
            {{ index + 1 }}
          </TableCell>
          <TableCell class="font-medium">
            {{ user.firstName + ' ' + user.lastName}}
          </TableCell>
          <TableCell class="font-medium">
            {{ user.phoneNumber }}
          </TableCell>
          <TableCell class="font-medium">
            {{ user.userType }}
          </TableCell>
          <TableCell class="font-medium">
            {{ user.email }}
          </TableCell>
          <TableCell class="font-medium">
            <Button>Edit</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
