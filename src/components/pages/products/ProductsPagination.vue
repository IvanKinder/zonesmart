<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex'

const store = useStore()
const pages_count = computed(() => {
    if (store.getters.count % 10 === 0) {
        return store.getters.count / 10
    }
    return Math.floor(store.getters.count / 10 + 1)
})
const current_page = ref(1)
</script>

<template lang="pug">
.pagination
    .arrow-left
        img(v-if="current_page !== 1" src="/src/assets/arrow.svg")
    .to-page(v-for="(i) in pages_count" :key="i" :class="current_page === i ? 'active-page' : ''")
        span {{ i }}
    .arrow-right
        img(v-if="current_page !== pages_count" src="/src/assets/arrow.svg")
</template>

<style lang="scss" scoped>
.pagination {
    display: flex;
    justify-self: center;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
    .to-page, .arrow-left, .arrow-right {
        display: grid;
        justify-items: center;
        align-items: center;
        width: 40px;
        height: 40px;
        text-align: center;
        border-radius: 6px;
        cursor: pointer;
        &:hover {
            background: #F2F1F3;
        }
    }
    .active-page {
        border-radius: 6px;
        cursor: not-allowed;
        background: #cbc9c9;
        &:hover {
            background: #cbc9c9;
        }
    }
    .arrow-left {
        transform: rotate(90deg);
    }
    .arrow-right {
        transform: rotate(-90deg);
    }
}
</style>