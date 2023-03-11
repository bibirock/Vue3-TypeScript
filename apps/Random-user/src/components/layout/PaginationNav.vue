<template lang="pug">
nav
    ul(:class="'set-item-center'")
        li
            a.control-btn(href="#" @click="toPrevPage()" :class="{ 'cursor-not-allowed': current === 1 }")
                Icon(icon="material-symbols:chevron-left" width="22" height="22")
        li(v-for="number in totalPages")
            a.list-item(@click="getSelectPageNumber(number)" :class="getPageItemClass(number)" href="#"  v-show="shouldDisplay(number)") {{ number }}
        li
            a.control-btn(href="#" @click="toNextPage()" :class="{ 'cursor-not-allowed': current === totalPages }")
                Icon(icon="material-symbols:chevron-right" width="22" height="22")
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';

const props = defineProps({
    total: { type: Number, default: 0 },
    current: { type: Number, default: 1 },
    pageSize: { type: Number, default: 30 }
});

const totalPages = computed(() => {
    return Math.ceil(props.total / props.pageSize);
});

function toPrevPage() {
    handlePageChange(props.current - 1);
}

function toNextPage() {
    handlePageChange(props.current + 1);
}

function getSelectPageNumber(number: number) {
    handlePageChange(number);
}

const emit = defineEmits(['page-change']);
function handlePageChange(newPage: number) {
    if (newPage === props.current || newPage < 1 || newPage > totalPages.value) {
        return;
    }
    emit('page-change', newPage);
}

function getPageItemClass(number: number) {
    return {
        'text-cyan-500 border-cyan-500': props.current === number,
        'border-gray-300 text-gray-500': props.current !== number
    };
}

function shouldDisplay(number: number) {
    const current = props.current;
    const total = totalPages.value;

    if (current > 1 && current !== total) {
        return [current - 1, current, current + 1].includes(number);
    } else if (props.current === 1) {
        return [current, current + 1, current + 2].includes(number);
    } else {
        return [total, total - 1, total - 2].includes(number);
    }
}

watch(
    () => props.pageSize,
    () => {
        handlePageChange(1);
    }
);
</script>

<style scoped lang="scss">
a.list-item {
    @apply px-3 py-1 mx-1  bg-white border  hover:text-cyan-500 hover:border-cyan-500;
}
a.control-btn {
    @apply block px-2 py-1 text-gray-500 bg-white border border-gray-300;
}
</style>
