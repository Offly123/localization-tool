import type { localizedJSONType } from './getLocalizedJSON'

export { 
    AvailableLanguages, 
    type AvailableComponentsType,
    type AvailableLanguagesType
}

const AvailableLanguages = {
    ru: 'ru',
    en: 'en'
} as const

type AvailableLanguagesType = 'ru' | 'en'

type AvailableComponentsType = {
    HomeView: Record<string, string | localizedJSONType>,
    AboutView: Record<string, string | localizedJSONType>,
    HeaderLayout: Record<string, string | localizedJSONType>,
    NavbarLayout: Record<string, string | localizedJSONType>,
    NotFound: Record<string, string | localizedJSONType>,
    PersonalizationView: Record<string, string | localizedJSONType>,
    AppView: Record<string, string | localizedJSONType>,
    FooterLayout: Record<string, string | localizedJSONType>,
}
