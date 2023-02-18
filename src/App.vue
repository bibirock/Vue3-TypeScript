
<template lang="pug">
div
  a(href="https://vitejs.dev" target="_blank")
    img(src="/vite.svg")
    p {{ test.name  }}
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface test {
  name: string
}

const test = ref<test>({
  name: "gogogo"
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
