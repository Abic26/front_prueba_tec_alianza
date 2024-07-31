<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const isAuthenticated = ref(false); 


isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true';

const login = () => {
    if (username.value === 'admin' && password.value === 'admin') {
        console.log('Usuario autenticado correctamente');
        isAuthenticated.value = true;
        localStorage.setItem('isAuthenticated', 'true');
        router.push('/drinks').then(() => {
            location.reload(); 
        });

    } else {
        console.log('Credenciales incorrectas');
        isAuthenticated.value = false;
        localStorage.setItem('isAuthenticated', 'false');
    }
};

watchEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.value);
});
</script>



<template>
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

 
                        <TabPanel value="1">
                            <div class="flex flex-col gap-4 h-96 w-full justify-center">
                                <div>
                                    <InputText v-model="username" placeholder="Name"
                                        class="w-full p-3 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <InputText v-model="username" placeholder="Last Name"
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
                                        @click="login" />
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    </div>
</template>
