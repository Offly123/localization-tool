<template>
    <textarea
    ref="textareaRef"
    v-model="modelValue"
    @input="handleInput"
    spellcheck="false"
    ></textarea>
</template>

<script setup lang="ts">

import { defineModel, useTemplateRef, watch, type ShallowRef } from 'vue'
import { storeToRefs } from 'pinia'

import { useCodeEditorStore } from '@/stores/codeEditorStore'


const codeEditorStore = useCodeEditorStore()
const { translatedTexts, activeTargetLanguage } = storeToRefs(codeEditorStore)
const {
    isSource = false,
} = defineProps<{
    // modelValue?: string,
    isSource?: boolean,
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string],
    'adjustHeight': [event: Event],
    'updateFileContent': [event: Event, isSource: boolean]
}>()



const textarea = useTemplateRef('textareaRef')
function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement
    const newText = target.value
    
    
    if (activeTargetLanguage.value) {
        translatedTexts.value[activeTargetLanguage.value] = newText
    }
    
    
    emit('adjustHeight', event)
    emit('updateFileContent', event, isSource)
}



const modelValue = defineModel<string>()
watch(modelValue, () => {
    // TODO: пофиксить неправильное изменение высоты
    // adjustHeight(textarea)
})

function adjustHeight(textarea: Readonly<ShallowRef<HTMLTextAreaElement | null>>): void {
    if (!textarea || !textarea.value) {
        return
    }

    const scrollHeight = textarea.value.scrollHeight

    const padding = getPaddingPx(textarea.value)

    textarea.value.style.height = scrollHeight - 2 * padding + 'px'
}

function getPaddingPx (element: HTMLElement): number {
    return Number(window.getComputedStyle(element).getPropertyValue('--padding').split('px')[0]) || 0;
}

</script>


<style scoped>
textarea {
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