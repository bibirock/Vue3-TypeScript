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
import { $storeSelectedCount, $storePageMode } from '@/lib/userWallPageUtils';
import { reactive, onMounted, watch, nextTick } from 'vue';
import { Icon } from '@iconify/vue';
import type { SettingData } from '@/types/type';
import { userWallSetting } from '@/store';
const emit = defineEmits(['setPageSettingData']);

const $store = userWallSetting();

onMounted(() => {
    initSetting();
    emitPageSettingData();
});

const options = reactive([
    { text: 10, value: 10 },
    { text: 30, value: 30 },
    { text: 50, value: 50 }
]);

function initSetting() {
    const previousSetting = sessionStorage.getItem('pageSetting' || 'null');
    if (previousSetting !== null) {
        getPreviousSetting(previousSetting);
    } else {
        setDefaultSetting();
    }
}

function getPreviousSetting(previousSetting: string) {
    const setting = JSON.parse(previousSetting) as SettingData;
    $store.updateUserCount(setting.userCount);
    $store.updateDisplayMode(setting.dispalyMode ? 'Card' : 'List');
}

function setDefaultSetting() {
    $store.updateUserCount(30);
    $store.updateDisplayMode('Card');
}
const pageSettingData: SettingData = reactive({
    userCount: selectedCount.value,
    dispalyMode: pageMode
});

// 因為需等待 DOM 更新後才能拿到新的值，因此需使用 nextTick()
watch(
    () => [$storeSelectedCount, $storePageMode],
    async () => {
        await nextTick();
        const pageSettingData = {
            userCount: $storeSelectedCount.value,
            dispalyMode: $storePageMode.value
        };
        sessionStorage.setItem('pageSetting', JSON.stringify(pageSettingData));
    },
    { deep: true }
);
</script>
<style scoped></style>
