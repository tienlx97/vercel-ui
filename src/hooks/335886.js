import { useCallback, useEffectEvent, useLayoutEffect, useRef } from 'react'
import { getOwnerWindow } from '@/utils/496255'

// eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
let ignoreFocusEvent = false

function focusWithoutScrolling(element) {
  element?.focus?.({ preventScroll: true })
}

export function createSyntheticEvent(event) {
  event.nativeEvent = event
  event.isDefaultPrevented = () => event.defaultPrevented
  event.isPropagationStopped = () => event.cancelBubble
  event.persist = () => {}
  return event
}

export function setEventTarget(event, target) {
  Object.defineProperty(event, 'target', { value: target })
  Object.defineProperty(event, 'currentTarget', { value: target })
}

export function useSyntheticBlurEvent(onBlur) {
  const stateRef = useRef({
    isFocused: false,
    observer: null,
  })

  useLayoutEffect(() => {
    const state = stateRef.current
    return () => {
      if (state.observer) {
        state.observer.disconnect()
        state.observer = null
      }
    }
  }, [])

  const stableOnBlur = useEffectEvent((event) => {
    if (onBlur) {
      onBlur(event)
    }
  })

  return useCallback((event) => {
    const target = event.target

    if (
      target instanceof HTMLButtonElement
      || target instanceof HTMLInputElement
      || target instanceof HTMLTextAreaElement
      || target instanceof HTMLSelectElement
    ) {
      stateRef.current.isFocused = true

      target.addEventListener('focusout', (nativeEvent) => {
        stateRef.current.isFocused = false

        if (target.disabled) {
          stableOnBlur(createSyntheticEvent(nativeEvent))
        }

        if (stateRef.current.observer) {
          stateRef.current.observer.disconnect()
          stateRef.current.observer = null
        }
      }, { once: true })

      stateRef.current.observer = new MutationObserver(() => {
        if (stateRef.current.isFocused && target.disabled) {
          stateRef.current.observer?.disconnect()
          stateRef.current.observer = null

          const blurEvent = new FocusEvent('blur')
          setEventTarget(blurEvent, target)
          stableOnBlur(createSyntheticEvent(blurEvent))
        }
      })

      stateRef.current.observer.observe(target, {
        attributes: true,
        attributeFilter: ['disabled'],
      })
    }
  }, [stableOnBlur])
}

function isFocusable(element) {
  if (!element?.matches) {
    return false
  }

  return element.matches(
    [
      'input:not([disabled]):not([type=hidden])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'a[href]',
      'area[href]',
      'summary',
      'iframe',
      'object',
      'embed',
      'audio[controls]',
      'video[controls]',
      '[contenteditable]:not([contenteditable^=\'false\'])',
      '[tabindex]:not([disabled]):not([hidden])',
    ].join(','),
  )
}

export function preventFocus(target) {
  let focusableTarget = target

  while (focusableTarget && !isFocusable(focusableTarget)) {
    focusableTarget = focusableTarget.parentElement
  }

  const ownerWindow = getOwnerWindow(focusableTarget)
  const activeElement = ownerWindow.document.activeElement

  if (!activeElement || activeElement === focusableTarget) {
    return
  }

  let didRestoreFocus = false
  ignoreFocusEvent = true

  const onBlur = (event) => {
    if (event.target === activeElement || didRestoreFocus) {
      event.stopImmediatePropagation()
    }
  }

  const onFocusOut = (event) => {
    if (event.target === activeElement || didRestoreFocus) {
      event.stopImmediatePropagation()

      if (!focusableTarget || didRestoreFocus) {
        return
      }

      didRestoreFocus = true
      focusWithoutScrolling(activeElement)
      // eslint-disable-next-line no-use-before-define
      cleanup()
    }
  }

  const onFocus = (event) => {
    if (event.target === focusableTarget || didRestoreFocus) {
      event.stopImmediatePropagation()
    }
  }

  const onFocusIn = (event) => {
    if (event.target === focusableTarget || didRestoreFocus) {
      event.stopImmediatePropagation()

      if (!didRestoreFocus) {
        didRestoreFocus = true
        focusWithoutScrolling(activeElement)
        // eslint-disable-next-line no-use-before-define
        cleanup()
      }
    }
  }

  ownerWindow.addEventListener('blur', onBlur, true)
  ownerWindow.addEventListener('focusout', onFocusOut, true)
  ownerWindow.addEventListener('focusin', onFocusIn, true)
  ownerWindow.addEventListener('focus', onFocus, true)

  const cleanup = () => {
    // eslint-disable-next-line no-use-before-define
    cancelAnimationFrame(cleanupFrame)
    ownerWindow.removeEventListener('blur', onBlur, true)
    ownerWindow.removeEventListener('focusout', onFocusOut, true)
    ownerWindow.removeEventListener('focusin', onFocusIn, true)
    ownerWindow.removeEventListener('focus', onFocus, true)
    ignoreFocusEvent = false
    didRestoreFocus = false
  }

  const cleanupFrame = requestAnimationFrame(cleanup)
  return cleanup
}
