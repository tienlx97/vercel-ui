import clsx from 'clsx'
import { chain } from '@/utils/33566'

function isReactEventHandlerName(propName) {
  return (
    propName[0] === 'o'
    && propName[1] === 'n'
    && propName.charCodeAt(2) >= 65
    && propName.charCodeAt(2) <= 90
  )
}

export function mergeProps(...propsList) {
  const mergedProps = { ...propsList[0] }

  for (let i = 1; i < propsList.length; i += 1) {
    const nextProps = propsList[i]

    for (const propName in nextProps) {
      const existingValue = mergedProps[propName]
      const nextValue = nextProps[propName]

      if (
        typeof existingValue === 'function'
        && typeof nextValue === 'function'
        && isReactEventHandlerName(propName)
      ) {
        mergedProps[propName] = chain(existingValue, nextValue)
      }
      else if (
        (propName === 'className' || propName === 'UNSAFE_className')
        && typeof existingValue === 'string'
        && typeof nextValue === 'string'
      ) {
        // TODO
        mergedProps[propName] = clsx(existingValue, nextValue)
      }
      else if (propName === 'id' && existingValue && nextValue) {
        mergedProps.id = mergeIds(existingValue, nextValue)
      }
      else {
        mergedProps[propName]
          = nextValue !== undefined ? nextValue : existingValue
      }
    }
  }

  return mergedProps
}

const mergedIdRegistry = new Map()

export function mergeIds(idA, idB) {
  if (idA === idB) {
    return idA
  }

  const refsWatchingA = mergedIdRegistry.get(idA)
  if (refsWatchingA) {
    refsWatchingA.forEach((ref) => {
      ref.current = idB
    })
    return idB
  }

  const refsWatchingB = mergedIdRegistry.get(idB)
  if (refsWatchingB) {
    refsWatchingB.forEach((ref) => {
      ref.current = idA
    })
    return idA
  }

  return idB
}
