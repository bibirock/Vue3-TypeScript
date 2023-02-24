<template lang="pug">
div.h-16.flex.justify-between
    div(:class="'flex basis-1/2'")
        div(:class="'set-item-around w-1/4 ml-5'")
            router-link.text-black(:to="{ name: 'all-user-page' }" active-class="text-cyan-500") {{ "ALL" }}
            router-link.text-black(:to="{ name: 'favorite-page' }" active-class="text-cyan-500") {{ "Favorite" }}
    div(:class="'set-item-end basis-1/2'")
        div.mr-5
            a-space(:class="'m-3'")
                a-select(ref="select" v-model:value="selectedCount" style="width: 120px")
                    a-select-option(v-for="(option, i) in options" :key="i" :value="option.value") {{ option.text }}
            a-switch(v-model:checked="pageMode" checked-children="Card" un-checked-children="List")
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, computed } from 'vue';
import type { SettingData } from '@/types/type';
import { userWallSetting } from '@/store';
const emit = defineEmits(['setPageSettingData']);

const $store = userWallSetting();
onMounted(() => {
    initSetting();
    emitPageSettingData();
});

const selected = ref(30);

const selectedCount = computed({
    get() {
        return $store.userCount;
    },
    set(newValue) {
        $store.updateUserCount(newValue);
    }
});

const pageMode = computed({
    get() {
        return $store.getIsDisplayMode;
    },
    set(newValue) {
        $store.updateDisplayMode(newValue ? 'Card' : 'List');
    }
});

function initSetting() {
    const previousSetting = sessionStorage.getItem('pageSetting' || 'null');
    if (previousSetting !== null) {
        const setting: SettingData = JSON.parse(sessionStorage.getItem('pageSetting' || 'null') as string);
        $store.updateUserCount(setting.userCount);
        $store.updateDisplayMode(pageMode.value ? 'Card' : 'List');
        selected.value = setting.userCount;
        pageMode.value = setting.dispalyMode;
    } else {
        $store.updateUserCount(30);
        $store.updateDisplayMode('Card');
    }
}

const options = reactive([
    { text: 10, value: 10 },
    { text: 30, value: 30 },
    { text: 50, value: 50 }
]);

function emitPageSettingData() {
    emit('setPageSettingData', pageSettingData);
}
const pageSettingData: SettingData = reactive({
    userCount: selectedCount.value,
    dispalyMode: pageMode
});

watch(
    () => pageSettingData,
    () => {
        console.log(pageSettingData);
        emitPageSettingData();
        sessionStorage.setItem('pageSetting', JSON.stringify(pageSettingData));
    },
    { deep: true }
);
</script>
<style scoped></style>
