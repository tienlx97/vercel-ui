/* eslint-disable unicorn/prefer-array-find */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navSections = [
  [
    { href: '/', label: 'Projects', icon: GridIcon },
    { href: '/button', label: 'Button', icon: BoxIcon },
    { href: '/avatar', label: 'Avatar', icon: UserIcon },
    { href: '/badge', label: 'Badge', icon: BadgeIcon },
    { href: '/book', label: 'Book', icon: BookIcon },
  ],
]

function getTitle(pathname) {
  const item = navSections.flat().find((entry) => entry.href === pathname)

  if (item) return item.label
  if (pathname === '/') return 'Projects'

  return pathname
    .split('/')
    .filter(Boolean)
    .at(-1)
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function isActive(pathname, href) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AppShell({ children }) {
  const pathname = usePathname()
  const title = getTitle(pathname) || 'Projects'

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-sidebar__top">
          <Link href="/" className="app-workspace" aria-label="Go to dashboard">
            <span className="app-workspace__avatar">L</span>
            <span className="app-workspace__name">lexuantien&apos;s pr...</span>
            <span className="app-workspace__plan">Hobby</span>
            <ChevronIcon />
          </Link>

          <label className="app-search">
            <SearchIcon />
            <input aria-label="Find" placeholder="Find..." />
            <kbd>F</kbd>
          </label>

          <nav className="app-nav" aria-label="Primary navigation">
            {navSections.map((section, index) => (
              <div className="app-nav__section" key={index}>
                {section.map(({ href, label, icon: Icon }) => (
                  <Link
                    href={href}
                    className="app-nav__item"
                    data-active={isActive(pathname, href)}
                    key={href}
                  >
                    <Icon />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-header">
          <button type="button" className="app-project-switcher">
            All Projects
            <ChevronIcon />
          </button>
          <div className="app-header__title">{title}</div>
          <button type="button" className="app-icon-button" aria-label="More actions">
            <MoreIcon />
          </button>
        </header>

        <main className="app-content">{children}</main>
      </div>
    </div>
  )
}

function IconBase({ children }) {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      {children}
    </svg>
  )
}

function GridIcon() {
  return (
    <IconBase>
      <path d="M3 3h3v3H3zM10 3h3v3h-3zM3 10h3v3H3zM10 10h3v3h-3z" stroke="currentColor" />
    </IconBase>
  )
}

function BoxIcon() {
  return (
    <IconBase>
      <path d="M3 5.5 8 3l5 2.5v5L8 13l-5-2.5z" stroke="currentColor" />
      <path d="M3.5 5.75 8 8l4.5-2.25M8 8v5" stroke="currentColor" />
    </IconBase>
  )
}

function UserIcon() {
  return (
    <IconBase>
      <path
        d="M8 8.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.75 14a5.25 5.25 0 0 1 10.5 0"
        stroke="currentColor"
      />
    </IconBase>
  )
}

function BadgeIcon() {
  return (
    <IconBase>
      <path
        d="M5 3.5h6A2.5 2.5 0 0 1 13.5 6v4A2.5 2.5 0 0 1 11 12.5H5A2.5 2.5 0 0 1 2.5 10V6A2.5 2.5 0 0 1 5 3.5Z"
        stroke="currentColor"
      />
      <path d="M5.5 8h5" stroke="currentColor" strokeLinecap="round" />
    </IconBase>
  )
}

function BookIcon() {
  return (
    <IconBase>
      <path
        d="M3.5 3.5h7A2.5 2.5 0 0 1 13 6v7H5.5A2.5 2.5 0 0 1 3 10.5V4a.5.5 0 0 1 .5-.5Z"
        stroke="currentColor"
      />
      <path d="M5.5 10.5H13M5.5 3.5v7M7.5 6h3" stroke="currentColor" strokeLinecap="round" />
    </IconBase>
  )
}

function SearchIcon() {
  return (
    <IconBase>
      <path
        d="m11.5 11.5 2 2M7.25 12a4.75 4.75 0 1 1 0-9.5 4.75 4.75 0 0 1 0 9.5Z"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </IconBase>
  )
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 14 14" width="14">
      <path
        d="m4.25 5.5 2.75-2.75L9.75 5.5M4.25 8.5 7 11.25 9.75 8.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MoreIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path
        d="M3.5 8h.01M8 8h.01M12.5 8h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}
