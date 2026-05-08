import React from 'react'

export const TooltipContext = React.createContext({
  forceShowTooltips: false,
  setForceShowTooltips: () => {},
})

TooltipContext.displayName = 'TooltipContext'

export function TooltipProvider({ children }) {
  const [forceShowTooltips, setForceShowTooltips] = React.useState(false)

  const contextValue = React.useMemo(
    () => ({
      forceShowTooltips,
      setForceShowTooltips,
    }),
    [forceShowTooltips]
  )

  return <TooltipContext.Provider value={contextValue}>{children}</TooltipContext.Provider>
}
