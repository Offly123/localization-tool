<template>
    <div v-if="text" ref="codeEditor" class="code-editor">
        <!-- TODO: вынести select'ы в AppView -->
        <div class="language-parameters">
            <div class="label-select">
                <label for="sourceLanguage">{{ text.sourceLanguage }}</label>
                <select name="sourceLanguage" id="sourceLanguage">
                    <template v-for="language in ['ru', 'en', 'it', 'zh']" v-bind:key="language">
                        <option @click="selectSourceLanguage" :value="language">{{ language }}</option>
                    </template>
                </select>
            </div>
            
            <div class="label-select">
                <label for="targetLanguage">{{ text.targetLanguage }}</label>
                <select name="targetLanguage" id="targetLanguage">
                    <template v-for="language in ['ru', 'en', 'it', 'zh']" v-bind:key="language">
                        <option @click="addTargetLanguage" :value="language">{{ language }}</option>
                    </template>
                </select>
            </div>
        </div>

        <div class="target-language-select">
            <template v-for="language in targetLanguages" v-bind:key="language">
                <label :for="language">{{ language }}</label>
                <input :id="language" name="chooseTargetLanguage" type="radio" :value="language" @click="changeTargetLanguage">
            </template>
        </div>

        <div class="textareas">

            <CodeEditorTextarea 
            v-model="leftInput"
            :is-source="true"
            @update-file-content="updateFileContent"
            />

            <CodeEditorTextarea
            v-if="targetLanguages.length"
            v-model="rightInput"
            @update-file-content="updateFileContent"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type ModelRef, defineModel } from 'vue'

import CodeEditorTextarea from '@/components/ui/CodeEditorTextarea.vue'


import type { TranslationPipeline } from '@huggingface/transformers'
import { getTranslatedText, getTranslator } from '@/translation/translateText'
import { useCodeEditorStore, type AvailableTranslateLanguages } from '@/stores/codeEditorStore'



import { storeToRefs } from 'pinia'
import { useLanguageStore } from '@/stores/languageStore'

const languageStore = useLanguageStore()
const { AppView: text } = storeToRefs(languageStore)



const codeEditorStore = useCodeEditorStore()
const { sourceLanguage, sourceText, translatedTexts, activeTargetLanguage } = storeToRefs(codeEditorStore)

// const fileContent = ref()
// const userMessage = ref()

const leftInput: ModelRef<string | undefined, string, string | undefined, string> = defineModel('leftInput')
const rightInput: ModelRef<string | undefined, string, string | undefined, string> = defineModel('rightInput')

const targetLanguages = ref<AvailableTranslateLanguages[]>([])

let translator: TranslationPipeline | undefined = undefined

function selectSourceLanguage(event: Event) {
    const selectTarget = event.target as HTMLSelectElement

    sourceLanguage.value = selectTarget.value as AvailableTranslateLanguages
}

async function addTargetLanguage(event: Event) {
    const selectTarget = event.target as HTMLSelectElement
    const newLanguage = selectTarget.value as AvailableTranslateLanguages


    targetLanguages.value.push(newLanguage)
    activeTargetLanguage.value = newLanguage

    if (!sourceText.value || sourceText.value === "") {
        return
    }

    translator = await getTranslator(sourceLanguage.value, newLanguage)

    if (!translator) {
        return
    }

    const translationResult = (await getTranslatedText(
        translator,
        sourceText.value,
    ))[0]

    if (translationResult?.error) {
        console.log(translationResult.error)
        return
    }

    translatedTexts.value[newLanguage] = translationResult?.translatedText
    // console.log(translatedTexts.value[newLanguage])


    rightInput.value = translatedTexts.value[newLanguage] ? translatedTexts.value[newLanguage] : ''
}

function changeTargetLanguage(event: Event) {
    const target = event.target as HTMLOptionElement
    const newLanguage = target.value as AvailableTranslateLanguages

    if (!translatedTexts.value[newLanguage]) {
        return
    }
    rightInput.value = translatedTexts.value[newLanguage]

    activeTargetLanguage.value = newLanguage
}

function updateFileContent(event: Event, isSource: boolean) {
    const textareaTarget = event.target as HTMLTextAreaElement

    const newText = textareaTarget.value

    if (isSource) {
        sourceText.value = newText
        return
    }


}

</script>

<style scoped>
.code-editor {
    height: calc(100% - var(--input-height));
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.code-editor > select {
    width: 50%;
}

.code-editor > .language-parameters {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.language-parameters > .label-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    --padding: 5px;
    padding: var(--padding);
    width: calc(160px - 2 * var(--padding));
}

.code-editor > .target-language-select {
    display: flex;
    flex-direction: row;
    align-items: center;
    --margin-gap: 10px;
    margin: var(--margin-gap) 0;
    gap: var(--margin-gap);
    transform: translateX(calc(100% + var(--margin-gap)));
    width: calc(50% - var(--margin-gap) / 2);
}

.target-language-select > label {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bg-medium);
    --padding: 5px;
    padding: var(--padding);
    flex: 1;
    height: calc(100% - 2 * var(--padding));
}

.target-language-select > label:hover {
    background-color: var(--bg-light);
}

.target-language-select > input[type="radio"]:checked + label {
    /* background-color: green; */
}

.target-language-select > input {
    display: none;
}

.code-editor > .textareas {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    overflow-y: scroll;
}
</style>