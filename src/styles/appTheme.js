import { createTheme } from '@mui/material/styles'

const palettes = {
  light: {
    primary: '#2563eb',
    background: '#f4f7fb',
    surface: '#ffffff',
    text: '#111827',
    textSecondary: '#64748b',
    divider: '#d1d5db',
    error: '#b42318',
    success: '#047857',
  },
  dark: {
    primary: '#74a8ff',
    background: '#121212',
    surface: '#1f2933',
    text: '#e5e7eb',
    textSecondary: '#b0b8c4',
    divider: '#3f4754',
    error: '#fca5a5',
    success: '#86efac',
  },
}

export function createAppTheme(mode) {
  const palette = palettes[mode] || palettes.light

  return createTheme({
    palette: {
      mode,
      primary: {
        main: palette.primary,
      },
      background: {
        default: palette.background,
        paper: palette.surface,
      },
      text: {
        primary: palette.text,
        secondary: palette.textSecondary,
      },
      divider: palette.divider,
      error: {
        main: palette.error,
      },
      success: {
        main: palette.success,
      },
    },
    shape: {
      borderRadius: 8,
    },
  })
}
