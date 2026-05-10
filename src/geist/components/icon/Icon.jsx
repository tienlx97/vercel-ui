import clsx from 'clsx'
import { Image } from '../Image'
import { mapIconColorToCssStyle } from '@/geist/utils/929933'
import spriteIcons from './spriteIcons'
import { variantIcons } from './variantIcons'

export function Icon({
  name,
  color,
  colored = false,
  monochromeDark = false,
  className,
  size = 16,
  ...rest
}) {
  if (name in variantIcons) {
    return (
      <VariantIcon
        className={className}
        color={color}
        colored={colored}
        icon={name}
        monochromeDark={monochromeDark}
        size={size}
        {...rest}
      />
    )
  }

  if (name in spriteIcons) {
    const iconFile = spriteIcons[name]
    const symbolHref = `${iconFile.src}#${name}`

    return (
      <SpriteIcon
        className={className}
        color={color}
        file={iconFile.src}
        size={size}
        src={symbolHref}
        {...rest}
      />
    )
  }

  console.warn(`Icon "${name}" not found in variantIcons or spriteIcons`)
  return null
}

function SpriteIcon({ color = 'currentColor', src, className, file, size, style, ...rest }) {
  return (
    <>
      <Image
        alt=""
        height={0}
        width={0}
        loading="eager"
        src={file}
        style={{ display: 'none', visibility: 'hidden' }}
      />

      <svg
        className={className}
        height={size}
        width={size}
        style={{
          shapeRendering: 'unset',
          ...mapIconColorToCssStyle(color),
          ...style,
        }}
        {...rest}
      >
        <use href={src} />
      </svg>
    </>
  )
}

function VariantIcon({ icon, colored, monochromeDark, color, className, ...rest }) {
  const variants = variantIcons[icon]

  const lightClassName = clsx('geist-hide-on-dark', className)
  const darkClassName = clsx('geist-hide-on-light', className)

  const lightHref = `${variants.light.src}#${icon}`
  const darkHref = `${variants.dark.src}#${icon}`

  return (
    <>
      {colored && variants['color-light'] ? (
        <ImageIcon {...variants['color-light']} className={lightClassName} {...rest} />
      ) : (
        <SpriteIcon
          className={lightClassName}
          color={color}
          file={variants.light.src}
          src={lightHref}
          {...rest}
        />
      )}

      {colored && variants['color-dark'] && !monochromeDark ? (
        <ImageIcon {...variants['color-dark']} className={darkClassName} {...rest} />
      ) : (
        <SpriteIcon
          className={darkClassName}
          color={color}
          file={variants.dark.src}
          src={darkHref}
          {...rest}
        />
      )}
    </>
  )
}

function ImageIcon({ src, className, size, ...rest }) {
  return (
    <Image
      alt=""
      aria-hidden
      className={className}
      height={size}
      width={size}
      loading="eager"
      src={src}
      {...rest}
    />
  )
}
