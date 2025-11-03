<template>
    <nav v-if="!text">
        Loading text...
    </nav>
    <nav v-else>
        <RouterLink to="/about" class="about active">{{ text.a1 }}</RouterLink>
        <RouterLink to="/personalization" class="about active">{{ text.a2 }}</RouterLink>
    </nav>
</template>

<script setup lang="js">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useLanguageStore } from '@/stores/languageStore'

const languageStore = useLanguageStore()

const { NavbarLayout: text } = storeToRefs(languageStore)

if (/about$/.test(window.location)) {
    const navigation = document.querySelector('nav')

    console.log(navigation)
}
</script>

<style scoped>
nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100vw;
    height: 20px;

    @media screen and (min-width: 992px) {
        height: 50px;   
    }
}

nav > a {
    display: flex;
    align-items: center;
    justify-content: center;
    /* flex-grow: 1;
    flex-shrink: 0; */
    width: 50%;
    height: 100%;
}

nav > a:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
