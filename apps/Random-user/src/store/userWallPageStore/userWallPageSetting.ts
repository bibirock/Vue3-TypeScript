import { defineStore } from 'pinia';

type StoreData = {
    displayMode: string;
    userCount: number;
};

export const userWallSetting = defineStore('linStore', {
    state: (): StoreData => ({
        displayMode: 'Card',
        userCount: 30
    }),
    getters: {
        getIsDisplayMode(state) {
            return state.displayMode;
        },
        getUserCount(state) {
            return state.userCount;
        }
    },
    actions: {
        updateUserCount(count: number) {
            this.userCount = count;
        },

        updateDisplayMode(mode: string) {
            this.displayMode = mode;
        }
    }
});
