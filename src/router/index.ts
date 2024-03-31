import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from "../components/pages/auth/AuthPage.vue"
import Products from '../components/pages/auth/products/Products.vue';

const routes = [
    { path: '/auth', component: AuthPage },
    { path: '/', component: Products },
];

const router = createRouter({ history: createWebHistory(), routes, })

export default router