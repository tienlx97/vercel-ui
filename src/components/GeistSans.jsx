import Geist from '@/css/geist.module.css'

const geistConfig = {
  className: Geist.className,

  style: {
    fontFamily:
      '\'Geist\', Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',

    fontStyle: 'normal',
  },
}

// Optional CSS variable support
if (Geist.default.variable != null) {
  geistConfig.variable = Geist.variable
}

export const GeistSans = () => geistConfig
