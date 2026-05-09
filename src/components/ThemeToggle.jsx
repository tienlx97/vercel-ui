'use client'

import { useTheme } from '@/lib/next-themes/280036'
import { useSyncExternalStore } from 'react'

const emptyUnsubscribe = () => {}
const emptySubscribe = () => emptyUnsubscribe
const clientSnapshot = () => true
const serverSnapshot = () => false

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const mounted = useSyncExternalStore(emptySubscribe, clientSnapshot, serverSnapshot)

  return (
    <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      Current: {mounted ? theme : 'system'}
    </button>
  )
}
