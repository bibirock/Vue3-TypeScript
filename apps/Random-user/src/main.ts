import { createApp } from 'vue';
import router from '@/router';
import './style.scss';
import App from './App.vue';

import { createPinia } from 'pinia';
const pinia = createPinia();

import { Icon } from '@iconify/vue';
createApp(App).use(router).use(pinia).component('Icon', Icon).mount('#app');
