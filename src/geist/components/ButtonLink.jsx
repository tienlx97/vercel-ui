'use client'

import React from 'react'
import Button from './Button'
import NextLink from 'next/link'
import { ExternalSmall } from '@/utils/749291'
import { usePrefetchProps } from '@/utils/777155'
import { canPrefetch } from '@/utils/939051'

const ButtonWrapper = React.forwardRef(function ButtonWrapper(
  { children, onClick, onMouseEnter, ...props },
  ref
) {
  return (
    <Button
      ref={ref}
      {...props}
      passthroughOnClick={onClick}
      passthroughOnMouseEnter={onMouseEnter}
    >
      {children}
    </Button>
  )
})

export default function ButtonLink({
  href,
  as,
  tab,
  shallow,
  scroll,
  children,
  prefetch,
  prefetchStrategy = 'visible',
  icon,
  isDifferentZone,
  onNavigate,
  ...buttonProps
}) {
  const prefetchProps = usePrefetchProps({
    href,
    isDifferentZone,
    prefetch,
    prefetchStrategy,
  })

  if (buttonProps.disabled || buttonProps.loading) {
    return <Button {...buttonProps}>{children}</Button>
  }

  const shouldUseNativeAnchor =
    typeof href === 'string' &&
    (tab || !canPrefetch(href) || buttonProps.download || isDifferentZone)

  if (shouldUseNativeAnchor) {
    return (
      <Button
        Component="a"
        href={buttonProps.disabled ? undefined : href}
        rel={tab ? 'noopener' : undefined}
        target={tab ? '_blank' : undefined}
        {...buttonProps}
      >
        {children}
        {icon ? <ExternalSmall /> : null}
      </Button>
    )
  }

  if (typeof href === 'string') {
    return (
      <Button
        Component={NextLink}
        href={href}
        rel={tab ? 'noopener' : undefined}
        target={tab ? '_blank' : undefined}
        onNavigate={onNavigate}
        prefetch={prefetchProps.prefetch}
        scroll={scroll}
        shallow={shallow}
        {...buttonProps}
      >
        {children}
      </Button>
    )
  }

  return (
    <ButtonWrapper
      Component={NextLink}
      onMouseEnter={prefetchProps.onMouseEnter}
      rel={tab ? 'noopener' : undefined}
      target={tab ? '_blank' : undefined}
      {...buttonProps}
      as={as}
      href={href}
      prefetch={prefetchProps.prefetch}
      scroll={scroll}
      shallow={shallow}
    >
      {children}
    </ButtonWrapper>
  )
}
