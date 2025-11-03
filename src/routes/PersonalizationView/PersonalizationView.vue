<template>
    <HeaderLayout />
    <main v-if="!text">
        Loading text...
    </main>
    <main v-else>
        <h2>
            {{ text.h2 }}
        </h2>
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
main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 10px;
}

main > h2 {
    text-align: center;
    overflow: hidden;
}
main > .button-list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    gap: 20px;
}
</style>