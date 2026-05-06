export function useNewType(type, isFilled, shade, variant) {
  return type
    ? [
        'geist-new-themed',
        `geist-new-${type}`,
        isFilled ? `geist-new-${type}-fill` : null,
        shade ? `geist-new-${type}-${shade}` : null,
        'tooltip' === variant ? 'geist-new-tooltip' : '',
      ]
    : ''
}
