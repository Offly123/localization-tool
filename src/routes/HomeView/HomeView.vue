<template>
    <div v-if="!text">
        Loading text...
    </div>
    <div v-else>
        <HeaderLayout />
        <RouterLink to="/about">{{ text.div.linkAbout }}</RouterLink><br />
        <RouterLink to="/personalization">{{ text.div.linkPersonalization }}</RouterLink><br />
    </div>
</template>

<script setup lang="js">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import { useLanguageStore } from '@/stores/languageStore'

const languageStore = useLanguageStore()

const { HomeView: text } = storeToRefs(languageStore)
</script>

<style scoped>
</style>
