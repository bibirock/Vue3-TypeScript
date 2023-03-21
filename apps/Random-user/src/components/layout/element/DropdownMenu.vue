<template lang="pug">
div(class="relative")
    button(@click="isOpenMenuItem = true" @blur="isOpenMenuItem = false" class="border-gray-200 border py-1 text-center set-item-center max-w-[115px]")
        span(class="pr-16 pl-2") {{ selectedOption.text }}
        Icon(class="pr-1 w-full'" icon="material-symbols:keyboard-arrow-down"  width="20" height="20") 
    div(v-show="isOpenMenuItem" class="z-10 bg-white divide-y divide-gray-100 shadow w-[115px] absolute top-8")
        ul(class="py-2 text-sm text-gray-700 m-0 p-0")
            li(v-for="option in options" class="block px-4 py-2 hover:bg-gray-100 cursor-pointer" @mousedown.prevent @click="getSelect(option.value)") {{ option.text }}
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

interface Option {
    text: string;
    value: number;
}

interface Props {
    options: Array<Option>;
    defaultSelected: Option;
}

const isOpenMenuItem = ref(false);

const props = defineProps<Props>();

const selectedOption = ref(props.defaultSelected);

watch(
    () => props.defaultSelected,
    (newValue) => {
        selectedOption.value = newValue;
    }
);

const emit = defineEmits(['selectedChange']);

function getSelect(option: number) {
    const i = props.options.findIndex((e) => e.value === option);
    selectedOption.value = props.options[i];
    emit('selectedChange', props.options[i].value);
    isOpenMenuItem.value = false;
}
</script>
