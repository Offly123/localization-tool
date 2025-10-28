<template>
    <RouterView />
    <button @click="changeLanguage">RU | EN</button>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useLanguageStore } from '@/stores/languageStore'
import { AvailableLanguages } from '@/languages/availableLanguages'

const languageStore = useLanguageStore()

function changeLanguage() {
    languageStore.languageCode = 
    languageStore.languageCode === AvailableLanguages.en 
    ? AvailableLanguages.ru 
    : AvailableLanguages.en
}

</script>

<style>

</style>
