<template>
    <div v-if="!localizedText">
        Loading text...
    </div>
    <div v-else>
        <h1>{{ localizedText.h1 }}</h1><br />
        <RouterLink to="/">{{ localizedText.link }}</RouterLink>
    </div>
</template>

<script setup lang="js">

import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useLanguageStore } from '@/stores/languageStore'

const languageStore = useLanguageStore()
// languageStore.init(getCurrentInstance().type.__name)
languageStore.init('NotFound')

const { NotFound: localizedText } = storeToRefs(languageStore)
</script>

<style scoped>
</style>
