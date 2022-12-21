import darkThemeToken from './dark'
import lightThemeToken from './light'

const themeMapping:any = {
    dark: darkThemeToken,
    light: lightThemeToken
}

export function getTheme (themeKey: 'light'| 'dark' = 'light') {
    return themeMapping[themeKey]
}