<template lang="pug">
div(:class="'relative'")
    div(:class="'sticky top-0 bg-white z-10'")
        NavBar
    div(:class="'h-[600px] overflow-y-auto'")
        keep-alive
            component(:is="current.views" :key="current.views" :data="userData")
    div(:class="'set-item-center mt-5'")
        a-pagination(v-model:current="currentPage" :total="total" :showSizeChanger="false" :class="''")
</template>

<script setup lang="ts">
import type { RequireUserDataParams, UserDataArr, DisplayMode } from '@/types/type';
import { $storeSelectedCount, $storePageMode } from '@/lib/userWallPageUtils';
import { ref, computed, reactive, markRaw, watch, onMounted } from 'vue';
import UserCard from '@/components/layout/UserCard.vue';
import UserList from '@/components/layout/UserList.vue';
import NavBar from '@/components/layout/NavBar.vue';
import { useRoute, useRouter } from 'vue-router';
import { $fecthUserData } from '@/apis/userAPI';

const route = useRoute();
const rourer = useRouter();
const currentPage = ref(1);

onMounted(() => {
    getCurrentPage();
    getUserData($storeSelectedCount.value, currentPage.value);
});

function getCurrentPage() {
    if (route.query.q !== undefined) {
        const query = route.query.q;
        currentPage.value = parseInt(query as string);
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

const userData = ref<UserDataArr>();
async function getUserData(userCount: number, pages: number) {
    const require: RequireUserDataParams = {
        results: userCount,
        page: pages
    };
    const res = await $fecthUserData(require);
    userData.value = res.results;
}

const total = computed(() => {
    return 3010 / $storeSelectedCount.value;
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
        rourer.push({ name: 'all-user-page', query: { q: currentPage.value } });
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
            userData.value = getFavoriteList();
        } else {
            getUserData($storeSelectedCount.value, currentPage.value);
        }
    }
);

function getFavoriteList() {
    const localFavorite = JSON.parse(window.sessionStorage.getItem('favorite') || 'null');
    if (localFavorite !== null) {
        return localFavorite;
    } else {
        return [];
    }
}
</script>
<style scoped></style>
