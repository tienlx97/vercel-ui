import { createContext, useContext, useEffect, useEffectEvent, useMemo, useRef, useState } from 'react'
import { chain } from '@/utils/33566'
import { getOwnerDocument, getOwnerWindow } from '@/utils/496255'
import { isVirtualClick, isVirtualPointerEvent } from '@/utils/526608'
import { isFirefox, isIOS, isIPad, isMac, isWebKit } from '@/utils/717835'
import { getEventTarget, nodeContains } from '@/utils/755167'
import { restoreTextSelection } from '@/utils/restoreTextSelection'
import { mergeProps } from './300597'
import { createSyntheticEvent, preventFocus, setEventTarget } from './335886'
import { useGlobalListeners } from './489842'
import { useSyncRef } from './899566'

class PressEvent {
  #shouldStopPropagation = true

  constructor(type, pointerType, event, fallbackTarget) {
    const target = fallbackTarget?.target ?? event.currentTarget
    const rect = target?.getBoundingClientRect?.()

    let x
    let y = 0
    let clientX
    let clientY = null

    if (event.clientX != null && event.clientY != null) {
      clientX = event.clientX
      clientY = event.clientY
    }

    if (rect) {
      if (clientX != null && clientY != null) {
        x = clientX - rect.left
        y = clientY - rect.top
      }
      else {
        x = rect.width / 2
        y = rect.height / 2
      }
    }

    this.type = type
    this.pointerType = pointerType
    this.target = event.currentTarget
    this.shiftKey = event.shiftKey
    this.metaKey = event.metaKey
    this.ctrlKey = event.ctrlKey
    this.altKey = event.altKey
    this.x = x
    this.y = y
  }

  continuePropagation() {
    this.#shouldStopPropagation = false
  }

  get shouldStopPropagation() {
    return this.#shouldStopPropagation
  }
}

const NON_TEXT_TRIGGER_INPUT_TYPES = new Set([
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

const PRESSABLE_STYLE_ID = 'react-aria-pressable-style'
const PRESSABLE_DATA_ATTR = 'data-react-aria-pressable'
let iosTextSelectionMode = 'default'
// eslint-disable-next-line no-unused-vars
let iosOriginalWebkitUserSelect = ''
const elementUserSelectCache = new WeakMap()

function isTriggerInputType(input, key) {
  if (input.type === 'checkbox' || input.type === 'radio') {
    return key === ' '
  }

  return NON_TEXT_TRIGGER_INPUT_TYPES.has(input.type)
}

function isHTMLLink(element) {
  return element.tagName === 'A' && element.hasAttribute('href')
}

function isValidKeyboardPress(event, element) {
  const { key, code } = event
  const role = element.getAttribute('role')

  const isPressKey
    = key === 'Enter'
      || key === ' '
      || key === 'Spacebar'
      || code === 'Space'

  if (!isPressKey) {
    return false
  }

  const ownerWindow = getOwnerWindow(element)

  if (
    (element instanceof ownerWindow.HTMLInputElement && !isTriggerInputType(element, key))
    || element instanceof ownerWindow.HTMLTextAreaElement
    || element.isContentEditable
  ) {
    return false
  }

  if ((role === 'link' || (!role && isHTMLLink(element))) && key !== 'Enter') {
    return false
  }

  return true
}

function shouldPreventKeyDefault(target, key) {
  if (target instanceof HTMLInputElement) {
    return !isTriggerInputType(target, key)
  }

  if (!(target instanceof HTMLInputElement)) {
    if (target instanceof HTMLButtonElement) {
      return target.type !== 'submit' && target.type !== 'reset'
    }

    return !isHTMLLink(target)
  }

  return false
}

function disableTextSelection(target) {
  if (isIOS()) {
    if (iosTextSelectionMode === 'default') {
      const ownerDocument = getOwnerDocument(target)
      iosOriginalWebkitUserSelect = ownerDocument.documentElement.style.webkitUserSelect
      ownerDocument.documentElement.style.webkitUserSelect = 'none'
    }

    iosTextSelectionMode = 'disabled'
    return
  }

  if ((target instanceof HTMLElement || target instanceof SVGElement) && target) {
    const property = 'userSelect' in target.style ? 'userSelect' : 'webkitUserSelect'
    elementUserSelectCache.set(target, target.style[property])
    target.style[property] = 'none'
  }
}

const PressResponderContext = createContext({
  register() {},
})

function mergePressResponderContext(props) {
  let merged = props
  const context = useContext(PressResponderContext)

  if (context) {
    const { register, ...contextProps } = context
    merged = mergeProps(contextProps, merged)
    register()
  }

  useSyncRef(context, merged.ref)
  return merged
}

function createPointLikeEvent(currentTarget, event) {
  return {
    currentTarget,
    shiftKey: event.shiftKey,
    ctrlKey: event.ctrlKey,
    metaKey: event.metaKey,
    altKey: event.altKey,
    clientX: event.clientX,
    clientY: event.clientY,
  }
}

function focusWithoutScrolling(element) {
  element?.focus?.({ preventScroll: true })
}

function openLinkViaKeyboard(element, keyboardEvent, markOpening = true) {
  let { metaKey, ctrlKey, altKey, shiftKey } = keyboardEvent

  if (
    isFirefox()
    && window.event?.type?.startsWith('key')
    && element.target === '_blank'
  ) {
    if (isMac()) {
      metaKey = true
    }
    else {
      ctrlKey = true
    }
  }

  const clickEvent
    = isWebKit() && isMac() && !isIPad() && true
      ? new KeyboardEvent('keydown', {
          keyIdentifier: 'Enter',
          metaKey,
          ctrlKey,
          altKey,
          shiftKey,
        })
      : new MouseEvent('click', {
          metaKey,
          ctrlKey,
          altKey,
          shiftKey,
          bubbles: true,
          cancelable: true,
        })

  openLinkViaKeyboard.isOpening = markOpening
  focusWithoutScrolling(element)
  element.dispatchEvent(clickEvent)
  openLinkViaKeyboard.isOpening = false
}

export function usePress(props) {
  const mergedProps = mergePressResponderContext(props)

  const {
    onPress,
    onPressChange,
    onPressStart,
    onPressEnd,
    onPressUp,
    onClick,
    isDisabled,
    isPressed: isPressedFromProps,
    preventFocusOnPress,
    shouldCancelOnPointerExit,
    allowTextSelectionOnPress,
    ref,
    ...domProps
  } = mergedProps

  const [isPressedState, setIsPressedState] = useState(false)

  const stateRef = useRef({
    isPressed: false,
    ignoreEmulatedMouseEvents: false,
    didFirePressStart: false,
    isTriggeringEvent: false,
    activePointerId: null,
    target: null,
    isOverTarget: false,
    pointerType: null,
    disposables: [],
    metaKeyEvents: undefined,
  })

  const {
    addGlobalListener,
    removeAllGlobalListeners,
  } = useGlobalListeners()

  const triggerPressStart = useEffectEvent((event, pointerType) => {
    const state = stateRef.current

    if (isDisabled || state.didFirePressStart) {
      return false
    }

    let shouldStopPropagation = true
    state.isTriggeringEvent = true

    if (onPressStart) {
      const pressEvent = new PressEvent('pressstart', pointerType, event)
      onPressStart(pressEvent)
      shouldStopPropagation = pressEvent.shouldStopPropagation
    }

    if (onPressChange) {
      onPressChange(true)
    }

    state.isTriggeringEvent = false
    state.didFirePressStart = true
    setIsPressedState(true)

    return shouldStopPropagation
  })

  const triggerPressEnd = useEffectEvent(
    (event, pointerType, shouldTriggerPress = true) => {
      const state = stateRef.current

      if (!state.didFirePressStart) {
        return false
      }

      state.didFirePressStart = false
      state.isTriggeringEvent = true

      let shouldStopPropagation = true

      if (onPressEnd) {
        const pressEndEvent = new PressEvent('pressend', pointerType, event)
        onPressEnd(pressEndEvent)
        shouldStopPropagation = pressEndEvent.shouldStopPropagation
      }

      if (onPressChange) {
        onPressChange(false)
      }

      setIsPressedState(false)

      if (onPress && shouldTriggerPress && !isDisabled) {
        const pressEvent = new PressEvent('press', pointerType, event)
        onPress(pressEvent)

        if (shouldStopPropagation) {
          shouldStopPropagation = pressEvent.shouldStopPropagation
        }
      }

      state.isTriggeringEvent = false
      return shouldStopPropagation
    },
  )

  const triggerPressUp = useEffectEvent((event, pointerType) => {
    const state = stateRef.current

    if (isDisabled) {
      return false
    }

    if (!onPressUp) {
      return true
    }

    state.isTriggeringEvent = true
    const pressUpEvent = new PressEvent('pressup', pointerType, event)
    onPressUp(pressUpEvent)
    state.isTriggeringEvent = false

    return pressUpEvent.shouldStopPropagation
  })

  const cancelPress = useEffectEvent((event) => {
    const state = stateRef.current

    if (!state.isPressed || !state.target) {
      return
    }

    if (state.didFirePressStart && state.pointerType != null) {
      triggerPressEnd(createPointLikeEvent(state.target, event), state.pointerType, false)
    }

    state.isPressed = false
    state.isOverTarget = false
    state.activePointerId = null
    state.pointerType = null
    removeAllGlobalListeners()

    if (!allowTextSelectionOnPress) {
      restoreTextSelection(state.target)
    }

    for (const dispose of state.disposables) {
      dispose()
    }

    state.disposables = []
  })

  const cancelOnPointerExit = useEffectEvent((event) => {
    if (shouldCancelOnPointerExit) {
      cancelPress(event)
    }
  })

  const triggerClickProp = useEffectEvent((event) => {
    onClick?.(event)
  })

  const dispatchSyntheticClickToProp = useEffectEvent((mouseInit, target) => {
    if (!onClick) {
      return
    }

    const clickEvent = new MouseEvent('click', mouseInit)
    setEventTarget(clickEvent, target)
    onClick(createSyntheticEvent(clickEvent))
  })

  const pressProps = useMemo(() => {
    const state = stateRef.current

    // TODO
    const handleKeyUp = (event) => {
      if (state.isPressed && state.target && isValidKeyboardPress(event, state.target)) {
        const actualTarget = getEventTarget(event)
        const releasedInside = nodeContains(state.target, actualTarget)

        if (shouldPreventKeyDefault(actualTarget, event.key)) {
          event.preventDefault()
        }

        triggerPressEnd(
          createPointLikeEvent(state.target, event),
          'keyboard',
          releasedInside,
        )

        if (releasedInside) {
          dispatchSyntheticClickToProp(event, state.target)
        }

        removeAllGlobalListeners()

        if (
          event.key !== 'Enter'
          && isHTMLLink(state.target)
          && nodeContains(state.target, actualTarget)
          && !event[LINK_CLICKED_SYMBOL]
        ) {
          event[LINK_CLICKED_SYMBOL] = true
          openLinkViaKeyboard(state.target, event, false)
        }

        state.isPressed = false
        state.metaKeyEvents?.delete(event.key)
      }
      else if (event.key === 'Meta' && state.metaKeyEvents?.size) {
        const bufferedMetaEvents = state.metaKeyEvents
        state.metaKeyEvents = undefined

        for (const nativeEvent of bufferedMetaEvents.values()) {
          state.target?.dispatchEvent(new KeyboardEvent('keyup', nativeEvent))
        }
      }
    }

    const props = {
      onKeyDown(event) {
        if (
          isValidKeyboardPress(event.nativeEvent, event.currentTarget)
          && nodeContains(event.currentTarget, getEventTarget(event.nativeEvent))
        ) {
          if (shouldPreventKeyDefault(getEventTarget(event.nativeEvent), event.key)) {
            event.preventDefault()
          }

          let shouldStopPropagation = true

          if (!state.isPressed && !event.repeat) {
            state.target = event.currentTarget
            state.isPressed = true
            state.pointerType = 'keyboard'

            shouldStopPropagation = triggerPressStart(event, 'keyboard')

            const keyboardTarget = event.currentTarget
            addGlobalListener(
              getOwnerDocument(event.currentTarget),
              'keyup',
              chain(
                (keyupEvent) => {
                  if (
                    isValidKeyboardPress(keyupEvent, keyboardTarget)
                    && !keyupEvent.repeat
                    && nodeContains(keyboardTarget, getEventTarget(keyupEvent))
                    && state.target
                  ) {
                    triggerPressUp(
                      createPointLikeEvent(state.target, keyupEvent),
                      'keyboard',
                    )
                  }
                },
                handleKeyUp,
              ),
              true,
            )
          }

          if (shouldStopPropagation) {
            event.stopPropagation()
          }

          if (event.metaKey && isMac()) {
            state.metaKeyEvents?.set(event.key, event.nativeEvent)
          }
        }
        else if (event.key === 'Meta') {
          state.metaKeyEvents = new Map()
        }
      },

      onClick(event) {
        if (
          (!event || nodeContains(event.currentTarget, getEventTarget(event.nativeEvent)))
          && event
          && event.button === 0
          && !state.isTriggeringEvent
          && !openLinkViaKeyboard.isOpening
        ) {
          let shouldStopPropagation = true

          if (isDisabled) {
            event.preventDefault()
          }

          if (
            !state.ignoreEmulatedMouseEvents
            && !state.isPressed
            && (state.pointerType === 'virtual' || isVirtualClick(event.nativeEvent))
          ) {
            const didStart = triggerPressStart(event, 'virtual')
            const didPressUp = triggerPressUp(event, 'virtual')
            const didEnd = triggerPressEnd(event, 'virtual')

            triggerClickProp(event)
            shouldStopPropagation = didStart && didPressUp && didEnd
          }
          else if (state.isPressed && state.pointerType !== 'keyboard') {
            const pointerType
              = state.pointerType || event.nativeEvent.pointerType || 'virtual'

            const didPressUp = triggerPressUp(
              createPointLikeEvent(event.currentTarget, event),
              pointerType,
            )

            const didEnd = triggerPressEnd(
              createPointLikeEvent(event.currentTarget, event),
              pointerType,
              true,
            )

            shouldStopPropagation = didPressUp && didEnd
            state.isOverTarget = false

            triggerClickProp(event)
            cancelPress(event)
          }

          state.ignoreEmulatedMouseEvents = false

          if (shouldStopPropagation) {
            event.stopPropagation()
          }
        }
      },
    }

    if (typeof PointerEvent !== 'undefined') {
      props.onPointerDown = (event) => {
        if (
          event.button !== 0
          || !nodeContains(event.currentTarget, getEventTarget(event.nativeEvent))
        ) {
          return
        }

        if (isVirtualPointerEvent(event.nativeEvent)) {
          state.pointerType = 'virtual'
          return
        }

        state.pointerType = event.pointerType
        let shouldStopPropagation = true

        if (!state.isPressed) {
          state.isPressed = true
          state.isOverTarget = true
          state.activePointerId = event.pointerId
          state.target = event.currentTarget

          if (!allowTextSelectionOnPress) {
            disableTextSelection(state.target)
          }

          shouldStopPropagation = triggerPressStart(event, state.pointerType)

          const actualTarget = getEventTarget(event.nativeEvent)
          if ('releasePointerCapture' in actualTarget) {
            actualTarget.releasePointerCapture(event.pointerId)
          }

          addGlobalListener(
            getOwnerDocument(event.currentTarget),
            'pointerup',
            handleGlobalPointerUp,
            false,
          )

          addGlobalListener(
            getOwnerDocument(event.currentTarget),
            'pointercancel',
            handleGlobalPointerCancel,
            false,
          )
        }

        if (shouldStopPropagation) {
          event.stopPropagation()
        }
      }

      props.onMouseDown = (event) => {
        if (
          nodeContains(event.currentTarget, getEventTarget(event.nativeEvent))
          && event.button === 0
        ) {
          if (preventFocusOnPress) {
            const dispose = preventFocus(event.target)
            if (dispose) {
              state.disposables.push(dispose)
            }
          }

          event.stopPropagation()
        }
      }

      props.onPointerUp = (event) => {
        if (
          nodeContains(event.currentTarget, getEventTarget(event.nativeEvent))
          && state.pointerType !== 'virtual'
          && (event.button !== 0 || !state.isPressed)
        ) {
          triggerPressUp(event, state.pointerType || event.pointerType)
        }
      }

      props.onPointerEnter = (event) => {
        if (
          event.pointerId === state.activePointerId
          && state.target
          && !state.isOverTarget
          && state.pointerType != null
        ) {
          state.isOverTarget = true
          triggerPressStart(
            createPointLikeEvent(state.target, event),
            state.pointerType,
          )
        }
      }

      props.onPointerLeave = (event) => {
        if (
          event.pointerId === state.activePointerId
          && state.target
          && state.isOverTarget
          && state.pointerType != null
        ) {
          state.isOverTarget = false
          triggerPressEnd(
            createPointLikeEvent(state.target, event),
            state.pointerType,
            false,
          )
          cancelOnPointerExit(event)
        }
      }

      props.onDragStart = (event) => {
        if (nodeContains(event.currentTarget, getEventTarget(event.nativeEvent))) {
          cancelPress(event)
        }
      }
    }

    function handleGlobalPointerUp(event) {
      if (
        event.pointerId === state.activePointerId
        && state.isPressed
        && event.button === 0
        && state.target
      ) {
        if (nodeContains(state.target, getEventTarget(event)) && state.pointerType != null) {
          let clickWasObserved = false

          const clickTimeout = setTimeout(() => {
            if (state.isPressed && state.target instanceof HTMLElement) {
              if (clickWasObserved) {
                cancelPress(event)
              }
              else {
                focusWithoutScrolling(state.target)
                state.target.click()
              }
            }
          }, 80)

          addGlobalListener(
            event.currentTarget,
            'click',
            () => {
              clickWasObserved = true
            },
            true,
          )

          state.disposables.push(() => clearTimeout(clickTimeout))
        }
        else {
          cancelPress(event)
        }

        state.isOverTarget = false
      }
    }

    function handleGlobalPointerCancel(event) {
      cancelPress(event)
    }

    return props
  }, [
    addGlobalListener,
    allowTextSelectionOnPress,
    cancelOnPointerExit,
    cancelPress,
    dispatchSyntheticClickToProp,
    isDisabled,
    onClick,
    preventFocusOnPress,
    removeAllGlobalListeners,
    triggerClickProp,
    triggerPressEnd,
    triggerPressStart,
    triggerPressUp,
  ])

  useEffect(() => {
    if (!ref) {
      return
    }

    const ownerDocument = getOwnerDocument(ref.current)
    if (!ownerDocument || !ownerDocument.head || ownerDocument.getElementById(PRESSABLE_STYLE_ID)) {
      return
    }

    const style = ownerDocument.createElement('style')
    style.id = PRESSABLE_STYLE_ID
    style.textContent = `
@layer {
  [${PRESSABLE_DATA_ATTR}] {
    touch-action: pan-x pan-y pinch-zoom;
  }
}
    `.trim()

    ownerDocument.head.prepend(style)
  }, [ref])

  useEffect(() => {
    const state = stateRef.current

    return () => {
      const target = state.target ?? undefined

      if (!allowTextSelectionOnPress) {
        restoreTextSelection(target)
      }

      for (const dispose of state.disposables) {
        dispose()
      }

      state.disposables = []
    }
  }, [allowTextSelectionOnPress])

  return {
    isPressed: isPressedFromProps || isPressedState,
    pressProps: mergeProps(domProps, pressProps, {
      [PRESSABLE_DATA_ATTR]: true,
    }),
  }
}
