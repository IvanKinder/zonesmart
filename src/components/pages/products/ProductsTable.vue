<script setup lang="ts"></script>

<template lang="pug">
.content
    .content-title.black-text
        h2 Мои товары
        img(src="/src/assets/help.svg" alt="описание таблицы мои товары")
        span.black-text 4 из 10
    span.black-text Добавьте товары вашего магазина из одной товарной и ценовой категории (разница цены не больше 15%)
    span.black-text Для добавления нескольких товаров введите несколько артикулов через запятую или используя клавишу Enter
    .content-search
        span test
    .content-table
        span test
</template>

<style lang="scss" scoped>
.content {
    .black-text {
        color: black;
    }
    display: grid;
    grid-template-rows: repeat(5, min-content);
    justify-items: start;
    width: 1520px;
    height: 612px;
    border-radius: 15px;
    box-shadow: 0px 6px 8px 0px #00000029;
    background: #FFFFFF;
    padding: 35px 40px;
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
        line-height: 0px;
        span {
            margin: 9px 0  0 10px;
            font-size: 15px;
            color: #999999;
        }
    }
}
</style>