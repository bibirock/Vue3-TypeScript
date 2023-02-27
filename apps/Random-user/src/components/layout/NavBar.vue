<template lang="pug">
div.h-16.flex.justify-between
    div(:class="'flex basis-1/2'")
        div(:class="'set-item-around w-1/4 ml-5 flex-shrink-0 min-w-[100px]'")
            router-link.text-black(:to="{ name: 'all-user-page' }" active-class="text-cyan-500") {{ "ALL" }}
            router-link.text-black(:to="{ name: 'favorite-page' }" active-class="text-cyan-500") {{ "Favorite" }}
    div(:class="'set-item-end '")
        div.set-item-center.mr-5
            a-space(:class="'m-3'")
                a-select(ref="select" v-model:value="$storeSelectedCount" style="width: 120px")
                    a-select-option(v-for="(option, i) in options" :key="i" :value="option.value") {{ option.text }}
            div(:class="'set-item-around w-20'")
                Icon.inline-block.cursor-pointer(:class="{ 'text-cyan-500': $storePageMode === 'Card' }" @click="$store.updateDisplayMode('Card')" icon="material-symbols:grid-view-rounded" width="24" height="24" )
                Icon.inline-block.cursor-pointer(:class="{ 'text-cyan-500': $storePageMode === 'List' }" @click="$store.updateDisplayMode('List')" icon="material-symbols:format-list-bulleted-sharp" width="24" height="24" )
</template>
<script setup lang="ts">
import { $storeSelectedCount, $storePageMode } from '@/lib/userWallPageUtils';
import { reactive } from 'vue';
import { userWallSetting } from '@/store';
const $store = userWallSetting();

const options = reactive([
    { text: 10, value: 10 },
    { text: 30, value: 30 },
    { text: 50, value: 50 }
]);
</script>
<style scoped></style>
