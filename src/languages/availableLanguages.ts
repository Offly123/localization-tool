export { 
    AvailableLanguages, 
    type AvailableLanguagesType 
}

const AvailableLanguages = {
    ru: 'ru',
    en: 'en'
} as const

type AvailableLanguagesType = typeof AvailableLanguages[keyof typeof AvailableLanguages]
