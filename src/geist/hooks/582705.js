let supportsPreventScrollCached = null

function supportsPreventScroll() {
  if (supportsPreventScrollCached == null) {
    supportsPreventScrollCached = false

    try {
      const probe = document.createElement('div')

      probe.focus({
        get preventScroll() {
          supportsPreventScrollCached = true
          return true
        },
      })
    }
    catch {
      // Older browsers may throw when focus options are unsupported.
    }
  }

  return supportsPreventScrollCached
}

function getScrollableAncestors(element) {
  let parent = element.parentNode
  const saved = []
  const rootScroller
    = document.scrollingElement || document.documentElement

  while (parent instanceof HTMLElement && parent !== rootScroller) {
    const isScrollable
      = parent.offsetHeight < parent.scrollHeight
        || parent.offsetWidth < parent.scrollWidth

    if (isScrollable) {
      saved.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft,
      })
    }

    parent = parent.parentNode
  }

  if (rootScroller instanceof HTMLElement) {
    saved.push({
      element: rootScroller,
      scrollTop: rootScroller.scrollTop,
      scrollLeft: rootScroller.scrollLeft,
    })
  }

  return saved
}

function restoreScrollPositions(savedPositions) {
  for (const { element, scrollTop, scrollLeft } of savedPositions) {
    element.scrollTop = scrollTop
    element.scrollLeft = scrollLeft
  }
}

export function focusWithoutScrolling(element) {
  if (supportsPreventScroll()) {
    element.focus({ preventScroll: true })
    return
  }

  const savedPositions = getScrollableAncestors(element)
  element.focus()
  restoreScrollPositions(savedPositions)
}
