import React, { memo } from 'react'
import AvatarWithIcon from './AvatarWithIcon'

function GitLabIcon({ size }) {
  return (
    <svg
      aria-label="gitlab"
      height={size}
      width={size}
      style={{ color: 'white' }}
      viewBox="0 0 24 22"
    >
      <path
        d="M1.279 8.29L.044 12.294c-.117.367 0 .78.325 1.014l11.323 8.23-.009-.012-.03-.039L1.279 8.29zM22.992 13.308a.905.905 0 00.325-1.014L22.085 8.29 11.693 21.52l11.299-8.212z"
        fill="currentColor"
      />
      <path
        d="M1.279 8.29l10.374 13.197.03.039.01-.006L22.085 8.29H1.28z"
        fill="currentColor"
        opacity="0.4"
      />
      <path
        d="M15.982 8.29l-4.299 13.236-.004.011.014-.017L22.085 8.29h-6.103zM7.376 8.29H1.279l10.374 13.197L7.376 8.29z"
        fill="currentColor"
        opacity="0.6"
      />
      <path
        d="M18.582.308l-2.6 7.982h6.103L19.48.308c-.133-.41-.764-.41-.897 0zM1.279 8.29L3.88.308c.133-.41.764-.41.897 0l2.6 7.982H1.279z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  )
}

function GitLabAvatar({
  url,
  size = 30,
  showIcon = true,
  iconSize = 14,
  iconBackground = true,
  lazy = false,
  ...avatarProps
}) {
  const propsForAvatar = url
    ? {
        ...avatarProps,
        src: url,
      }
    : avatarProps

  return (
    <AvatarWithIcon
      gitType="gitlab"
      icon={showIcon ? <GitLabIcon size={iconSize} /> : null}
      iconBackground={iconBackground}
      lazy={lazy}
      size={size}
      {...propsForAvatar}
    />
  )
}

GitLabAvatar.displayName = 'GitLabAvatar'

export default memo(GitLabAvatar)
