<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CardCocktail from '../components/CardCocktail.vue';
import { useToast } from "primevue/usetoast";



const cocktails = ref([]);
const searchCocktails = ref('coffee');
const selectedCocktails = ref([]);
const loading = ref(false);
const toast = useToast();
const userId = Number(localStorage.getItem('user_id'));
const apiUrlDDBB = import.meta.env.VITE_API_URL_DDBB;
const apiUrlThecocktaildb = import.meta.env.VITE_API_URL_TheCocktailDB;




const fetchCocktails = async () => {
    loading.value = true;

    try {
        const response = await axios.get(`${apiUrlThecocktaildb}/json/v1/1/search.php?s=${searchCocktails.value}`);
        cocktails.value = response.data.drinks;
        toast.add({ severity: 'success', summary: 'Success', detail: 'loaded drinks list', life: 3000 });

        // console.log(cocktails.value);
    } catch (error) {
        toast.add({ severity: 'warn', summary: 'Error', detail: 'error', life: 3000 });

        console.error('Error fetching cocktails:', error);
    }finally{
        loading.value = false;
    }
};

const search = () => {
    fetchCocktails();
};

onMounted(() => {
    fetchCocktails();
});
const addDrink = (cocktail) => {
    console.log(userId);
    const existingCocktail = selectedCocktails.value.find(item => item.strDrink === cocktail.strDrink);
    axios.post(`${apiUrlDDBB}/pending-orders`, {
        user_id: userId,
        nameDrink: cocktail.strDrink,
        cantidad: 1,
        // otros campos si es necesario
    })
        .then(response => {
            // console.log('Usuario registrado:', response.data);
            toast.add({ severity: 'success', summary: 'Success', detail: 'add drinks list', life: 3000 });

        })
        .catch(error => {
            console.error('Error al registrar el usuario:', error);
            toast.add({ severity: 'warn', summary: 'Error', detail: 'error deleting', life: 3000 });

            // Manejar el error, mostrar un mensaje al usuario, etc.
        });
};

</script>

<template>
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <ProgressSpinner class="w-12 h-12" strokeWidth="8" fill="transparent" animationDuration=".5s"
            aria-label="Custom ProgressSpinner" />
    </div>
    <div class="flex flex-col gap-5 p-24">
        <div class="flex flex-row justify-end items-start gap-2">
            <div class="flex flex-col items-center">
                <InputText v-tooltip.bottom="'Search Drink'" placeholder="Search Drinks" v-model="searchCocktails" />
                <label class="opacity-55">look for your favorite drink</label>
            </div>
            <Button label="Search" @click="search" /> <!-- Añadir el evento click -->
        </div>
        <div class="flex flex-wrap justify-center gap-5">
            <CardCocktail v-for="(cocktail, index) in cocktails" :key="index" :cocktail="cocktail"
                @add-drink="addDrink" />
        </div>
    </div>
    <Toast />

</template>
