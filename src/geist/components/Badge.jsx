// 306538

import clsx from 'clsx'
import styles from '../css/badge.module.css'

export function Badge({
  as: Component = 'span',
  children,
  className,
  variant = 'gray',
  size = 'md',
  capitalize = true,
  icon,
  ...restProps
}) {
  const isNumerical = typeof children === 'number'

  return (
    <Component
      className={clsx(
        className,
        styles.badge,
        capitalize && 'capitalize',
        styles[variant],
        styles[size],
        isNumerical && styles.numerical
      )}
      data-geist-badge=""
      data-version="v2"
      {...restProps}
    >
      <span className={styles.contentContainer}>
        {icon !== undefined && <span className={styles.iconContainer}>{icon}</span>}
        {children}
      </span>
    </Component>
  )
}
