<template>
    <div v-if="!text">
        Loading text...
    </div>
    <div v-else>
        <HeaderLayout />
        <RouterLink to="/">{{ text.link }}</RouterLink>
    </div>
</template>

<script setup lang="js">

import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import { useLanguageStore } from '@/stores/languageStore'

const languageStore = useLanguageStore()
languageStore.init('NotFound')

const { NotFound: text } = storeToRefs(languageStore)
</script>

<style scoped>
</style>
