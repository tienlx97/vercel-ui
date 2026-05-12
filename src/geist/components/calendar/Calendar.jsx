'use client'

import { Suspense, useState, useEffect, useRef, useMemo, useCallback } from 'react'
import styles from '@/geist/css/calendar.module.css'
import clsx from 'clsx'
import { isEqual } from 'lodash'
import {
  b0,
  b1,
  ba,
  bh,
  bJ,
  bk,
  bl,
  bn,
  bo,
  bq,
  bQ,
  bs,
  bU,
  bV,
  bZ,
  gm,
  ua,
  uc,
  ud,
  uh,
  ul,
  um,
  uo,
  us,
} from './helper'
import { useMessageFormatter, useDateFormatter, useLocale } from '@react-aria/i18n'
import { filterDOMProps } from '@/geist/utils/778315'
import { mergeProps, useId } from 'react-aria'

function Calendar(props) {
  return (
    <Suspense fallback={null}>
      <DateRangePicker {...props} />
    </Suspense>
  )
}

const DateRangePicker = ({
  defaultOpen: e = !1,
  value: t,
  minValue: r,
  maxValue: i,
  onChange: n,
  size: a,
  popoverAlignment: l = 'start',
  disabled: s,
  buttonClassName: o,
  buttonTypeName: u,
  onClick: d,
  onLockedClick: c,
  compact: h = !1,
  width: m = h ? '180px' : '250px',
  dataTestId: f,
  stacked: g,
  buttonSuffix: p,
  hideDateButton: b = !1,
  horizontalLayout: v = !1,
  allowClear: w = !1,
  skeleton: j = !1,
  autoFocus: T = !1,
  showTimeInput: _ = !0,
  pinnedTimezone: C,
  isDocsPage: N,
  maxDuration: k,
  className: S,
  ...E
}) => {
  let { presets: M } = E,
    [D, R] = (0, useState)(e),
    [A, W] = (0, useState)(void 0),
    [O, P] = (0, useState)(ba(E)?.key || null),
    H = (0, m0.useIsMobile)(),
    L = (0, useCallback)(() => {
      H || R(!1)
    }, [H])
  ;(0, useEffect)(
    () => (window.addEventListener('scroll', L), () => window.removeEventListener('scroll', L)),
    [L]
  )
  let F = (0, useRef)(null),
    B = (0, useRef)(!1),
    z = (0, useMemo)(() => {
      if (M && O && '__custom' !== O) {
        let e = bn(M).find((e) => e.key === O)
        if (e)
          return {
            start: e.start,
            end: e.end ?? ul(new Date()),
          }
      }
      return null
    }, [O, M])
  ;(0, useEffect)(() => {
    if (!t || !M || '__custom' === O) return
    let e = bl(M, t)
    e === O ? null === z || (uc(t.start, z.start) && uc(t.end, z.end)) || P('__custom') : P(e)
  }, [z, O, M, t])
  let U = (0, useCallback)(
      (e) => {
        let t = bl(M, e) //
        P(t) //
        let r = e
        if (!t && k && e?.start && e?.end) {
          let t = F.current,
            i = +e.start,
            n = +e.end,
            a = uh(k)
          if (n - i > a) {
            let e = t?.start ? +t.start : void 0
            ;(t?.end && t.end,
              (r =
                e && e === i
                  ? {
                      start: new Date(n - a),
                      end: new Date(n),
                    }
                  : {
                      start: new Date(i),
                      end: new Date(i + a),
                    }))
          }
        }
        ;(n(r, t || void 0), B.current || R(!1))
      },
      [n, M, k]
    ),
    $ = (function (e) {
      var t
      let { value: r, defaultValue: i, onChange: n, isDateExceedsLimit: a, ...l } = e,
        [s, o] = bZ(r, i, n),
        u =
          null == s
            ? null
            : {
                start: new Date((t = s).start),
                end: new Date(t.end),
              },
        [d, c] = (0, useState)(null),
        h = (function (e) {
          let [t, r] = bZ(e.value || void 0, e.defaultValue, e.onChange),
            i = t ? new Date(t) : null,
            n = i || new Date(),
            [a, l] = (0, useState)(n),
            [s, o] = (0, useState)(n),
            [u, d] = (0, useState)(e.autoFocus || !1),
            c = a.getMonth(),
            h = a.getFullYear(),
            m = bQ(),
            f = (um(a).getDay() - m) % 7
          f < 0 && (f += 7)
          let g = bJ(a),
            p = Math.ceil((f + g) / 7),
            b = e.minValue ? ud(e.minValue) : null,
            x = e.maxValue ? ul(e.maxValue) : null
          function v(e) {
            ;(gm(e, a) || l(um(e)), b0(e, b, x) || o(e))
          }
          function w(t) {
            e.isDisabled || e.isReadOnly || r(t)
          }
          let j = (0, useMemo)(
            () =>
              [...Array.from({ length: 7 }).keys()].map((e) => {
                var t, r
                let i, n, a, l
                return (
                  (t = Date.now()),
                  (r = (e + m) % 7),
                  (i =
                    void 0 ?? void 0 ?? uo.weekStartsOn ?? uo.locale?.options?.weekStartsOn ?? 0),
                  (a = (n = ua(t, void 0)).getDay()),
                  (l = 7 - i),
                  bs(
                    n,
                    r < 0 || r > 6
                      ? r - ((a + l) % 7)
                      : (((((r % 7) + 7) % 7) + l) % 7) - ((a + l) % 7),
                    void 0
                  )
                )
              }),
            [m]
          )
          return {
            isDisabled: e.isDisabled,
            isReadOnly: e.isReadOnly,
            value: i,
            setValue: w,
            currentMonth: a,
            focusedDate: s,
            setFocusedDate: o,
            focusCell: v,
            focusNextDay() {
              v(bs(s, 1))
            },
            focusPreviousDay() {
              v(bs(s, -1, void 0))
            },
            focusNextWeek() {
              v(bs(s, 7, void 0))
            },
            focusPreviousWeek() {
              v(bh(s, 1))
            },
            focusNextMonth() {
              v(bo(a, 1))
            },
            focusPreviousMonth() {
              v(bo(a, -1, void 0))
            },
            focusStartOfMonth() {
              v(um(s))
            },
            focusEndOfMonth() {
              v(us(ud(s)))
            },
            focusNextYear() {
              v(bo(s, 12, void 0))
            },
            focusPreviousYear() {
              v(bo(s, -12, void 0))
            },
            focusToday() {
              v(new Date())
            },
            selectFocusedDate() {
              w(s)
            },
            selectDate(e) {
              w(e)
            },
            isFocused: u,
            setFocused: d,
            weeksInMonth: p,
            weekStart: m,
            daysInMonth: bJ(a),
            weekDays: j,
            getCellDate: (e, t) => new Date(h, c, 7 * e + t - f + 1),
            isInvalid: (e) => b0(e, b, x),
            isSelected: (e) => uc(e, t),
            isCellFocused: (e) => u && s && uc(e, s),
            isCellDisabled: (t) => e.isDisabled || b0(t, b, x),
            isPreviousMonthInvalid: () => b0(us(bo(a, -1, void 0)), b, null),
            isNextMonthInvalid: () => b0(um(bo(a, 1)), b, x),
          }
        })({
          ...l,
          value: s && s.start,
        }),
        m = (0, useMemo)(() => (u ? new Date(Math.min(u.end.getTime(), Date.now())) : null), [u]),
        f = d ? b1(d, h.focusedDate) : s && b1(u.start, m),
        g = (t) => {
          e.isReadOnly || (d ? (o(b1(d, t, e.minValue, e.maxValue)), c(null)) : c(t))
        }
      return {
        ...h,
        value: u,
        setValue(e) {
          ;(c(null), o(e))
        },
        anchorDate: d,
        setAnchorDate: c,
        highlightedRange: f,
        selectFocusedDate() {
          g(h.focusedDate)
        },
        selectDate: g,
        highlightDate(e) {
          d && h.setFocusedDate(e)
        },
        isSelected: (e) => f && e >= f.start && e <= f.end,
        isDateExceedsLimit: (e) => !!a && a(e, d),
      }
    })({
      value: t || z,
      minValue: r,
      maxValue: i,
      onChange: U,
      autoFocus: !0,
      isDateExceedsLimit: (e, t) => {
        if (!k || !t) return !1
        let r = uh(k),
          i = t.getTime()
        return Math.abs(e.getTime() - i) > r
      },
    })
  ;(0, useEffect)(() => {
    F.current = $.value
  }, [$.value])
  let G = (0, useMemo)(
      () => $.value?.start || $.anchorDate || new Date(m$.local().startOf('day').toISO()),
      [$.value, $.anchorDate]
    ),
    Y = (0, useMemo)(() => $.value?.end || new Date(m$.local().endOf('day').toISO()), [$.value]),
    V = (function (e, t) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      let r = useMessageFormatter(bk),
        { start: i, end: n } = t.highlightedRange || {
          start: null,
          end: null,
        },
        a = (0, useMemo)(() => {
          if (!t.anchorDate && i && n)
            return uc(i, n)
              ? r('selectedDateDescription', {
                  date: i,
                })
              : r('selectedRangeDescription', {
                  start: i,
                  end: n,
                })
          return ''
        }, [i, n, t.anchorDate, r]),
        l = (function (e, t, r) {
          let { isReadOnly: i = !1, isDisabled: n = !1 } = e,
            a = (0, filterDOMProps)(e, {
              labelable: !0,
            }),
            // eslint-disable-next-line react-hooks/rules-of-hooks
            l = useMessageFormatter(bq),
            // eslint-disable-next-line react-hooks/rules-of-hooks
            s = useDateFormatter({
              month: 'long',
              year: 'numeric',
            }),
            o = (0, useRef)(null),
            u = (0, useId)(e.id),
            d = (0, useId)(),
            c = (0, useId)(),
            // eslint-disable-next-line react-hooks/rules-of-hooks
            { direction: h } = useLocale()
          ;(bV(() => {
            t.isFocused || bU(s.format(t.currentMonth))
          }, [t.currentMonth]),
            bV(() => {
              r && bU(r)
            }, [r]))
          let m = (function (e) {
            let { id: t, 'aria-label': r, 'aria-labelledby': i } = e
            return (
              (t = (0, useId)(t)),
              i && r
                ? (i = [...new Set([t, ...i.trim().split(/\s+/)])].join(' '))
                : i && (i = i.trim().split(/\s+/).join(' ')),
              !r,
              {
                id: t,
                'aria-label': r,
                'aria-labelledby': i,
              }
            )
          })({
            id: u,
            'aria-label': e['aria-label'],
            'aria-labelledby': `${e['aria-labelledby'] || ''} ${e['aria-label'] ? u : ''} ${d}`,
          })
          return {
            calendarProps: (0, mergeProps)(a, {
              ...m,
              id: u,
              role: 'group',
            }),
            calendarTitleProps: {
              id: d,
            },
            nextButtonProps: {
              onPress: () => t.focusNextMonth(),
              'aria-label': l('next'),
              isDisabled: e.isDisabled || t.isNextMonthInvalid(),
            },
            prevButtonProps: {
              onPress: () => t.focusPreviousMonth(),
              'aria-label': l('previous'),
              isDisabled: e.isDisabled || t.isPreviousMonthInvalid(),
            },
            calendarBodyProps: {
              ref: o,
              role: 'grid',
              'aria-readonly': i || void 0,
              'aria-disabled': n || void 0,
              'aria-labelledby': m['aria-labelledby'],
              'aria-describedby': r ? c : void 0,
              onKeyDown: (e) => {
                switch (e.key) {
                  case 'Enter':
                  case ' ': {
                    ;(e.preventDefault(), t.selectFocusedDate())
                    break
                  }
                  case 'PageUp': {
                    ;(e.preventDefault(),
                      e.shiftKey ? t.focusPreviousYear() : t.focusPreviousMonth())
                    break
                  }
                  case 'PageDown': {
                    ;(e.preventDefault(), e.shiftKey ? t.focusNextYear() : t.focusNextMonth())
                    break
                  }
                  case 'End': {
                    ;(e.preventDefault(), t.focusEndOfMonth())
                    break
                  }
                  case 'Home': {
                    ;(e.preventDefault(), t.focusStartOfMonth())
                    break
                  }
                  case 'ArrowLeft': {
                    ;(e.preventDefault(), 'rtl' === h ? t.focusNextDay() : t.focusPreviousDay())
                    break
                  }
                  case 'ArrowUp': {
                    ;(e.preventDefault(), t.focusPreviousWeek())
                    break
                  }
                  case 'ArrowRight': {
                    ;(e.preventDefault(), 'rtl' === h ? t.focusPreviousDay() : t.focusNextDay())
                    break
                  }
                  case 'ArrowDown': {
                    ;(e.preventDefault(), t.focusNextWeek())
                  }
                }
              },
              onFocus: () => t.setFocused(!0),
              onBlur: () => t.setFocused(!1),
            },
            captionProps: {
              id: c,
              children: r,
            },
          }
        })(e, t, a)
      return (
        (l.calendarBodyProps = (0, mergeProps)(l.calendarBodyProps, {
          'aria-multiselectable': !0,
          onKeyDown: (e) => {
            'Escape' === e.key && t.setAnchorDate(null)
          },
        })),
        l
      )
    })({}, $),
    { prevButtonProps: q, nextButtonProps: K } = V,
    { onPress: Z, isDisabled: J, ...X } = q,
    { onPress: Q, isDisabled: ee, ...et } = K,
    er = H && !h ? '100%' : m,
    ei = ba(E) ?? void 0,
    en = (function ({
      preselectedPreset: e,
      presets: t,
      calendarState: r,
      disabled: i,
      allowClear: n,
      minValue: a,
      maxValue: l,
    }) {
      let [s, o] = (0, useState)(e?.text ?? ''),
        [u, d] = (0, useState)(''),
        [c, h] = (0, useState)(!1),
        [m, f] = (0, useState)(null),
        [g, p] = (0, useState)(!1),
        [b, x] = (0, useState)(!1),
        [v, w] = (0, useState)(!0),
        {
          focusProps: j,
          isFocusVisible: T,
          isFocused: _,
        } = (0, p4.useFocusRing)({
          isTextInput: !0,
        })
      ;(0, useEffect)(() => {
        e?.text && !g && o(e.text)
      }, [e, g])
      let C = (0, useCallback)(
          (e) => {
            ;(x(!1), p(!1), o(e), h(!1), w(!1))
            let i = bn(t).find((t) => t.text === e)
            if (i?.start) {
              ;(r.setValue({
                start: i.start,
                end: i.end || new Date(),
              }),
                f({
                  start: i.start,
                  end: i.end || new Date(),
                }))
              return
            }
            let n = ((e) => {
              let t = bi.parse(e, void 0)
              if (t.length > 2 || t.length === 0) return null
              let r = t.length - 1
              return {
                start: t[r]?.start.date(),
                end: t[r]?.end ? t[r]?.end?.date() : t[r]?.refDate,
              }
            })(e)
            if (null === n) return void x(!0)
            let s = {
              ...n,
            }
            ;(/\d+[dwDW]|\d+\s*(day|week|month)/i.test(e) &&
              ((s.start = ud(s.start)), (s.end = ul(s.end))),
              a && s.start < a && (s.start = new Date(a)),
              l && s.end > l && (s.end = new Date(l)),
              s.start > s.end && (s.start = s.end),
              r.setValue(s),
              d(''),
              f(s))
          },
          [t, a, l, r]
        ),
        N = (0, useMemo)(() => null === bl(t, r.value) && !(0, p3.isEqual)(r.value, m), [r, m, t]),
        k = n && !!(s || N),
        S = (0, useMemo)(
          () => (e && !g && v && !N ? e.text : !N || g || u || i ? (g ? u : s) : 'Select Period'),
          [g, i, e, u, s, v, N]
        )
      return {
        value: s,
        inputValue: S,
        typedValue: u,
        open: c,
        setOpen: h,
        custom: N,
        error: b,
        showClearButton: !!k,
        changeCalendarState: C,
        setValue: o,
        setLastSetDate: f,
        setTypedValue: d,
        setDirty: p,
        setError: x,
        focusProps: j,
        isFocusVisible: T,
        isFocused: _,
      }
    })({
      allowClear: w,
      calendarState: $,
      disabled: s,
      preselectedPreset: ei,
      presets: M || {},
      minValue: r,
      maxValue: i,
    }),
    ea = (0, useMemo)(() => (O || en.isFocused ? 'preset' : 'calendar'), [en.isFocused, O]),
    el = h && 'preset' === ea,
    es = !!$.value?.start && w,
    eo = {
      className: o,
      typeName: u,
      type: 'secondary',
      width: er,
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'left',
        fontWeight: 400,
        ...('small' === a
          ? {
              height: '32px',
              minHeight: '32px',
            }
          : {}),
      },
      prefix: (0, x.jsx)(mY.Calendar, {
        className: pJ.default.calendarIcon,
        size: 16,
      }),
      suffix: p,
      size: a,
      disabled: s,
      children: $.value?.start
        ? `${((
            e,
            t,
            {
              today: r = new Date(),
              locale: i = de(),
              includeTime: n = !0,
              separator: a = '-',
            } = {}
          ) => {
            let l = uC(e, t),
              s = (function (e, t) {
                uT(2, arguments)
                var r = u_(e),
                  i = u_(t)
                return r.getFullYear() === i.getFullYear() && r.getMonth() === i.getMonth()
              })(e, t),
              o = uk(e, t),
              u = uC(e, r),
              d = uk(e, r),
              c = u ? '' : `, ${u5(t, 'yyyy')}`,
              h = (e) => {
                let t
                return (
                  (t = (
                    e.toLocaleTimeString(i, {
                      hour: '2-digit',
                      minute: '2-digit',
                    }) || ''
                  )
                    .replaceAll(' AM', 'am')
                    .replaceAll(' PM', 'pm')).includes('m')
                    ? t.replaceAll(':00', '')
                    : t
                ).replace(/^0/, '')
              },
              m = n && !u8(uN(e), e) ? `, ${h(e)}` : '',
              f =
                n &&
                !u8(
                  (function (e) {
                    uT(1, arguments)
                    var t = u_(e)
                    return (t.setHours(23, 59, 59, 999), t)
                  })(t),
                  t
                )
                  ? `, ${h(t)}`
                  : ''
            return u8(
              (function (e) {
                uT(1, arguments)
                var t = u_(e),
                  r = new Date(0)
                return (r.setFullYear(t.getFullYear(), 0, 1), r.setHours(0, 0, 0, 0), r)
              })(e),
              e
            ) &&
              u8(
                (function (e) {
                  uT(1, arguments)
                  var t = u_(e),
                    r = t.getFullYear()
                  return (t.setFullYear(r + 1, 0, 0), t.setHours(23, 59, 59, 999), t)
                })(t),
                t
              )
              ? `${u5(e, 'yyyy')}`
              : u8(
                    (function (e) {
                      uT(1, arguments)
                      var t = u_(e),
                        r = t.getMonth()
                      return (t.setMonth(r - (r % 3), 1), t.setHours(0, 0, 0, 0), t)
                    })(e),
                    e
                  ) &&
                  u8(
                    (function (e) {
                      uT(1, arguments)
                      var t = u_(e),
                        r = t.getMonth()
                      return (t.setMonth(r - (r % 3) + 3, 0), t.setHours(23, 59, 59, 999), t)
                    })(t),
                    t
                  ) &&
                  u7(e) === u7(t)
                ? `Q${u7(e)} ${u5(e, 'yyyy')}`
                : u8(
                      (function (e) {
                        uT(1, arguments)
                        var t = u_(e)
                        return (t.setDate(1), t.setHours(0, 0, 0, 0), t)
                      })(e),
                      e
                    ) &&
                    u8(
                      (function (e) {
                        uT(1, arguments)
                        var t = u_(e),
                          r = t.getMonth()
                        return (
                          t.setFullYear(t.getFullYear(), r + 1, 0),
                          t.setHours(23, 59, 59, 999),
                          t
                        )
                      })(t),
                      t
                    )
                  ? s && l
                    ? `${u5(e, 'LLLL yyyy')}`
                    : `${u5(e, 'LLL')} ${a} ${u5(t, 'LLL yyyy')}`
                  : l
                    ? s
                      ? o
                        ? m || f
                          ? d
                            ? `${h(e)} ${a} ${h(t)}`
                            : `${u5(e, 'LLL d')}${m} ${a} ${h(t)}${c}`
                          : `${u5(e, 'eee, LLL d')}${c}`
                        : m || f
                          ? `${u5(e, 'LLL d')}${m} ${a} ${u5(t, 'LLL d')}${f}${c}`
                          : `${u5(e, 'LLL d')} ${a} ${u5(t, 'd')}${c}`
                      : `${u5(e, 'LLL d')}${m} ${a} ${u5(t, 'LLL d')}${f}${c}`
                    : `${u5(e, "LLL d ''yy")}${m} ${a} ${u5(t, "LLL d ''yy")}${f}`
          })($.value.start, $.value.end)}`
        : 'Select Date Range',
    },
    eu = M
      ? (0, x.jsx)(b3, {
          allowClear: w,
          calendarState: $,
          compact: h,
          disabled: s,
          hookReturn: en,
          isMinimized: 'preset' !== ea,
          minValue: r,
          onLockedClick: c,
          preselectedPreset: ei,
          presets: M,
          size: a,
        })
      : null,
    ed = bQ(),
    ec = (0, useRef)(null)
  ;(0, useEffect)(() => {
    function e(e) {
      if (('[' !== e.key && ']' !== e.key) || !$.value?.start || !$.value?.end || s) return
      let t = document.activeElement,
        n = ec.current
      if (
        !t ||
        !n?.contains(t) ||
        (t instanceof HTMLElement && ('INPUT' === t.tagName || t.hasAttribute('cmdk-input')))
      )
        return
      e.preventDefault()
      let a = '[' === e.key ? -1 : 1,
        l = (function (e, t, r) {
          let i,
            n,
            { start: a, end: l } = e,
            s = r?.weekStartsOn ?? 0,
            o = 1 === t,
            u = (function (e, t) {
              let [r, i] = un(void 0, e, t),
                n = ud(r),
                a = ud(i)
              return Math.round((n - bu(n) - (a - bu(a))) / 864e5)
            })(l, a)
          if (0 === u)
            if (bm(a) && bf(l)) {
              let e = o ? bs(a, 1) : bs(a, -1, void 0)
              ;((i = ud(e)), (n = ul(e)))
            } else {
              let e = l.getTime() - a.getTime(),
                t = o ? e : -e
              ;((i = new Date(a.getTime() + t)), (n = new Date(l.getTime() + t)))
            }
          else if (
            6 === u &&
            uc(
              a,
              uf(a, {
                weekStartsOn: s,
              })
            ) &&
            uc(
              l,
              uu(a, {
                weekStartsOn: s,
              })
            )
          ) {
            let e = o ? bs(a, 7, void 0) : bh(a, 1)
            ;((i = uf(e, {
              weekStartsOn: s,
            })),
              (n = uu(e, {
                weekStartsOn: s,
              })))
          } else if (uc(a, um(a)) && uc(l, us(a))) {
            let e = o ? bo(a, 1) : bo(a, -1, void 0)
            ;((i = um(e)), (n = us(e)))
          } else if (uc(a, bc(a)) && uc(l, bd(a))) {
            let e = o ? bo(a, 12, void 0) : bo(a, -12, void 0)
            ;((i = bc(e)), (n = bd(e)))
          } else {
            let e = o ? bs(a, u) : bs(a, -u, void 0),
              t = o ? bs(l, u) : bs(l, -u, void 0)
            ;((i = bm(a) ? ud(e) : e), (n = bf(l) ? ul(t) : t))
          }
          return (function (e, t) {
            let r = t?.minValue ? new Date(t.minValue).getTime() : null,
              i = t?.maxValue ? new Date(t.maxValue).getTime() : null,
              { start: n, end: a } = e,
              l = n.getTime(),
              s = a.getTime()
            return (null !== r && s < r) || (null !== i && l > i)
              ? null
              : (null !== r && l < r && (n = new Date(r)),
                null !== i && s > i && (a = new Date(i)),
                {
                  start: n,
                  end: a,
                })
          })(
            {
              start: i,
              end: n,
            },
            r
          )
        })(
          {
            start: new Date($.value.start),
            end: new Date($.value.end),
          },
          a,
          {
            minValue: r,
            maxValue: i,
            weekStartsOn: ed,
          }
        )
      l && ((B.current = !0), $.setValue(l), (B.current = !1), $.focusCell(l.start), W(a))
    }
    return (
      document.addEventListener('keydown', e),
      () => document.removeEventListener('keydown', e)
    )
  }, [$, s, r, i, ed])
  let eh = (0, useMemo)(() => (v ? (_ ? 520 : null) : 280), [v, _]),
    em = (0, useMemo)(
      () =>
        dm(
          (function (e) {
            let { start: t, end: r } = (function (e, t) {
                let [r, i] = un(e, t.start, t.end)
                return {
                  start: r,
                  end: i,
                }
              })(void 0, e),
              i = +t > +r,
              n = i ? +t : +r,
              a = i ? r : t
            a.setHours(0, 0, 0, 0)
            let l = void 0 ?? 1
            if (!l) return []
            l < 0 && ((l = -l), (i = !i))
            let s = []
            for (; +a <= n; ) (s.push(ui(t, a)), a.setDate(a.getDate() + l), a.setHours(0, 0, 0, 0))
            return i ? s.reverse() : s
          })({
            start: uf(um($.currentMonth), {
              weekStartsOn: ed,
            }),
            end: uu(us($.currentMonth), {
              weekStartsOn: ed,
            }),
          }),
          7
        ),
      [$.currentMonth, ed]
    ),
    ef = (0, useCallback)(() => {
      ;($.setValue(null),
        $.focusToday(),
        en.setValue(''),
        en.setTypedValue(''),
        en.setLastSetDate(null),
        P(null))
    }, [$, en, P]),
    eg = (0, useCallback)(
      (e) => {
        U(e)
      },
      [U]
    ),
    ep = (0, x.jsxs)('div', {
      className:
        H || !v ? pJ.default.calendarContentWrapper : pJ.default.calendarContentWrapperHorizontal,
      children: [
        (0, x.jsx)(up.div, {
          className: H || !v ? pJ.default.inputsWrapper : '',
          layout: !0,
          transition: {
            duration: 0.2,
          },
          children: (0, x.jsx)(bF, {
            endValue: new Date(Y),
            maxValue: i,
            minValue: r,
            onChange: eg,
            startValue: new Date(G),
            horizontalLayout: v,
            showTimeInput: _,
            pinnedTimezone: C,
          }),
        }),
        (0, x.jsx)(uw, {
          transition: {
            duration: 0.2,
          },
          children: (0, x.jsxs)('div', {
            children: [
              (0, x.jsxs)(m8, {
                row: !0,
                style: {
                  justifyContent: 'space-between',
                  margin: '-3px 0px',
                },
                vcenter: !0,
                children: [
                  (0, x.jsx)('div', {
                    style: {
                      overflow: 'hidden',
                      marginLeft: -16,
                      paddingLeft: 16,
                      flex: 1,
                    },
                    children: (0, x.jsx)(ug.AnimatePresence, {
                      custom: A,
                      initial: !1,
                      mode: N ? 'wait' : 'popLayout',
                      children: (0, x.jsx)(
                        up.h2,
                        {
                          animate: 'middle',
                          className: pJ.default.currentMonth,
                          custom: A,
                          exit: 'exit',
                          initial: N ? void 0 : 'enter',
                          style: {
                            whiteSpace: 'nowrap',
                          },
                          variants: b4,
                          ...V.calendarTitleProps,
                          children: p0($.currentMonth),
                        },
                        p0($.currentMonth)
                      ),
                    }),
                  }),
                  (0, x.jsx)(od.Button, {
                    ...X,
                    className: pJ.default.caretButton,
                    disabled: J,
                    onClick: () => {
                      ;(Z(), W(-1))
                    },
                    shape: 'circle',
                    style: {
                      marginLeft: 'auto',
                    },
                    svgOnly: !0,
                    variant: 'unstyled',
                    children: (0, x.jsx)(mq.ChevronLeft, {
                      className: pJ.default.caretButtonSvg,
                      style: {
                        transform: 'translateX(0px)',
                      },
                    }),
                  }),
                  (0, x.jsx)(gd, {
                    inline: !0,
                    x: 0.25,
                  }),
                  (0, x.jsx)(od.Button, {
                    ...et,
                    className: pJ.default.caretButton,
                    disabled: ee,
                    onClick: () => {
                      ;(Q(), W(1))
                    },
                    shape: 'circle',
                    svgOnly: !0,
                    variant: 'unstyled',
                    children: (0, x.jsx)(mK.ChevronRight, {
                      className: pJ.default.caretButtonSvg,
                      style: {
                        transform: 'translateX(1px)',
                      },
                    }),
                  }),
                ],
              }),
              (0, x.jsx)(gd, {
                y: 0.5,
              }),
              (0, x.jsxs)('table', {
                className: pJ.default.table,
                ...V.calendarBodyProps,
                children: [
                  (0, x.jsx)('caption', {
                    className: 'geist-sr-only',
                    ...V.captionProps,
                  }),
                  (0, x.jsx)('thead', {
                    children: (0, x.jsx)('tr', {
                      children: $.weekDays.map((e, t) => {
                        let r = p1(e),
                          i = p1(e, !0)
                        return (0, x.jsx)(
                          'th',
                          {
                            abbr: i,
                            children: r,
                          },
                          t
                        )
                      }),
                    }),
                  }),
                  (0, x.jsx)(ug.AnimatePresence, {
                    custom: A,
                    initial: !1,
                    mode: 'popLayout',
                    children: (0, x.jsx)(
                      up.tbody,
                      {
                        animate: 'middle',
                        custom: A,
                        exit: 'exit',
                        initial: N ? void 0 : 'enter',
                        variants: b4,
                        children: em.map((e) =>
                          (0, x.jsx)(
                            'tr',
                            {
                              children: e.map((e) =>
                                (0, x.jsx)(
                                  p2,
                                  {
                                    date: e,
                                    state: $,
                                  },
                                  e.toString()
                                )
                              ),
                            },
                            e[0]?.toString() ?? 'Default Value'
                          )
                        ),
                      },
                      String($.currentMonth)
                    ),
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
    eb = H
      ? (0, x.jsx)(gs.Modal, {
          active: D,
          onClickOutside: () => {
            R(!1)
          },
          children: (0, x.jsx)(gs.Body, {
            className: pJ.default.calendarBody,
            children: ep,
          }),
        })
      : (0, x.jsx)(oC.Portal, {
          children: (0, x.jsx)(oC.Content, {
            align: l,
            asChild: !0,
            className: (0, I.clsx)(
              pJ.default.popover,
              h && pJ.default.compactPopover,
              'data-[state=closed]:animate-fade-popover-out'
            ),
            onOpenAutoFocus: (e) => {
              T || e.preventDefault()
            },
            sideOffset: 8,
            style: {
              width: eh
                ? `min(${eh}px, var(--radix-popover-content-available-width, calc(100vw - 16px)))`
                : 'fit-content',
            },
            children: (0, x.jsxs)('div', {
              children: [
                (0, x.jsx)(oC.Close, {
                  className: 'geist-sr-only',
                }),
                (0, x.jsx)('div', {
                  className: pJ.default.contentWrapper,
                  children: ep,
                }),
              ],
            }),
          }),
        }),
    ex = H
      ? (0, x.jsxs)(gu, {
          show: j,
          style: el
            ? void 0
            : {
                width: 'var(--width)',
              },
          children: [
            (0, x.jsx)(od.Button, {
              ...eo,
              className: (0, I.clsx)(eo.className, pJ.default.calendarButton),
              onClick: (e) => {
                ;(R(!0), d && d(e))
              },
              style: {
                ...eo.style,
              },
              width: el ? ('small' === a ? '32px' : '40px') : void 0,
              children: el ? null : eo.children,
            }),
            eb,
          ],
        })
      : (0, x.jsxs)(oC.Root, {
          onOpenChange: (e) => {
            R(e)
          },
          open: D,
          children: [
            (0, x.jsxs)(gu, {
              show: j,
              style: el
                ? void 0
                : {
                    width: 'var(--width)',
                  },
              children: [
                (0, x.jsx)(oC.Trigger, {
                  asChild: !0,
                  children: (0, x.jsx)(od.Button, {
                    'data-testid': (0, oN.tid)('calendar', 'trigger', 'button'),
                    ...eo,
                    className: (0, I.clsx)(eo.className, pJ.default.calendarButton),
                    onClick: d,
                    style: {
                      ...eo.style,
                    },
                    title: eo.children?.toString(),
                    width: el ? ('small' === a ? '32px' : '40px') : void 0,
                    children: el ? null : eo.children,
                  }),
                }),
                es && !h
                  ? (0, x.jsx)('button', {
                      'aria-label': 'Clear input value',
                      className: (0, I.clsx)(
                        pJ.default.clearButton,
                        'small' === a ? pJ.default.clearButtonSmall : ''
                      ),
                      'data-clear-button': !0,
                      onClick: () => {
                        ef()
                      },
                      type: 'button',
                      children: (0, x.jsx)(mX.Cross, {
                        className: pJ.default.svg,
                      }),
                    })
                  : null,
              ],
            }),
            eb,
          ],
        })
  return (0, x.jsx)('div', {
    className: (0, I.clsx)(pJ.default.calendar, 'tailwind', {
      [String(pJ.default.hasSelect)]: !!M,
      [String(pJ.default.stacked)]: g,
      [String(pJ.default.showingDateButton)]: !b,
      [String(pJ.default.compact)]: h,
      className: S,
    }),
    'data-geist-calendar': '',
    'data-testid': f,
    'data-version': 'v1',
    ref: ec,
    style: {
      '--width': 'string' == typeof er ? er : `${er}px`,
      width: '100%' === er ? '100%' : 'auto',
    },
    'data-disabled': s,
    children: h
      ? (0, x.jsxs)(x.Fragment, {
          children: [ex, eu],
        })
      : (0, x.jsxs)(x.Fragment, {
          children: [eu, !b && ex],
        }),
  })
}

export default Calendar
