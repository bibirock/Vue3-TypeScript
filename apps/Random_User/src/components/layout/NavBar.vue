<template lang='pug'>
div.h-16.flex.justify-between
    div(:class="'flex basis-1/2'")
        div(:class="'w-1/4 flex justify-around items-center ml-5'")
            span(:class="'cursor-pointer'") {{ "ALL" }}
            span(:class="'cursor-pointer'") {{ "Favorite" }}
    div(:class="'flex justify-end items-center basis-1/2'")
        div.mr-5
            a-space(:class="'m-3'")
                a-select(ref="select" v-model:value="selected" style="width: 120px" @change="getData()")
                    a-select-option(v-for="(option, i) in options" :key="i" :value="option.value") {{ option.text }}
            a-switch(v-model:checked="pageMode" checked-children="List" un-checked-children="Card")
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'

const options = reactive([
    { text: 10, value: 'A' },
    { text: 20, value: 'B' },
    { text: 30, value: 'C' }
])

const pageMode = ref(true)

const selected = ref("A")

function getData() {
    console.log(selected.value);
}
</script>
<style scoped></style>