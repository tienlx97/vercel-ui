'use client'

import Button from '@/components/Button'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <Button size="small">Upload</Button>
    </div>
  )
}
