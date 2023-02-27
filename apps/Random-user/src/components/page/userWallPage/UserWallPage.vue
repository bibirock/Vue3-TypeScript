<template lang="pug">
div(:class="'relative select-none'")
    div(:class="'sticky top-0 bg-white z-10'")
        nav-bar
    div(:class="'h-[80vh] overflow-y-auto'")
        loading-view(v-if="isLoading")
        no-datas(v-else-if="userData?.length === 0")
        keep-alive(v-else)
            component(:is="current.views" :key="current.views" :data="userData" @sendUseData="getSelectUserAndOpenModal")
    div(:class="'set-item-center mt-5 pb-5'")
        a-pagination(v-if="userData?.length !== 0" v-model:current="currentPage" v-model:pageSize="$storeSelectedCount" :total="totalData" :showSizeChanger="false")
    user-detail-modal(v-if="isShowModal" @closeModal="isShowModal = false" :user="selectUser")
</template>

<script setup lang="ts">
import type { RequireUserDataParams, UserDataArr, DisplayMode, UserData, SettingData } from '@/types/type';
import { $storeSelectedCount, $storePageMode, $getFavoriteList } from '@/lib/userWallPageUtils';
import { ref, computed, reactive, markRaw, watch, onMounted, nextTick } from 'vue';
import UserDetailModal from '@/components/modal/UserDetailModal.vue';
import UserCard from '@/components/page/userWallPage/element/UserCard.vue';
import UserList from '@/components/page/userWallPage/element/UserList.vue';
import LoadingView from '@/components/layout/LoadingView.vue';
import NoDatas from '@/components/layout/NoDatas.vue';
import NavBar from '@/components/layout/NavBar.vue';
import { useRoute, useRouter } from 'vue-router';
import { $fecthUserData } from '@/apis/userAPI';
import { userWallSetting } from '@/store';
const $store = userWallSetting();

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);

const selectUser = ref<UserData>();
const isShowModal = ref(false);
function getSelectUserAndOpenModal(userData: UserData) {
    selectUser.value = userData;
    isShowModal.value = true;
}

onMounted(() => {
    setLoadState(true);
    initSetting();
    getCurrentPageNumber();
    setPageData();
    $getFavoriteList();
});

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
    $store.updateDisplayMode(setting.dispalyMode === 'Card' ? 'Card' : 'List');
}

function setDefaultSetting() {
    $store.updateUserCount(30);
    $store.updateDisplayMode('Card');
}

const userData = ref<UserDataArr>();
const currentPage = ref(1);
function getCurrentPageNumber() {
    if (route.query.page !== undefined) {
        const query = route.query.page;
        currentPage.value = parseInt(query as string);
    }
}

async function setPageData() {
    if (route.name === 'favorite-page') {
        userData.value = favoriteCurrentPageData();
        if (userData.value.length === 0) resetCurrentPage();
        setLoadState(false);
        return;
    } else {
        userData.value = await getUserData(getCurrentPageUserCount(), currentPage.value);
        setLoadState(false);
    }
}

function resetCurrentPage() {
    currentPage.value = 1;
}

function setLoadState(isShow: boolean) {
    isLoading.value = isShow;
}

function getCurrentPageUserCount() {
    const totalResults = 3010;
    const resultsPerPage = $storeSelectedCount.value;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const lastPageResults = totalResults - (totalPages - 1) * resultsPerPage;
    const lastPage = currentPage.value === totalPages ? lastPageResults : resultsPerPage;
    return lastPage;
}

async function getUserData(userCount: number, pages: number) {
    const require: RequireUserDataParams = {
        results: userCount,
        page: pages
    };
    const res = await $fecthUserData(require);
    return res.results;
}

const dispalyMode: Array<DisplayMode> = reactive([
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
    const i = dispalyMode.findIndex((e) => e.name === mode);
    current.views = dispalyMode[i].component;
}

const current = reactive({
    views: dispalyMode[0].component
});

const totalData = computed(() => {
    if (route.name === 'all-user-page') {
        return 3010;
    } else {
        return $getFavoriteList().length;
    }
});

function favoriteCurrentPageData() {
    let startIndex = (currentPage.value - 1) * $storeSelectedCount.value;
    let endIndex = Math.min(startIndex + $storeSelectedCount.value, $getFavoriteList().length);
    return $getFavoriteList().slice(startIndex, endIndex);
}

watch(
    () => [$storeSelectedCount.value, currentPage.value],
    async () => {
        setLoadState(true);
        router.push({ name: route.name as string, query: { page: currentPage.value } });
        setPageData();
    }
);

watch(
    () => route.name,
    () => {
        resetCurrentPage();
        setPageData();
    }
);

// 因為需等待 DOM 更新後才能拿到新的值，因此需使用 nextTick()
watch(
    () => [$storeSelectedCount, $storePageMode],
    (newValue) => {
        const pageSettingData = {
            userCount: newValue[0].value,
            dispalyMode: newValue[1].value
        };
        switchView(newValue[1].value as string);
        sessionStorage.setItem('pageSetting', JSON.stringify(pageSettingData));
    },
    { deep: true }
);
</script>
<style scoped></style>
