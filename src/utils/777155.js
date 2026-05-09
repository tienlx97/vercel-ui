'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { canPrefetch } from './939051'

export function usePrefetchProps({ href, prefetch, prefetchStrategy, isDifferentZone }) {
  const router = useRouter()

  const isPrefetchable = href && canPrefetch(href)

  const shouldPrefetchWhenVisible =
    prefetchStrategy === 'visible' &&
    !isDifferentZone &&
    isPrefetchable &&
    process.env.NEXT_PUBLIC_TESTSERVER !== 'true'

  const prefetchOnHover = React.useCallback(() => {
    if (typeof href === 'string') {
      router.prefetch(href)
    }
  }, [href, router])

  return {
    onMouseEnter: prefetchStrategy === 'hover' && isPrefetchable ? prefetchOnHover : undefined,

    prefetch: Boolean(shouldPrefetchWhenVisible) && prefetch,
  }
}
