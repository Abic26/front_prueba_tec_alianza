<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from "primevue/usetoast";


const selectedCocktails = ref([]);
const orders = ref([]);
const activeIndex = ref([]);
const toast = useToast();

const axiosCocktails = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/pending-orders/user/1`);
        selectedCocktails.value = response.data.pendingOrders;
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching cocktails:', error);
    }
};

const axiosOrderDelivered = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/orders-delivered/user/1`);
        orders.value = response.data
        // console.log(orders.value);
    } catch (error) {
        console.error('Error fetching cocktails:', error);
    }
};

const deleteOrder = async (orderId) => {
    try {
        await axios.delete(`http://127.0.0.1:8000/api/pending-orders/${orderId}`);
        // Eliminar la orden de la lista localmente
        selectedCocktails.value = selectedCocktails.value.filter(order => order.id !== orderId);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Your drink was removed from your order', life: 3000 });
    } catch (error) {
        console.error('Error deleting order:', error);
        toast.add({ severity: 'warn', summary: 'Error', detail: 'error deleting', life: 3000 });
    }
};

const axiosAddOrdesDelivered = async () => {
    console.log(selectedCocktails.value);

    const transformedData = selectedCocktails.value.reduce((acc, item) => {
        let order = acc.find(o => o.id === item.user_id);
        if (!order) {
            order = { id: item.user_id, items: [] };
            acc.push(order);
        }
        order.items.push({ nameDrink: item.nameDrink, cantidad: item.cantidad });
        return acc;
    }, []);

    console.log(transformedData);

    axios.post('http://127.0.0.1:8000/api/orders-delivered', transformedData)
        .then(response => {
            console.log('Pedidos entregados registrados:', response.data);
            axiosCocktails()
            axiosOrderDelivered()
            toast.add({ severity: 'success', summary: 'Success', detail: 'Your order was saved successfully', life: 3000 });

        })
        .catch(error => {
            console.error('Error al registrar los pedidos entregados:', error);
            toast.add({ severity: 'warn', summary: 'Error', detail: 'Error saving your order', life: 3000 });

            // Manejar el error, mostrar un mensaje al usuario, etc.
        });
}

onMounted(() => {
    axiosCocktails();
    axiosOrderDelivered()
});

</script>

<template>
    <div>
        <label class="font-medium">Pending Orders</label>
        <br><br>
        <DataTable :value="selectedCocktails" showGridlines tableStyle="min-width: 15rem">
            <Column field="nameDrink" header="Cocktail"></Column>
            <Column field="cantidad" header="Quantity"></Column>
            <template #empty>
                <div class="p-4 text-center text-gray-500">
                    No items found.
                </div>
            </template>
            <Column header="Actions">
                <template #body="slotProps">
                    <Button type="button" icon="pi pi-trash" severity="danger"
                        @click="deleteOrder(slotProps.data.id)" />
                </template>
            </Column>
        </DataTable>

        <div class="flex justify-end gap-2 mt-4">
            <Button type="button" label="Add Order" icon="pi pi-plus" severity="secondary"
                @click="axiosAddOrdesDelivered" />
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
                        <div class="flex justify-between">
                            <label>{{ order.nameDrink }}</label>
                            <label>{{ order.cantidad }}</label>
                        </div>
                    </AccordionContent>
                    <br>
                </AccordionPanel>
            </Accordion>
        </div>
    </div>
    <Toast />
</template>
