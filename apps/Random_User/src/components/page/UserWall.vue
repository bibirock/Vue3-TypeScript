<template lang='pug'>
div(:class="'relative'")
    NavBar(:class="'sticky top-0 bg-white'" @setPageSettingData="getPageSettingData")
    div 
        div.card-list(:class="'p-11'")
            .user-area(:class="'mx-auto w-11/12 flex flex-wrap flex-row justify-start'")
                .file(v-for='(user,i) in userData' @click="" :class="'m-2'")
                    .img-area(:class="'mx-auto border border-sky-500 max-w-[136px]'")
                        img(:class="'p-1 '" :src="user.picture.large" referrerPolicy="no-referrer")
                        span(:class="'text-center block'") {{ user.name.first }}
    a-pagination(v-model:current="currentPage" :total="total")
</template>

<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
import { ref, onMounted, computed, reactive, watch } from 'vue';
import type { UserData, RequireUserDataParams, SettingData } from '@/types/type'
import { $fecthUserData } from '@/apis/userAPI'

const currentPage = ref(1)
const userCount = ref(30)

const pageSettingData: SettingData = reactive({
    bookMark: 'ALL',
    dispalyMode: true,
    userCount: 30
})

onMounted(async () => {
    getUserData()
})

type UserDataArr = Array<UserData>
const userData = ref<UserDataArr>()
const require: RequireUserDataParams = reactive({
    page: currentPage.value,
    results: userCount.value
})

async function getUserData() {
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
    let total = 3010 / pageSettingData.userCount
    return total
})
</script>
<style scoped></style>