
<script setup lang="ts">
import SideBar from '@/components/admin/SideBar.vue';
</script>

<template>
    <div className="flex w-full h-screen bg-zinc-800">
        <SideBar />
        <div>
            <div>
                <h1>User List</h1>
                <Button type="button">Add User</Button>
            </div>
        </div>
    </div>
</template>
