import { isAndroid } from './717835'

export function isVirtualClick(event) {
  if (event.mozInputSource === 0 && event.isTrusted) {
    return true
  }

  if (isAndroid() && event.pointerType) {
    return event.type === 'click' && event.buttons === 1
  }

  return event.detail === 0 && !event.pointerType
}

export function isVirtualPointerEvent(event) {
  return (
    (!isAndroid() && event.width === 0 && event.height === 0)
    || (event.width === 1
      && event.height === 1
      && event.pressure === 0
      && event.detail === 0
      && event.pointerType === 'mouse')
  )
}
