export function isMac() {
  if (typeof window === 'undefined' || window.navigator == null) {
    return false
  }

  const platform
    = window.navigator.userAgentData?.platform || window.navigator.platform

  return /mac/i.test(platform)
}

export function isAndroid() {
  if (typeof window === 'undefined' || window.navigator == null) {
    return false
  }

  const brands = window.navigator.userAgentData?.brands

  if (Array.isArray(brands) && brands.some(brand => /android/i.test(brand.brand))) {
    return true
  }

  return /android/i.test(window.navigator.userAgent)
}

export function isIOS() {
  return /iPhone|iPad|iPod/i.test(getUserAgent())
}

function getUserAgent() {
  if (typeof window === 'undefined' || !window.navigator) {
    return ''
  }

  const brands = window.navigator.userAgentData?.brands
  if (Array.isArray(brands)) {
    const joined = brands.map(brand => brand.brand).join(' ')
    return `${joined} ${window.navigator.userAgent}`
  }

  return window.navigator.userAgent
}

export function isWebKit() {
  return /AppleWebKit/i.test(getUserAgent()) && !/Chrome|Chromium/i.test(getUserAgent())
}

export function isIPad() {
  return /iPad/i.test(getUserAgent())
}

export function isFirefox() {
  return /Firefox/i.test(getUserAgent())
}
