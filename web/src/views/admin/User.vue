
<script setup lang="ts">
import SideBar from '@/components/admin/SideBar.vue';
import AddMerchantModal from '@/components/admin/AddMerchantModal.vue';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserType } from '@/types/user.types';
import { ref } from "vue";

let showAddMerchantModal = ref(false);
let showAddRiderModal = ref(false);

const handleAddUser = (user: UserType) => {
    switch(user) {
        case 'merchant':
            showAddMerchantModal.value = true;
            break;
        case 'rider':
            showAddRiderModal.value = true;
            break;
    }
}


</script>

<template>
    <div className="flex w-full h-screen bg-zinc-900">
        <SideBar />
        <div className="flex-1 p-5">
            <div className="flex justify-between items-center">
                <h1 className="text-white">User List</h1>
                
                <DropdownMenu>
                    <DropdownMenuTrigger 
                        type="button"
                        className="bg-green-600 text-white font-semibold px-5 py-2 rounded-sm text-sm"
                    >
                        New
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>New user</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            @click="handleAddUser('rider')"
                        >
                            Rider
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            @click="handleAddUser('merchant')"
                        >
                            Merchant
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <AddMerchantModal 
                :show="showAddMerchantModal" 
                :onUpdateOpen="(value) => showAddMerchantModal = value"
            />
        </div>
    </div>
</template>
