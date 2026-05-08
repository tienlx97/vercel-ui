const DEFAULT_NEW_ICON_SIZE = 16

const ixIconSizeByComponentSize = {
  large: 24,
  small: 16,
  xSmall: 12,
  mediumSmall: 20,
  default: DEFAULT_NEW_ICON_SIZE,
}

export function getIxIconSize(size) {
  return ixIconSizeByComponentSize[size || 'default']
}

export const newIcon16Size = DEFAULT_NEW_ICON_SIZE
