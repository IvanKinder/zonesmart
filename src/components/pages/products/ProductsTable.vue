<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()

</script>

<template lang="pug">
.products-table
    .products-table-columns 
        input(type="checkbox")
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
        input(type="checkbox" :key="product.id")
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
    &-columns {
        position: sticky;
        top: 0;
        display: grid;
        grid-template-columns: 20px 60px 140px 130px 1fr 115px 115px repeat(2, 160px) 80px;
        gap: 15px;
        border-bottom: 1px solid;
        border-color: #999999;
        height: 60px;
        align-items: center;
        background: #FFFFFF;
        input {
            justify-self: start;
        }
        .column-name {
            font-size: 15px;
            color: #999999;
            &-name {
                justify-self: start;
            }
        }
    }
    &-list {
        display: grid;
        grid-template-columns: 20px 60px 140px 130px 1fr 115px 115px repeat(2, 160px) 80px;
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