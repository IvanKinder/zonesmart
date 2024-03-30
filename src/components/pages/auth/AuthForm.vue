<script setup lang="ts">
import { computed, ref } from 'vue'

const email = ref("")
const password = ref("")
const login_enabled = computed(() => email.value && password.value);
const show_pass = ref(false)

</script>

<template lang="pug">
form.auth-form(class="review-form" @submit.prevent="onSubmit")
    h1 Вход
    .no-acc
        span.no-acc-txt Нет аккаунта?
        a.no-acc-to-registry(href="#") Зарегистрироваться
    .field
        label.field-label(for="email-input") Email
        input(
            id="email-input"
            type="text"
            placeholder="yourmail@mail.ru"
            v-model="email"
        )
    .field
        label.field-label(for="password-input") Пароль
        .field-password-input-container
            input(
                id="password-input"
                :type="!show_pass ? 'password' : 'text'"
                placeholder="Ваш пароль"
                v-model="password"
            )
            img(
                :src="!show_pass ? '/src/assets/show_pass.svg' : '/src/assets/show_pass_active.svg'"
                alt="Показать пароль"
                @click="() => show_pass = !show_pass"
            )
        .forget-password 
            a(href="#") Забыли пароль?
    button.login-btn(:class="!login_enabled ? 'login-btn-disabled' : 'login-btn-enabled'") Войти
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
            transition: box-shadow 0.5s ease-in-out;
            &::placeholder {
                color: #999999;
            }
            &:active, &:focus {
                outline: none;
                box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2509803922) inset;
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
        transition: box-shadow 0.3s ease-in-out, color 0.3s ease-in-out;
        &-enabled {
            box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5) inset;
            transition: transform 0.2s ease, box-shadow 0.3s ease-in-out, color 0.3s ease-in-out;
            color: #b9b9bd;
            &:active {
                transform: scale(0.95);
            }
            &:hover, &:focus {
                border: 0;
                outline: none;
            }
        }
        &-disabled {
            cursor: not-allowed;
            &:hover, &:active, &:focus {
                border: 0;
                outline: none;
            }
        }
    }
}
</style>
