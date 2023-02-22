<template lang='pug'>
div(:class="'relative'")
    NavBar(:class="'sticky top-0 bg-white'" @setPageSettingData="getPageSettingData")
    UserCard(:data="userData")
    a-pagination(v-model:current="currentPage" :total="total" :showSizeChanger="false")
</template>

<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
import UserCard from '@/components/layout/UserCard.vue'
import { ref, computed, reactive, watchEffect } from 'vue';
import type { RequireUserDataParams, SettingData, UserDataArr } from '@/types/type'
import { $fecthUserData } from '@/apis/userAPI'

const currentPage = ref(1)

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
    console.log(userData.value);
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
</script>
<style scoped></style>