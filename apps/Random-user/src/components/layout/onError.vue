<template lang="pug">
div(:class="'set-item-center h-full'")
	div
		Icon(v-if="error.status === ErrorStatus.Nodata" icon="radix-icons:question-mark-circled" width="100" height="100" :class="'text-hight-light mx-auto'")
		Icon(v-else-if="error.status === ErrorStatus.NetworkError" :icon="errorIcon" width="100" height="100" :class="'text- mx-auto mb-2 text-red-500'")
		h1(:class="'text-center'") {{ error.title }}
		p(:class="'text-center'") {{ error.subTitle }}
</template>

<script setup lang="ts">
import IconifyError from '@iconify-icons/material-symbols/error';
import type { ErrorType } from '@/types/type';
import { ErrorStatus } from '@/types/type';
import { ref } from 'vue';

const errorIcon = ref(IconifyError);

type Props = {
    error: ErrorType;
};

defineProps<Props>();
</script>
<style scoped></style>
