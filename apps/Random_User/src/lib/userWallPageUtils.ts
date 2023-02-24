import type { UserData } from '@/types/type';
import { userWallSetting } from '@/store';
import { computed, ref } from 'vue';
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

type UserId = UserData['login']['uuid'];

const favorite = ref<Array<UserData>>();
export function $getFavoriteList() {
    const localFavorite = JSON.parse(window.sessionStorage.getItem('favorite') || 'null');
    if (localFavorite !== null) {
        favorite.value = localFavorite;
    } else {
        favorite.value = [];
    }
}

export function $addFavorite(userData: UserData) {
    favorite.value?.push(userData);
    window.sessionStorage.setItem('favorite', JSON.stringify(favorite.value));
}

export function $checkFavoriteUser(id: UserId) {
    return favorite.value?.some((e) => e.login.uuid === id);
}

export function $removeFavorite(id: UserId) {
    const index = favorite.value?.findIndex((e) => e.login.uuid === id);
    favorite.value?.splice(index as number, 1);
    window.sessionStorage.setItem('favorite', JSON.stringify(favorite.value));
}
