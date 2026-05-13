import { isEqual } from 'lodash'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export function ba(e) {
  if ('presetIndex' in e && void 0 !== e.presetIndex) {
    let t = Object.entries(e.presets || {})[e.presetIndex]
    return t
      ? {
          ...t[1],
          key: t[0],
        }
      : null
  }
  return (
    ('presetKey' in e && e.presets?.flatMap((e) => e.presets).find((t) => t.key === e.presetKey)) ||
    null
  )
}

//

export function bn(e) {
  return e
    ? Array.isArray(e)
      ? e.flatMap((e) => e.presets)
      : Object.entries(e).map(([e, t]) => ({
          ...t,
          key: e,
        }))
    : []
}

//

let ur = Symbol.for('constructDateFrom')

function ui(e, t) {
  return 'function' == typeof e
    ? e(t)
    : e && 'object' == typeof e && ur in e
      ? e[ur](t)
      : e instanceof Date
        ? new e.constructor(t)
        : new Date(t)
}

export function ua(e, t) {
  return ui(t || e, e)
}

export function ul(e, t) {
  let r = ua(e, t?.in)
  return (r.setHours(23, 59, 59, 999), r)
}

//

function p5(e, t) {
  let r = ua(e, t?.in)
  return (r.setSeconds(0, 0), r)
}

export let bl = (e, t) =>
  (t &&
    bn(e).find((e) => {
      let r = (0, isEqual)(p5(e.start), p5(t.start)),
        i = !e.end || (0, isEqual)(p5(e.end), p5(t.end))
      return r && i
    })?.key) ||
  null

//

export function ud(e, t) {
  let r = ua(e, t?.in)
  return (r.setHours(0, 0, 0, 0), r)
}

function un(e, ...t) {
  let r = ui.bind(null, e || t.find((e) => 'object' == typeof e))
  // eslint-disable-next-line unicorn/no-array-callback-reference
  return t.map(r)
}

export function uc(e, t, r) {
  let [i, n] = un(r?.in, e, t)
  return +ud(i) == +ud(n)
}

//

export function uh({ years: e, months: t, weeks: r, days: i, hours: n, minutes: a, seconds: l }) {
  let s = 0
  // eslint-disable-next-line unicorn/numeric-separators-style
  ;(e && (s += 365.2425 * e), t && (s += 30.436875 * t), r && (s += 7 * r), i && (s += i))
  let o = 24 * s * 3600
  return (n && (o += 60 * n * 60), a && (o += 60 * a), l && (o += l), Math.trunc(1e3 * o))
}

//

export function bZ(e, t, r) {
  let [i, n] = (0, useState)(e || t),
    a = (0, useRef)(void 0 !== e),
    l = a.current,
    s = void 0 !== e,
    o = (0, useRef)(i)
  ;(l !== s &&
    console.warn(
      `WARN: A component changed from ${l ? 'controlled' : 'uncontrolled'} to ${s ? 'controlled' : 'uncontrolled'}.`
    ),
    (a.current = s))
  let u = (0, useCallback)(
    (e, ...t) => {
      let i = (e, ...t) => {
        ;(r && !Object.is(o.current, e) && r(e, ...t), s || (o.current = e))
      }
      'function' == typeof e
        ? (console.warn(
            'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320'
          ),
          n((r, ...n) => {
            let a = e(s ? o.current : r, ...n)
            return (i(a, ...t), s) ? r : a
          }))
        : (s || n(e), i(e, ...t))
    },
    [s, r]
  )
  return (s ? (o.current = e) : (e = i), [e, u])
}

//

let gb = {
    prefix: String(Math.round(1e10 * Math.random())),
    current: 0,
  },
  gx = createContext(gb)

function gj() {
  let e = (0, useContext)(gx) !== gb,
    [t, r] = (0, useState)(e)
  return (
    'u' > typeof globalThis.window &&
      e &&
      (0, useLayoutEffect)(() => {
        r(!1)
      }, []),
    t
  )
}

let pD = new Set(['Arab', 'Syrc', 'Samr', 'Mand', 'Thaa', 'Mend', 'Nkoo', 'Adlm', 'Rohg', 'Hebr'])
let pR = new Set([
  'ae',
  'ar',
  'arc',
  'bcc',
  'bqi',
  'ckb',
  'dv',
  'fa',
  'glk',
  'he',
  'ku',
  'mzn',
  'nqo',
  'pnb',
  'ps',
  'sd',
  'ug',
  'ur',
  'yi',
])

function pA(e) {
  if (Intl.Locale) {
    let t = new Intl.Locale(e).maximize().script
    return pD.has(t)
  }
  let t = e.split('-')[0]
  return pR.has(t)
}

let pO = pW()

function pW() {
  let e = ('u' > typeof navigator && (navigator.language || navigator.userLanguage)) || 'en-US'
  return {
    locale: e,
    direction: pA(e) ? 'rtl' : 'ltr',
  }
}

let bX = {
  '001': 1,
  AD: 1,
  AE: 6,
  AF: 6,
  AI: 1,
  AL: 1,
  AM: 1,
  AN: 1,
  AT: 1,
  AX: 1,
  AZ: 1,
  BA: 1,
  BE: 1,
  BG: 1,
  BH: 6,
  BM: 1,
  BN: 1,
  BY: 1,
  CH: 1,
  CL: 1,
  CM: 1,
  CR: 1,
  CY: 1,
  CZ: 1,
  DE: 1,
  DJ: 6,
  DK: 1,
  DZ: 6,
  EC: 1,
  EE: 1,
  EG: 6,
  ES: 1,
  FI: 1,
  FJ: 1,
  FO: 1,
  FR: 1,
  GB: 1,
  GE: 1,
  GF: 1,
  GP: 1,
  GR: 1,
  HR: 1,
  HU: 1,
  IE: 1,
  IQ: 6,
  IR: 6,
  IS: 1,
  IT: 1,
  JO: 6,
  KG: 1,
  KW: 6,
  KZ: 1,
  LB: 1,
  LI: 1,
  LK: 1,
  LT: 1,
  LU: 1,
  LV: 1,
  LY: 6,
  MC: 1,
  MD: 1,
  ME: 1,
  MK: 1,
  MN: 1,
  MQ: 1,
  MV: 5,
  MY: 1,
  NL: 1,
  NO: 1,
  NZ: 1,
  OM: 6,
  PL: 1,
  QA: 6,
  RE: 1,
  RO: 1,
  RS: 1,
  RU: 1,
  SD: 6,
  SE: 1,
  SI: 1,
  SK: 1,
  SM: 1,
  SY: 6,
  TJ: 1,
  TM: 1,
  TR: 1,
  UA: 1,
  UY: 1,
  UZ: 1,
  VA: 1,
  VN: 1,
  XK: 1,
}

let pI = new Set()

function pP() {
  for (let e of ((pO = pW()), pI)) e(pO)
}

let pL = createContext(null)

function pH() {
  let e = gj(),
    [t, r] = (0, useState)(pO)
  return ((0, useEffect)(
    () => (
      pI.size === 0 && globalThis.addEventListener('languagechange', pP),
      pI.add(r),
      () => {
        // eslint-disable-next-line unicorn/explicit-length-check, unicorn/prefer-global-this
        ;(pI.delete(r), 0 === pI.size && window.removeEventListener('languagechange', pP))
      }
    ),
    []
  ),
  e)
    ? {
        locale: 'en-US',
        direction: 'ltr',
      }
    : t
}

function pB() {
  let e = pH()
  return (0, useContext)(pL) || e
}

export function bQ() {
  let e = (function () {
    let { locale: e } = pB()
    return Intl.Locale ? new Intl.Locale(e).maximize().region : e.split('-')[1]
  })()
  return e ? (bX[e] ?? 0) : 0
}

//

export function um(e, t) {
  let r = ua(e, t?.in)
  return (r.setDate(1), r.setHours(0, 0, 0, 0), r)
}

//

export function bJ(e, t) {
  let r = ua(e, t?.in),
    i = r.getFullYear(),
    n = r.getMonth(),
    a = ui(r, 0)
  return (a.setFullYear(i, n + 1, 0), a.setHours(0, 0, 0, 0), a.getDate())
}

//

export function gm(e, t, r) {
  let [i, n] = un(r?.in, e, t)
  return i.getFullYear() === n.getFullYear() && i.getMonth() === n.getMonth()
}

//

export function b0(e, t, r) {
  return (!!t && e < t) || (!!r && e > r)
}

//

export let uo = {}

//

export function bs(e, t, r) {
  let i = ua(e, r?.in)
  // eslint-disable-next-line unicorn/prefer-number-properties
  return isNaN(t) ? ui(r?.in || e, Number.NaN) : (t && i.setDate(i.getDate() + t), i)
}

//

export function bh(e, t, r) {
  return bs(e, -(7 * t), r)
}

//

export function bo(e, t, r) {
  let i = ua(e, r?.in)
  // eslint-disable-next-line unicorn/prefer-number-properties
  if (isNaN(t)) return ui(r?.in || e, NaN)
  if (!t) return i
  let n = i.getDate(),
    a = ui(r?.in || e, i.getTime())
  return (a.setMonth(i.getMonth() + t + 1, 0), n >= a.getDate())
    ? a
    : (i.setFullYear(a.getFullYear(), a.getMonth(), n), i)
}

//

export function us(e, t) {
  let r = ua(e, t?.in),
    i = r.getMonth()
  return (r.setFullYear(r.getFullYear(), i + 1, 0), r.setHours(23, 59, 59, 999), r)
}

//

export function b1(e, t, r, i) {
  t < e && ([e, t] = [t, e])
  let n = new Date(e),
    a = new Date(t)
  if (r && uc(n, new Date(r))) {
    let e = new Date(r)
    n.setHours(e.getHours(), e.getMinutes(), e.getSeconds())
  } else n = ud(n)
  if (i && uc(a, new Date(i))) {
    let e = new Date(i)
    a.setHours(e.getHours(), e.getMinutes(), e.getSeconds())
  } else a = ul(a)
  return {
    start: n,
    end: a,
  }
}

//

export let bk = () => {
  let e = new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric',
    hour12: void 0,
  }).format(new Date(2020, 0, 1, 13, 0, 0))
  return e.includes('PM') || e.includes('pm')
}

//

const pK = {
  previous: 'Previous',
  next: 'Next',
  selectedDateDescription: 'Selected Date: {date, date, full}',
  selectedRangeDescription: 'Selected Range: {start, date, long} to {end, date, long}',
  todayDate: 'Today, {date, date, full}',
  todayDateSelected: 'Today, {date, date, full} selected',
  dateSelected: '{date, date, full} selected',
  startRangeSelectionPrompt: 'Click to start selecting date range',
  finishRangeSelectionPrompt: 'Click to finish selecting date range',
}

export let bq = {
  'en-US': pK,
}

//

export function bV(e, t) {
  let r = (0, useRef)(!0),
    i = (0, useRef)(null)
  ;((0, useEffect)(
    () => (
      (r.current = !0),
      () => {
        r.current = !1
      }
    ),
    []
  ),
    (0, useEffect)(() => {
      let n = i.current
      ;(r.current ? (r.current = !1) : (!n || t.some((e, t) => !Object.is(e, n[t]))) && e(),
        (i.current = t))
    }, t))
}

//
let bz = null

class b$ {
  createLog(e) {
    let t = document.createElement('div')
    return (
      t.setAttribute('role', 'log'),
      t.setAttribute('aria-live', e),
      t.setAttribute('aria-relevant', 'additions'),
      t
    )
  }
  destroy() {
    // eslint-disable-next-line unicorn/prefer-dom-node-remove
    this.node && (document.body.removeChild(this.node), (this.node = null))
  }
  announce(e, t = 'assertive', r = 7e3) {
    if (!this.node) return
    let i = document.createElement('div')
    ;((i.textContent = e),
      // eslint-disable-next-line unicorn/prefer-dom-node-append
      'assertive' === t ? this.assertiveLog.appendChild(i) : this.politeLog.appendChild(i),
      '' !== e &&
        setTimeout(() => {
          i.remove()
        }, r))
  }
  clear(e) {
    this.node &&
      ((e && 'assertive' !== e) || (this.assertiveLog.innerHTML = ''),
      (e && 'polite' !== e) || (this.politeLog.innerHTML = ''))
  }
  constructor() {
    ;((this.node = document.createElement('div')),
      (this.node.dataset.liveAnnouncer = 'true'),
      Object.assign(this.node.style, {
        border: 0,
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        width: '1px',
        whiteSpace: 'nowrap',
      }),
      (this.assertiveLog = this.createLog('assertive')),
      // eslint-disable-next-line unicorn/prefer-dom-node-append
      this.node.appendChild(this.assertiveLog),
      (this.politeLog = this.createLog('polite')),
      // eslint-disable-next-line unicorn/prefer-dom-node-append
      this.node.appendChild(this.politeLog),
      document.body.prepend(this.node))
  }
}

export function bU(e, t = 'assertive', r = 7e3) {
  ;(bz || (bz = new b$()), bz.announce(e, t, r))
}

//

// eslint-disable-next-line unicorn/prefer-global-this
export let de = () => ('u' < typeof window ? 'en-US' : window.navigator.language)
