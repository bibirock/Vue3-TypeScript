<template lang="pug">
div.h-16.flex.justify-between
    div(:class="'flex basis-1/2'")
        div(:class="'set-item-around w-1/4 ml-5'")
            router-link.text-black(:to="{ name: 'all-user-page' }" active-class="text-cyan-500") {{ "ALL" }}
            router-link.text-black(:to="{ name: 'favorite-page' }" active-class="text-cyan-500") {{ "Favorite" }}
    div(:class="'set-item-end '")
        div.set-item-center.mr-5
            a-space(:class="'m-3'")
                a-select(ref="select" v-model:value="$storeSelectedCount" style="width: 120px")
                    a-select-option(v-for="(option, i) in options" :key="i" :value="option.value") {{ option.text }}
            div(:class="'set-item-around w-20'")
                Icon.inline-block.cursor-pointer(:class="{ 'text-cyan-500': $storePageMode }" @click="$storePageMode = true" icon="material-symbols:grid-view-rounded" width="24" height="24" )
                Icon.inline-block.cursor-pointer(:class="{ 'text-cyan-500': !$storePageMode }" @click="$storePageMode = false" icon="material-symbols:format-list-bulleted-sharp" width="24" height="24" )
</template>
<script setup lang="ts">
import { $storeSelectedCount, $storePageMode } from '@/lib/userWallPageUtils';
import { reactive, onMounted, watch, nextTick } from 'vue';
import type { SettingData } from '@/types/type';
import { userWallSetting } from '@/store';
import { Icon } from '@iconify/vue';
const $store = userWallSetting();

onMounted(() => {
    initSetting();
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
