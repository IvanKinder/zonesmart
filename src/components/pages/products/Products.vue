<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { urls } from '../../../router/urls';

const router = useRouter()
const store = useStore()

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
    if (!store.getters.access || !store.getters.refresh) {
        router.push('/auth')
    }
    get_products(10, 0)
})
</script>

<template lang="pug">
.products-container
    header
        span test
    main
        span test
</template>

<style lang="scss" scoped>
span {
    background: red;
}
</style>