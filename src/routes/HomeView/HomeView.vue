<template>
    <div v-if="!localizedText">
        Loading text...
    </div>
    <div v-else>
        <h1>{{ localizedText.h1 }}</h1><br />
        <RouterLink to="/about">{{ localizedText.div.button }}</RouterLink><br />
    </div>
</template>

<script setup lang="js">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useLanguageStore } from '@/stores/languageStore'

const languageStore = useLanguageStore()
languageStore.init('HomeView')

const { HomeView: localizedText } = storeToRefs(languageStore)
</script>

<style scoped>
</style>
