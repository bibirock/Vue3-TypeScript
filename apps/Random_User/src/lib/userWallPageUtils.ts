import { userWallSetting } from '@/store';
import { computed } from 'vue';
const $store = userWallSetting();

export const $storeSelectedCount = computed({
    get() {
        return $store.getUserCount;
    },
    set(newValue) {
        $store.updateUserCount(newValue);
    }
});

export const $storePageMode = computed({
    get() {
        return $store.getIsDisplayMode;
    },
    set(newValue) {
        $store.updateDisplayMode(newValue ? 'Card' : 'List');
    }
});