import { ref } from "vue";
import { defineStore } from "pinia";

export enum PossibleLanguages {
    'RU', 
    'EN'
}

export const languageStore = defineStore('language', () => {
    const language = ref(PossibleLanguages.EN)
    return { language }
})