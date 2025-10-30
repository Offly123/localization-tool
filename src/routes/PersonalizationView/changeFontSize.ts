export const availavleFontSizes = [
    1, 1.1, 1.2, 1.3, 1.4, 1.5
]

export function changeFontSize(fontSizeMultiplier: string) {
    document.body.style.setProperty('--font-size-multiplier', fontSizeMultiplier)
    window.localStorage.setItem('fontSize', fontSizeMultiplier)
}