import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="root">{children}</div>
      </body>
    </html>
  )
}
