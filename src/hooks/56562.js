import {
  useRef,
  useState,
} from 'react'
import { useFocusWithin } from './199070'
import { isFocusVisible, useFocusVisibleListener } from './484044'
import { useFocus } from './603140'

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
