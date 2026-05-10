import { getOwnerDocument } from './496255'
import { isIOS } from './717835'
import { runAfterTransition } from './984700'

let iosTextSelectionMode = 'default'
let iosOriginalWebkitUserSelect = ''
const elementUserSelectCache = new WeakMap()

export function restoreTextSelection(target) {
  if (isIOS()) {
    if (iosTextSelectionMode === 'disabled') {
      iosTextSelectionMode = 'restoring'

      setTimeout(() => {
        runAfterTransition(() => {
          if (iosTextSelectionMode === 'restoring') {
            const ownerDocument = getOwnerDocument(target)

            if (ownerDocument.documentElement.style.webkitUserSelect === 'none') {
              ownerDocument.documentElement.style.webkitUserSelect
                = iosOriginalWebkitUserSelect || ''
            }

            iosOriginalWebkitUserSelect = ''
            iosTextSelectionMode = 'default'
          }
        })
      }, 300)
    }

    return
  }

  if ((target instanceof HTMLElement || target instanceof SVGElement) && target && elementUserSelectCache.has(target)) {
    const previousValue = elementUserSelectCache.get(target)
    const property = 'userSelect' in target.style ? 'userSelect' : 'webkitUserSelect'

    if (target.style[property] === 'none') {
      target.style[property] = previousValue
    }

    if (target.getAttribute('style') === '') {
      target.removeAttribute('style')
    }

    elementUserSelectCache.delete(target)
  }
}
