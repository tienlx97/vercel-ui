/* eslint-disable unicorn/no-array-reduce */
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
import { gT } from './gT'

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

const b = {
  0: 'literal',
  1: 'object',
  literal: 0,
  object: 1,
}

const h = {
  0: 'literal',
  1: 'argument',
  2: 'number',
  3: 'date',
  4: 'time',
  5: 'select',
  6: 'plural',
  7: 'pound',
  8: 'tag',
  literal: 0,
  argument: 1,
  number: 2,
  date: 3,
  time: 4,
  select: 5,
  plural: 6,
  pound: 7,
  tag: 8,
}

function g_(e) {
  return e.type === h.literal
}

const p = {
  MISSING_VALUE: 'MISSING_VALUE',
  INVALID_VALUE: 'INVALID_VALUE',
  MISSING_INTL_API: 'MISSING_INTL_API',
}

var pu = (function (e) {
  function t(t, r, i) {
    var n = e.call(this, t) || this
    n.code = r
    n.originalMessage = i
    return n
  }

  if (typeof e !== 'function' && e !== null) {
    throw new TypeError('Class extends value ' + String(e) + ' is not a constructor or null')
  }

  function r() {
    this.constructor = t
  }

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(t, e)
  } else {
    t.__proto__ = e
  }

  t.prototype = e === null ? Object.create(null) : ((r.prototype = e.prototype), new r())

  t.prototype.toString = function () {
    return '[formatjs Error: ' + this.code + '] ' + this.message
  }

  return t
})(Error)

// const ph = (function (e) {
//   function t(t, r) {
//     return (
//       e.call(
//         this,
//         'The intl string context variable "'
//           .concat(t, '" was not provided to the string "')
//           // eslint-disable-next-line unicorn/prefer-spread
//           .concat(r, '"'),
//         p.MISSING_VALUE,
//         r
//       ) || this
//     )
//   }
//   return ((0, gT.__extends)(t, e), t)
// })(pu)

const ph = (function (e) {
  function t(t, r) {
    return (
      e.call(
        this,
        'The intl string context variable "' + t + '" was not provided to the string "' + r + '"',
        p.MISSING_VALUE,
        r
      ) || this
    )
  }

  Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e)

  function r() {
    this.constructor = t
  }

  t.prototype = e === null ? Object.create(null) : ((r.prototype = e.prototype), new r())

  return t
})(pu)

const m = {
  0: 'number',
  1: 'dateTime',
  number: 0,
  dateTime: 1,
}

function gC(e) {
  return e.type === h.number
}

function gD(e) {
  return !!(e && 'object' == typeof e && e.type === m.number)
}

function gN(e) {
  return e.type === h.date
}

function gk(e) {
  return e.type === h.time
}

function gR(e) {
  return !!(e && 'object' == typeof e && e.type === m.dateTime)
}

function gM(e) {
  return e.type === h.tag
}

function gS(e) {
  return e.type === h.select
}

function gE(e) {
  return e.type === h.plural
}

const pd = (function (e) {
  function t(t, r, i, n) {
    return (
      e.call(
        this,
        'Invalid values for "'
          .concat(t, '": "')
          // eslint-disable-next-line unicorn/prefer-spread
          .concat(r, '". Options are "')
          // eslint-disable-next-line unicorn/prefer-spread
          .concat(Object.keys(i).join('", "'), '"'),
        p.INVALID_VALUE,
        n
      ) || this
    )
  }
  return ((0, gT.__extends)(t, e), t)
})(pu)

const pc = (function (e) {
  function t(t, r, i) {
    return e.call(this, 'Value for "' + t + '" must be of type ' + r, p.INVALID_VALUE, i) || this
  }

  if (typeof e !== 'function' && e !== null) {
    throw new TypeError('Class extends value ' + String(e) + ' is not a constructor or null')
  }

  function r() {
    this.constructor = t
  }

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(t, e)
  } else {
    t.__proto__ = e
  }

  t.prototype = e === null ? Object.create(null) : ((r.prototype = e.prototype), new r())

  return t
})(pu)

function pm(e) {
  return {
    create: function () {
      return {
        get: function (t) {
          return e[t]
        },
        set: function (t, r) {
          e[t] = r
        },
      }
    },
  }
}

function pi(e, t, r, i) {
  var n = null == i || 'number' == typeof i || 'boolean' == typeof i ? i : r(i),
    a = t.get(n)
  return (void 0 === a && ((a = e.call(this, i)), t.set(n, a)), a)
}

var pa = function () {
  return JSON.stringify(arguments)
}

function pl() {
  this.cache = Object.create(null)
}

pl.prototype.get = function (e) {
  return this.cache[e]
}

pl.prototype.set = function (e, t) {
  this.cache[e] = t
}

var ps = {
  create: function () {
    return new pl()
  },
}

function pn(e, t, r) {
  var i = Array.prototype.slice.call(arguments, 3),
    n = r(i),
    a = t.get(n)
  return (void 0 === a && ((a = e.apply(this, i)), t.set(n, a)), a)
}

function pr(e, t) {
  var r = t && t.cache ? t.cache : ps,
    i = t && t.serializer ? t.serializer : pa
  return (
    t && t.strategy
      ? t.strategy
      : function (e, t) {
          var r,
            i,
            n = 1 === e.length ? pi : pn
          return ((r = t.cache.create()), (i = t.serializer), n.bind(this, e, r, i))
        }
  )(e, {
    cache: r,
    serializer: i,
  })
}

var po = {
  variadic: function (e, t) {
    var r, i
    return ((r = t.cache.create()), (i = t.serializer), pn.bind(this, e, r, i))
  },
  monadic: function (e, t) {
    var r, i
    return ((r = t.cache.create()), (i = t.serializer), pi.bind(this, e, r, i))
  },
}

const c = {
  1: 'EXPECT_ARGUMENT_CLOSING_BRACE',
  2: 'EMPTY_ARGUMENT',
  3: 'MALFORMED_ARGUMENT',
  4: 'EXPECT_ARGUMENT_TYPE',
  5: 'INVALID_ARGUMENT_TYPE',
  6: 'EXPECT_ARGUMENT_STYLE',
  7: 'INVALID_NUMBER_SKELETON',
  8: 'INVALID_DATE_TIME_SKELETON',
  9: 'EXPECT_NUMBER_SKELETON',
  10: 'EXPECT_DATE_TIME_SKELETON',
  11: 'UNCLOSED_QUOTE_IN_ARGUMENT_STYLE',
  12: 'EXPECT_SELECT_ARGUMENT_OPTIONS',
  13: 'EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE',
  14: 'INVALID_PLURAL_ARGUMENT_OFFSET_VALUE',
  15: 'EXPECT_SELECT_ARGUMENT_SELECTOR',
  16: 'EXPECT_PLURAL_ARGUMENT_SELECTOR',
  17: 'EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT',
  18: 'EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT',
  19: 'INVALID_PLURAL_ARGUMENT_SELECTOR',
  20: 'DUPLICATE_PLURAL_ARGUMENT_SELECTOR',
  21: 'DUPLICATE_SELECT_ARGUMENT_SELECTOR',
  22: 'MISSING_OTHER_CLAUSE',
  23: 'INVALID_TAG',
  25: 'INVALID_TAG_NAME',
  26: 'UNMATCHED_CLOSING_TAG',
  27: 'UNCLOSED_TAG',
  EXPECT_ARGUMENT_CLOSING_BRACE: 1,
  EMPTY_ARGUMENT: 2,
  MALFORMED_ARGUMENT: 3,
  EXPECT_ARGUMENT_TYPE: 4,
  INVALID_ARGUMENT_TYPE: 5,
  EXPECT_ARGUMENT_STYLE: 6,
  INVALID_NUMBER_SKELETON: 7,
  INVALID_DATE_TIME_SKELETON: 8,
  EXPECT_NUMBER_SKELETON: 9,
  EXPECT_DATE_TIME_SKELETON: 10,
  UNCLOSED_QUOTE_IN_ARGUMENT_STYLE: 11,
  EXPECT_SELECT_ARGUMENT_OPTIONS: 12,
  EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE: 13,
  INVALID_PLURAL_ARGUMENT_OFFSET_VALUE: 14,
  EXPECT_SELECT_ARGUMENT_SELECTOR: 15,
  EXPECT_PLURAL_ARGUMENT_SELECTOR: 16,
  EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT: 17,
  EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT: 18,
  INVALID_PLURAL_ARGUMENT_SELECTOR: 19,
  DUPLICATE_PLURAL_ARGUMENT_SELECTOR: 20,
  DUPLICATE_SELECT_ARGUMENT_SELECTOR: 21,
  MISSING_OTHER_CLAUSE: 22,
  INVALID_TAG: 23,
  INVALID_TAG_NAME: 25,
  UNMATCHED_CLOSING_TAG: 26,
  UNCLOSED_TAG: 27,
}

function pt(e, t) {
  void 0 === t && (t = {})
  var r = new g8(
    e,
    (t = (0, gT.__assign)(
      {
        shouldParseSkeletons: !0,
        requiresOtherClause: !0,
      },
      t
    ))
  ).parse()
  if (r.err) {
    var i = new SyntaxError(c[r.err.kind])
    throw ((i.location = r.err.location), (i.originalMessage = r.err.message), i)
  }
  return (
    (null == t ? void 0 : t.captureLocation) ||
      (function e(t) {
        // eslint-disable-next-line unicorn/no-array-for-each
        t.forEach(function (t) {
          if ((delete t.location, gS(t) || gE(t)))
            for (var r in t.options) (delete t.options[r].location, e(t.options[r].value))
          else
            (gC(t) && gD(t.style)) || ((gN(t) || gk(t)) && gR(t.style))
              ? delete t.style.location
              : gM(t) && e(t.children)
        })
      })(r.val),
    r.val
  )
}

var pf = (function () {
  function e(t, r, i, n) {
    var a,
      l,
      // eslint-disable-next-line unicorn/no-this-assignment
      s = this
    if (
      (void 0 === r && (r = e.defaultLocale),
      (this.formatterCache = {
        number: {},
        dateTime: {},
        pluralRules: {},
      }),
      (this.format = function (e) {
        var t = s.formatToParts(e)
        if (1 === t.length) return t[0].value
        var r = t.reduce(function (e, t) {
          return (
            e.length > 0 && t.type === b.literal && 'string' == typeof e.at(-1)
              ? (e[e.length - 1] += t.value)
              : e.push(t.value),
            e
          )
        }, [])
        return r.length <= 1 ? r[0] || '' : r
      }),
      (this.formatToParts = function (e) {
        return (function e(t, r, i, n, a, l, s) {
          if (1 === t.length && g_(t[0]))
            return [
              {
                type: b.literal,
                value: t[0].value,
              },
            ]
          for (var o = [], u = 0; u < t.length; u++) {
            var d = t[u]
            if (g_(d)) {
              o.push({
                type: b.literal,
                value: d.value,
              })
              continue
            }
            if (d.type === h.pound) {
              'number' == typeof l &&
                o.push({
                  type: b.literal,
                  value: i.getNumberFormat(r).format(l),
                })
              continue
            }
            var c = d.value
            if (!(a && c in a)) throw new ph(c, s)
            var m = a[c]
            if (d.type === h.argument) {
              ;((m && 'string' != typeof m && 'number' != typeof m) ||
                (m = 'string' == typeof m || 'number' == typeof m ? String(m) : ''),
                o.push({
                  type: 'string' == typeof m ? b.literal : b.object,
                  value: m,
                }))
              continue
            }
            if (gN(d)) {
              var f =
                'string' == typeof d.style
                  ? n.date[d.style]
                  : gR(d.style)
                    ? d.style.parsedOptions
                    : void 0
              o.push({
                type: b.literal,
                value: i.getDateTimeFormat(r, f).format(m),
              })
              continue
            }
            if (gk(d)) {
              var f =
                'string' == typeof d.style
                  ? n.time[d.style]
                  : gR(d.style)
                    ? d.style.parsedOptions
                    : n.time.medium
              o.push({
                type: b.literal,
                value: i.getDateTimeFormat(r, f).format(m),
              })
              continue
            }
            if (gC(d)) {
              var f =
                'string' == typeof d.style
                  ? n.number[d.style]
                  : gD(d.style)
                    ? d.style.parsedOptions
                    : void 0
              ;(f && f.scale && (m *= f.scale || 1),
                o.push({
                  type: b.literal,
                  value: i.getNumberFormat(r, f).format(m),
                }))
              continue
            }
            if (gM(d)) {
              var g = d.children,
                x = d.value,
                y = a[x]
              if ('function' != typeof y) throw new pc(x, 'function', s)
              var v = y(
                e(g, r, i, n, a, l).map(function (e) {
                  return e.value
                })
              )
              ;(Array.isArray(v) || (v = [v]),
                o.push.apply(
                  o,
                  v.map(function (e) {
                    return {
                      type: 'string' == typeof e ? b.literal : b.object,
                      value: e,
                    }
                  })
                ))
            }
            if (gS(d)) {
              var w = d.options[m] || d.options.other
              if (!w) throw new pd(d.value, m, Object.keys(d.options), s)
              o.push.apply(o, e(w.value, r, i, n, a))
              continue
            }
            if (gE(d)) {
              var w = d.options['='.concat(m)]
              if (!w) {
                if (!Intl.PluralRules)
                  throw new pu(
                    'Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n',
                    p.MISSING_INTL_API,
                    s
                  )
                var j = i
                  .getPluralRules(r, {
                    type: d.pluralType,
                  })
                  .select(m - (d.offset || 0))
                w = d.options[j] || d.options.other
              }
              if (!w) throw new pd(d.value, m, Object.keys(d.options), s)
              o.push.apply(o, e(w.value, r, i, n, a, m - (d.offset || 0)))
              continue
            }
          }
          return o.length < 2
            ? o
            : o.reduce(function (e, t) {
                var r = e.at(-1)
                return (
                  r && r.type === b.literal && t.type === b.literal
                    ? (r.value += t.value)
                    : e.push(t),
                  e
                )
              }, [])
        })(s.ast, s.locales, s.formatters, s.formats, e, void 0, s.message)
      }),
      (this.resolvedOptions = function () {
        return {
          locale: Intl.NumberFormat.supportedLocalesOf(s.locales)[0],
        }
      }),
      (this.getAst = function () {
        return s.ast
      }),
      'string' == typeof t)
    ) {
      if (((this.message = t), !e.__parse))
        throw new TypeError(
          'IntlMessageFormat.__parse must be set to process `message` of type `string`'
        )
      this.ast = e.__parse(t, {
        ignoreTag: null == n ? void 0 : n.ignoreTag,
      })
    } else this.ast = t
    if (!Array.isArray(this.ast))
      throw new TypeError('A message must be provided as a String or AST.')
    ;((this.formats =
      ((a = e.formats),
      i
        ? Object.keys(a).reduce(
            function (e, t) {
              var r, n
              return (
                (e[t] =
                  ((r = a[t]),
                  (n = i[t])
                    ? (0, gT.__assign)(
                        (0, gT.__assign)((0, gT.__assign)({}, r || {}), n || {}),
                        Object.keys(r).reduce(function (e, t) {
                          return (
                            (e[t] = (0, gT.__assign)((0, gT.__assign)({}, r[t]), n[t] || {})),
                            e
                          )
                        }, {})
                      )
                    : r)),
                e
              )
            },
            (0, gT.__assign)({}, a)
          )
        : a)),
      (this.locales = r),
      (this.formatters =
        (n && n.formatters) ||
        (void 0 === (l = this.formatterCache) &&
          (l = {
            number: {},
            dateTime: {},
            pluralRules: {},
          }),
        {
          getNumberFormat: pr(
            function () {
              for (var e, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r]
              return new ((e = Intl.NumberFormat).bind.apply(
                e,
                (0, gT.__spreadArray)([void 0], t, !1)
              ))()
            },
            {
              cache: pm(l.number),
              strategy: po.variadic,
            }
          ),
          getDateTimeFormat: pr(
            function () {
              for (var e, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r]
              return new ((e = Intl.DateTimeFormat).bind.apply(
                e,
                (0, gT.__spreadArray)([void 0], t, !1)
              ))()
            },
            {
              cache: pm(l.dateTime),
              strategy: po.variadic,
            }
          ),
          getPluralRules: pr(
            function () {
              for (var e, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r]
              return new ((e = Intl.PluralRules).bind.apply(
                e,
                (0, gT.__spreadArray)([void 0], t, !1)
              ))()
            },
            {
              cache: pm(l.pluralRules),
              strategy: po.variadic,
            }
          ),
        })))
  }
  return (
    Object.defineProperty(e, 'defaultLocale', {
      get: function () {
        return (
          e.memoizedDefaultLocale ||
            (e.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale),
          e.memoizedDefaultLocale
        )
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.memoizedDefaultLocale = null),
    (e.__parse = pt),
    (e.formats = {
      number: {
        integer: {
          maximumFractionDigits: 0,
        },
        currency: {
          style: 'currency',
        },
        percent: {
          style: 'percent',
        },
      },
      date: {
        short: {
          month: 'numeric',
          day: 'numeric',
          year: '2-digit',
        },
        medium: {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        },
        long: {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        },
        full: {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        },
      },
      time: {
        short: {
          hour: 'numeric',
          minute: 'numeric',
        },
        medium: {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        },
        long: {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short',
        },
        full: {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short',
        },
      },
    }),
    e
  )
})()

class pb {
  format(e, t) {
    let r,
      i = this.cache[e]
    if (!i) {
      let t = this.messages.getStringForLocale(e, this.locale)
      if (!t) throw new Error(`Could not find intl message ${e} in ${this.locale} locale`)
      ;((i = new pf(t, this.locale)), (this.cache[e] = i))
    }
    return (
      t && (r = Object.keys(t).reduce((e, r) => ((e[r] = null != t[r] && t[r]), e), {})),
      i.format(r)
    )
  }
  constructor(e, t) {
    ;((this.locale = e), (this.messages = t), (this.cache = {}))
  }
}

let pz = new WeakMap()

class pp {
  getStringForLocale(e, t) {
    let r = this.messages[t]
    r ||
      ((r = (function (e, t, r = 'en-US') {
        var i
        if (t[e]) return t[e]
        let n = ((i = e), Intl.Locale ? new Intl.Locale(i).language : i.split('-')[0])
        for (let e in t) if (e.startsWith(n + '-')) return t[e]
        return t[r]
      })(t, this.messages, this.defaultLocale)),
      (this.messages[t] = r))
    let i = r[e]
    if (!i) throw new Error(`Could not find intl message ${e} in ${t} locale`)
    return i
  }
  constructor(e, t = 'en-US') {
    ;((this.messages = {
      ...e,
    }),
      (this.defaultLocale = t))
  }
}

export function pU(e) {
  let { locale: t } = pB(),
    r = (0, useMemo)(() => {
      let t
      return ((t = pz.get(e)) || ((t = new pp(e)), pz.set(e, t)), t)
    }, [e]),
    i = (0, useMemo)(() => new pb(t, r), [t, r])
  return (0, useCallback)((e, t) => i.format(e, t), [i])
}

/*


Đây là bản de-minify của hook tại 07w53aaqz9mna.js (line 22165):

// pf = IntlMessageFormat from `intl-messageformat`
// pt = parser from `@formatjs/icu-messageformat-parser`

const messageDictionaryCache = new WeakMap<object, MessageDictionary>();

export function useMessageFormatter(messagesByLocale) {
  const { locale } = useLocale();

  const messageDictionary = React.useMemo(() => {
    let dictionary = messageDictionaryCache.get(messagesByLocale);

    if (!dictionary) {
      dictionary = new MessageDictionary(messagesByLocale);
      messageDictionaryCache.set(messagesByLocale, dictionary);
    }

    return dictionary;
  }, [messagesByLocale]);

  const formatter = React.useMemo(() => {
    return new MessageFormatter(locale, messageDictionary);
  }, [locale, messageDictionary]);

  return React.useCallback(
    (messageKey, values) => formatter.format(messageKey, values),
    [formatter]
  );
}
Các class liên quan ngay phía trên:

class MessageDictionary {
  constructor(messages, defaultLocale = "en-US") {
    this.messages = { ...messages };
    this.defaultLocale = defaultLocale;
  }

  getStringForLocale(messageKey, locale) {
    let localeMessages = this.messages[locale];

    if (!localeMessages) {
      localeMessages = getLocaleMessages(
        locale,
        this.messages,
        this.defaultLocale
      );

      this.messages[locale] = localeMessages;
    }

    const message = localeMessages[messageKey];

    if (!message) {
      throw new Error(`Could not find intl message ${messageKey} in ${locale} locale`);
    }

    return message;
  }
}

function getLocaleMessages(locale, messagesByLocale, defaultLocale = "en-US") {
  if (messagesByLocale[locale]) {
    return messagesByLocale[locale];
  }

  const language = Intl.Locale
    ? new Intl.Locale(locale).language
    : locale.split("-")[0];

  for (const availableLocale in messagesByLocale) {
    if (availableLocale.startsWith(`${language}-`)) {
      return messagesByLocale[availableLocale];
    }
  }

  return messagesByLocale[defaultLocale];
}

class MessageFormatter {
  constructor(locale, messages) {
    this.locale = locale;
    this.messages = messages;
    this.cache = {};
  }

  format(messageKey, values) {
    let compiledMessage = this.cache[messageKey];

    if (!compiledMessage) {
      const message = this.messages.getStringForLocale(messageKey, this.locale);

      if (!message) {
        throw new Error(`Could not find intl message ${messageKey} in ${this.locale} locale`);
      }

      compiledMessage = new IntlMessageFormat(message, this.locale);
      this.cache[messageKey] = compiledMessage;
    }

    let normalizedValues;

    if (values) {
      normalizedValues = Object.keys(values).reduce((result, key) => {
        result[key] = values[key] != null && values[key];
        return result;
      }, {});
    }

    return compiledMessage.format(normalizedValues);
  }
}
Ý nghĩa ngắn gọn: useMessageFormatter(messagesByLocale) lấy locale hiện tại từ useLocale(), cache dictionary theo object messages bằng WeakMap, tạo MessageFormatter theo locale, rồi trả về function format(messageKey, values). Message string là ICU message, được compile bằng intl-messageformat; parser bên trong bundle là FormatJS parser.





4:47 PM
BẠN CÓ CHẮC CHẮN 100%
4:52 PM



Worked for 21s
Không thể nói “100%” về tên source gốc vì đây là bundle đã minify, không có sourcemap trong đoạn bạn đưa. Nhưng về behavior của pU, mình khá chắc.

Mức chắc chắn:

pU chính là hook export dưới tên useMessageFormatter: chắc chắn, vì có dòng pS({}, "useMessageFormatter", () => pU).
pU(messagesByLocale) lấy locale từ pB() / useLocale(): chắc chắn.
Nó cache new pp(messagesByLocale) bằng WeakMap: chắc chắn.
Nó tạo new pb(locale, dictionary) và trả về callback (key, values) => formatter.format(key, values): chắc chắn.
pb compile message bằng new pf(message, locale): chắc chắn.
pf là implementation tương đương IntlMessageFormat: rất chắc, vì trong bundle có error string IntlMessageFormat.__parse, formatjs Error, MISSING_INTL_API, dùng Intl.NumberFormat, Intl.DateTimeFormat, Intl.PluralRules.
pt là ICU message parser kiểu @formatjs/icu-messageformat-parser: rất chắc, vì pf.__parse = pt, parser xử lý skeleton/plural/select/tag và lỗi FormatJS.
Điểm mình không khẳng định 100% là source ban đầu import đúng như:

import { IntlMessageFormat } from "intl-messageformat";
import { parse } from "@formatjs/icu-messageformat-parser";

*/
