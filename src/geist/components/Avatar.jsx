'use client'

import clsx from 'clsx'
import { memo, useContext, useState } from 'react'
import styles from '@/geist/css/avatar.module.css'
import { BlurBase64Context } from '../context/433240'
import { Image } from './Image'
import { px } from '@/geist/utils/677848'

// 585051
const AVATAR_SHA = /^[0-9a-f]{40}$/

const GenericAvatar = memo(function GenericAvatar({
  title,
  src,
  size = 80,
  placeholder,
  className,
  imageClassName,
  letter,
  letterStyles,
  hash,
  style,
  priority,
  onLoadingComplete,
  ariaHidden,
  onError,
  mask = true,
  lazy = false,
}) {
  const blurBase64 = useContext(BlurBase64Context)
  const [resolved, setResolved] = useState(false)
  const blurDataURL = hash && blurBase64?.[hash]

  const ariaLabel = placeholder
    ? 'Placeholder Avatar'
    : letter
      ? `Avatar with initials: ${letter}`
      : title

  const normalizedSrc = src?.replace('/api/www/avatar/?', '/api/www/avatar?')

  return (
    <span
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      className={clsx(styles.avatar, className)}
      data-geist-avatar=""
      data-mask={mask}
      data-resolved={resolved}
      data-version="v1"
      role="img"
      style={{ '--size': px(size), ...style }}
    >
      {placeholder ? null : (
        <Image
          alt={ariaLabel || ''}
          blurDataURL={blurDataURL || undefined}
          className={imageClassName}
          decoding="sync"
          height={size}
          loading={lazy ? 'lazy' : 'eager'}
          onError={() => {
            setResolved(true)
            onError?.()
          }}
          onLoad={() => {
            setResolved(true)
            onLoadingComplete?.()
          }}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          priority={priority}
          srcDark={normalizedSrc || undefined}
          srcLight={normalizedSrc || undefined}
          title={ariaLabel}
          unoptimized={!blurDataURL}
          width={size}
        />
      )}

      {letter ? <span style={letterStyles}>{letter}</span> : null}
    </span>
  )
})

function Avatar({ teamId, username, uid, hash, url, placeholder, title, ...props }) {
  if (placeholder) {
    return <GenericAvatar placeholder {...props} />
  }

  let src = url

  if (!src) {
    let path = '/api/www/avatar/'
    const params = new URLSearchParams({
      s: `${2 * props.size}`,
    })

    if (hash && AVATAR_SHA.test(hash)) {
      path += hash
    } else if (username != null) {
      params.set('u', username)
    } else if (teamId != null) {
      params.set('teamId', teamId)
    } else if (uid != null) {
      path += uid
    }

    src = `${path}?${params.toString()}`
  }

  return (
    <GenericAvatar
      hash={hash}
      src={src}
      {...props}
      title={title || (username ? `Avatar for ${username}` : '')}
    />
  )
}

Avatar.displayName = 'Avatar'

export default memo(Avatar)
