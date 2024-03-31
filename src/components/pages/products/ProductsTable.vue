<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex'
import type { IProduct } from '../../../interfaces/interfaces'

interface Props {
    is_loading: boolean;
}

defineProps<Props>()

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
    .products-table-loading(v-if="is_loading")
        img(src="/src/assets/loading.svg")
    .products-table-list(v-else v-for="product in store.getters.products")
        button.checkbox-btn(
            :key="product.id"
            @click="() => add_or_remove_from_ckecked(product.id)"
        )
            img(v-if="ckecked_products_ids.has(product.id)" src="/src/assets/checked.svg")
        .row.row-foto
            img(:key="product.id" :src="product.images?.[0]" :alt="`Изображение ${product.title}`")
        .row.row-art(:key="product.id")
            img(v-if="product.brand_id" src="/src/assets/link.svg")
            span {{ product.brand_id }}
        span.row.row-brand(:key="product.id") {{ product.brand_name }}
        span.row.row-name(:key="product.id") {{ product.title }}
        span.row.row-lost(:key="product.id") {{ product.quantity }}
        span.row.row-cur-price(:key="product.id") {{ product.price }} ₽
        .row.row-min-price(:key="product.id")
            input(:placeholder="`${product.min_price ?? 0} ₽`" type="number")
        .row.row-max-price(:key="product.id")
            input(:placeholder="`${product.max_price ?? 0} ₽`" type="number")
        img.row.row-del(:key="product.id" src="/src/assets/delete.svg")
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
    &-loading {
        display: grid;
        margin-top: 40px;
        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        img {
            justify-self: center;
            animation: rotate 4s linear infinite;
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
            &-art {
                display: flex;
                gap: 2px;
                img {
                    cursor: pointer;
                }
            }
            &-min-price, &-max-price {
                input {
                    width: 118px;
                    height: 30px;
                    background: #F2F1F3;
                    border: 0;
                    box-shadow: 0px 1px 2px 0px #00000040 inset;
                    border-radius: 6px;
                    padding: 0 8px;
                    transition: box-shadow 0.5s ease-in-out;
                    ::placeholder {
                        color: #000000;
                    }
                    &:active, &:focus {
                        outline: none;
                        box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2509803922) inset;
                    }
                }
            }
            &-del {
                cursor: pointer;
                transition: transform 0.2s ease;
                &:hover {
                    transform: scale(1.1);
                }
                &:active {
                    transform: scale(0.9);
                }
            }
        }
    }
}
</style>