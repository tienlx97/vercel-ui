'use client'

import { Stack } from '@/geist/components'
import { ThemeToggle } from '@/geist/components/ThemeToggle'

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <Stack
        direction="row"
        align="center"
        justify="space-between"
        gap={3}
        paddingX={4}
        paddingY={2}
      >
        <span>Left</span>
        <button>Action</button>
      </Stack>
    </div>
  )
}
