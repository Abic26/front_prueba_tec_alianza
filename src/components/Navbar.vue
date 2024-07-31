<template>
    <div class="card">
        <Menubar :model="items" class="flex justify-between">
            <template #start>
                <img src="/logo_coctel.webp" alt="Logo" class="h-8" /> <!-- Reemplazamos el SVG con una imagen -->
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <div class="flex justify-end">
                    <a v-ripple class="flex items-center" v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
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
        icon: 'pi pi-home'
    },
    {
        label: 'Login',
        icon: 'pi pi-user'
    }
]);
</script>
