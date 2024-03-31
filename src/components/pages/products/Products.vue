<script setup lang="ts">
import ProductsAdd from "./ProductsAdd.vue"
import ProductsTable from "./ProductsTable.vue"
import { useStore } from 'vuex'

interface Props {
    is_loading: boolean;
}

defineProps<Props>()
const store = useStore()
</script>

<template lang="pug">
.content
    .content-title.black-text
        h2 Мои товары
        img(src="/src/assets/help.svg" alt="описание таблицы мои товары")
        span.black-text {{ store.getters.products.length }} из {{ store.getters.count }}
    p.black-text Добавьте товары вашего магазина из одной товарной и ценовой категории (разница цены не больше 15%)
    p.black-text Для добавления нескольких товаров введите несколько артикулов через запятую или используя клавишу Enter
    ProductsAdd
    ProductsTable.content-table(:is_loading="is_loading")
</template>

<style lang="scss" scoped>
.content {
    .black-text {
        color: black;
    }
    display: grid;
    grid-template-rows: repeat(5, min-content);
    justify-items: start;
    max-width: 1520px;
    width: 90%;
    height: 642px;
    border-radius: 15px;
    box-shadow: 0px 6px 8px 0px #00000029;
    background: #FFFFFF;
    padding: 20px 40px;
    &-title {
        h2 {
            font-size: 28px;
        }
        img {
            margin-top: 5px;
            cursor: pointer;
        }
        display: grid;
        grid-template-columns: repeat(3, max-content);
        align-items: center;
        gap: 10px;
        span {
            margin: 9px 0  0 10px;
            font-size: 15px;
            color: #999999;
        }
    }
    p {
        font-size: 15px;
    }
    &-table {
        margin-top: 10px;
    }
}
</style>