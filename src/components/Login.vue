<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from "primevue/usetoast";


const router = useRouter();
const username = ref('');
const password = ref('');
const name = ref('')
const lastName = ref('')
const rememberMe = ref(false);
const loading = ref(false);
const toast = useToast();
const apiUrlDDBB = import.meta.env.VITE_API_URL_DDBB;



const login = async () => {
    loading.value = true;
    try {
        const response = await axios.post(`${apiUrlDDBB}/login`, {
            email: username.value,
            password: password.value
        });

        const token = response.data.token;
        const user_id = response.data.user.id
        console.log(response.data.user.id);

        localStorage.setItem('token', token);  // Guarda el token en el localStorage
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('user_id', user_id);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Login successful', life: 3000 });

        // Espera 2 segundos antes de redirigir
        setTimeout(() => {
            router.push('/drinks').then(() => {
                location.reload();
            });
        }, 1000);
    } catch (error) {
        console.error('Error during login:', error);
        toast.add({ severity: 'warn', summary: 'Error', detail: 'Invalid login credentials', life: 3000 });
    }finally {
        loading.value = false;
    }

};

const registerUser = () => {
    axios.post(`${apiUrlDDBB}/users`, {
        email: username.value,
        password: password.value,
        name: name.value,
        last: lastName.value,
        // otros campos si es necesario
    })
        .then(response => {
            loading.value = true;

            console.log('Usuario registrado:', response.data);
            toast.add({ severity: 'success', summary: 'Success', detail: 'create user successful', life: 3000 });

        })
        .catch(error => {
            console.error('Error al registrar el usuario:', error);
            toast.add({ severity: 'warn', summary: 'Error', detail: 'error create user', life: 3000 });
            // Manejar el error, mostrar un mensaje al usuario, etc.
        }).finally(() => {

            loading.value = false;
        })

};

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');

watchEffect(() => {
    if (!isAuthenticated.value) {
        router.push('/login');
    }
});
</script>



<template>
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <ProgressSpinner class="w-12 h-12" strokeWidth="8" fill="transparent" animationDuration=".5s"
            aria-label="Custom ProgressSpinner" />
    </div>
    <div class="flex justify-center p-6 sm:p-10 md:p-16 lg:p-36">
        <div class="flex flex-col md:flex-row justify-center rounded-md bg-zinc-900 shadow-lg max-w-4xl w-full">
            <div class="hidden md:block md:w-1/2">
                <img src="https://thekitchencommunity.org/wp-content/uploads/2021/11/Mixed-Drinks.jpg"
                    alt="Cocktail Background" class="w-full h-full object-cover rounded-l-md">
            </div>
            <div class="w-full md:w-1/2 p-6 md:p-8 lg:p-10">
                <Tabs value="0">
                    <TabList>
                        <Tab value="0">Login</Tab>
                        <Tab value="1">Registrer</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel value="0">
                            <div class="flex flex-col gap-4 h-96 w-full justify-center">
                                <div>
                                    <InputText v-model="username" placeholder="Email"
                                        class="w-full p-3 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <Password v-model="password" placeholder="Password" toggleMask
                                        class="w-full p-3 border border-gray-700 rounded" />
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <Checkbox v-model="rememberMe" binary />
                                        <label for="rememberMe" class="ml-2 text-sm">remember me</label>
                                    </div>
                                </div>
                                <div>
                                    <Button label="Log In"
                                        class="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600"
                                        @click="login" />
                                </div>
                            </div>
                        </TabPanel>
                        <!-- panel de registro -->
                        <TabPanel value="1">
                            <div class="flex flex-col gap-4 h-96 w-full justify-center">
                                <div>
                                    <InputText v-model="name" placeholder="Name"
                                        class="w-full p-3 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <InputText v-model="lastName" placeholder="Last Name"
                                        class="w-full p-3 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <InputText v-model="username" placeholder="Email"
                                        class="w-full p-3 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <Password v-model="password" placeholder="password" toggleMask
                                        class="w-full p-3 border border-gray-700 rounded" />
                                </div>
                                <div>
                                    <Password v-model="password" placeholder="Confirm password" toggleMask
                                        class="w-full p-3 border border-gray-700 rounded" />
                                </div>
                                <div>
                                    <Button label="Create Profile"
                                        class="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600"
                                        @click="registerUser" />
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    </div>
    <Toast />

</template>
