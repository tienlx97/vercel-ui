import styles from '@/geist/css/icon.module.css'
import { px } from '@/geist/utils/677848'
import Avatar from './Avatar'

export default function AvatarWithIcon({
  icon,
  left,
  right,
  size,
  bottom = -5,
  iconTitle,
  style,
  iconBackground,
  gitType,
  ...avatarProps
}) {
  if (right === undefined && left === undefined) {
    left = -3
  }

  return (
    <div
      className={styles.wrapper}
      style={{
        ...style,
        '--size': px(size),
      }}
    >
      <Avatar size={size} {...avatarProps} />

      {icon ? (
        <div
          aria-hidden
          className={styles.icon}
          data-background={iconBackground ? 'true' : 'false'}
          data-git-type={gitType}
          style={{ left, bottom, right }}
          title={iconTitle}
        >
          {icon}
        </div>
      ) : null}
    </div>
  )
}
