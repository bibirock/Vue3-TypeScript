<template lang="pug">
div.card-list(:class="'p-11'")
    .user-area(:class="'mx-auto w-11/12 set-item-center flex-col'")
        .user-list.cursor-pointer(v-for='(user,i) in data' @click="")
            .info-area
                img(:src="user?.picture.large" referrerPolicy="no-referrer")
                .user-info
                    span {{ "Name : " + user.name.first }}
                    span {{ "Country : " + user.location.country }}
                    span {{ "Gender : " + user.gender }}
                Icon.favorite-icon(v-if="$checkFavoriteUser(user.login.uuid)" @click="$removeFavorite(user.login.uuid)" icon="mdi:heart" color="red" width="50" height="50")
                Icon.favorite-icon(v-else @click="$addFavorite(user)" icon="mdi:cards-heart-outline" width="50" height="50")
</template>

<script setup lang="ts">
import { $addFavorite, $checkFavoriteUser, $removeFavorite, $getFavoriteList } from '@/lib/userWallPageUtils';
import type { UserDataArr } from '@/types/type';
import { onMounted } from 'vue';

type Props = {
    data?: UserDataArr;
};

onMounted(() => {
    $getFavoriteList();
});

defineProps<Props>();
</script>

<style scoped lang="scss">
.user-list {
    @apply m-2 w-[50%] rounded-lg border overflow-hidden;
    .info-area {
        @apply mx-auto flex;
        .user-info {
            @apply basis-1/2 p-5 flex flex-col justify-between;

            span {
                @apply block text-left whitespace-nowrap;
            }
        }
        .favorite-icon {
            @apply basis-[100px] self-center;
        }
    }
}
</style>
