<template>
    <HeaderLayout />
    <main v-if="!text">
        Loading text...
    </main>
    <main v-else>
        <p>{{ text.p }}</p>
    </main>
    <FooterLayout />
</template>

<script setup lang="js">
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useLanguageStore } from '@/stores/languageStore';
import HeaderLayout from '@/components/layout/HeaderLayout.vue';
import FooterLayout from '@/components/layout/FooterLayout.vue';

const languageStore = useLanguageStore()

const { AboutView: text } = storeToRefs(languageStore)
</script>

<style scoped>
main {
    display: flex;
    justify-content: center;
    flex-grow: 1;
}
</style>