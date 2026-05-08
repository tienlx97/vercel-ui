import { ThemeScript } from '@/hooks/280036'

const themeClassNames = {
  light: 'light-theme',
  dark: 'dark-theme',
}

export function GeistThemeScript({ storageKey = 'geist-theme', ...themeScriptProps }) {
  return (
    <ThemeScript
      attribute="class"
      storageKey={storageKey}
      forcedTheme={themeScriptProps.forcedTheme}
      defaultTheme={themeScriptProps.defaultTheme}
      value={themeClassNames}
    />
  )
}
