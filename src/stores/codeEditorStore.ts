import { ref, reactive, watch } from "vue"
import { defineStore } from "pinia"

export type AvailableTranslateLanguages = 'en' | 'ru' | 'zh' | 'it'

export const useCodeEditorStore = defineStore("codeEditorStore", () => {

    const sourceLanguage = ref<AvailableTranslateLanguages>('ru')
    const sourceText = ref<string | null>(null)
    
    const activeTargetLanguage = ref<AvailableTranslateLanguages | null>(null)
    const translatedTexts = reactive<Partial<Record<AvailableTranslateLanguages, string>>>({})

    watch(translatedTexts, () => {
        // console.log("changed to:", translatedTexts)
    })

    watch(sourceLanguage, () => {
        // console.log("source lang changed to:", sourceLanguage.value)
    })

    return { sourceLanguage, sourceText, translatedTexts, activeTargetLanguage }
})