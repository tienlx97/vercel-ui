import { useEffect } from 'react'
import { ignoreFocusEvent } from '@/geist/utils/335886'
import { getOwnerDocument, getOwnerWindow } from '@/geist/utils/496255'
import { isAndroid, isMac } from '@/geist/utils/717835'

let currentInteractionModality = null // "keyboard" | "pointer" | "virtual" | null
let hadEventBeforeFocus = false

export function isFocusVisible() {
  return currentInteractionModality !== 'pointer'
}

export function getInteractionModality() {
  return currentInteractionModality
}

let hadBlurRecently = false

const focusVisibleListeners = new Set()
const installedFocusWindows = new Map()

function notifyFocusVisibleListeners(modality, event) {
  for (const listener of focusVisibleListeners) {
    listener(modality, event)
  }
}

function isVirtualClick(event) {
  if (event.mozInputSource === 0 && event.isTrusted) {
    return true
  }

  if (isAndroid() && event.pointerType) {
    return event.type === 'click' && event.buttons === 1
  }

  return event.detail === 0 && !event.pointerType
}

function ensureFocusVisibilityTracking(scope) {
  if (
    typeof window === 'undefined' ||
    typeof document === 'undefined' ||
    installedFocusWindows.has(getOwnerWindow(scope))
  ) {
    return
  }

  const ownerWindow = getOwnerWindow(scope)
  const ownerDocument = getOwnerDocument(scope)
  const originalFocus = ownerWindow.HTMLElement.prototype.focus

  ownerWindow.HTMLElement.prototype.focus = function patchedFocus(...args) {
    hadEventBeforeFocus = true
    originalFocus.apply(this, args)
  }

  const onKeyboardEvent = (event) => {
    hadEventBeforeFocus = true

    if (
      event.metaKey ||
      (event.altKey && !isMac()) ||
      event.ctrlKey ||
      event.key === 'Control' ||
      event.key === 'Shift' ||
      event.key === 'Meta'
    ) {
      return
    }

    currentInteractionModality = 'keyboard'
    notifyFocusVisibleListeners('keyboard', event)
  }

  const onPointerEvent = (event) => {
    currentInteractionModality = 'pointer'

    if (event.type === 'mousedown' || event.type === 'pointerdown') {
      hadEventBeforeFocus = true
      notifyFocusVisibleListeners('pointer', event)
    }
  }

  const onClick = (event) => {
    if (isVirtualClick(event)) {
      hadEventBeforeFocus = true
      currentInteractionModality = 'virtual'
    }
  }

  const onWindowFocus = (event) => {
    if (
      event.target === window ||
      event.target === document ||
      ignoreFocusEvent ||
      !event.isTrusted
    ) {
      return
    }

    if (!hadEventBeforeFocus && !hadBlurRecently) {
      currentInteractionModality = 'virtual'
      notifyFocusVisibleListeners('virtual', event)
    }

    hadEventBeforeFocus = false
    hadBlurRecently = false
  }

  const onWindowBlur = () => {
    if (ignoreFocusEvent) {
      return
    }

    hadEventBeforeFocus = false
    hadBlurRecently = true
  }

  ownerDocument.addEventListener('keydown', onKeyboardEvent, true)
  ownerDocument.addEventListener('keyup', onKeyboardEvent, true)
  ownerDocument.addEventListener('click', onClick, true)
  ownerWindow.addEventListener('focus', onWindowFocus, true)
  ownerWindow.addEventListener('blur', onWindowBlur, false)

  if (typeof PointerEvent !== 'undefined') {
    ownerDocument.addEventListener('pointerdown', onPointerEvent, true)
    ownerDocument.addEventListener('pointermove', onPointerEvent, true)
    ownerDocument.addEventListener('pointerup', onPointerEvent, true)
  }

  ownerWindow.addEventListener(
    'beforeunload',
    () => {
      cleanupFocusVisibilityTracking(scope)
    },
    { once: true }
  )

  installedFocusWindows.set(ownerWindow, {
    focus: originalFocus,
    onKeyboardEvent,
    onPointerEvent,
    onClick,
    onWindowFocus,
    onWindowBlur,
  })
}

function cleanupFocusVisibilityTracking(scope, domReadyHandler) {
  const ownerWindow = getOwnerWindow(scope)
  const ownerDocument = getOwnerDocument(scope)
  // TODO
  const installed = installedFocusWindows.get(ownerWindow)

  if (domReadyHandler) {
    ownerDocument.removeEventListener('DOMContentLoaded', domReadyHandler)
  }

  if (!installed) {
    return
  }

  ownerWindow.HTMLElement.prototype.focus = installed.focus
  ownerDocument.removeEventListener('keydown', installed.onKeyboardEvent, true)
  ownerDocument.removeEventListener('keyup', installed.onKeyboardEvent, true)
  ownerDocument.removeEventListener('click', installed.onClick, true)
  ownerWindow.removeEventListener('focus', installed.onWindowFocus, true)
  ownerWindow.removeEventListener('blur', installed.onWindowBlur, false)

  if (typeof PointerEvent !== 'undefined') {
    ownerDocument.removeEventListener('pointerdown', installed.onPointerEvent, true)
    ownerDocument.removeEventListener('pointermove', installed.onPointerEvent, true)
    ownerDocument.removeEventListener('pointerup', installed.onPointerEvent, true)
  }

  installedFocusWindows.delete(ownerWindow)
}

const NON_TEXT_INPUT_TYPES = new Set([
  'checkbox',
  'radio',
  'range',
  'color',
  'file',
  'image',
  'button',
  'submit',
  'reset',
])

const FOCUS_VISIBLE_SPECIAL_KEYS = {
  Tab: true,
  Escape: true,
}

export function useFocusVisibleListener(listener, deps, options) {
  ensureFocusVisibilityTracking()

  useEffect(() => {
    const wrappedListener = (modality, event) => {
      const ownerDocument = getOwnerDocument(event?.target)
      const ownerWindow = getOwnerWindow(event?.target)
      const Input = ownerWindow.HTMLInputElement
      const Textarea = ownerWindow.HTMLTextAreaElement
      const ElementCtor = ownerWindow.HTMLElement
      const KeyboardEventCtor = ownerWindow.KeyboardEvent

      const activeElement = ownerDocument.activeElement
      const isTextEntryTarget =
        !!options?.isTextInput ||
        (activeElement instanceof Input && !NON_TEXT_INPUT_TYPES.has(activeElement.type)) ||
        activeElement instanceof Textarea ||
        (activeElement instanceof ElementCtor && activeElement.isContentEditable)

      const shouldAlwaysShowForTextInput =
        isTextEntryTarget &&
        modality === 'keyboard' &&
        event instanceof KeyboardEventCtor &&
        !FOCUS_VISIBLE_SPECIAL_KEYS[event.key]

      if (shouldAlwaysShowForTextInput) {
        return
      }

      listener(isFocusVisible())
    }

    focusVisibleListeners.add(wrappedListener)
    return () => {
      focusVisibleListeners.delete(wrappedListener)
    }
  }, deps)
}
