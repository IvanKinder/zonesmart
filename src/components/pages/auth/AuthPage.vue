<script setup lang="ts">
import AuthForm from './AuthForm.vue';
</script>

<template lang="pug">
.auth-container
    header.header
        img.header-item(src="/src/assets/logo.svg") 
        .header-item
            .header-item-support
                a(href="#") Поддержка
                img(src="/src/assets/telegram.svg")
                img(src="/src/assets/whatsapp.svg")
    AuthForm
</template>

<style lang="scss" scoped>
.auth-container {
    display: grid;
    justify-items: center;
    gap: 100px;
    .header {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 218px;
        &-item {
            padding: 31px 28px;
            &-support {
                display: grid;
                grid-template-columns: repeat(3, max-content);
                gap: 8px;
                a {
                    font-size: 15px;
                    line-height: 30px;
                    color: #999999;
                }
                img {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>