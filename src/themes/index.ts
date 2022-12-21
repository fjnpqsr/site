import darkThemeToken from './dark';
import lightThemeToken from './light';

const themeMapping: any = {
    dark: darkThemeToken,
    light: lightThemeToken,
};

type themeKey = 'light' | 'dark';

export function getTheme(themeKey: themeKey = 'light') {
    return themeMapping[themeKey];
}
