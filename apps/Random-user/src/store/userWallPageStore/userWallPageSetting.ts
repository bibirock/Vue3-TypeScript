import { defineStore } from 'pinia';

type StoreData = {
    displayMode: string;
    pageSize: number;
};

export const userWallSetting = defineStore('linStore', {
    state: (): StoreData => ({
        displayMode: 'Card',
        pageSize: 30
    }),
    getters: {
        getIsDisplayMode(state) {
            return state.displayMode;
        },
        getPageSize(state) {
            return state.pageSize;
        }
    },
    actions: {
        updatePageSize(count: number) {
            this.pageSize = count;
        },

        updateDisplayMode(mode: string) {
            this.displayMode = mode;
        }
    }
});
