import { useLayoutEffect } from 'react'

export function useSyncRef(source, targetRef) {
  useLayoutEffect(() => {
    if (source && source.ref && targetRef) {
      source.ref.current = targetRef.current
      return () => {
        if (source.ref) {
          source.ref.current = null
        }
      }
    }
  })
}
