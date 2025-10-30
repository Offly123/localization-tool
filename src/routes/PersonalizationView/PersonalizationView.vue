<template>
    <HeaderLayout />
    <main v-if="!text">
        Loading text...
    </main>
    <main v-else>
        <div>
            <h2>
                {{ text.h2 }}
            </h2>
        </div>
        <RouterLink to="/">{{ text.linkHome }}</RouterLink><br>
        <div class="button-list">
            <button 
                v-for="(colorTheme, index) in availableColorThemes" 
                :key="colorTheme"
                @click="changeColorTheme(colorTheme)"
            >
                {{ text[`buttonTheme${index+1}`] }}
            </button>

        </div>
        <div class="button-list">
            <button
                v-for="fontSize in availavleFontSizes"
                :key="fontSize"
                @click="changeFontSize(fontSize)"
            >
            {{ `${text.buttonFontSize} ${fontSize}x` }}
        </button>
    </div>
    </main>
    <FooterLayout />
</template>

<script setup lang="js">
import { storeToRefs } from 'pinia'

import { useLanguageStore } from '@/stores/languageStore'
import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import FooterLayout from '@/components/layout/FooterLayout.vue'

const languageStore = useLanguageStore()

const { PersonalizationView: text } = storeToRefs(languageStore)

import { availableColorThemes, changeColorTheme } from './changeColorTheme'
import { availavleFontSizes, changeFontSize } from './changeFontSize'

</script>

<style scoped>
.button-list {
    display: flex;
    height: 30px;
    gap: 20px;
    padding: 20px;
}
</style>