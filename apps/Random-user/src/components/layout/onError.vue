<template lang="pug">
a-result(:status='error?.status' :title='error?.title' :sub-title='error?.subTitle')
  template(#extra)
</template>

<script setup lang="ts">
import type { ErrorType } from '@/types/type';

type Props = {
    error?: ErrorType;
};

defineProps<Props>();
</script>
<style scoped></style>
