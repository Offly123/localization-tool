<template>
    <main v-if="!text">
        Loading text...
    </main>
    <main v-else>
        <div>
            <h1>{{ text.h1 }}</h1>
        </div>
        <div>
            <RouterLink to="/">{{ text.link }}</RouterLink>
        </div>
    </main>
</template>

<script setup lang="ts">

import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useLanguageStore } from '@/stores/languageStore'

const languageStore = useLanguageStore()

const { NotFound: text } = storeToRefs(languageStore)
</script>

<style scoped>
main {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
}
</style>
