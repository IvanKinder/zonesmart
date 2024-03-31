<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template lang="pug">
main
    h1 Страница не найдена
    span(@click="() => router.push('/')") Перейти на главную?
</template>

<style lang="scss" scoped>
h1, span {
    color: black;
}
span {
    cursor: pointer;
}
</style>