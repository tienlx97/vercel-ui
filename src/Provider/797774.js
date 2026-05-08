import React from 'react'

const ContextCardContext = React.createContext({
  rootOrigin: { x: 0, y: 0 },
  rootBounds: { width: 0, height: 0 },
  portalRef: null,
  activeId: null,
  setActiveId: () => {},
  hoveredId: null,
  setHoveredId: () => {},
  updateActiveContextCard: () => {},
  skipTransition: false,
  rootVisible: false,
  distanceFromLast: 0,
  lastOrigin: null,
})

ContextCardContext.displayName = 'ContextCardContext'

function usePrevious(value) {
  const ref = React.useRef(null)

  React.useEffect(() => {
    ref.current = value
  })

  // eslint-disable-next-line react-hooks/refs
  return ref.current
}

export function ContextCardProvider({ children, portalTarget }) {
  const [mounted, setMounted] = React.useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setMounted(true), [])

  const target = portalTarget && 'current' in portalTarget ? portalTarget.current : portalTarget

  const [measurePortalRef, rootBounds] = useMeasure()
  const portalRef = React.useRef(null)

  const [activeCard, setActiveCard] = React.useState(null)
  const [rootVisible, setRootVisible] = React.useState(false)
  const [hoveredId, setHoveredId] = React.useState(null)
  const activeIdRef = React.useRef(null)

  function setActiveId(id) {
    activeIdRef.current = id
    setRootVisible(id !== null)
  }

  function updateActiveContextCard(card) {
    if (card?.id === activeIdRef.current || card === null) {
      setActiveCard(card)
    }
  }

  const rootOrigin = React.useMemo(() => {
    if (!activeCard) {
      return {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        side: 'top',
        arrowOffset: { x: 0, y: 0 },
      }
    }

    return {
      width: activeCard.contentSize.width + 2,
      height: activeCard.contentSize.height + 2,
      x: activeCard.origin.x,
      y: activeCard.origin.y,
      side: activeCard.side,
      arrowOffset: activeCard.arrowOffset,
    }
  }, [activeCard])

  const previousOrigin = usePrevious(rootOrigin)
  // eslint-disable-next-line react-hooks/refs
  const previousActiveId = usePrevious(activeIdRef.current)

  const overlapPercent = React.useMemo(() => {
    if (!previousOrigin) return 0

    const left = Math.max(rootOrigin.x, previousOrigin.x)
    const right = Math.min(rootOrigin.x + rootOrigin.width, previousOrigin.x + previousOrigin.width)
    const top = Math.max(rootOrigin.y, previousOrigin.y)
    const bottom = Math.min(
      rootOrigin.y + rootOrigin.height,
      previousOrigin.y + previousOrigin.height
    )

    if (left < right && top < bottom) {
      const area = rootOrigin.width * rootOrigin.height
      return area === 0 ? 0 : (((right - left) * (bottom - top)) / area) * 100
    }

    return 0
  }, [rootOrigin, previousOrigin])

  const distanceFromLast = React.useMemo(() => {
    return Math.hypot(
      (previousOrigin?.x ?? 0) - rootOrigin.x,
      (previousOrigin?.y ?? 0) - rootOrigin.y
    )
  }, [rootOrigin.x, rootOrigin.y, previousOrigin?.x, previousOrigin?.y])

  const lastOrigin = React.useMemo(() => {
    return previousOrigin
      ? { x: previousOrigin.x - rootOrigin.x, y: previousOrigin.y - rootOrigin.y }
      : null
  }, [rootOrigin, previousOrigin])

  const [isScrolling, setIsScrolling] = React.useState(false)

  const skipTransition = React.useMemo(
    () =>
      distanceFromLast > 150 || overlapPercent > 100 || previousActiveId === null || isScrolling,
    [distanceFromLast, overlapPercent, previousActiveId, isScrolling]
  )

  React.useEffect(() => {
    let timeout = null

    function handleScroll() {
      if (timeout) globalThis.clearTimeout(timeout)

      timeout = setTimeout(() => setIsScrolling(false), 66)

      if (!isScrolling) {
        setIsScrolling(true)
      }
    }

    document.addEventListener('scroll', handleScroll, true)
    return () => document.removeEventListener('scroll', handleScroll, true)
  }, [isScrolling])

  const value = React.useMemo(
    () => ({
      updateActiveContextCard,
      rootOrigin: { ...rootOrigin },
      rootBounds,
      portalRef,
      setActiveId,
      activeId: activeIdRef,
      setHoveredId,
      hoveredId,
      skipTransition,
      rootVisible,
      distanceFromLast,
      lastOrigin,
    }),
    [rootOrigin, rootBounds, hoveredId, skipTransition, rootVisible, distanceFromLast, lastOrigin]
  )

  return (
    <ContextCardContext.Provider value={value}>
      {children}
      {mounted
        ? createPortal(
            <div className={styles.portal} ref={measurePortalRef}>
              <div
                className={styles.contextCardRootVisibility}
                style={{ opacity: Number(rootVisible) }}
              >
                <div
                  className={styles.contextCardRoot}
                  data-skip-transition={skipTransition}
                  style={{
                    transform: `translate(${rootOrigin.x}px,${rootOrigin.y}px)`,
                    width: rootOrigin.width,
                    height: rootOrigin.height,
                  }}
                >
                  <div
                    className={styles.contextCardTip}
                    data-skip-transition={skipTransition}
                    data-side={rootOrigin.side}
                    style={{
                      '--arrow-offset-x': `${rootOrigin.arrowOffset.x}px`,
                      '--arrow-offset-y': `${rootOrigin.arrowOffset.y}px`,
                    }}
                  >
                    {/* arrow svg */}
                  </div>
                  <div ref={portalRef} />
                </div>
              </div>
            </div>,
            target ?? document.body
          )
        : null}
    </ContextCardContext.Provider>
  )
}
