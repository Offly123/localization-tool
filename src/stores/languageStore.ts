import { reactive, ref, watch, toRefs, onMounted } from "vue"
import { defineStore } from "pinia"

import getLocalizedJSON, { type localizedJSONType } from '@/languages/getLocalizedJSON'

export const useLanguageStore = defineStore('language', () => {
    const defaultLanguage = getBrowserLanguage()
    const languageCode = ref<string>(defaultLanguage)
    const localizedText = reactive<Record<string, localizedJSONType | null>>({
        // Временный костыль
        HomeView:  null,
        NotFound:  null,
        AboutView: null,
        HeaderLayout: null
    })

    onMounted(async () => {
        Object.assign(localizedText, await addNewLanguageJSON(languageCode.value))
    })

    // watch(localizedText, async () => {
    //     await new Promise(res => {setTimeout(res, 1000)})
    //     console.log({...localizedText.HomeView})
    //     console.log(languageCode.value)
    // })

    watch(languageCode, async () => {
        Object.assign(localizedText, await addNewLanguageJSON(languageCode.value))
    });// Semicolon lives matters
    (async (): Promise<void> => {})()


    return { languageCode, ...toRefs(localizedText) }
})

function getBrowserLanguage(): string {
    return navigator.language.split('-')[0] || 'en'
}

async function addNewLanguageJSON(languageCode: string): Promise<localizedJSONType> {
    const newJSON = await getLocalizedJSON(languageCode)
    return newJSON
}
