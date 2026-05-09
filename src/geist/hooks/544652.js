import React from 'react'

const DisabledContext = React.createContext(!1)

export function useDisabled(disabled) {
  const disabledFromContext = React.useContext(DisabledContext)
  return disabled ?? disabledFromContext
}
