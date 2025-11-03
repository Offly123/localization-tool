<template>
    <HeaderLayout />
    <main v-if="!text">
        Loading text...
    </main>
    <main v-else>
        <RouterLink to="/app">{{ text.a }}</RouterLink>
    </main>
    <FooterLayout />
</template>

<script setup lang="js">
import { storeToRefs } from 'pinia'

import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import { useLanguageStore } from '@/stores/languageStore'
import FooterLayout from '@/components/layout/FooterLayout.vue'

const languageStore = useLanguageStore()

const { HomeView: text } = storeToRefs(languageStore)
</script>

<style scoped>
main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}
</style>
