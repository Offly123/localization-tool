import { PossibleLanguages } from '@/stores/lang'

export default async function getLocalizedJSON(language: PossibleLanguages): Promise<Record<string, string>> {
    let data: Record<string, string>

    // i'm sorry for that
    switch (language) {
        case PossibleLanguages.RU:
            data = await import('./HomeView/lang/ru.json') as any as Record<string, string>
            break
        case PossibleLanguages.EN:
            data = await import('./HomeView/lang/en.json') as any as Record<string, string>
            break
        default:
            data = await import('./HomeView/lang/en.json') as any as Record<string, string>
            break
    }

    return data
}
