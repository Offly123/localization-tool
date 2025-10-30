import { reactive, ref, watch, toRefs, onMounted } from "vue"
import { defineStore } from "pinia"

import getLocalizedJSON, { type localizedJSONType } from '@/languages/getLocalizedJSON'

export const useLanguageStore = defineStore('languageStore', () => {
    const defaultLanguage = getDefaultLanguage()
    const languageCode = ref<string>(defaultLanguage)
    const localizedText = reactive<Record<string, localizedJSONType | null>>({
        // Временный костыль
        HomeView:  null,
        NotFound:  null,
        AboutView: null,
        HeaderLayout: null,
        PersonalizationView: null
    })

    onMounted(async () => {
        Object.assign(localizedText, await getNewLanguageJSON(languageCode.value))
    })

    watch(languageCode, async () => {
        window.localStorage.setItem('language', languageCode.value)
        Object.assign(localizedText, await getNewLanguageJSON(languageCode.value))
    });// Semicolon lives matters
    (() => {})()


    return { languageCode, ...toRefs(localizedText) }
})

function getDefaultLanguage(): string {

    const lastLanguage = window.localStorage.getItem('language')
    if (lastLanguage) {
        return lastLanguage
    }

    const browserLanguage = navigator.language.split('-')[0]
    if (browserLanguage) {
        return browserLanguage
    }

    return 'en'
}

async function getNewLanguageJSON(languageCode: string): Promise<localizedJSONType> {
    const newJSON = await getLocalizedJSON(languageCode)
    return newJSON
}
