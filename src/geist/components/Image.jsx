import React, { memo, useContext, useMemo } from 'react'
import NextImage from 'next/image'
import clsx from 'clsx'
import styles from '@/geist/css/image.module.css'
import { BlurBase64Context } from '../context/433240'

function createVercelImageLoader(src) {
  if (typeof src === 'string' && src.startsWith('/') && !src.startsWith('/api')) {
    return ({ src, width, quality = 'auto' }) => {
      const transforms = ['f_auto', 'c_limit', `q_${quality}`]

      if (width) {
        transforms.push(`w_${2 * Number(width)}`)
      }

      const uploadPath = src.endsWith('.svg') ? src : `/${transforms.join(',')}${src}`

      // return `https://assets.vercel.com/image/upload${uploadPath}`

      // TODO: Remove this once the image loader is properly configured
      return `http://localhost:3000${uploadPath}`
    }
  }

  return
}

function normalizeSrc(src) {
  return src === '' ? undefined : src
}

const Image = memo(function Image({ src, srcLight, srcDark, onLoad, onError, ...rest }) {
  const blurBase64Map = useContext(BlurBase64Context)

  const lightSrc = normalizeSrc(srcLight) ?? normalizeSrc(src)
  const darkSrc = normalizeSrc(srcDark) ?? lightSrc

  const lightBlurDataURL = blurBase64Map?.[lightSrc]
  const darkBlurDataURL = blurBase64Map?.[darkSrc]

  const lightLoader = createVercelImageLoader(lightSrc)
  const darkLoader = createVercelImageLoader(darkSrc)

  let className = rest.className

  const imageProps = useMemo(() => ({ ...rest }), [rest])

  if (rest.layout !== 'intrinsic' && rest.layout) {
    if (rest.layout === 'responsive') {
      className = `${styles.responsive}${className ? ` ${className}` : ''}`
    } else if (rest.layout === 'fill') {
      imageProps.fill = true
    }
  } else {
    className = `${styles.intrinsic}${className ? ` ${className}` : ''}`
  }

  if (imageProps.objectFit) {
    imageProps.style = imageProps.style || {}
    imageProps.style.objectFit = imageProps.objectFit
  }

  if (imageProps.objectPosition) {
    imageProps.style = imageProps.style || {}
    imageProps.style.objectPosition = imageProps.objectPosition
  }

  delete imageProps.layout
  delete imageProps.objectFit
  delete imageProps.objectPosition

  const lightProps = useMemo(
    () => ({
      ...imageProps,
      src: lightSrc,
      loader: lightLoader,
      blurDataURL: lightBlurDataURL,
      placeholder: lightBlurDataURL ? 'blur' : 'empty',
    }),
    [imageProps, lightBlurDataURL, lightLoader, lightSrc]
  )

  const darkProps = useMemo(
    () => ({
      ...imageProps,
      src: darkSrc,
      loader: darkLoader,
      blurDataURL: darkBlurDataURL,
      placeholder: darkBlurDataURL ? 'blur' : 'empty',
    }),
    [imageProps, darkBlurDataURL, darkLoader, darkSrc]
  )

  const hasThemeVariants = lightSrc !== darkSrc

  return useMemo(() => {
    if (!lightSrc) {
      return null
    }

    if (hasThemeVariants) {
      return (
        <>
          <NextImage
            data-version="v1"
            {...lightProps}
            className={clsx(className, styles.lightMode)}
            onError={onError ? () => onError('light') : undefined}
            onLoad={onLoad ? () => onLoad('light') : undefined}
          />
          <NextImage
            data-version="v1"
            {...darkProps}
            className={clsx(className, styles.darkMode)}
            onError={onError ? () => onError('dark') : undefined}
            onLoad={onLoad ? () => onLoad('dark') : undefined}
          />
        </>
      )
    }

    return (
      <NextImage
        data-version="v1"
        {...lightProps}
        className={className}
        onError={onError ? () => onError() : undefined}
        onLoad={onLoad ? () => onLoad() : undefined}
      />
    )
  }, [className, darkProps, hasThemeVariants, lightProps, lightSrc, onError, onLoad])
})

Image.displayName = 'Image'

export { Image }
