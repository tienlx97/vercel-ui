'use client'

import React, { useContext } from 'react'

const ThemeContext = React.createContext(undefined)

const fallbackThemeContext = {
  setTheme: () => {},
  themes: [],
}

export function useTheme() {
  return React.useContext(ThemeContext) ?? fallbackThemeContext
}

function saveToLocalStorage(storageKey, theme) {
  try {
    localStorage.setItem(storageKey, theme)
  } catch (error) {
    console.error('[next-themes.saveToLS] Error saving to localStorage', error)
  }
}

function getStoredTheme(storageKey, fallbackTheme) {
  let storedTheme

  try {
    storedTheme = localStorage.getItem(storageKey) || undefined
  } catch {
    // localStorage có thể lỗi trong private mode, SSR-like env, hoặc bị browser chặn.
  }

  return storedTheme || fallbackTheme
}

const SYSTEM_DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)'

function getSystemTheme(mediaQueryListOrEvent) {
  // const mediaQuery = mediaQueryListOrEvent || window.matchMedia(SYSTEM_DARK_MEDIA_QUERY)

  const mediaQuery =
    mediaQueryListOrEvent ||
    // eslint-disable-next-line unicorn/prefer-global-this, unicorn/no-negated-condition
    (typeof window !== 'undefined' ? window.matchMedia(SYSTEM_DARK_MEDIA_QUERY) : null)

  return mediaQuery?.matches ? 'dark' : 'light'
}

let disableTransitionsSheet = null

function disableTransitions(nonce) {
  let styleElement

  if ('adoptedStyleSheets' in document) {
    if (!disableTransitionsSheet) {
      disableTransitionsSheet = new CSSStyleSheet()

      disableTransitionsSheet.replaceSync(`
        .disable-transitions *,
        .disable-transitions *::before,
        .disable-transitions *::after {
          -webkit-transition: none !important;
          -moz-transition: none !important;
          -o-transition: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }
      `)

      document.adoptedStyleSheets = [...document.adoptedStyleSheets, disableTransitionsSheet]
    }

    document.documentElement.classList.add('disable-transitions')

    return function restoreTransitions() {
      globalThis.getComputedStyle(document.body)

      setTimeout(() => {
        document.documentElement.classList.remove('disable-transitions')
      }, 0)
    }
  }

  styleElement = document.createElement('style')

  if (nonce) {
    styleElement.setAttribute('nonce', nonce)
  }

  styleElement.append(
    document.createTextNode(
      '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'
    )
  )

  document.head.append(styleElement)

  return function restoreTransitions() {
    globalThis.getComputedStyle(document.body)

    setTimeout(() => {
      styleElement.remove()
    }, 0)
  }
}

function ThemeProviderInner({
  withScript = true,
  forcedTheme,
  disableTransitionOnChange = false,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = 'theme',
  themes = ['light', 'dark'],
  defaultTheme = enableSystem ? 'system' : 'light',
  attribute = 'data-theme',
  value,
  children,
  nonce,
  scriptProps,
}) {
  const [theme, setThemeState] = React.useState(() => getStoredTheme(storageKey, defaultTheme))

  const [systemTheme, setSystemTheme] = React.useState(() =>
    theme === 'system' ? getSystemTheme() : theme
  )

  const domThemeValues = value ? Object.values(value) : themes

  const applyTheme = React.useCallback(
    (nextTheme) => {
      if (!nextTheme) return

      let resolvedTheme = nextTheme

      if (nextTheme === 'system' && enableSystem) {
        resolvedTheme = getSystemTheme()
      }

      const domValue = value ? value[resolvedTheme] : resolvedTheme
      const root = document.documentElement

      const cleanupTransitions = disableTransitionOnChange ? disableTransitions(nonce) : null

      const applyAttribute = (attr) => {
        if (attr === 'class') {
          root.classList.remove(...domThemeValues)
          if (domValue) root.classList.add(domValue)
          return
        }

        if (attr.startsWith('data-')) {
          if (domValue) root.setAttribute(attr, domValue)
          else root.removeAttribute(attr)
        }
      }

      if (Array.isArray(attribute)) {
        // eslint-disable-next-line unicorn/no-array-callback-reference, unicorn/no-array-for-each
        attribute.forEach(applyAttribute)
      } else {
        applyAttribute(attribute)
      }

      if (enableColorScheme) {
        const fallbackColorScheme = ['light', 'dark'].includes(defaultTheme) ? defaultTheme : null

        const colorScheme = ['light', 'dark'].includes(resolvedTheme)
          ? resolvedTheme
          : fallbackColorScheme

        root.style.colorScheme = colorScheme ?? ''
      }

      cleanupTransitions?.()
    },
    [nonce]
  )

  const setTheme = React.useCallback((nextTheme) => {
    if (typeof nextTheme === 'function') {
      setThemeState((currentTheme) => {
        const computedTheme = nextTheme(currentTheme)
        saveToLocalStorage(storageKey, computedTheme)
        return computedTheme
      })
      return
    }

    setThemeState(nextTheme)
    saveToLocalStorage(storageKey, nextTheme)
  }, [])

  const handleSystemThemeChange = React.useCallback(
    (event) => {
      setSystemTheme(getSystemTheme(event))

      if (theme === 'system' && enableSystem && !forcedTheme) {
        applyTheme('system')
      }
    },
    [theme, forcedTheme]
  )

  React.useEffect(() => {
    // eslint-disable-next-line unicorn/prefer-global-this
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    media.addListener(handleSystemThemeChange)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleSystemThemeChange(media)

    return () => media.removeListener(handleSystemThemeChange)
  }, [handleSystemThemeChange])

  React.useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== storageKey) return

      if (event.newValue) {
        setThemeState(event.newValue)
      } else {
        setTheme(defaultTheme)
      }
    }

    // eslint-disable-next-line unicorn/prefer-global-this
    window.addEventListener('storage', handleStorage)
    return () => globalThis.removeEventListener('storage', handleStorage)
  }, [setTheme])

  React.useEffect(() => {
    applyTheme(forcedTheme ?? theme)
  }, [forcedTheme, theme])

  const contextValue = React.useMemo(
    () => ({
      theme,
      setTheme,
      forcedTheme,
      resolvedTheme: theme === 'system' ? systemTheme : theme,
      themes: enableSystem ? [...themes, 'system'] : themes,
      systemTheme: enableSystem ? systemTheme : undefined,
    }),
    [theme, setTheme, forcedTheme, systemTheme, enableSystem, themes]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {withScript ? (
        <ThemeScript
          forcedTheme={forcedTheme}
          storageKey={storageKey}
          attribute={attribute}
          enableSystem={enableSystem}
          enableColorScheme={enableColorScheme}
          defaultTheme={defaultTheme}
          value={value}
          themes={themes}
          nonce={nonce}
          scriptProps={scriptProps}
        />
      ) : null}
      {children}
    </ThemeContext.Provider>
  )
}

const COLOR_SCHEME_THEMES = new Set(['light', 'dark'])

function applyThemeBeforeHydration(
  attribute,
  storageKey,
  defaultTheme,
  forcedTheme,
  themes,
  valueMap,
  enableSystem,
  enableColorScheme
) {
  const root = document.documentElement

  function applyTheme(themeName) {
    const attributes = Array.isArray(attribute) ? attribute : [attribute]

    for (const attr of attributes) {
      const isClassAttribute = attr === 'class'
      const valuesToRemove =
        isClassAttribute && valueMap ? themes.map((theme) => valueMap[theme] || theme) : themes

      if (isClassAttribute) {
        root.classList.remove(...valuesToRemove)
        root.classList.add(valueMap?.[themeName] ?? themeName)
      } else {
        root.setAttribute(attr, themeName)
      }
    }

    if (enableColorScheme && COLOR_SCHEME_THEMES.has(themeName)) {
      root.style.colorScheme = themeName
    }
  }

  if (forcedTheme) {
    applyTheme(forcedTheme)
    return
  }

  try {
    const storedTheme = localStorage.getItem(storageKey) || defaultTheme
    const resolvedTheme =
      enableSystem && storedTheme === 'system'
        ? globalThis.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : storedTheme

    applyTheme(resolvedTheme)
  } catch {
    // Silent by design: theme script must not break page boot.
  }
}

export const ThemeScript = React.memo(function ThemeScript({
  forcedTheme,
  storageKey = 'theme',
  attribute = 'data-theme',
  enableSystem = true,
  enableColorScheme = true,
  defaultTheme = enableSystem ? 'system' : 'light',
  value,
  themes = ['light', 'dark'],
  // eslint-disable-next-line no-unused-vars
  nonce,
  scriptProps,
}) {
  const serializedArgs = JSON.stringify([
    attribute,
    storageKey,
    defaultTheme,
    forcedTheme,
    themes,
    value,
    enableSystem,
    enableColorScheme,
  ]).slice(1, -1)

  return (
    <script
      id="theme-script"
      {...scriptProps}
      suppressHydrationWarning
      nonce=""
      dangerouslySetInnerHTML={{
        __html: `(${applyThemeBeforeHydration.toString()})(${serializedArgs})`,
      }}
    />
  )
})

export function ThemeProvider(props) {
  const parentContext = useContext(ThemeContext)

  if (parentContext) {
    return <>{props.children}</>
  }

  return <ThemeProviderInner {...props} />
}
