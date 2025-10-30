export const availableColorThemes = [
    'default', 'dark', 'green', 'green-dark'
]

export function changeColorTheme(theme: string): void {
    document.body.className = theme
    window.localStorage.setItem('theme', theme)
}