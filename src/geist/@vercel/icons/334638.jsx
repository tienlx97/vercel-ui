import React from 'react'

export function withNewIcon(iconHtml, defaults = {}) {
  const {
    color: defaultColor = 'currentColor',
    size: defaultSize,
    width: defaultWidth,
    height: defaultHeight,
    viewBox = '0 0 16 16',
  } = defaults

  function Icon({
    size,
    color = defaultColor,
    align = 'initial',
    className,
    width,
    height,
    style,
    iconHtml: overrideHtml,
    ...rest
  }) {
    const renderedHtml = overrideHtml || iconHtml
    const baseSize = defaultSize || 16

    return (
      <svg
        className={className}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
        data-testid="geist-icon"
        height={baseSize}
        strokeLinejoin="round"
        style={{
          verticalAlign: align === 'initial' ? undefined : align,
          width: defaultWidth || width || size,
          height: defaultHeight || height || size,
          color: color === 'currentColor' ? 'currentColor' : `var(--ds-${color})`,
          ...style,
        }}
        viewBox={viewBox}
        width={baseSize}
        {...rest}
      />
    )
  }

  return React.memo(Icon)
}

// 663964 334638
