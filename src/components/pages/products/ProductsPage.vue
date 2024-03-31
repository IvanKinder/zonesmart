<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { urls } from '../../../router/urls'
import Products from './Products.vue'

const router = useRouter()
const store = useStore()
const email = ref(store.getters.email)
const is_loading = ref(true)

const reauth = () => {
    alert("Ошибка, попробуйте войти заново")
    store.dispatch("updateAccess", "")
    router.push("/auth")
}

const get_products = async (limit: Number, offset: Number) => {
    is_loading.value = true
    try {
        const res = await axios.get(urls.get_products, {
            params: {
                limit: limit,
                offset: offset
                },
            headers: {
                'Authorization':  `JWT ${store.getters.access}`
            }
        })
        if (res.status === 200) {
            store.dispatch("updateProducts", res.data?.results)
            store.dispatch("updateCount", res.data?.count)
            is_loading.value = false
        } else {
            reauth()
        }
    }
    catch (e: any) {
        if (e.response?.status === 401 && e.response?.data?.code === "token_not_valid") {
            refresh_session()
        } else {
            reauth()
        }
    }
}

const refresh_session = async () => {
    try {
        const res = await axios.post(urls.refresh_sesson, {
            refresh: store.getters.refresh
        })
        if (res.status === 200) {
            store.dispatch("updateAccess", res.data?.access)
        } else {
            reauth()
        }
    } catch {
        reauth()
    }
}

onMounted(() => {
    if (!store.getters.access) {
        router.push('/auth')
    }
    get_products(10, 0)
})
</script>

<template lang="pug">
.products-container
    header
        menu
            img.notify(src="/src/assets/notifications.svg" alt="уведомления")
            span {{ email }}
            img.open-arrow(src="/src/assets/arrow.svg")
    Products.products(:is_loading="is_loading" :get_products="get_products")
</template>

<style lang="scss" scoped>
.products-container {
    display: grid;
    gap: 30px;
    .products {
        justify-self: center;
    }
    header {
        display: grid;
        height: 80px;
        background: #FFFFFF;
        menu {
            display: grid;
            grid-template-columns: repeat(3, min-content);
            align-items: center;
            gap: 5px;
            padding-right: 40px;
            justify-self: end;
            margin: 0;
            .notify {
                margin-right: 26px;
            }
            span {
                color: black;
            }
            .open-arrow, .notify, span {
                cursor: pointer;
            }
        }
    }
}
</style>