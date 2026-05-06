import { useCallback, useEffect, useRef } from 'react'

export function useGlobalListeners() {
  const listenersRef = useRef(new Map())

  const addGlobalListener = useCallback(
    (eventTarget, type, fn, options) => {
      const wrappedFn = options?.once
        ? (...args) => {
            listenersRef.current.delete(fn)
            fn(...args)
          }
        : fn

      listenersRef.current.set(fn, {
        type,
        eventTarget,
        fn: wrappedFn,
        options,
      })

      eventTarget.addEventListener(type, wrappedFn, options)
    },
    [],
  )

  const removeGlobalListener = useCallback(
    (eventTarget, type, fn, options) => {
      const registered = listenersRef.current.get(fn)
      const actualFn = registered?.fn || fn

      eventTarget.removeEventListener(type, actualFn, options)
      listenersRef.current.delete(fn)
    },
    [],
  )

  const removeAllGlobalListeners = useCallback(() => {
    listenersRef.current.forEach((listener, originalFn) => {
      removeGlobalListener(
        listener.eventTarget,
        listener.type,
        originalFn,
        listener.options,
      )
    })
  }, [removeGlobalListener])

  useEffect(() => removeAllGlobalListeners, [removeAllGlobalListeners])

  return {
    addGlobalListener,
    removeAllGlobalListeners,
  }
}
