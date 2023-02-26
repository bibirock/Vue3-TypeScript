<template lang="pug">
div(:class="'relative select-none'")
    div(:class="'sticky top-0 bg-white z-10'")
        nav-bar
    div(:class="'h-[600px] overflow-y-auto'")
        loading-view(v-if="isLoading")
        no-datas(v-else-if="userData?.length === 0")
        keep-alive(v-else)
            component(:is="current.views" :key="current.views" :data="userData" @sendUseData="getSelectUserAndOpenModal")
    div(:class="'set-item-center mt-5 pb-5'")
        a-pagination(v-if="userData?.length !== 0" v-model:current="currentPage" v-model:pageSize="$storeSelectedCount" :total="totalData" :showSizeChanger="false")
    user-detail-modal(v-if="isShowModal" @closeModal="isShowModal = false" :user="selectUser")
</template>

<script setup lang="ts">
import type { RequireUserDataParams, UserDataArr, DisplayMode, UserData } from '@/types/type';
import { $storeSelectedCount, $storePageMode, $getFavoriteList } from '@/lib/userWallPageUtils';
import { ref, computed, reactive, markRaw, watch, onMounted } from 'vue';
import UserDetailModal from '@/components/modal/UserDetailModal.vue';
import UserCard from '@/components/page/userWallPage/element/UserCard.vue';
import UserList from '@/components/page/userWallPage/element/UserList.vue';
import NoDatas from '@/components/layout/NoDatas.vue';
import LoadingView from '@/components/layout/LoadingView.vue';
import NavBar from '@/components/layout/NavBar.vue';
import { useRoute, useRouter } from 'vue-router';
import { $fecthUserData } from '@/apis/userAPI';

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
    getCurrentPageNumber();
    setPageData();
    $getFavoriteList();
});

const userData = ref<UserDataArr>();
const currentPage = ref(1);
function getCurrentPageNumber() {
    if (route.query.page !== undefined) {
        const query = route.query.page;
        currentPage.value = parseInt(query as string);
    }
}

function resetCurrentPage() {
    currentPage.value = 1;
}

function setLoadState(isShow: boolean) {
    isLoading.value = isShow;
}

async function setPageData() {
    if (route.name === 'favorite-page') {
        userData.value = favoriteCurrentPageData();
        if (userData.value.length === 0) resetCurrentPage();
        setLoadState(false);
        return;
    } else {
        userData.value = await getUserData($storeSelectedCount.value, currentPage.value);
        setLoadState(false);
    }
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

function switchView(component: DisplayMode['component']) {
    current.views = component;
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
    () => $storePageMode.value,
    (mode) => {
        if (mode) {
            switchView(UserCard);
        } else {
            switchView(UserList);
        }
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
</script>
<style scoped></style>
