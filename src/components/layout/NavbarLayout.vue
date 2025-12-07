<template>
    <nav v-if="!text">
        Loading text...
    </nav>
    <nav v-else>
        <RouterLink to="/about">{{ text.a1 }}</RouterLink>
        <RouterLink to="/personalization">{{ text.a2 }}</RouterLink>
        <RouterLink to="/temp">temp</RouterLink>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useLanguageStore } from '@/stores/languageStore'

const languageStore = useLanguageStore()

const { NavbarLayout: text } = storeToRefs(languageStore)
</script>

<style scoped>
nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: var(--bg-light);
    background-color: transparent;
    width: 100vw;
    height: 20px;

    height: calc(var(--font-size-visible) * 2);
    @media screen and (min-width: 992px) {
        min-height: 40px;
    }
}

nav > a {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: 1 0 0;
    height: 100%;
}

nav > a:not(:last-child)::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 80%;
    right: 0;
    top: 50%;
    background-color: var(--font-dark);
    transform: translate(50%, -50%);
}

nav > a:hover {
    @media (pointer: fine) {
        background-color: rgba(0, 0, 0, 0.1);
    }
}
</style>
