<template>
    <h1>HomeView</h1><br>
    <div v-if="!localizedText">
        nothing
    </div>
    <div v-else>
        <h1>{{ JSON.stringify(localizedText.h1) }}</h1><br />
        <RouterLink to="/about">{{ localizedText.div }}</RouterLink><br />
    </div>
</template>

<script setup lang="ts">

import { RouterLink } from 'vue-router'
import { languageStore } from '@/stores/lang'
import getLocalizedJSON from '@/languages/getLocalizedJSON'
import { onMounted, ref, watch } from 'vue'

const language = languageStore()
const localizedText = ref<Record<string, string> | null>(null)
onMounted(async () => {
    const localizedJSON = await getLocalizedJSON(language.language)
    localizedText.value = localizedJSON
})

watch(language, async () => {
    const localizedJSON = await getLocalizedJSON(language.language)
    localizedText.value = localizedJSON
})

</script>

<style scoped>
</style>