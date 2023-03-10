<template lang="pug">
nav
    ul(:class="'set-item-center'")
        li
            a.control-btn(href="#" :class="''")
                Icon(icon="material-symbols:chevron-left" width="22" height="22")
        li(v-for="number in pageCount")
            a.list-item(href="#") {{ number }}
        li
            a.control-btn(href="#")
                Icon(icon="material-symbols:chevron-right" width="22" height="22" )
</template>

<script setup lang="ts">
import { ref } from 'vue';

const pageCount = ref([1, 2, 3]);
</script>
<style scoped lang="scss">
a.list-item {
    @apply px-3 py-1 mx-1 text-gray-500 bg-white border border-gray-300 hover:text-cyan-500 hover:border-cyan-500;
}
a.control-btn {
    @apply block px-2 py-1 text-gray-500 bg-white border border-gray-300 hover:text-cyan-500 hover:border-cyan-500;
}
</style>
