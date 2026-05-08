import Geist from '@/css/geist_mono.module.css'

const geistConfig = {
  className: Geist.className,

  style: {
    fontFamily:
      '\'Geist Mono\', ui-monospace, SFMono-Regular, Roboto Mono, Menlo, Monaco, Liberation Mono, DejaVu Sans Mono, Courier New, monospace, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',

    fontStyle: 'normal',
  },
}

// Optional CSS variable support
if (Geist.default.variable != null) {
  geistConfig.variable = Geist.variable
}

export const GeistMono = () => geistConfig
