<template lang="pug">
div(:class="'relative'")
    NavBar(:class="'sticky top-0 bg-white z-10'")
    keep-alive
        component(:is="current.views" :key="current.views" :data="userData")
    div(:class="'set-item-center pb-4'")
        a-pagination(v-model:current="currentPage" :total="total" :showSizeChanger="false" :class="''")
</template>

<script setup lang="ts">
import type { RequireUserDataParams, UserDataArr, DisplayMode } from '@/types/type';
import { ref, computed, reactive, watchEffect, markRaw, watch, onMounted } from 'vue';
import NavBar from '@/components/layout/NavBar.vue';
import UserCard from '@/components/layout/UserCard.vue';
import UserList from '@/components/layout/UserList.vue';
import { $fecthUserData } from '@/apis/userAPI';
import { useRoute, useRouter } from 'vue-router';
import { userWallSetting } from '@/store';
const $store = userWallSetting();
const route = useRoute();
const rourer = useRouter();

const currentPage = ref(1);

onMounted(() => {
    getCurrentPage();
    getUserData(selectedCount.value, currentPage.value)
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
    return 3010 / $store.userCount;
});

const selectedCount = computed({
    get() {
        return $store.userCount;
    },
    set(newValue) {
        $store.updateUserCount(newValue);
    }
});

const pageMode = computed({
    get() {
        return $store.getIsDisplayMode;
    },
    set(newValue) {
        $store.updateDisplayMode(newValue ? 'Card' : 'List');
    }
});

watch(() => [selectedCount.value, currentPage.value], () => {
    getUserData(selectedCount.value, currentPage.value);
})

watch(
    () => currentPage.value,
    () => {
        rourer.push({ name: 'all-user-page', query: { q: currentPage.value } });
    }
);

watch(
    () => pageMode.value,
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
            getUserData(selectedCount.value, currentPage.value);
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
