'use client'

import clsx from 'clsx'
import NextLink from 'next/link'

import { Children, forwardRef, useEffect, useRef } from 'react'

import { buttonStyles as styles } from '@/geist/css/styles'
import { getIxIconSize } from '@/geist/utils/225642'
import { Spinner } from './Spinner'
import { mergeProps, useButton, useFocusRing, useHover } from 'react-aria'
import { useDisabled } from '../hooks/544652'
import { useNewType } from '../hooks/446691'
import { mergeRefs } from '../utils/962582'

const IS_DEV = process.env.VERCEL_ENV !== 'production'

const RESPONSIVE_SIZE_MAP = {
  small: {
    padding: '6px',
    height: '32px',
  },
  medium: {
    padding: '10px',
    height: '40px',
  },
  large: {
    padding: '14px',
    height: '48px',
  },
}

function booleanDataAttr(value) {
  return value ? '' : undefined
}

function getResponsiveSizeStyles(size) {
  if (typeof size !== 'object' || size === null) {
    return {}
  }

  const responsiveSize = {
    sm: size.sm,
    md: size.md || size.sm,
    lg: size.lg || size.md || size.sm,
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  return Object.keys(responsiveSize).reduce((result, breakpoint) => {
    const sizeKey = responsiveSize[breakpoint]

    if (!sizeKey) {
      return result
    }

    const sizeConfig = RESPONSIVE_SIZE_MAP[sizeKey]

    return {
      ...result,
      [`--${breakpoint}-x-padding`]: sizeConfig?.padding,
      [`--${breakpoint}-height`]: sizeConfig?.height,
    }
  }, {})
}

function validateSvgOnlyButton(children, svgOnly, props) {
  let isSvgOnly = false

  const [firstChild, ...restChildren] = Children.toArray(children)

  if (
    firstChild &&
    restChildren.length === 0 &&
    typeof firstChild === 'object' &&
    firstChild !== null &&
    'type' in firstChild
  ) {
    const childType = firstChild.type

    const isNativeSvg = childType === 'svg'

    const isIconComponent =
      typeof childType !== 'string' && 'name' in childType && childType.name === 'Icon'

    if (isNativeSvg || isIconComponent) {
      isSvgOnly = true
    }
  }

  if (isSvgOnly && (!svgOnly || !props['aria-label'])) {
    throw new Error(
      'SVG/Icon-only Buttons must include both an `aria-label` and the `svgOnly` prop.'
    )
  }
}

const Button = forwardRef(
  (
    {
      Component = 'button',
      typeName = 'submit',
      className,
      href,
      as,
      target,
      rel,

      disabled,
      loading,

      width,
      type,
      size,

      prefix,
      normalStyle,
      hoverStyle,
      suffix,

      onClick,
      variant = 'invert',
      shape,
      align,
      children,

      onMouseDown,
      onMouseUp,

      svgOnly,
      shadow,

      passthroughOnClick,
      passthroughOnMouseEnter,

      touchEventWorkaround = false,
      role,

      ...restProps
    },
    forwardedRef
  ) => {
    const disabledFromContext = useDisabled()

    const isDisabled = disabled || loading || disabledFromContext

    const newTypeClassName = useNewType(type, true)

    const internalRef = useRef(null)

    const { focusProps, isFocusVisible } = useFocusRing()

    const { hoverProps, isHovered } = useHover({
      isDisabled,
    })

    const { buttonProps, isPressed } = useButton(
      {
        isDisabled,
        target,
        rel,
        elementType: Component,
        onPress: onClick,
        onPressStart: onMouseDown,
        onPressUp: onMouseUp,
      },
      internalRef
    )

    if (IS_DEV) {
      validateSvgOnlyButton(children, svgOnly, restProps)
    }

    useEffect(() => {
      if (!touchEventWorkaround) {
        return
      }

      function preventTouchStart(event) {
        event.preventDefault()
      }

      const element = internalRef.current

      element?.addEventListener('touchstart', preventTouchStart)

      return () => {
        element?.removeEventListener('touchstart', preventTouchStart)
      }
    }, [touchEventWorkaround])

    const mergedEventProps = mergeProps(
      {
        onClick: passthroughOnClick,
        onMouseEnter: passthroughOnMouseEnter,

        onKeyDown: (event) => {
          if (event.key === ' ' && Component === 'button') {
            event.preventDefault()
          }

          if ('onKeyDown' in restProps && typeof restProps.onKeyDown === 'function') {
            restProps.onKeyDown(event)
          }
        },
      },
      hoverProps,
      focusProps,
      buttonProps
    )

    const isLinkComponent = Component === 'a' || Component === NextLink

    const buttonClassName =
      variant === 'unstyled'
        ? clsx(styles.base, className)
        : clsx(
            styles.base,
            styles.button,
            className,

            type === 'secondary' ? null : newTypeClassName,

            {
              [styles.secondary || '']: type === 'secondary',
              [styles.tertiary || '']: type === 'tertiary',

              [styles.shape || '']: shape === 'circle' || shape === 'square',
              [styles.circle || '']: shape === 'circle',
              [styles.rounded || '']: shape === 'rounded',

              [styles.loading || '']: loading,
              [styles.shadow || '']: shadow,

              [styles.tiny || '']: size === 'tiny',
              [styles.small || '']: size === 'small',
              [styles.large || '']: size === 'large',

              [styles.responsive || '']: typeof size === 'object' && size !== null,

              [styles.customStyles || '']: Boolean(normalStyle),
              [styles.customHoverStyles || '']: Boolean(hoverStyle),
            },

            styles[variant]
          )

    const style = {
      ...restProps.style,

      minWidth: width,
      maxWidth: width,

      ...(normalStyle
        ? {
            '--custom-bg-color': normalStyle.backgroundColor,
            '--custom-color': normalStyle.color,
            '--custom-border-color': normalStyle.borderColor,
          }
        : {}),

      ...(hoverStyle
        ? {
            '--custom-bg-hover-color': hoverStyle.backgroundColor,
            '--custom-hover-color': hoverStyle.color,
            '--custom-border-hover-color': hoverStyle.borderColor,
          }
        : {}),

      '--geist-icon-size': '16px',

      ...getResponsiveSizeStyles(size),
    }

    return (
      <Component
        {...mergedEventProps}
        {...restProps}
        as={as}
        className={buttonClassName}
        data-active={disabled ? undefined : booleanDataAttr(isPressed)}
        data-focus={disabled ? undefined : booleanDataAttr(isFocusVisible)}
        data-geist-button=""
        data-hover={disabled ? undefined : booleanDataAttr(isHovered)}
        data-prefix={prefix || loading ? 'true' : 'false'}
        data-suffix={suffix ? 'true' : 'false'}
        data-testid={restProps['data-testid']}
        data-version="v1"
        href={href}
        ref={mergeRefs([internalRef, forwardedRef])}
        role={isLinkComponent ? 'link' : mergedEventProps.role || role}
        style={style}
        target={isLinkComponent ? target : undefined}
        type={typeName}
        tabIndex={0}
      >
        {prefix || loading ? (
          <span className={styles.prefix}>
            {loading ? <Spinner color="var(--accents-5)" size={getIxIconSize(size)} /> : prefix}
          </span>
        ) : null}

        <span
          className={clsx(styles.content, {
            [styles.flex || '']: svgOnly,
            [styles.start || '']: align === 'start',
            [styles.grow || '']: align === 'grow',
            [styles.flexGrow || '']: align === 'flex-grow',
            [styles.center || '']: align === 'center',
          })}
        >
          {children}
        </span>

        {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
      </Component>
    )
  }
)

Button.displayName = 'Button'

export default Button
