import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { getOwnerDocument } from '@/utils/496255'
import { getActiveElement } from '@/utils/755167'
import { runAfterTransition } from '@/utils/984700'
import { useFocusWithin } from './199070'
import { mergeProps } from './300597'
import { useKeyboard } from './428009'
import { getInteractionModality, isFocusVisible, useFocusVisibleListener } from './484044'
import { focusWithoutScrolling } from './582705'
import { useFocus } from './603140'
import { useSyncRef } from './899566'

export function useFocusRing(options = {}) {
  const {
    autoFocus = false,
    isTextInput,
    within,
  } = options

  const stateRef = useRef({
    isFocused: false,
    isFocusVisible: autoFocus || isFocusVisible(),
  })

  const [isFocused, setIsFocused] = useState(false)
  const [focusVisibleState, setFocusVisibleState] = useState(
    () => stateRef.current.isFocused && stateRef.current.isFocusVisible,
  )

  const updateFocusVisibleState = () => {
    setFocusVisibleState(
      stateRef.current.isFocused && stateRef.current.isFocusVisible,
    )
  }

  const handleFocusChange = (nextIsFocused) => {
    stateRef.current.isFocused = nextIsFocused
    setIsFocused(nextIsFocused)
    updateFocusVisibleState()
  }

  useFocusVisibleListener(
    (nextIsFocusVisible) => {
      stateRef.current.isFocusVisible = nextIsFocusVisible
      updateFocusVisibleState()
    },
    [],
    { isTextInput },
  )

  const { focusProps } = useFocus({
    isDisabled: within,
    onFocusChange: handleFocusChange,
  })

  const { focusWithinProps } = useFocusWithin({
    isDisabled: !within,
    onFocusWithinChange: handleFocusChange,
  })

  return {
    isFocused,
    isFocusVisible: stateRef.current.isFocused && focusVisibleState,
    focusProps: within ? focusWithinProps : focusProps,
  }
}

const FocusableProviderContext = createContext(null)

const FocusableProvider = forwardRef((
  { children, ...props },
  forwardedRef,
) => {
  const providerRef = useObjectOrCallbackRef(forwardedRef)

  return (
    <FocusableProviderContext.Provider value={{ ...props, ref: providerRef }}>
      {children}
    </FocusableProviderContext.Provider>
  )
})

function useFocusableProviderProps(domRef) {
  const contextProps = useContext(FocusableProviderContext) || {}

  useSyncRef(contextProps, domRef)

  const { ref, ...propsWithoutRef } = contextProps
  return propsWithoutRef
}

export function useFocusable(props, domRef) {
  const { focusProps } = useFocus(props)
  const { keyboardProps } = useKeyboard(props)

  const focusAndKeyboardProps = mergeProps(focusProps, keyboardProps)

  const providerProps = useFocusableProviderProps(domRef)
  const inheritedProps = props.isDisabled ? {} : providerProps

  const autoFocusRef = useRef(props.autoFocus)

  useEffect(() => {
    if (autoFocusRef.current && domRef.current) {
      const element = domRef.current
      const document = getOwnerDocument(element)
      const previouslyFocusedElement = getActiveElement(document)

      if (getInteractionModality() === 'virtual') {
        runAfterTransition(() => {
          if (
            getActiveElement(document) === previouslyFocusedElement
            && element.isConnected
          ) {
            focusWithoutScrolling(element)
          }
        })
      }
      else {
        focusWithoutScrolling(element)
      }
    }

    autoFocusRef.current = false
  }, [domRef])

  let tabIndex = props.excludeFromTabOrder ? -1 : 0
  if (props.isDisabled) {
    tabIndex = undefined
  }

  return {
    focusableProps: mergeProps(
      {
        ...focusAndKeyboardProps,
        tabIndex,
      },
      inheritedProps,
    ),
  }
}
