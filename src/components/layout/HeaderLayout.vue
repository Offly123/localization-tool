<template>
    <header v-if="!text">
        Loading text...
    </header>
    <header v-else>
        <RouterLink to="/">{{ text.a }}</RouterLink>
        <NavbarLayout />
        <button @click="changeLanguage">RU | EN</button>
    </header>
</template>

<script setup lang="js">
import { storeToRefs } from 'pinia'

import { useLanguageStore } from '@/stores/languageStore'
import { AvailableLanguages } from '@/languages/availableLanguages'
import { RouterLink } from 'vue-router'
import NavbarLayout from './NavbarLayout.vue'

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
    flex-direction: column;
    position: relative;
    justify-content: space-between;
    align-items: center;
    --padding: 10px;
    padding-top: var(--padding);
    padding-left: var(--padding);
    padding-right: var(--padding);
    width: calc(100vw - 2 * var(--padding));
    background-color: var(--bg-light);

    min-height: calc(100px - 2 * var(--padding));
    @media screen and (min-width: 576px) {
        min-height: 125px;
    }
}

header > a {
    font-size: calc(var(--font-size-visible) * 3);
    margin-bottom: 10px;
}

header > button {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>