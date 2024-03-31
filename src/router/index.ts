import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from "../components/pages/auth/AuthPage.vue"
import ProductsPage from '../components/pages/products/ProductsPage.vue';
import Page404 from '../components/pages/Page404.vue';

const routes = [
    { path: '/auth', component: AuthPage },
    { path: '/', component: ProductsPage },
    {
        path: '/404',
        component: Page404,
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
];

const router = createRouter({ history: createWebHistory(), routes, })

export default router