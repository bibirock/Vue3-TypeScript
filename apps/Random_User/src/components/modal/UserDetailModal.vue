<template lang="pug">
teleport(to="body")
    div.modal-container(:class="'set-item-center z-10 fixed-center'")
        .modal-mask(@click='closeModal()' :class="'fixed-center bg-black/[.5]'")
        .modal-content(:class="'bg-white z-10 p-10 rounded-xl relative'")
            Icon(@click='closeModal()' icon="iconoir:cancel" width="25" :class="'absolute top-5 right-5 cursor-pointer'")
            p.text-center.text-lg {{ "Profile" }}
            img(:src="user?.picture.large" :class="'block mx-auto rounded-xl border-1'")
            .info-area(:class="'set-item-center flex-col w-fit mx-auto mt-4'")
                span {{ "Name : " + user?.name.first }}
                span {{ "Gender : " + user?.gender }}
                span {{ "Country : " + user?.location.country }}
                span {{ "Email : " + user?.email }}
</template>

<script lang="ts" setup>
import type { UserData } from '@/types/type';
const emit = defineEmits(['closeModal']);

type Props = {
    user?: UserData;
};

defineProps<Props>();

function closeModal() {
    emit('closeModal');
}
</script>

<style lang="scss" scoped>
.fixed-center {
    @apply top-0 bottom-0 left-0 right-0 fixed;
}
span {
    @apply self-start;
}
</style>
