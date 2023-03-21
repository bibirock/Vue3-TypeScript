<template lang="pug">
div(class="relative select-none")
    div(class="sticky top-0 bg-white z-10")
        nav-bar
    div(class="h-[80vh] overflow-y-auto")
        loading-view(v-if="isLoading")
        on-error(v-else-if="userList.length === 0 || $netWorkError" :error='$errorStatus')
        keep-alive(v-else)
            component(:is="current.views.component" :key="current.views.name" :userList="userList" @sendUseData="getSelectUserAndOpenModal")
    div(class="set-item-center mt-5 pb-5")
        pagination-nav(v-if="userList.length !== 0" :current="currentPage" :pageSize="$storePageSize" :total="dataCount" @pageChange="setCurrentPageNumber")
    user-detail-modal(v-if="isShowModal" @closeModal="isShowModal = false" :userData="selectUser")
</template>

<script setup lang="ts">
import type { RequireUserDataParams, UserArray, DisplayMode, UserData, SettingData } from '@/types/type';
import { $netWorkError, $errorStatus, $resetErrorState, $onNetworkError } from '@/lib/errorHandlerUtils';
import { $storePageSize, $storeDisplayMode, $getFavoriteList } from '@/lib/userWallPageUtils';
import { ref, computed, reactive, markRaw, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { LocationQuery } from 'vue-router';
import { $fetchUserList } from '@/apis/userAPI';
import { userWallSetting } from '@/store';
import UserList from '@/components/page/userWallPage/element/UserList.vue';
import UserCard from '@/components/page/userWallPage/element/UserCard.vue';
import UserDetailModal from '@/components/modal/UserDetailModal.vue';
import PaginationNav from '@/components/layout/PaginationNav.vue';
import LoadingView from '@/components/layout/LoadingView.vue';
import OnError from '@/components/layout/OnError.vue';
import NavBar from '@/components/layout/NavBar.vue';
const $store = userWallSetting();

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);

const selectUser = ref();
const isShowModal = ref(false);
function getSelectUserAndOpenModal(userList: UserData) {
    selectUser.value = userList;
    isShowModal.value = true;
}

onMounted(() => {
    setLoadState(true);
    initSetting();
    setPageData();
    $getFavoriteList();
});

function initSetting() {
    const querySetting = route.query as RouteQuery;
    const sessionSetting = sessionStorage.getItem('pageSetting' || 'null');
    if (JSON.stringify(querySetting) !== '{}') {
        getPreviousSetting(querySetting);
        return;
    } else if (sessionSetting !== null) {
        getPreviousSetting(JSON.parse(sessionSetting));
        return;
    } else {
        setDefaultSetting();
    }
}

interface RouteQuery extends LocationQuery {
    pageSize: string;
    displayMode: string;
    page: string;
}

const currentPage = ref(1);
function getPreviousSetting(previousSetting: RouteQuery | SettingData) {
    currentPage.value = parseInt(previousSetting.page as string) || 1;
    $store.updatePageSize(parseInt(previousSetting.pageSize as string));
    $store.updateDisplayMode(previousSetting.displayMode === 'Card' ? 'Card' : 'List');
}

function setDefaultSetting() {
    $store.updatePageSize(30);
    $store.updateDisplayMode('Card');
}

const userList = ref<UserArray>([]);

async function setPageData() {
    if (route.name === 'favorite-page') {
        userList.value = favoriteCurrentPageData();
        if (userList.value.length === 0) resetCurrentPage();
        setLoadState(false);
        return;
    } else {
        userList.value = await getUserData(getCurrentPageUserCount(), checkMaxPageCount(currentPage.value));
        setLoadState(false);
    }
}

function resetCurrentPage() {
    currentPage.value = 1;
}

function setLoadState(isShow: boolean) {
    isLoading.value = isShow;
}

const maxPages = ref();
function getCurrentPageUserCount() {
    const totalResults = 3010;
    const resultsPerPage = $storePageSize.value;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    maxPages.value = totalPages;
    const lastPageResults = totalResults - (totalPages - 1) * resultsPerPage;
    const lastPage = currentPage.value === totalPages ? lastPageResults : resultsPerPage;
    return lastPage;
}

function checkMaxPageCount(page: number) {
    if (page > maxPages.value) {
        resetCurrentPage();
        return currentPage.value;
    } else {
        return page;
    }
}

async function getUserData(pageSize: number, pages: number) {
    const require: RequireUserDataParams = {
        results: pageSize,
        page: pages
    };

    let res;
    try {
        res = await $fetchUserList(require);
        $resetErrorState();
    } catch {
        $onNetworkError();
    }
    return res?.results;
}

const displayOptions: Array<DisplayMode> = reactive([
    {
        name: 'Card',
        component: markRaw(UserCard)
    },
    {
        name: 'List',
        component: markRaw(UserList)
    }
]);

function switchView(mode: string) {
    const i = displayOptions.findIndex((e) => e.name === mode);
    current.views = displayOptions[i];
}

const current = reactive({
    views: displayOptions[0]
});

const dataCount = computed(() => {
    if (route.name === 'all-user-page') {
        return 3010;
    } else {
        return $getFavoriteList().length;
    }
});

function favoriteCurrentPageData() {
    let startIndex = (currentPage.value - 1) * $storePageSize.value;
    let endIndex = Math.min(startIndex + $storePageSize.value, $getFavoriteList().length);
    return $getFavoriteList().slice(startIndex, endIndex);
}

function setCurrentPageNumber(page: number) {
    currentPage.value = page;
}

watch(
    () => [$storePageSize.value, currentPage.value, current.views.name],
    (newValue) => {
        setLoadState(true);
        router.push({
            name: route.name as string,
            query: { pageSize: newValue[0], page: newValue[1], displayMode: newValue[2] }
        });
        setPageData();
    },
    { deep: true }
);

watch(
    () => route.name,
    () => {
        resetCurrentPage();
        setPageData();
    }
);

watch(
    () => [$storePageSize.value, $storeDisplayMode.value],
    (newValue) => {
        const pageSettingData = {
            pageSize: newValue[0],
            displayMode: newValue[1]
        };
        switchView(newValue[1] as string);
        sessionStorage.setItem('pageSetting', JSON.stringify(pageSettingData));
    },
    { deep: true }
);
</script>
