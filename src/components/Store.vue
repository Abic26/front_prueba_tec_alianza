<!-- store.vue -->
<script setup>
import { ref, onMounted } from 'vue';

const selectedCocktails = ref([]);
const orders = ref([]);
const activeIndex = ref([]);

// Recuperar los datos del localStorage cuando el componente se monta
onMounted(() => {
    const storedCocktails = localStorage.getItem('selectedCocktails');
    const storedOrders = localStorage.getItem('orders');

    if (storedCocktails) {
        selectedCocktails.value = JSON.parse(storedCocktails);
    }

    if (storedOrders) {
        orders.value = JSON.parse(storedOrders);
    }
});

const addOrder = () => {
    if (selectedCocktails.value.length > 0) {
        orders.value.push({
            id: Date.now(), // Usar una identificación única para la orden
            items: [...selectedCocktails.value]
        });
        localStorage.setItem('orders', JSON.stringify(orders.value));
        selectedCocktails.value = []; // Limpiar los cócteles seleccionados
        localStorage.removeItem('selectedCocktails'); // Limpiar el localStorage
    }
};
</script>

<template>
    <div>
        <label class="font-medium">Pending Orders</label>
        <br><br>
        <DataTable :value="selectedCocktails" showGridlines tableStyle="min-width: 15rem">
            <Column field="strDrink" header="Cocktail"></Column>
            <Column field="quantity" header="Quantity"></Column>
            <template #empty>
                <div class="p-4 text-center text-gray-500">
                    No items found.
                </div>
            </template>
        </DataTable>

        <div class="flex justify-end gap-2 mt-4">
            <Button type="button" label="Add Order" severity="secondary" @click="addOrder" />
        </div>
        <br>
        <hr>
        <br>


        <div class="flex flex-col gap-4">
            <label class="font-medium">Orders Delivered</label>
            <div v-if="orders.length === 0" class="p-4 text-center text-gray-500">
                No orders available.
            </div>
            <Accordion v-else v-model:activeIndex="activeIndex">
                <AccordionPanel v-for="(order, index) in orders" :key="order.id">
                    <AccordionHeader>{{ 'Order ' + (index + 1) }}</AccordionHeader>
                    <AccordionContent>
                        <div v-for="(item, i) in order.items" :key="i" class="flex justify-between">
                            <label>{{ item.strDrink }}</label>
                            <label>{{ item.quantity }}</label>
                        </div>
                    </AccordionContent>
                    <br>
                </AccordionPanel>
            </Accordion>
        </div>
    </div>
</template>
