<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CardCocktail from '../components/CardCocktail.vue';


const cocktails = ref([]);
const searchCocktails = ref('coffee');

const fetchCocktails = async () => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchCocktails.value}`);
        cocktails.value = response.data.drinks;
        // console.log(cocktails.value);
    } catch (error) {
        console.error('Error fetching cocktails:', error);
    }
};

const search = () => {
    fetchCocktails();
};

onMounted(() => {
    fetchCocktails();
});
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
            <CardCocktail v-for="(cocktail, index) in cocktails" :key="index" :cocktail="cocktail" />
        </div>
    </div>
</template>
