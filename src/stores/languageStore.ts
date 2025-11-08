import { reactive, ref, watch, toRefs, onMounted, type Ref } from "vue"
import { defineStore } from "pinia"

import getLocalizedJSON, { type localizedJSONType } from '@/languages/getLocalizedJSON'



interface LanguageStoreReturn {
    languageCode: Ref<string>,
    HomeView: Ref<localizedJSONType>,
    NotFound: Ref<localizedJSONType>,
    AboutView: Ref<localizedJSONType>,
    HeaderLayout: Ref<localizedJSONType>,
    NavbarLayout: Ref<localizedJSONType>,
    PersonalizationView: Ref<localizedJSONType>,
    FooterLayout: Ref<localizedJSONType>,
    AppView: Ref<localizedJSONType>,
}

export const useLanguageStore = defineStore('languageStore', () => {
    const defaultLanguage = getDefaultLanguage()
    const languageCode = ref<string>(defaultLanguage)
    const localizedText = reactive<Record<string, localizedJSONType | null>>({
        // Временный костыль
        HomeView:  null,
        NotFound:  null,
        AboutView: null,
        HeaderLayout: null,
        NavbarLayout: null,
        PersonalizationView: null,
        FooterLayout: null,
        AppView: null
    })

    onMounted(async () => {
        console.log('onmount')
        Object.assign(localizedText, await getNewLanguageJSON(languageCode.value))
    })

    watch(languageCode, async () => {
        window.localStorage.setItem('language', languageCode.value)
        Object.assign(localizedText, await getNewLanguageJSON(languageCode.value))
    });// Semicolon lives matters
    (() => {})()


    // return { languageCode, ...toRefs(localizedText) }
    return { languageCode, ...toRefs(localizedText) } as LanguageStoreReturn
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
