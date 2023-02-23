<template lang="pug">
div.h-16.flex.justify-between
    div(:class="'flex basis-1/2'")
        div(:class="'w-1/4 flex justify-around items-center ml-5'")
            router-link.text-black(:to="{ name: 'all-user-page' }") {{ "ALL" }}
            router-link.text-black(:to="{ name: 'favorite-page' }") {{ "Favorite" }}
    div(:class="'flex justify-end items-center basis-1/2'")
        div.mr-5
            a-space(:class="'m-3'")
                a-select(ref="select" v-model:value="selected" style="width: 120px")
                    a-select-option(v-for="(option, i) in options" :key="i" :value="option.value") {{ option.text }}
            a-switch(v-model:checked="pageMode" checked-children="List" un-checked-children="Card")
</template>
<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue';
import type { SettingData } from '@/types/type';
const emit = defineEmits(['setPageSettingData']);

const options = reactive([
    { text: 10, value: 10 },
    { text: 30, value: 30 },
    { text: 50, value: 50 },
]);

function emitPageSettingData() {
    emit('setPageSettingData', pageSettingData);
}

const bookMark = ref('ALL');
const selected = ref(30);
const pageMode = ref(true);
const pageSettingData: SettingData = reactive({
    userCount: selected,
    dispalyMode: pageMode,
});

watchEffect(() => {
    if (pageSettingData) {
        emitPageSettingData();
    }
});
</script>
<style scoped></style>
