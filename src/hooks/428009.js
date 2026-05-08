// TODO
function createKeyboardHandlerWithControlledPropagation(userHandler) {
  if (!userHandler)
    return undefined

  // default behavior: stop bubbling after user handler runs
  let shouldStopPropagation = true

  return function wrappedKeyboardEventHandler(reactEvent) {
    const eventProxy = {
      ...reactEvent,

      preventDefault() {
        reactEvent.preventDefault()
      },

      isDefaultPrevented() {
        return reactEvent.isDefaultPrevented()
      },

      stopPropagation() {
        shouldStopPropagation = true
      },

      // custom API: allow parent handlers to receive this event
      continuePropagation() {
        shouldStopPropagation = false
      },

      isPropagationStopped() {
        return shouldStopPropagation
      },
    }

    userHandler(eventProxy)

    if (shouldStopPropagation) {
      reactEvent.stopPropagation()
    }
  }
}

export function useKeyboard(options) {
  const { isDisabled, onKeyDown, onKeyUp } = options

  if (isDisabled) {
    return { keyboardProps: {} }
  }

  return {
    keyboardProps: {
      onKeyDown: createKeyboardHandlerWithControlledPropagation(onKeyDown),
      onKeyUp: createKeyboardHandlerWithControlledPropagation(onKeyUp),
    },
  }
}
