<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';

const props = defineProps({
    cocktail: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['add-drink']);

const visible = ref(false);

const selectedDrinks = ref([]);

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');


const showIngredients = () => {
    visible.value = true;
};


const hideDialog = () => {
    visible.value = false;
};

const addDrink = (cocktail) => {
    emit('add-drink', cocktail);
};
</script>

<template>
    <div>
        <Card class="w-80 hidden rounded">
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
                    <Button label="Ingredients" icon="pi pi-list" severity="secondary" outlined class="w-full"
                        @click="showIngredients" />
                    <Button v-if="isAuthenticated" label="Add Drink" icon="pi pi-plus" severity="secondary" outlined class="w-full"  @click="addDrink(cocktail)" />
                </div>
            </template>
        </Card>

        <Dialog v-model:visible="visible" modal header="Ingredientes" :style="{ width: '25rem' }">
            <div class="text-surface-500 dark:text-surface-400 block mb-8">
                <ul class="list-disc flex flex-col p-4 gap-2 opacity-50">
                    <li v-if="cocktail.strIngredient1">{{ cocktail.strIngredient1 }}</li>
                    <li v-if="cocktail.strIngredient2">{{ cocktail.strIngredient2 }}</li>
                    <li v-if="cocktail.strIngredient3">{{ cocktail.strIngredient3 }}</li>
                    <li v-if="cocktail.strIngredient4">{{ cocktail.strIngredient4 }}</li>
                    <li v-if="cocktail.strIngredient5">{{ cocktail.strIngredient5 }}</li>
                </ul>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cerrar" severity="secondary" @click="hideDialog" />
            </div>
        </Dialog>

    </div>
</template>
