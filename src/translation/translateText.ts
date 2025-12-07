import { pipeline } from "@huggingface/transformers"

import type { TranslationOutput, TranslationPipeline } from "@huggingface/transformers"
import type { AvailableTranslateLanguages } from "@/stores/codeEditorStore"


export async function getTranslator(
    sourceLanguage: AvailableTranslateLanguages,
    targetLanguage: AvailableTranslateLanguages
): Promise<TranslationPipeline | undefined> {
    const stopWaiter = createWaiter('Loading model...', 2000)

    console.time('loading model')
    console.time('overall')

    try {   
        const translator = await pipeline(
            'translation', 
            `Xenova/opus-mt-${sourceLanguage}-${targetLanguage}`, 
            { 
                cache_dir: `./opus-mt-${sourceLanguage}-${targetLanguage}`, 
                device: 'gpu',
                dtype: 'auto'
            }
        )

        stopWaiter()
        return translator
    } catch(err) {
        console.error(err)
        stopWaiter()
        return undefined
    } finally {
        
    }
}

export async function getTranslatedText(
    translator: TranslationPipeline,
    sourceText: string | string[], 
): Promise<Partial<Record<'error' | 'translatedText', string>>[]> {

    const stopWaiter2 = createWaiter('Model loaded, translating text...', 2000)

    let translationResult: TranslationOutput | TranslationOutput[] | undefined

    try {
        translationResult = await translator(sourceText)
    } catch(err) {
        console.error(err)
        const error = err as Error
        return [{ 'error': error.message }]
    } finally {
        stopWaiter2()
    }

    console.log('Text succesfully translated!')
    console.timeEnd('translating')
    console.timeEnd('overall')

    // console.log(translationResult)
    // return

    const translatedText: Record<'translatedText', string>[] = translationResult.map((sentence) => {
        // TODO: разобраться как типы работают, 
        // в данный момент выглядит так, будто это массив массивов
        // translator возвращает TranslationOutput | TranslationOutput[], а
        // TranslationOutput это TranslationSingle[]
        return { translatedText: sentence.translation_text }
    })

    console.log('returned value:', translatedText)
    
    return translatedText
}

function createWaiter(message: string, interval: number): () => void {
    const intervalId = setInterval(() => {
        console.log(message)
    }, interval)
    return () => {
        clearInterval(intervalId)
    }
}