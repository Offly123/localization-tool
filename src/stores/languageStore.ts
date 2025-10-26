import { reactive, ref, watch, toRefs } from "vue"
import { defineStore } from "pinia"

import getLocalizedJSON, { type localizedJSONType } from '@/languages/getLocalizedJSON'

export const useLanguageStore = defineStore('language', () => {
    const defaultLanguage = getBrowserLanguage()
    const languageCode = ref<string>(defaultLanguage)
    const localizedText = reactive<
        Record<
            string, 
            Promise<localizedJSONType> | localizedJSONType | null
        >
    >({
        // Временный костыль
        HomeView:  null,
        NotFound:  null,
        AboutView: null
    })

    let componentName: string = "";
    async function init(passedName: string): Promise<void> {
        componentName = passedName;
        localizedText[componentName] = await setNewLanguageJSON(componentName, languageCode.value)
    }

    watch(languageCode, async () => {
        localizedText[componentName] = await setNewLanguageJSON(componentName, languageCode.value)
    });// Semicolon lives matters
    (async (): Promise<void> => {})()


    return { languageCode, ...toRefs(localizedText), init }
})

function getBrowserLanguage(): string {
    return navigator.language.split('-')[0] || 'en'
}

async function setNewLanguageJSON(componentName: string, languageCode: string): Promise<localizedJSONType> {
    const newJSON = await getLocalizedJSON(componentName, languageCode)
    return newJSON
}
