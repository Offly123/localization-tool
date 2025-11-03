<template>
    <footer v-if="!text">
        Loading text...
    </footer>
    <footer v-else>
        <a href="https://github.com/Offly123">
            {{ text.a }}
        </a>
    </footer>
</template>

<script setup lang="js">
import { useLanguageStore } from '@/stores/languageStore';
import { storeToRefs } from 'pinia';


const languageStore = useLanguageStore();

const { FooterLayout: text } = storeToRefs(languageStore) 

</script>

<style scoped>
footer {
    --font-size-multiplier: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: max(calc(var(--font-size-visible) * 3), 75px);
    background-color: var(--bg-dark);
}

footer > a {
    text-decoration: none;
}

footer > a:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
}
</style>