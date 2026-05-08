function assignRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value)
    return
  }

  if (ref != null) {
    ref.current = value
  }
}

export function mergeRefs(refs) {
  return function mergedRefCallback(value) {
    for (const ref of refs) {
      assignRef(ref, value)
    }
  }
}
