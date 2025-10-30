<template>
    <header v-if="!text">
        Loading text...
    </header>
    <header v-else>
        <h1>{{ text.h1 }}</h1>
        <button @click="changeLanguage">RU | EN</button>
    </header>
</template>

<script setup lang="js">
import { storeToRefs } from 'pinia'

import { useLanguageStore } from '@/stores/languageStore'
import { AvailableLanguages } from '@/languages/availableLanguages'

const languageStore = useLanguageStore()

const { HeaderLayout: text } = storeToRefs(languageStore)

function changeLanguage() {
    languageStore.languageCode = 
    languageStore.languageCode === AvailableLanguages.en 
    ? AvailableLanguages.ru 
    : AvailableLanguages.en
}
</script>

<style>
header {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: calc(100vw - 10px);
    padding-right: 10px;
    height: 100px;
    background-color: var(--bg-light);
}

header > h1 {
    display: flex;
    align-items: center;
    justify-content: center;
}

header > button {
    /* position: absolute;
    right: 10px;
    top: 0; */
}
</style>