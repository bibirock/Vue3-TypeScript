<template lang="pug">
teleport(to="body")
    .modal-container(:class="'set-item-center z-10 center'")
        .modal-mask(@click='closeModal()' :class="'center bg-black/[.5]'")
        .modal-content(:class="'bg-white z-10 p-5'")  {{ "dddd" }}
            slot
</template>

<script lang="ts" setup>
const emit = defineEmits(['closeModal']);

function closeModal() {
    emit('closeModal');
}
</script>

<style>
.center {
    @apply top-0 bottom-0 left-0 right-0 fixed;
}
</style>
