import { useCallback } from 'react'
import { getOwnerDocument } from '@/geist/utils/496255'
import { getActiveElement, getEventTarget } from '@/geist/utils/755167'
import { useSyntheticBlurEvent } from './335886'

export function useFocus(options) {
  const { isDisabled, onFocus, onBlur, onFocusChange } = options

  const handleBlur = useCallback(
    (event) => {
      if (event.target !== event.currentTarget) {
        return
      }

      if (onBlur) {
        onBlur(event)
      }

      if (onFocusChange) {
        onFocusChange(false)
      }

      return true
    },
    [onBlur, onFocusChange]
  )

  const triggerSyntheticBlurHandling = useSyntheticBlurEvent(handleBlur)

  const handleFocus = useCallback(
    (event) => {
      const ownerDocument = getOwnerDocument(event.target)
      const activeElement = ownerDocument ? getActiveElement(ownerDocument) : getActiveElement()

      if (
        event.target === event.currentTarget &&
        activeElement === getEventTarget(event.nativeEvent)
      ) {
        if (onFocus) {
          onFocus(event)
        }

        if (onFocusChange) {
          onFocusChange(true)
        }

        triggerSyntheticBlurHandling(event)
      }
    },
    [onFocus, onFocusChange, triggerSyntheticBlurHandling]
  )

  return {
    focusProps: {
      onFocus: !isDisabled && (onFocus || onFocusChange || onBlur) ? handleFocus : undefined,
      onBlur: !isDisabled && (onBlur || onFocusChange) ? handleBlur : undefined,
    },
  }
}
