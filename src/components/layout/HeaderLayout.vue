<template>
    <div v-if="!text">
        Loading text...
    </div>
    <div v-else>
        <h1>{{ text.h1 }}</h1>
    </div>
</template>

<script setup lang="js">
import { storeToRefs } from 'pinia';

import { useLanguageStore } from '@/stores/languageStore';

const languageStore = useLanguageStore()

const { HeaderLayout: text } = storeToRefs(languageStore)
</script>

<style>
</style>