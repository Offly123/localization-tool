<template>
    <main>
        <div>
            <input type="file">
            <p class="file-read-message">
                {{ userMessage }}
            </p>
        </div>
        <CodeEditorComponent />
    </main>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'

import CodeEditorComponent from '@/components/ui/CodeEditorComponent.vue'

const userMessage = ref<string | null>(null)

onMounted(() => {
    // TODO: добавить обработчик загрузки файла

    // const fileInput = document.querySelector('[type="file"]')

    // fileInput?.addEventListener('change', handleFileChoose)
})

// function handleFileChoose(event: Event) {
//     const inputElement: HTMLInputElement = event.target as HTMLInputElement
//     const file: Blob | null = inputElement.files && inputElement.files[0] as Blob
    
//     if (!file) {
//         userMessage.value = text.value.errorFileRead
//         return
//     }
//     // console.log('File type: ' + file.type)
//     // console.log(file.name)
    

//     if (!isSupportedFileType(file)) {
//         userMessage.value = text.value.errorUnsupportedFiletype
//         fileContent.value = null
//         leftInput.value = ''
//         rightInput.value = ''
//         return
//     } else {
//         userMessage.value = null
//     }

//     const reader = new FileReader()

//     reader.onload = () => {
//         leftInput.value = reader.result as string
//         // rightInput.value = reader.result as string
//         setTimeout(adjustHeight, 10)
//     }
//     reader.onerror = () => {
//         userMessage.value = text.value.errorFileRead
//     }
//     reader.readAsText(file)
// }

// function isSupportedFileType(file: Blob) {

//     if (file.type.startsWith('text')) {
//         return true
//     }
    
//     if (file.type === 'application/json') {
//         return true
//     }

//     return false
// }

</script>

<style scoped>

body {
    overflow: hidden;
}

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
</style>