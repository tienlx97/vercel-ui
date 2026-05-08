/* eslint-disable style/no-mixed-operators */
/* eslint-disable regexp/no-unused-capturing-group */
const basePropNames = new Set([
  'id',
])

const labelablePropNames = new Set([
  'aria-label',
  'aria-labelledby',
  'aria-describedby',
  'aria-details',
])

const linkPropNames = new Set([
  'href',
  'hrefLang',
  'target',
  'rel',
  'download',
  'ping',
  'referrerPolicy',
])

const globalDOMPropNames = new Set([
  'dir',
  'lang',
  'hidden',
  'inert',
  'translate',
])

const domEventPropNames = new Set([
  'onClick',
  'onAuxClick',
  'onContextMenu',
  'onDoubleClick',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
  'onTouchCancel',
  'onTouchEnd',
  'onTouchMove',
  'onTouchStart',
  'onPointerDown',
  'onPointerMove',
  'onPointerUp',
  'onPointerCancel',
  'onPointerEnter',
  'onPointerLeave',
  'onPointerOver',
  'onPointerOut',
  'onGotPointerCapture',
  'onLostPointerCapture',
  'onScroll',
  'onWheel',
  'onAnimationStart',
  'onAnimationEnd',
  'onAnimationIteration',
  'onTransitionCancel',
  'onTransitionEnd',
  'onTransitionRun',
  'onTransitionStart',
])

const dataAttributeRegex = /^(data-.*)$/

export function filterDOMProps(props, options = {}) {
  const {
    labelable,
    isLink,
    global,
    events = global,
    propNames,
  } = options

  const filteredProps = {}

  for (const propName in props) {
    if (!Object.hasOwn(props, propName)) {
      continue
    }

    const isAllowed
      = basePropNames.has(propName)
        || labelable && labelablePropNames.has(propName)
        || isLink && linkPropNames.has(propName)
        || global && globalDOMPropNames.has(propName)
        || events && domEventPropNames.has(propName)
        || propName.endsWith('Capture')
        && domEventPropNames.has(propName.slice(0, -7))
        || propNames?.has(propName)
        || dataAttributeRegex.test(propName)

    if (isAllowed) {
      filteredProps[propName] = props[propName]
    }
  }

  return filteredProps
}
