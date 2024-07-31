
<template>
    <div class="card">
        <Menubar :model="items" class="
                lg:flex lg:flex-row lg:justify-between lg:fixed lg:top-0 lg:z-[1000] lg:w-full lg:overflow-x-auto
                md:flex md:justify-between md:fixed md:top-0 md:z-[1000] md:w-full md:overflow-x-auto
                justify-between
            ">
            <template #start>
                <img src="/logo_coctel.webp" alt="Logo" class="h-8" />
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <div class="flex justify-end">
                    <router-link :to="item.to" class="flex items-center" v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </router-link>
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";
const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        to: '/'
    },
    {
        label: 'Drinks',
        icon: 'pi pi-trophy',
        to: '/drinks'
    },
    {
        label: 'Login',
        icon: 'pi pi-user',
        to: '/login'
    }
]);
</script>
