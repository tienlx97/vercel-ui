export function mapIconColorToCssStyle(color) {
  return {
    color: color === 'currentColor' ? 'currentColor' : `var(--ds-${color})`,
  }
}
