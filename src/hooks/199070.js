import { useCallback, useRef } from 'react'
import { getOwnerDocument } from '@/utils/496255'
import { getActiveElement, getEventTarget, nodeContains } from '@/utils/755167'
import { createSyntheticEvent, setEventTarget, useSyntheticBlurEvent } from './335886'
import { useGlobalListeners } from './489842'

export function useFocusWithin(options) {
  const {
    isDisabled,
    onBlurWithin,
    onFocusWithin,
    onFocusWithinChange,
  } = options

  const focusWithinState = useRef({ isFocusWithin: false })
  const {
    addGlobalListener,
    removeAllGlobalListeners,
  } = useGlobalListeners()

  const handleBlurWithin = useCallback((event) => {
    const container = event.currentTarget

    if (
      container.contains(event.target)
      && focusWithinState.current.isFocusWithin
      && !container.contains(event.relatedTarget)
    ) {
      focusWithinState.current.isFocusWithin = false
      removeAllGlobalListeners()

      if (onBlurWithin) {
        onBlurWithin(event)
      }

      if (onFocusWithinChange) {
        onFocusWithinChange(false)
      }
    }
  }, [onBlurWithin, onFocusWithinChange, removeAllGlobalListeners])

  const triggerSyntheticBlurHandling
    = useSyntheticBlurEvent(handleBlurWithin)

  const handleFocusWithin = useCallback((event) => {
    const container = event.currentTarget

    if (!container.contains(event.target)) {
      return
    }

    const ownerDocument = getOwnerDocument(event.target)
    const activeElement = getActiveElement(ownerDocument)

    if (
      !focusWithinState.current.isFocusWithin
      && activeElement === getEventTarget(event.nativeEvent)
    ) {
      if (onFocusWithin) {
        onFocusWithin(event)
      }

      if (onFocusWithinChange) {
        onFocusWithinChange(true)
      }

      focusWithinState.current.isFocusWithin = true
      triggerSyntheticBlurHandling(event)

      addGlobalListener(
        ownerDocument,
        'focus',
        (nativeFocusEvent) => {
          if (
            focusWithinState.current.isFocusWithin
            && !nodeContains(container, nativeFocusEvent.target)
          ) {
            const syntheticBlur = new ownerDocument.defaultView.FocusEvent(
              'blur',
              { relatedTarget: nativeFocusEvent.target },
            )

            setEventTarget(syntheticBlur, container)
            handleBlurWithin(createSyntheticEvent(syntheticBlur))
          }
        },
        { capture: true },
      )
    }
  }, [
    addGlobalListener,
    handleBlurWithin,
    onFocusWithin,
    onFocusWithinChange,
    triggerSyntheticBlurHandling,
  ])

  if (isDisabled) {
    return {
      focusWithinProps: {
        onFocus: undefined,
        onBlur: undefined,
      },
    }
  }

  return {
    focusWithinProps: {
      onFocus: handleFocusWithin,
      onBlur: handleBlurWithin,
    },
  }
}
