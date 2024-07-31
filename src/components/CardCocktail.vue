<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import Dialog from 'primevue/dialog'; // Asegúrate de tener el componente Dialog de PrimeVue

const props = defineProps({
    cocktail: {
        type: Object,
        required: true
    }
});
console.log(props.cocktail.strDrink)
// Estado para controlar la visibilidad del diálogo
const visible = ref(false);

// Función para abrir el diálogo
const showIngredients = () => {
    visible.value = true;
};

// Función para cerrar el diálogo
const hideDialog = () => {
    visible.value = false;
};
</script>

<template>
    <div>
        <Card class="w-64 hidden rounded" >
            <template #header>
                <img class="rounded" :alt="cocktail.strDrink" :src="cocktail.strDrinkThumb" />
            </template>
            <template #title>
                <p class="text-center">
                    {{ cocktail.strDrink }}
                </p>
            </template>
            <template #subtitle>
                <div class="flex justify-between">
                    <span>{{ cocktail.strCategory }}</span>
                    <span>{{ cocktail.strAlcoholic }}</span>
                </div>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button label="ingredientes" icon="pi pi-list" severity="secondary" outlined class="w-full"
                        @click="showIngredients" />
                </div>
            </template>
        </Card>

        <!-- Diálogo para mostrar los ingredientes -->
        <Dialog v-model:visible="visible" modal header="Ingredientes" :style="{ width: '25rem' }">
            <div class="text-surface-500 dark:text-surface-400 block mb-8">
                <ul class="list-disc flex flex-col p-4 gap-2 opacity-50">
                    <li v-if="cocktail.strIngredient1">{{ cocktail.strIngredient1 }}</li>
                    <li v-if="cocktail.strIngredient2">{{ cocktail.strIngredient2 }}</li>
                    <li v-if="cocktail.strIngredient3">{{ cocktail.strIngredient3 }}</li>
                    <li v-if="cocktail.strIngredient4">{{ cocktail.strIngredient4 }}</li>
                    <li v-if="cocktail.strIngredient5">{{ cocktail.strIngredient5 }}</li>
                    <!-- Agrega más ingredientes si es necesario -->
                </ul>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cerrar" severity="secondary" @click="hideDialog" />
            </div>
        </Dialog>
    </div>
</template>
