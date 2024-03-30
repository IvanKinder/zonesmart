<script setup lang="ts">
</script>

<template lang="pug">
form.auth-form(class="review-form" @submit.prevent="onSubmit")
    h1 Вход
    .no-acc
        span.no-acc-txt Нет аккаунта?
        a.no-acc-to-registry(href="#") Зарегистрироваться
    .field
        label.field-label(for="email-input") Email
        input(id="email-input" type="text" placeholder="yourmail@mail.ru")
    .field
        label.field-label(for="email-input") Пароль
        .field-password-input-container
            input(id="email-input" type="password" placeholder="Ваш пароль")
            img(src="/src/assets/show_pass.svg" alt="Показать пароль")
        .forget-password 
            a(href="#") Забыли пароль?
    button.login-btn Войти
</template>

<style lang="scss" scoped>
.auth-form {
    display: grid;
    gap: 23px;
    justify-items: start;
    background: #FFFFFF;
    border-radius: 15px;
    box-shadow: 0px 6px 8px 0px #00000029;
    height: 440px;
    width: 350px;
    padding: 0 40px 60px;
    h1 {
        margin-bottom: 0;
        align-self: start;
        color: black;
    }
    .no-acc {
        display: grid;
        grid-template-columns: repeat(2, max-content);
        gap: 5px;
        &-txt {
            color: black;
            justify-self: end;
        }
        &-to-registry {
            justify-self: start;
            color: #2ED2BA;
        }
    }
    .field {
        display: grid;
        gap: 7px;
        width: 100%;
        input {
            width: 310px;
            height: 50px;
            background: #F2F1F3;
            border: 0;
            border-radius: 6px;
            box-shadow: 0px 1px 2px 0px #00000040 inset;
            padding: 0 20px;
            color: black;
            &::placeholder {
                color: #999999;
            }
        }
        &-label {
            justify-self: start;
            color: #999999;
            font-size: 12px;
        }
        &-password-input-container {
            position: relative;
            img {
                cursor: pointer;
                position: absolute;
                right: 20px;
                top: 17px;
            }
        }
        .forget-password {
            justify-self: start;
            a {
                color: #2ED2BA;
            }
        }
    }
    .login-btn {
        border-radius: 6px;
        background: #F2F1F3;
        color: #CECECF;
        width: 105px;
        height: 50px;
    }
}
</style>
