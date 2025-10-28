import { AvailableLanguages, type AvailableLanguagesType } from '@/languages/availableLanguages'

export type localizedJSONType = {
    [key: string]: string | localizedJSONType
}

export default async function getLocalizedJSON(componentName: string, languageCode: string): Promise<localizedJSONType> {   
    
    const safeLanguageCode = Object.values(AvailableLanguages)
        .includes(languageCode as AvailableLanguagesType)
        ? (languageCode as AvailableLanguagesType)
        : AvailableLanguages.en

    try {
        const { default: data } = await import(`@/languages/${componentName}/${safeLanguageCode}.json`)
        return data
    } catch {
        // console.error('localized JSON missing');
        // console.error(`@/languages/${componentName}/${safeLanguageCode}.json`)
        alert('This page is not translated to that language yet')
        const { default: data } = await import(`@/languages/${componentName}/en.json`)
        return data
    }
}
