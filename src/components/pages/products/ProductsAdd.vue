<script setup lang="ts"></script>

<template lang="pug">
.product-add
    .product-add-field
        label.product-add-field-label(for="product-add-input") Добавление товаров
        input(
            id="product-add-input"
            type="text"
            placeholder="Введите артикул продавца, артикул WB или ссылку на товар"
        )
        span.product-add-field-underline Например ваши товары: 
            span.dotted 119203059,
            span &nbsp;
            span.dotted 124366343,
            span &nbsp;
            span.dotted 59801844
    button.product-add-btn
        span Добавить
</template>

<style lang="scss">
.product-add {
    display: flex;
    gap: 18px;
    &-field {
        display: grid;
        justify-items: start;
        gap: 4px;
        &-label, &-underline {
            font-size: 12px;
            color: #999999;
            .dotted {
                border-bottom: 1px dashed;
            }
        }
        input {
            width: 706px;
            height: 50px;
            box-shadow: 0px 1px 2px 0px #00000040 inset;
            border: 0dvi;
            border-radius: 6px;
            background: #F2F1F3;
            padding: 0 20px;
            transition: box-shadow 0.5s ease-in-out;
            &:active, &:focus {
                outline: none;
                box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2509803922) inset;
            }
        }
        ::placeholder {
            font-size: 15px;
            color: #999999;
        }
    }
    &-btn {
        width: 131px;
        height: 50px;
        align-self: center;
        background: #F2F1F3;
        border-radius: 6px;
        transition: transform 0.2s ease;
        color: #999999;
        font-size: 15px;
        &:active {
            transform: scale(0.95);
        }
        &:hover, &:active, &:focus {
            border: none;
            outline: none;
        }
    }
}
</style>