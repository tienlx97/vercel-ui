export function canPrefetch(href) {
  const pathname = typeof href === 'string' ? href : href.pathname

  return (
    Boolean(pathname) &&
    !/^https?:\/\/$/.test(pathname) &&
    !pathname.includes('*') &&
    pathname.startsWith('/')
  )
}
