'use client'
// 735244

import clsx from 'clsx'
import styles from '@/geist/css/spinner.module.css'
import { px } from '@/utils/677848'

const SMALL_SPINNER = {
  angleIncrement: 45,
  lineDimensions: 'h-[1.5px] w-[3px]',
  delays: [-875, -750, -625, -500, -375, -250, -125, 0],
  duration: 1000,
}

const MEDIUM_SPINNER = {
  angleIncrement: 36,
  lineDimensions: 'h-[1.5px] w-[4px]',
  delays: [-900, -800, -700, -600, -500, -400, -300, -200, -100, 0],
  duration: 1000,
}

const LARGE_SPINNER = {
  angleIncrement: 30,
  lineDimensions: 'h-[8%] w-[24%]',
  delays: [-1100, -1000, -900, -800, -700, -600, -500, -400, -300, -200, -100, 0],
  duration: 1200,
}

function getSpinnerConfig(size = 20) {
  if (size <= 12) return SMALL_SPINNER
  if (size <= 16) return MEDIUM_SPINNER
  return LARGE_SPINNER
}

function normalizeSize(size = 20) {
  let pixelValue = px(size)
  let numericValue = typeof size === 'string' ? Number.parseInt(size, 10) : size

  if (Number.isNaN(numericValue)) {
    numericValue = 20
    pixelValue = px(numericValue)
  }

  return { numericValue, pixelValue }
}

function SpinnerLines({ size = 20 }) {
  const { delays, angleIncrement, lineDimensions, duration } = getSpinnerConfig(size)

  return (
    <>
      {delays.map((delay, index) => (
        <div
          key={`spinner-line-${delay}`}
          className={clsx(
            'absolute left-[-10%] top-[-3.9%] bg-current',
            styles.line,
            lineDimensions
          )}
          style={{
            '--animation-delay': `${delay}ms`,
            '--animation-duration': `${duration}ms`,
            transform: `rotate(${index === 0 ? 0 : index * angleIncrement}deg) translate(146%)`,
          }}
        />
      ))}
    </>
  )
}

export function Spinner({ color, className, size = 20, wrapperClassName, style, ...rest }) {
  const { numericValue, pixelValue } = normalizeSize(size)

  return (
    <div
      className={clsx(wrapperClassName)}
      data-geist-spinner=""
      data-version="v1"
      style={{
        height: pixelValue,
        width: pixelValue,
        ...style,
      }}
      {...rest}
    >
      <div
        className={clsx('relative left-1/2 top-1/2', className)}
        style={{
          height: pixelValue,
          width: pixelValue,
          color: color || 'var(--ds-gray-700)',
        }}
      >
        <SpinnerLines size={numericValue} />
      </div>
    </div>
  )
}
