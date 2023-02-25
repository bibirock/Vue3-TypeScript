<template lang="pug">
div(:class="'relative'")
    div(:class="'sticky top-0 bg-white z-10'")
        nav-bar
    div(:class="'h-[600px] overflow-y-auto'")
        keep-alive
            component(:is="current.views" :key="current.views" :data="userData" @sendUseData="getSelectUserAndOpenModal")
    div(:class="'set-item-center mt-5 pb-5'")
        a-pagination(v-model:current="currentPage" :total="totalPages" :showSizeChanger="false")
    user-detail-modal(v-if="isShowModal" @closeModal="isShowModal = false" :user="selectUser")
</template>

<script setup lang="ts">
import type { RequireUserDataParams, UserDataArr, DisplayMode, UserData } from '@/types/type';
import { $storeSelectedCount, $storePageMode } from '@/lib/userWallPageUtils';
import { ref, computed, reactive, markRaw, watch, onMounted, nextTick } from 'vue';
import UserCard from '@/components/layout/UserCard.vue';
import UserList from '@/components/layout/UserList.vue';
import NavBar from '@/components/layout/NavBar.vue';
import UserDetailModal from '@/components/modal/UserDetailModal.vue';
import { useRoute, useRouter } from 'vue-router';
import { $fecthUserData } from '@/apis/userAPI';

const route = useRoute();
const router = useRouter();

const selectUser = ref<UserData>();
const isShowModal = ref(false);
function getSelectUserAndOpenModal(userData: UserData) {
    selectUser.value = userData;
    isShowModal.value = true;
}

onMounted(() => {
    getCurrentPage();
    getUserData($storeSelectedCount.value, currentPage.value);
});

const currentPage = ref(1);
function getCurrentPage() {
    if (route.query.q !== undefined) {
        const query = route.query.q;
        currentPage.value = parseInt(query as string);
    }
}

const userData = ref<UserDataArr>();
async function getUserData(userCount: number, pages: number) {
    const require: RequireUserDataParams = {
        results: userCount,
        page: pages
    };
    const res = await $fecthUserData(require);
    userData.value = res.results;
}

function $getFavoriteList(): [] {
    const localFavorite = JSON.parse(window.sessionStorage.getItem('favorite') || 'null');
    if (localFavorite !== null) {
        return localFavorite;
    } else {
        return [];
    }
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

const totalPages = computed(() => {
    let pageCount;
    if (route.name === 'all-user-page') {
        pageCount = 3010 / $storeSelectedCount.value;
    } else {
        pageCount = $getFavoriteList().length / $storeSelectedCount.value;
    }
    return pageCount;
});

watch(
    () => [$storeSelectedCount.value, currentPage.value],
    () => {
        getUserData($storeSelectedCount.value, currentPage.value);
    }
);

watch(
    () => currentPage.value,
    () => {
        router.push({ name: 'all-user-page', query: { q: currentPage.value } });
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
        if (route.name === 'favorite-page') {
            userData.value = $getFavoriteList();
        } else {
            getUserData($storeSelectedCount.value, currentPage.value);
        }
    }
);
</script>
<style scoped></style>
