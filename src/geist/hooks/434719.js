import { useEffect, useMemo, useRef, useState } from 'react'
import { getOwnerDocument } from '@/utils/496255'
import { nodeContains } from '@/utils/755167'
import { useGlobalListeners } from './489842'

let hasRecentTouchPointerUp = false
let activeHoverHookCount = 0

function registerRecentTouchPointerUp(event) {
  if (event.pointerType === 'touch') {
    hasRecentTouchPointerUp = true

    setTimeout(() => {
      hasRecentTouchPointerUp = false
    }, 50)
  }
}

function setupGlobalTouchPointerTracking() {
  if (typeof document === 'undefined') {
    return
  }

  if (
    activeHoverHookCount === 0
    && typeof PointerEvent !== 'undefined'
  ) {
    document.addEventListener('pointerup', registerRecentTouchPointerUp)
  }

  activeHoverHookCount += 1

  return () => {
    activeHoverHookCount -= 1

    if (
      activeHoverHookCount <= 0
      && typeof PointerEvent !== 'undefined'
    ) {
      document.removeEventListener('pointerup', registerRecentTouchPointerUp)
    }
  }
}

export function useHover(options) {
  const {
    onHoverStart,
    onHoverChange,
    onHoverEnd,
    isDisabled,
  } = options

  const [isHovered, setIsHovered] = useState(false)

  const state = useRef({
    isHovered: false,
    ignoreEmulatedMouseEvents: false,
    pointerType: '',
    target: null,
  }).current

  useEffect(setupGlobalTouchPointerTracking, [])

  const {
    addGlobalListener,
    removeAllGlobalListeners,
  } = useGlobalListeners()

  const { hoverProps, triggerHoverEnd } = useMemo(() => {
    const endHover = (event, pointerType) => {
      const lastTarget = state.target

      state.pointerType = ''
      state.target = null

      if (pointerType === 'touch') {
        return
      }

      if (!state.isHovered || !lastTarget) {
        return
      }

      state.isHovered = false
      removeAllGlobalListeners()

      if (onHoverEnd) {
        onHoverEnd({
          type: 'hoverend',
          target: lastTarget,
          pointerType,
        })
      }

      if (onHoverChange) {
        onHoverChange(false)
      }

      setIsHovered(false)
    }

    const hoverProps = {}

    if (typeof PointerEvent !== 'undefined') {
      hoverProps.onPointerEnter = (event) => {
        if (hasRecentTouchPointerUp && event.pointerType === 'mouse') {
          return
        }

        // eslint-disable-next-line no-use-before-define
        startHover(event, event.pointerType)
      }

      hoverProps.onPointerLeave = (event) => {
        if (!isDisabled && event.currentTarget.contains(event.target)) {
          endHover(event, event.pointerType)
        }
      }
    }

    const startHover = (event, pointerType) => {
      state.pointerType = pointerType

      if (
        isDisabled
        || pointerType === 'touch'
        || state.isHovered
        || !event.currentTarget.contains(event.target)
      ) {
        return
      }

      state.isHovered = true
      const target = event.currentTarget
      state.target = target

      addGlobalListener(
        getOwnerDocument(event.target),
        'pointerover',
        (globalEvent) => {
          if (
            state.isHovered
            && state.target
            && !nodeContains(state.target, globalEvent.target)
          ) {
            endHover(globalEvent, globalEvent.pointerType)
          }
        },
        { capture: true },
      )

      if (onHoverStart) {
        onHoverStart({
          type: 'hoverstart',
          target,
          pointerType,
        })
      }

      if (onHoverChange) {
        onHoverChange(true)
      }

      setIsHovered(true)
    }

    return {
      hoverProps,
      triggerHoverEnd: endHover,
    }
  }, [
    addGlobalListener,
    isDisabled,
    onHoverChange,
    onHoverEnd,
    onHoverStart,
    removeAllGlobalListeners,
    state,
  ])

  useEffect(() => {
    if (isDisabled) {
      triggerHoverEnd(
        { currentTarget: state.target },
        state.pointerType,
      )
    }
  }, [isDisabled, state, triggerHoverEnd])

  return {
    hoverProps,
    isHovered,
  }
}
