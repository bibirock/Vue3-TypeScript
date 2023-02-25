<template lang="pug">
div.card-list(:class="'p-2 lg:p-11'")
    .user-area(:class="'mx-auto w-11/12 set-item-center flex-col'")
        .user-list.cursor-pointer(v-for='(user,i) in data' @click="sendUserData(user)" :class="'m-2 w-full rounded-lg border overflow-hidden md:w-[60%] lg:w-[50%] hover:drop-shadow-md hover:scale-105 bg-white'")
            .info-area(:class="'mx-auto flex'")
                img(:src="user?.picture.large" referrerPolicy="no-referrer")
                .user-info(:class="'basis-1/2 p-5 flex flex-col justify-between'")
                    span {{ "Name : " + user.name.first }}
                    span {{ "Country : " + user.location.country }}
                    span {{ "Gender : " + user.gender }}
                Icon.favorite-icon(v-if="$checkFavoriteUser(user.login.uuid)" @click.stop="$removeFavorite(user.login.uuid)" icon="mdi:heart" color="red" width="50" height="50")
                Icon.favorite-icon(v-else @click.stop="$addFavorite(user)" icon="mdi:cards-heart-outline" width="50" height="50")
</template>

<script setup lang="ts">
import { $addFavorite, $checkFavoriteUser, $removeFavorite, $getFavoriteList } from '@/lib/userWallPageUtils';
import type { UserDataArr, UserData } from '@/types/type';
import { onMounted } from 'vue';

onMounted(() => {
    $getFavoriteList();
});

type Props = {
    data?: UserDataArr;
};

defineProps<Props>();

const emit = defineEmits(['sendUseData']);

function sendUserData(userData: UserData) {
    emit('sendUseData', userData);
}
</script>

<style scoped lang="scss">
span {
    @apply block text-left whitespace-nowrap;
}
.favorite-icon {
    @apply basis-[100px] self-center flex-shrink-0 hover:scale-105;
}
</style>
