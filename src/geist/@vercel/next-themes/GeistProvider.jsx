'use client'

import { ThemeProvider, useTheme } from './280036'
import { TooltipProvider } from '@/geist/Provider/908453'
import { useSelectedLayoutSegments } from 'next/navigation'
import { Suspense, useEffect } from 'react'

const themeClassNames = {
  light: 'light-theme',
  dark: 'dark-theme',
}

const metaThemeColors = {
  dashboard: {
    light: '#FFFFFF',
    dark: '#0A0A0A',
  },
  marketing: {
    light: '#FAFAFA',
    dark: '#000000',
  },
}

export function setMetaThemeColor({ color, setBackgroundColor }) {
  const metaTags = [...document.querySelectorAll('meta[name="theme-color"]')]

  if (metaTags.length === 0) {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'theme-color')
    document.head.append(meta)
    metaTags.push(meta)
  }

  for (const meta of metaTags) {
    meta.setAttribute('content', color)
  }

  if (setBackgroundColor) {
    document.documentElement.style.backgroundColor = color
  }
}

function getThemeColorContextFromSegments(segments) {
  if (segments === null || segments.length === 0) {
    return 'marketing'
  }

  for (const segment of segments) {
    if (segment.includes('dashboard')) {
      return 'dashboard'
    }

    if (segment.includes('auth')) {
      if (segments[1] === 'signup') {
        return 'marketing'
      }

      return 'dashboard'
    }

    if (segment.includes('(team)')) {
      return 'dashboard'
    }
  }

  return 'marketing'
}

export function useGetMetaThemeColor() {
  const { resolvedTheme, forcedTheme } = useTheme()
  const segments = useSelectedLayoutSegments()
  const context = getThemeColorContextFromSegments(segments)
  const colors = metaThemeColors[context]

  return {
    metaThemeColor: (forcedTheme ?? resolvedTheme) === 'dark' ? colors.dark : colors.light,
  }
}

const MetaThemeColorUpdater = ({ setBackgroundColor = true }) => {
  const { metaThemeColor } = useGetMetaThemeColor()

  useEffect(() => {
    setMetaThemeColor({
      color: metaThemeColor,
      setBackgroundColor,
    })
  }, [metaThemeColor, setBackgroundColor])

  return null
}

export function GeistProvider({
  children,
  storageKey = 'geist-theme',
  setBackgroundColor = true,
  withScript = true,
  setMetaThemeColor: shouldSetMetaThemeColor = true,
  ...themeProviderProps
}) {
  return (
    <>
      {/* GeistSans,
      GeistMono, */}
      <ThemeProvider
        attribute="class"
        disableTransitionOnChange
        storageKey={storageKey}
        value={themeClassNames}
        withScript={withScript}
        {...themeProviderProps}
      >
        {shouldSetMetaThemeColor ? (
          <Suspense>
            <MetaThemeColorUpdater setBackgroundColor={setBackgroundColor} />
          </Suspense>
        ) : null}

        <TooltipProvider>
          {children}
          {/* <ContextCardProvider>{children}</ContextCardProvider> */}
        </TooltipProvider>
      </ThemeProvider>
    </>
  )
}
