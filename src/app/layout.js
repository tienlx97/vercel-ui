import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { GeistThemeScript } from '@/geist/@vercel/next-themes/GeistThemeScript'
import { GeistProvider } from '@/geist/@vercel/next-themes/GeistProvider'

// import Script from 'next/script'
// const themeScript = `
// (() => {
//   const themeClassNames = { light: 'light-theme', dark: 'dark-theme' };
//   const themes = Object.values(themeClassNames);
//   const root = document.documentElement;

//   try {
//     const storedTheme = localStorage.getItem('geist-theme') || 'system';
//     const resolvedTheme = storedTheme === 'system'
//       ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
//       : storedTheme;
//     const className = themeClassNames[resolvedTheme] || resolvedTheme;

//     root.classList.remove(...themes);
//     root.classList.add(className);

//     if (resolvedTheme === 'light' || resolvedTheme === 'dark') {
//       root.style.colorScheme = resolvedTheme;
//     }
//   } catch {
//   }
// })();
// `

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistSans.className} ${geistMono.variable} ${geistMono.className}`}
    >
      <body className="tailwind tailwind-no-preflight">
        {/* <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        /> */}
        <head>
          <GeistThemeScript storageKey="zeit-theme" />
        </head>
        <GeistProvider withScript={false} storageKey="zeit-theme">
          {children}
        </GeistProvider>
      </body>
    </html>
  )
}
