import { defineStore } from 'pinia';
import type { UserDataArr, UserData } from '@/types/type';

type StoreData = {
    displayMode: string;
    userCount: number;
    favoriteUserArr: UserDataArr;
};

export const userWallSetting = defineStore('linStore', {
    state: (): StoreData => ({
        displayMode: 'Card',
        userCount: 30,
        favoriteUserArr: []
    }),
    getters: {
        getIsDisplayMode(state) {
            return state.displayMode === 'Card' ? true : false;
        },
        getUserCount(state) {
            return state.userCount
        }
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
        }
    }
});
