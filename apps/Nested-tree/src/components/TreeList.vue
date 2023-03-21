<template lang="pug">
div(class="tree")
    div(v-for="(item, index) in treeArray" :key="index")
        div.cursor-pointer(@click="toggleSwitchControl(item)")
            span(class="font-bold") {{ item.name }}
            span(v-if='item.child?.length !== 0' class="ml-1") {{ item.isOpen? '[-]' : '[+]' }}
            span(v-else-if='item.name !== ""' class="ml-1") {{ ":" }}
            span(v-if="item.value!== null && item.name !== ''" class="ml-3 text-rose-300") {{ item.value }}
        TreeList(v-if="item.child.length !== 0 && item.isOpen" :treeArray='item.child').pl-8
</template>
<script setup lang="ts">
import TreeList from '@/components/TreeList.vue';
import type { TreeStructure } from '@/types/index';

type Props = {
    treeArray: TreeStructure[];
};

defineProps<Props>();

function toggleSwitchControl(item: TreeStructure) {
    item.isOpen = !item.isOpen;
}
</script>
