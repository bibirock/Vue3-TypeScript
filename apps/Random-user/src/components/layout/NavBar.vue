<template lang="pug">
div.h-16.flex.justify-between
    div(:class="'flex basis-1/2'")
        div(:class="'set-item-around w-1/4 ml-5 flex-shrink-0 min-w-[100px]'")
            router-link.text-black(:to="{ name: 'all-user-page' }" active-class="text-hight-light") {{ "ALL" }}
            router-link.text-black(:to="{ name: 'favorite-page' }" active-class="text-hight-light") {{ "Favorite" }}
    div(:class="'set-item-end '")
        div.set-item-center.mr-5
            dropdown-menu(:options="options" :defaultSelected="defaultSelected" @selected-change="changeSelectCount")
            div(:class="'set-item-around w-20'")
                Icon.inline-block.cursor-pointer(:class="{ 'text-hight-light': $storePageMode === 'Card' }" @click="$store.updateDisplayMode('Card')" icon="material-symbols:grid-view-rounded" width="24" height="24" )
                Icon.inline-block.cursor-pointer(:class="{ 'text-hight-light': $storePageMode === 'List' }" @click="$store.updateDisplayMode('List')" icon="material-symbols:format-list-bulleted-sharp" width="24" height="24" )
</template>
<script setup lang="ts">
import DropdownMenu from './element/DropdownMenu.vue';
import { $storeSelectedCount, $storePageMode } from '@/lib/userWallPageUtils';
import { reactive, watchEffect, ref } from 'vue';
import { userWallSetting } from '@/store';
const $store = userWallSetting();

interface Option {
    text: string;
    value: number;
}

const options = reactive([
    { text: '10', value: 10 },
    { text: '30', value: 30 },
    { text: '50', value: 50 }
]);

const defaultSelected = ref<Option>(setSelected() as Option);

watchEffect(() => {
    defaultSelected.value = setSelected() || options[1];
});

function setSelected() {
    return options.find((e) => e.value === $storeSelectedCount.value);
}

function changeSelectCount(value: number) {
    $storeSelectedCount.value = value;
}
</script>
<style scoped></style>
