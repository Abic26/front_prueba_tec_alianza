// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './page/Home.vue'
import ListCocktail from './components/ListCocktail.vue'
import Login from './components/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/drinks',
        name: 'Drinks',
        component: ListCocktail
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
