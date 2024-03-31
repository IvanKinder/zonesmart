import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from "../components/pages/auth/AuthPage.vue"
import Products from '../components/pages/products/Products.vue';
import Page404 from '../components/pages/Page404.vue';

const routes = [
    { path: '/auth', component: AuthPage },
    { path: '/', component: Products },
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