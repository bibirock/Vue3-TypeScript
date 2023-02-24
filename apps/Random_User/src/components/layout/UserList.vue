<template lang="pug">
div.card-list(:class="'p-11'")
    .user-area(:class="'mx-auto w-11/12 flex flex-wrap flex-row justify-start'")
        .file(v-for='(user,i) in data' @click="" :class="'m-2'")
            .img-area(:class="'mx-auto border border-sky-500 max-w-[136px]'")
                //- img(:class="'p-1 '" :src="user?.picture.large" referrerPolicy="no-referrer")
                span(:class="'text-center block'") {{ user.name.title }}
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
<style scoped></style>
