import clsx from 'clsx'
import React from 'react'
import styles from '../css/stack.module.css'

const BREAKPOINTS = ['sm', 'md', 'lg', 'xl']

function mapResponsiveVar(name, value) {
  const vars = {}

  if (typeof value !== 'object') {
    if (value !== null) vars[`--${name}`] = value
    return vars
  }

  let previous
  for (const breakpoint of BREAKPOINTS) {
    const current = value[breakpoint]
    if (current !== null && current !== previous) {
      vars[`--${breakpoint}-${name}`] = current
      previous = current
    }
  }

  return vars
}

function spacingUnit(value) {
  return typeof value === 'number' ? `${value * 4}px` : undefined
}

function normalizeSpacing(value) {
  if (typeof value === 'number') {
    const px = spacingUnit(value)
    return { sm: px, md: px, lg: px, xl: px }
  }

  return {
    sm: spacingUnit(value.sm),
    md: spacingUnit(value.md),
    lg: spacingUnit(value.lg),
    xl: spacingUnit(value.xl),
  }
}

function compressBoxValue(top, right, bottom, left) {
  if (top === right && top === bottom && top === left) {
    return top
  }

  if (top === bottom && right === left) {
    return `${top} ${right}`
  }

  if (right === left) {
    return `${top} ${right} ${bottom}`
  }

  return `${top} ${right} ${bottom} ${left}`
}

function fillResponsive(value) {
  return {
    sm: value.sm,
    md: value.md || value.sm,
    lg: value.lg || value.md || value.sm,
    xl: value.xl || value.lg || value.md || value.sm,
  }
}

function mapBoxVar(cssVarName, all, x, y, top, right, bottom, left) {
  const noSpacingProps =
    all === undefined &&
    x === undefined &&
    y === undefined &&
    top === undefined &&
    right === undefined &&
    bottom === undefined &&
    left === undefined

  if (noSpacingProps) {
    return {
      [`--${cssVarName}`]: '0px',
    }
  }

  const topValue = normalizeSpacing(top ?? y ?? all ?? 0)
  const rightValue = normalizeSpacing(right ?? x ?? all ?? 0)
  const bottomValue = normalizeSpacing(bottom ?? y ?? all ?? 0)
  const leftValue = normalizeSpacing(left ?? x ?? all ?? 0)

  const responsiveValues = {
    sm: compressBoxValue(
      fillResponsive(topValue).sm || '',
      fillResponsive(rightValue).sm || '',
      fillResponsive(bottomValue).sm || '',
      fillResponsive(leftValue).sm || ''
    ),
    md: compressBoxValue(
      fillResponsive(topValue).md || '',
      fillResponsive(rightValue).md || '',
      fillResponsive(bottomValue).md || '',
      fillResponsive(leftValue).md || ''
    ),
    lg: compressBoxValue(
      fillResponsive(topValue).lg || '',
      fillResponsive(rightValue).lg || '',
      fillResponsive(bottomValue).lg || '',
      fillResponsive(leftValue).lg || ''
    ),
    xl: compressBoxValue(
      fillResponsive(topValue).xl || '',
      fillResponsive(rightValue).xl || '',
      fillResponsive(bottomValue).xl || '',
      fillResponsive(leftValue).xl || ''
    ),
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  const vars = Object.keys(responsiveValues).reduce((result, breakpoint) => {
    result[`--${breakpoint}-${cssVarName}`] = responsiveValues[breakpoint]

    return result
  }, {})

  if (
    vars[`--sm-${cssVarName}`] === vars[`--md-${cssVarName}`] &&
    vars[`--md-${cssVarName}`] === vars[`--lg-${cssVarName}`] &&
    vars[`--lg-${cssVarName}`] === vars[`--xl-${cssVarName}`]
  ) {
    return {
      [`--${cssVarName}`]: vars[`--sm-${cssVarName}`],
    }
  }

  return vars
}

function Stack({
  as: Component = 'div',
  children,
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  gap,
  direction = 'column',
  align = 'stretch',
  justify = 'flex-start',
  flex = 'initial',
  debug,
  style,
  className,
  ref,
  ...rest
}) {
  const hasPadding = [
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
  ].some((value) => value !== undefined)

  return (
    <Component
      className={clsx(styles.stack, 'stack', className, {
        [styles.debug]: debug,
        [styles.padding]: hasPadding,
      })}
      data-testid={rest['data-testid']}
      data-version="v1"
      ref={ref}
      style={{
        ...style,
        '--stack-flex': flex,
        ...mapResponsiveVar('stack-direction', direction),
        ...mapResponsiveVar('stack-align', align),
        ...mapResponsiveVar('stack-justify', justify),
        ...mapBoxVar(
          'stack-padding',
          padding,
          paddingX,
          paddingY,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft
        ),
        ...mapBoxVar('stack-gap', gap),
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default React.memo(Stack)
