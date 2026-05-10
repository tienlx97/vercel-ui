'use client'

import { Suspense, useState, useEffect, useRef, useMemo, useCallback } from 'react'
import styles from '@/geist/css/calendar.module.css'
import clsx from 'clsx'
import { isEqual } from 'lodash'

function Calendar(props) {
  return (
    <Suspense fallback={null}>
      <DateRangePicker {...props} />
    </Suspense>
  )
}
