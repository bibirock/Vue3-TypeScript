<template lang='pug'>
div(:class="'relative'")
    NavBar(:class="'sticky top-0 bg-white'")
    div 
        div.card-list(:class="'p-11'")
            .user-area(:class="'mx-auto w-11/12 flex flex-wrap flex-row justify-start'")
                .file(v-for='(user,i) in userData' @click="" :class="'m-2'")
                    .img-area(:class="'mx-auto border border-sky-500 max-w-[136px]'")
                        img(:class="'p-1 '" :src="user.picture.large" referrerPolicy="no-referrer")
                        span(:class="'text-center block'") {{ user.name.first }}

</template>

<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
import { ref, onMounted, computed } from 'vue';
import type { UserData } from '@/types/type'
import { $fecthUserData } from '@/apis/userAPI'

onMounted(async () => {
    getUserData()
})

type UserDataArr = Array<UserData>
const userData = ref<UserDataArr>()
async function getUserData() {
    const res = await $fecthUserData()
    userData.value = res.results
    console.log(userData.value);
}
</script>
<style scoped></style>