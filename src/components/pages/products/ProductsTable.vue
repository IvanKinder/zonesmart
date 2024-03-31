<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex'
import type { IProduct } from '../../../interfaces/interfaces'

interface Props {
    is_loading: boolean;
}

const props = defineProps<Props>()

const store = useStore()
const ckecked_products_ids = ref<Set<string>>(new Set())
const loading_images = ref<Set<string>>(new Set())

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

const showImagesLoader = () => {
    store.getters.products.forEach((product: IProduct) => {
        loading_images.value.add(product.id)
    })
}

const onImageLoad = (product_id: string) => {
    loading_images.value.delete(product_id)
}

watch(props, () => {
    showImagesLoader()
})
</script>

<template lang="pug">
.products-table
    .products-table-columns
        button.checkbox-btn(
            @click="select_all"
        )
            img(v-if="(ckecked_products_ids.size > 0) && (ckecked_products_ids.size === store.getters.products.length)" src="/src/assets/checked.svg")
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
    transition(name="fade-actions")
        .products-table-actions(v-if="ckecked_products_ids.size")
            span.products-table-actions-selected Выбрано {{ ckecked_products_ids.size }} из {{ store.getters.products.length }}
            button.products-table-actions-delete 
                img(src="/src/assets/delete_bulk.svg" alt="Удалить выделенные")
                span Удалить выделенные
            span.products-table-actions-for-all Для всех выделенных
            .products-table-actions-prices.min
                input(placeholder="₽" type="number")
            .products-table-actions-prices.max
                input(placeholder="₽" type="number")
    .products-table-loading(v-if="is_loading")
        img(src="/src/assets/loading.svg")
    .products-table-list(v-else v-for="product in store.getters.products")
        button.checkbox-btn(
            :key="product.id"
            @click="() => add_or_remove_from_ckecked(product.id)"
        )
            img(v-if="ckecked_products_ids.has(product.id)" src="/src/assets/checked.svg")
        .row.row-foto(:key="product.id")
            img.row-foto-preview(
                :src="product.images?.[0]"
                :alt="`Изображение ${product.title}`"
                @load="onImageLoad(product.id)"
            )
            img.row-foto-loader(v-if="loading_images.has(product.id)" src="/src/assets/loading.svg")
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
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.products-table {
    width: 100%;
    height: 305px;
    overflow: scroll;
    .fade-actions-enter-active,
    .fade-actions-leave-active {
        transition: transform 0.3s ease;
    }
    .fade-actions-enter-from,
    .fade-actions-leave-to {
        transform: translate(0, -60px);
    }
    &-actions {
        display: grid;
        grid-template-columns: 170px 200px 1fr 215px 255px;
        align-items: center;
        justify-items: center;
        position: sticky;
        top: 60px;
        z-index: 1;
        height: 60px;
        background: #e2e2e2;
        border-bottom: 1px solid #00000033;
        &-selected {
            color: #000000;
            font-size: 15px;
        }
        &-delete {
            display: flex;
            padding: 7px;
            gap: 5px;
            align-items: center;
            height: 30px;
            align-self: center;
            transition: transform 0.2s ease;
            span {
                font-size: 15px;
            }
            &:hover {
                transform: scale(1.02);
            }
            &:active {
                transform: scale(0.98);
            }
            &:active, &:focus, &:hover {
                outline: none;
                border: none;
            }
        }
        &-for-all {
            font-size: 15px;
            color: #000000;
            justify-self: end;
        }
        &-prices {
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
        &-prices.max {
            justify-self: start;
        }
    }
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
        z-index: 2;
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
                &-preview {
                    width: 100%;
                }
                &-loader {
                    width: 30px;
                    justify-self: center;
                    animation: rotate 4s linear infinite;
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