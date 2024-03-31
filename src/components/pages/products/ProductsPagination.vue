<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex'

interface Props {
    get_products: Function;
}

const props = defineProps<Props>()

const store = useStore()
const pages_count = computed(() => {
    if (store.getters.count % 10 === 0) {
        return store.getters.count / 10
    }
    return Math.floor(store.getters.count / 10 + 1)
})
const current_page = ref(1)

const to_page = (page: number) => {
    current_page.value = page
}
const to_prev_page = () => {
    if (current_page.value !== 1) {
        current_page.value = current_page.value - 1
    }
}
const to_next_page = () => {
    if (current_page.value !== pages_count.value) {
        current_page.value = current_page.value + 1
    }
}

watch(current_page, () => {
    props.get_products(10, (current_page.value - 1) * 10)
})
</script>

<template lang="pug">
.pagination
    .arrow-left(@click="to_prev_page" :class="current_page === 1 ? 'disabled' : 'enabled'")
        img(v-if="current_page !== 1" src="/src/assets/arrow.svg")
    .to-page.enabled(
        v-for="(i) in pages_count"
        :key="i"
        :class="current_page === i ? 'active-page' : ''"
        @click="to_page(i)"
    )
        span {{ i }}
    .arrow-right(@click="to_next_page" :class="current_page === pages_count ? 'disabled' : 'enabled'")
        img(v-if="current_page !== pages_count" src="/src/assets/arrow.svg")
</template>

<style lang="scss" scoped>
.pagination {
    display: flex;
    justify-self: center;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
    color: #000000;
    .to-page, .arrow-left, .arrow-right {
        display: grid;
        justify-items: center;
        align-items: center;
        width: 40px;
        height: 40px;
        text-align: center;
        border-radius: 6px;
    }
    .enabled {
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
            cursor: not-allowed;
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