<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

onMounted(() => {
    if (!store.getters.access || !store.getters.refresh) {
        router.push('/auth')
    }
})
</script>

<template lang="pug">
main
    span test
</template>

<style lang="scss" scoped>
span {
    background: red;
}
</style>