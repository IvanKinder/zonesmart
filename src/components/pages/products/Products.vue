<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { urls } from '../../../router/urls'
import ProductsTable from './ProductsTable.vue'

const router = useRouter()
const store = useStore()
const email = ref(store.getters.email)

const get_products = async (limit: Number, offset: Number) => {
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
        } else {
            alert("Ошибка")
        }
    }
    catch {
        alert("Ошибка")
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
    ProductsTable.products-table
</template>

<style lang="scss" scoped>
.products-container {
    display: grid;
    gap: 30px;
    .products-table {
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