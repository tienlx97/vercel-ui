let breakpoints = ['xs', 'sm', 'smd', 'md', 'lg', 'xl']

export function mapResponsiveProp(name, value) {
  let styles = {}

  if (typeof value === 'object') {
    let previous
    let sm = value.sm
    let md = value.md
    let xs = value.xs
    let smd = value.smd

    for (const bp of breakpoints) {
      let bpValue = value[bp]

      if (
        (bp !== 'xs' || xs !== sm) &&
        ((bpValue != null && bpValue !== previous) || (bp === 'smd' && smd === sm && smd !== md))
      ) {
        styles[`--${bp}-${name}`] = bpValue
        previous = bpValue
      }
    }
  } else {
    if (value !== null) {
      styles[`--${name}`] = value
    }
  }

  return styles
}

export function restrictResponsiveProp(value) {
  if (typeof value === 'object' && value !== null) {
    if (!('sm' in value)) {
      throw new Error('Failed to restrict responsive prop, an object was passed without an sm key')
    }

    const normalized = {
      xs: value.xs || value.sm || null,
      sm: value.sm || null,
      smd: value.smd || value.md || value.sm || null,
      md: value.md || value.smd || value.sm || null,
      lg: value.lg || value.md || value.sm || null,
    }

    if (Object.values(normalized).some((v) => v == null)) {
      throw new Error(
        'Failed to restrict responsive prop, an invalid value was passed to sm, md or lg'
      )
    }

    return normalized
  }

  return {
    xs: value,
    sm: value,
    smd: value,
    md: value,
    lg: value,
  }
}
