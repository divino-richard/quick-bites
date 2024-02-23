
<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

const menus = [
    {
        label: "Dashboard",
        path: "/admin"
    },
    {
        label: "User",
        path: "/admin/user"
    }
]
</script>

<template>
    <div className="bg-zinc-900 w-[300px] h-screen p-5">
        <div className="mb-10">
            <h1 className="text-white text-lg">Welcome back</h1>
            <p className="text-slate-400 text-sm">Richard Divino</p>
        </div>
        <div >
            <div v-for="(menuItem, index) in menus" :key="index" >
                <RouterLink :to="menuItem.path">
                    <div :class="`p-2 ${menuItem.path === route.fullPath ? 'bg-zinc-800' : ''} rounded-sm`">
                        <p className="text-sm text-white">{{ menuItem.label }}</p>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>