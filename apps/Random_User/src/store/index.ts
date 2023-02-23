import { defineStore } from 'pinia';
import type { UserDataArr, UserData } from '@/types/type';

type StoreData = {
    displayMode: string;
    userCount: number;
    favoriteUserArr: UserDataArr;
};

export const linStore = defineStore('linStore', {
    state: (): StoreData => ({
        displayMode: '',
        userCount: 0,
        favoriteUserArr: [],
    }),
    getters: {
        getIsDisplayMode(state) {
            return state.displayMode === 'Card' ? true : false;
        },
    },
    actions: {
        updateUserCount(count: number) {
            this.userCount = count;
        },

        updateDisplayMode(mode: string) {
            this.displayMode = mode;
        },

        updateFavoriteUserArr(user: UserData) {
            this.favoriteUserArr.push(user);
        },
    },
});
