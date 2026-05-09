'use client'

import Button from '@/geist/components/Button'
import { ThemeToggle } from '@/geist/components/ThemeToggle'

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <Button size="small">Upload</Button>
    </div>
  )
}
