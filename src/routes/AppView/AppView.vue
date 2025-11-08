<template>
    <main>
        <input type="file">
        <div class="file-read-message">
            {{ userMessage }}
        </div>
        <div ref="codeEditor" class="code-editor">
            <textarea 
            ref="leftTextarea"
            @input="(event) => { 
                updateOtherTextarea(event) 
                setFileContent(event) 
                adjustHeight()
            }"
            v-model="leftInput"
            class="input-left" 
            spellcheck="false"
            ></textarea>
            <textarea
            ref="rightTextarea"
            @input="(event) => { 
                updateOtherTextarea(event) 
                setFileContent(event) 
                adjustHeight()
            }"
            v-model="rightInput"
            class="input-right" 
            spellcheck="false"
            ></textarea>
        </div>
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef, type ModelRef } from 'vue'
import { storeToRefs } from 'pinia'

import { useLanguageStore } from '@/stores/languageStore'

const languageStore = useLanguageStore()
const { AppView: text } = storeToRefs(languageStore)

const fileContent = ref()
const userMessage = ref()

const leftInput: ModelRef<string | undefined, string, string | undefined, string> = defineModel('leftInput')
const rightInput: ModelRef<string | undefined, string, string | undefined, string> = defineModel('rightInput')

const leftTextarea = useTemplateRef('leftTextarea')
const rightTextarea = useTemplateRef('rightTextarea')

onMounted(() => {
    const fileInput = document.querySelector('[type="file"]')

    fileInput?.addEventListener('change', handleFileChoose)
})

function handleFileChoose(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement
    const file: Blob | null = inputElement.files && inputElement.files[0] as Blob
    
    if (!file) {
        userMessage.value = text.value.errorFileRead
        return
    }
    // console.log('File type: ' + file.type)
    // console.log(file.name)
    

    if (!isSupportedFileType(file)) {
        userMessage.value = text.value.errorUnsupportedFiletype
        fileContent.value = null
        return
    } else {
        userMessage.value = null
    }

    const reader = new FileReader()

    reader.onload = () => {
        leftInput.value = reader.result as string
        rightInput.value = reader.result as string
        setTimeout(adjustHeight, 100)
    }
    reader.onerror = () => {
        userMessage.value = text.value.errorFileRead
    }
    reader.readAsText(file)
}

function isSupportedFileType(file: Blob) {

    if (file.type.startsWith('text')) {
        return true
    }
    
    if (file.type === 'application/json') {
        return true
    }

    return false
}

function setFileContent(event: Event) {
    const textareaTarget = event.target as HTMLTextAreaElement
    fileContent.value = textareaTarget.value
    rightInput.value = textareaTarget.value
}

function adjustHeight() {
    // console.log('adjust')

    if (!leftTextarea.value || !rightTextarea.value) {
        return
    }

    leftTextarea.value.style.height = 'auto'
    rightTextarea.value.style.height = 'auto'

    const scrollHeight = leftTextarea.value.scrollHeight
    const getPadding = (element: HTMLElement): number => {
        return Number(window.getComputedStyle(element).getPropertyValue('--padding').split('px')[0]) || 0;
    }
    const padding = getPadding(leftTextarea.value)
    // console.log('scrollHeight: ', scrollHeight)

    leftTextarea.value.style.height = scrollHeight - 2 * padding + 'px'
    rightTextarea.value.style.height = scrollHeight - 2 * padding + 'px'
}

function updateOtherTextarea(event: Event) {
    const textareaTarget = event.target as HTMLTextAreaElement
    leftInput.value = textareaTarget.value
    rightInput.value = textareaTarget.value
}
</script>

<style scoped>
main {
    display: flex;
    height: calc(100dvh - 2 * var(--padding));
    flex-direction: column;
    min-height: 100%;
    --input-height: calc(1.5 * var(--font-size-visible));
    /* flex-grow: 1; */
    background-color: var(--bg-dark);
}

main > input {
    height: calc(1.5 * var(--font-size-visible));
}

main > .file-read-message {
    height: calc(1.5 * var(--font-size-visible));
}

main > .code-editor {
    height: calc(100% - var(--input-height));
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
    overflow-y: scroll;
}

.code-editor > textarea {
    display: block;
    background-color: var(--bg-medium);
    text-wrap: nowrap;
    overflow-y: hidden;
    font-weight: bold;
    --padding: 10px;
    padding: var(--padding);
    height: calc(100% - 2 * var(--padding));
    width: calc(50% - 2 * var(--padding))
}
</style>