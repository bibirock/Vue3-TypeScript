<template lang='pug'>
div(:class="'relative'")
    NavBar(:class="'sticky top-0 bg-white z-10'" @setPageSettingData="getPageSettingData")
    keep-alive
        component(:is="current.views" :key="current.views" :data="userData")
    div(:class="'set-item-center pb-4'")
        a-pagination(v-model:current="currentPage" :total="total" :showSizeChanger="false" :class="''")
</template>

<script setup lang="ts">
import type { RequireUserDataParams, SettingData, UserDataArr, DisplayMode } from '@/types/type'
import { ref, computed, reactive, watchEffect, markRaw, watch, onMounted } from 'vue';
import NavBar from '@/components/layout/NavBar.vue'
import UserCard from '@/components/layout/UserCard.vue'
import UserList from '@/components/layout/UserList.vue';
import { $fecthUserData } from '@/apis/userAPI'
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const rourer = useRouter()

const currentPage = ref(1)

onMounted(() => {
    getCurrentPage()
})

function getCurrentPage() {
    if (route.query.q !== undefined) {
        const query = route.query.q
        currentPage.value = parseInt(query as string)
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

const pageSettingData: SettingData = reactive({
    bookMark: 'ALL',
    dispalyMode: true,
    userCount: 30
})

const userData = ref<UserDataArr>()
async function getUserData(userCount: number, pages: number) {
    const require: RequireUserDataParams = {
        results: userCount,
        page: pages
    }
    const res = await $fecthUserData(require)
    userData.value = res.results
}

function getPageSettingData(pageSetting: SettingData) {
    pageSettingData.bookMark = pageSetting.bookMark
    pageSettingData.dispalyMode = pageSetting.dispalyMode
    pageSettingData.userCount = pageSetting.userCount
}

const total = computed(() => {
    return 3010 / pageSettingData.userCount
})

watchEffect(() => {
    getUserData(pageSettingData.userCount, currentPage.value)
})

watch(() => pageSettingData.dispalyMode, (value) => {
    if (value) {
        switchView(UserCard)
    } else {
        switchView(UserList)
    }
})

watch(() => currentPage.value, () => {
    rourer.push({ name: 'home-page', query: { q: currentPage.value } })
})
</script>
<style scoped></style>