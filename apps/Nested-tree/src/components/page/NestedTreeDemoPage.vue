<template lang="pug">
div.px-20.pb-20.pt-5.h-screen.bg-slate-900
    div.page-title.mb-2.text-2xl.text-slate-200.font-bold {{ "Nested Key-Value Pair Tree Viewer" }}
    div.grid.grid-cols-2.gap-8.h-full
        div.value-input.border.border-slate-500
            div.flex.justify-end.p-3
                button.bg-slate-200.text-slate-800.p-2.font-bold(@click="addRow()") {{ "＋Add New Pair" }}
            div
                div.input-list.px-5.py-2.flex(v-for="(input,index) in inputList" key=index)
                    div.grid.grid-cols-2.gap-4.flex-grow.mr-3
                        input(type="text" v-model="input.key" placeholder="Key").bg-transparent.outline-none.border.text-slate-200.border-slate-500.text-base.px-2.py-1.w-full
                        input(type="text" v-model="input.value" placeholder="Value").bg-transparent.outline-none.border.text-slate-200.border-slate-500.text-base.px-2.py-1.w-full
                    button.w-10.text-sm.flex.justify-center.items-center.bg-slate-300.text-slate-800(@click="deleteRow(index)") {{ " - " }}
        div.text-slate-200.p-6.border.border-slate-500
            TreeList(:treeArray='treeArray')
</template>
<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import TreeList from '@/components/TreeList.vue';
import type { InputList, TreeArray } from '@/types/index';
import { $createTreeStructure } from '@/lib/utils';

const inputList: InputList = reactive([
    {
        key: '',
        value: ''
    }
]);

let treeArray = ref<TreeArray>([]);

watch(
    () => inputList,
    () => {
        treeArray.value = $createTreeStructure(inputList);
    },
    { deep: true }
);

function addRow() {
    inputList?.push({
        key: '',
        value: ''
    });
}

function deleteRow(index: number) {
    inputList.splice(index, 1);
}
</script>
<style scoped></style>
