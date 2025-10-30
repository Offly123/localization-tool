import { AvailableLanguages, type AvailableLanguagesType } from '@/languages/availableLanguages'

export type localizedJSONType = {
    [key: string]: string | localizedJSONType
}

export default async function getLocalizedJSON(languageCode: string): Promise<localizedJSONType> {   
    
    const safeLanguageCode = Object.values(AvailableLanguages)
        .includes(languageCode as AvailableLanguagesType)
        ? (languageCode as AvailableLanguagesType)
        : AvailableLanguages.en

    try {
        const { default: data } = await import(`./${safeLanguageCode}.json`)
        return data
    } catch(err) {
        console.error('localized JSON missing');
        console.error(err)
        alert('This page is not translated to that language yet')
        const { default: data } = await import(`./en.json`)
        return data
    }
}
