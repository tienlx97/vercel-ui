// 344973

import React from 'react'
import clsx from 'clsx'
import styles from '@/geist/css/text.module.css'
import { restrictResponsiveProp } from '../utils/78315'

const defaultLineHeight = {
  48: '3.5rem',
  40: '3.5rem',
  32: '2.5rem',
  24: '2rem',
  20: '1.5rem',
  18: '1.5rem',
  16: '1.5rem',
  14: '1.25rem',
  13: '1.125rem',
  12: '1rem',
  10: '0.75rem',
}

const defaultLetterSpacing = {
  48: '-0.066875rem',
  40: '-0.058125rem',
  32: '-0.049375rem',
  24: '-0.029375rem',
  20: '-0.020625rem',
  18: 'initial',
  16: 'initial',
  14: 'initial',
  13: 'initial',
  12: 'initial',
  10: 'initial',
}

const defaultWeight = {
  48: '700',
  40: '600',
  32: '600',
  24: '600',
  20: '600',
  18: '400',
  16: '400',
  14: '400',
  13: '400',
  12: '400',
  10: '400',
}

const textVariants = {
  'heading-72': { size: 72, lineHeight: 72, weight: 600, letterSpacing: -4.32 },
  'heading-64': { size: 64, lineHeight: 64, weight: 600, letterSpacing: -3.84 },
  'heading-56': { size: 56, lineHeight: 56, weight: 600, letterSpacing: -3.36 },
  'heading-48': { size: 48, lineHeight: 56, weight: 600, letterSpacing: -2.88 },
  'heading-40': { size: 40, lineHeight: 48, weight: 600, letterSpacing: -2.4 },
  'heading-32': { size: 32, lineHeight: 40, weight: 600, letterSpacing: -1.28 },
  'heading-24': { size: 24, lineHeight: 32, weight: 600, letterSpacing: -0.96 },
  'heading-20': { size: 20, lineHeight: 26, weight: 600, letterSpacing: -0.4 },
  'heading-16': { size: 16, lineHeight: 24, weight: 600, letterSpacing: -0.32 },
  'heading-14': { size: 14, lineHeight: 20, weight: 600, letterSpacing: -0.28 },
  'button-16': { size: 16, lineHeight: 20, weight: 500 },
  'button-14': { size: 14, lineHeight: 20, weight: 500 },
  'button-12': { size: 12, lineHeight: 16, weight: 500 },
  'label-20': { size: 20, lineHeight: 32, weight: 400 },
  'label-18': { size: 18, lineHeight: 20, weight: 400 },
  'label-16': { size: 16, lineHeight: 20, weight: 400 },
  'label-14': { size: 14, lineHeight: 20, weight: 400 },
  'label-13': { size: 13, lineHeight: 16, weight: 400 },
  'label-12': { size: 12, lineHeight: 16, weight: 400 },
  'copy-24': { size: 24, lineHeight: 36, weight: 400 },
  'copy-20': { size: 20, lineHeight: 36, weight: 400 },
  'copy-18': { size: 18, lineHeight: 28, weight: 400 },
  'copy-16': { size: 16, lineHeight: 24, weight: 400 },
  'copy-14': { size: 14, lineHeight: 20, weight: 400 },
  'copy-13': { size: 13, lineHeight: 18, weight: 400 },
}

function rem(px, base = 16) {
  return `${px / base}rem`
}

function getTypographyVariables({ size, variant, lineHeight, weight }) {
  if (variant) {
    if (typeof variant === 'string') {
      const token = textVariants[variant]

      return {
        '--text-size': rem(token.size),
        '--text-line-height': rem(token.lineHeight),
        '--text-letter-spacing': `${token.letterSpacing || 0}px`,
        '--text-weight': weight ?? token.weight,
      }
    }

    const responsiveVariant = restrictResponsiveProp(variant)

    // eslint-disable-next-line unicorn/no-array-reduce
    return Object.keys(responsiveVariant).reduce((styles, breakpoint) => {
      const token = textVariants[responsiveVariant[breakpoint]]

      return {
        ...styles,
        [`--${breakpoint}-text-size`]: rem(token.size),
        [`--${breakpoint}-text-line-height`]: rem(token.lineHeight),
        [`--${breakpoint}-text-weight`]: weight ?? token.weight,
        [`--${breakpoint}-text-letter-spacing`]: `${token.letterSpacing || 0}px`,
      }
    }, {})
  }

  if (typeof size === 'number') {
    return {
      '--text-size': rem(size),
      '--text-line-height': lineHeight ? rem(lineHeight) : defaultLineHeight[size],
      '--text-letter-spacing': defaultLetterSpacing[size],
      '--text-weight': weight || defaultWeight[size],
    }
  }

  const responsiveSize = restrictResponsiveProp(size)

  // eslint-disable-next-line unicorn/no-array-reduce
  return Object.keys(responsiveSize).reduce((styles, breakpoint) => {
    const breakpointSize = responsiveSize[breakpoint]

    return {
      ...styles,
      [`--${breakpoint}-text-size`]: rem(breakpointSize),
      [`--${breakpoint}-text-line-height`]: lineHeight
        ? rem(lineHeight)
        : defaultLineHeight[breakpointSize],
      [`--${breakpoint}-text-weight`]: weight || defaultWeight[breakpointSize],
      [`--${breakpoint}-text-letter-spacing`]: defaultLetterSpacing[breakpointSize],
    }
  }, {})
}

export const Text = React.memo(function Text({
  children,
  as: Component = 'p',
  size = 14,
  lineHeight,
  weight,
  color = 'gray-1000',
  transform,
  align,
  truncate,
  wrap = true,
  className,
  style,
  monospace = false,
  variant,
  ref,
  ...rest
}) {
  const textColor = color === 'inherit' ? 'inherit' : `var(--ds-${color})`

  return (
    <Component
      className={clsx(styles.wrapper, className, {
        [styles.truncate]: truncate === true,
        [styles.clamp]: typeof truncate === 'number',
        [styles.nowrap]: !wrap,
        [styles.monospace]: monospace,
      })}
      data-version="v1"
      ref={ref}
      style={{
        ...(typeof truncate === 'number' && { '--text-clamp': truncate }),
        '--text-color': textColor,
        ...getTypographyVariables({ size, variant, lineHeight, weight }),
        ...(typeof transform === 'string' && { '--text-transform': transform }),
        ...(typeof align === 'string' && { '--text-align': align }),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  )
})
