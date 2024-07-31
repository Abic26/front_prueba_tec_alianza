<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');

const items = ref([]);

const updateMenuItems = () => {
    items.value = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            to: '/',
            visible: !isAuthenticated.value
        },
        {
            label: 'Drinks',
            icon: 'pi pi-trophy',
            to: '/drinks'
        },
        {
            label: 'Login',
            icon: 'pi pi-user',
            to: '/login',
            visible: !isAuthenticated.value
        },
        {
            label: 'Store',
            icon: 'pi pi-cart-plus',
            to: '/store',
            visible: isAuthenticated.value
        },
        {
            label: '',
            icon: 'pi pi-sign-out',
            command: () => logout(),
            visible: isAuthenticated.value
        }
    ];
};

watchEffect(updateMenuItems);

const logout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    isAuthenticated.value = false;
    router.push('/drinks').then(() => {
        location.reload();
    });
};
</script>

<template>
    <div class="card">
        <Menubar :model="items" class="lg:flex lg:flex-row lg:justify-between lg:fixed lg:top-0 lg:z-[1000] lg:w-full lg:overflow-x-auto md:flex md:justify-between md:fixed md:top-0 md:z-[1000] md:w-full md:overflow-x-auto justify-between">
            <template #start>
                <img src="/logo_coctel.webp" alt="Logo" class="h-8" />
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <div v-if="item.to" class="flex justify-end">
                    <router-link v-if="item.visible !== false" :to="item.to" class="flex items-center" v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </router-link>
                </div>
                <div v-else-if="item.command" @click="item.command" class="flex justify-center items-center cursor-pointer">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                </div>
            </template>
        </Menubar>
    </div>
</template>
