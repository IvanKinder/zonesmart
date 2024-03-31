<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex'
import type { IProduct } from '../../../interfaces/interfaces'

const store = useStore()
const ckecked_products_ids = ref<Set<string>>(new Set())

const add_or_remove_from_ckecked = (product_id: string) => {
    if (ckecked_products_ids.value.has(product_id)) {
        ckecked_products_ids.value.delete(product_id)
    } else {
        ckecked_products_ids.value.add(product_id)
    }
}

const select_all = () => {
    if (ckecked_products_ids.value.size < store.getters.products.length) {
        store.getters.products.forEach((product: IProduct) => {
            ckecked_products_ids.value.add(product.id)
        })
    } else {
        store.getters.products.forEach((product: IProduct) => {
            ckecked_products_ids.value.delete(product.id)
        })
    }
}
</script>

<template lang="pug">
.products-table
    .products-table-columns 
        button.checkbox-btn(
            @click="select_all"
        )
            img(v-if="ckecked_products_ids.size === store.getters.products.length" src="/src/assets/checked.svg")
            img(v-if="(ckecked_products_ids.size > 0) && (ckecked_products_ids.size < store.getters.products.length)" src="/src/assets/some_checked.svg")
        span.column-name.column-name-foto Фото
        span.column-name.column-name-art Артикул продавца
        span.column-name.column-name-brand Бренд
        span.column-name.column-name-name Название
        span.column-name.column-name-lost Остаток, шт.
        span.column-name.column-name-cur-price Текущая цена
        span.column-name.column-name-min-price Минимальная цена
        span.column-name.column-name-max-price Максимальная цена
        span.column-name.column-name-del Удалить
    .products-table-list(v-for="product in store.getters.products")
        button.checkbox-btn(
            :key="product.id"
            @click="() => add_or_remove_from_ckecked(product.id)"
        )
            img(v-if="ckecked_products_ids.has(product.id)" src="/src/assets/checked.svg")
        .row.row-foto
            img(:key="product.id" :src="product.images?.[0]" :alt="`Изображение ${product.title}`")
        span.row.row-art(:key="product.id") {{ product.brand_id }}
        span.row.row-brand(:key="product.id") {{ product.brand_name }}
        span.row.row-name(:key="product.id") {{ product.title }}
        span.row.row-lost(:key="product.id") {{ product.quantity }}
        span.row.row-cur-price(:key="product.id") {{ product.price }}
        span.row.row-min-price(:key="product.id") {{ product.min_price }}
        span.row.row-max-price(:key="product.id") {{ product.max_price }}
        span.row.row-del(:key="product.id") Удалить
</template>

<style lang="scss" scoped>
.products-table {
    width: 100%;
    height: 305px;
    overflow: scroll;
    .checkbox-btn {
        position: relative;
        width: 19px;
        height: 19px;
        padding: 0;
        border: 1px solid #999999;
        border-radius: 6px;
        justify-self: end;
        &:active, &:focus {
            outline: none;
        }
        img {
            top: -4px;
            position: absolute;
            left: -4px;
        }
    }
    &-columns {
        position: sticky;
        z-index: 1;
        top: 0;
        display: grid;
        grid-template-columns: 25px 60px 140px 130px 1fr 115px 115px repeat(2, 160px) 80px;
        gap: 15px;
        border-bottom: 1px solid;
        border-color: #999999;
        height: 60px;
        align-items: center;
        background: #FFFFFF;
        .column-name {
            font-size: 15px;
            color: #999999;
        }
    }
    &-list {
        display: grid;
        grid-template-columns: 25px 60px 140px 130px 1fr 115px 115px repeat(2, 160px) 80px;
        gap: 15px;
        border-bottom: 1px solid;
        border-color: #999999;
        align-items: center;
        justify-items: start;
        .row {
            font-size: 15px;
            &-foto {
                display: grid;
                align-items: center;
                width: 50px;
                height: 50px;
                overflow: hidden;
                padding: 5px 0;
                img {
                    width: 100%;
                }
            }
        }
    }
}
</style>