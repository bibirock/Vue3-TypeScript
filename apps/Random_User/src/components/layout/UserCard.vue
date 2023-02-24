<template lang="pug">
div.card-list(:class="'p-11 mx-auto'")
    .user-area(:class="'mx-auto w-11/12 set-item-start flex-wrap flex-row'")
        .user-card(v-for='(user,i) in data' @click="")
            .user-card-items
                img(:src="user?.picture.large" referrerPolicy="no-referrer")
                .user-card-info
                    span.user-name {{ user.name.first }}
                    Icon.favorite-icon(v-if="$checkFavoriteUser(user.login.uuid)" @click="$removeFavorite(user.login.uuid)" icon="mdi:heart" color="red" width="25" height="25")
                    Icon.favorite-icon(v-else @click="$addFavorite(user)" icon="mdi:cards-heart-outline" color="white" width="25" height="25")
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { UserDataArr } from '@/types/type';
import { $addFavorite, $checkFavoriteUser, $removeFavorite, $getFavoriteList } from '@/lib/userWallPageUtils';

type Props = {
    data?: UserDataArr;
};
defineProps<Props>();

onMounted(() => {
    $getFavoriteList();
});
</script>

<style scoped lang="scss">
.user-area {
    .user-card {
        @apply m-2 rounded-lg w-fit max-w-[136px] overflow-hidden cursor-pointer bg-white hover:drop-shadow-md  hover:scale-105;
        .user-card-items {
            @apply mx-auto w-full block relative;
        }
        .user-card-info {
            @apply set-item-center absolute bottom-0 w-full h-7 pb-1 backdrop-blur-sm;
        }
        .user-name {
            @apply text-center text-white mr-4;
        }
        .favorite-icon {
            @apply hover:scale-110;
        }
    }
}
</style>
