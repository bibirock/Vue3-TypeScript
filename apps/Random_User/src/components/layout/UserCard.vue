<template lang='pug'>
div.card-list(:class="'p-11 mx-auto'")
    .user-area(:class="'mx-auto w-11/12 set-item-start flex-wrap flex-row'")
        .user-card(v-for='(user,i) in data' @click="")
            .user-card-items
                img(:src="user?.picture.large" referrerPolicy="no-referrer")
                .user-card-info
                    span.user-name {{ user.name.first }}
                    Icon.favorite-icon(v-if="checkFavoriteUser(user.login.uuid)" @click="removeFavorite(user.login.uuid)" icon="mdi:heart" color="red" width="25" height="25")
                    Icon.favorite-icon(v-else @click="addFavorite(user)" icon="mdi:cards-heart-outline" color="white" width="25" height="25")
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { UserDataArr, UserData, } from '@/types/type'
import { Icon } from '@iconify/vue';

type Props = {
    data?: UserDataArr
}
defineProps<Props>()

onMounted(() => {
    getFavoriteList()
})

type UserId = UserData['login']['uuid']

const favorite = ref<Array<UserData>>()
function getFavoriteList() {
    const localFavorite = JSON.parse(window.sessionStorage.getItem('favorite') || 'null')
    if (localFavorite !== null) {
        favorite.value = localFavorite
    } else {
        favorite.value = []
    }
}

function addFavorite(userData: UserData) {
    favorite.value?.push(userData)
    window.sessionStorage.setItem('favorite', JSON.stringify(favorite.value))
}

function checkFavoriteUser(id: UserId) {
    return favorite.value?.some(e => e.login.uuid === id)
}

function removeFavorite(id: UserId) {
    const index = favorite.value?.findIndex((e) => e.login.uuid === id)
    favorite.value?.splice(index as number, 1)
    window.sessionStorage.setItem('favorite', JSON.stringify(favorite.value))
} 
</script>
<style scoped></style>