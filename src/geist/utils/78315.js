export function restrictResponsiveProp(e) {
  if ('object' == typeof e && null !== e) {
    if (!('sm' in e)) {
      throw new Error('Failed to restrict responsive prop, an object was passed without an sm key')
    }

    let t = {
      xs: e.xs || e.sm || null,
      sm: e.sm || null,
      smd: e.smd || e.md || e.sm || null,
      md: e.md || e.smd || e.sm || null,
      lg: e.lg || e.md || e.sm || null,
    }

    if (Object.values(t).some((e) => null == e)) {
      throw new Error(
        'Failed to restrict responsive prop, an invalid value was passed to sm, md or lg'
      )
    }

    return t
  }

  return {
    xs: e,
    sm: e,
    smd: e,
    md: e,
    lg: e,
  }
}
