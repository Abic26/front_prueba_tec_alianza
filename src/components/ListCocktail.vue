<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CardCocktail from '../components/CardCocktail.vue';
import { useToast } from "primevue/usetoast";



const cocktails = ref([]);
const searchCocktails = ref('coffee');
const selectedCocktails = ref([]);
const toast = useToast();


const fetchCocktails = async () => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchCocktails.value}`);
        cocktails.value = response.data.drinks;
        toast.add({ severity: 'success', summary: 'Success', detail: 'loaded drinks list', life: 3000 });

        // console.log(cocktails.value);
    } catch (error) {
        toast.add({ severity: 'warn', summary: 'Error', detail: 'error', life: 3000 });

        console.error('Error fetching cocktails:', error);
    }
};

const search = () => {
    fetchCocktails();
};

onMounted(() => {
    fetchCocktails();
});
const addDrink = (cocktail) => {
    const existingCocktail = selectedCocktails.value.find(item => item.strDrink === cocktail.strDrink);
    axios.post('http://127.0.0.1:8000/api/pending-orders', {
        user_id: 1,
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
