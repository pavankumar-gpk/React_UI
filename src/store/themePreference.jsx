import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'policy-dashboard-theme'
const THEMES = ['light', 'dark']
const isBrowser = typeof window !== 'undefined'
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect

function isTheme(value) {
  return THEMES.includes(value)
}

function getStoredTheme() {
  if (!isBrowser) {
    return null
  }

  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY)
    return isTheme(storedTheme) ? storedTheme : null
  } catch {
    return null
  }
}

function getSystemTheme() {
  if (!isBrowser || !window.matchMedia) {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialTheme() {
  return getStoredTheme() || getSystemTheme()
}

function persistTheme(themeMode) {
  if (!isBrowser) {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, themeMode)
  } catch {
    // Ignore storage failures so the toggle still works for the current session.
  }
}

const ThemePreferenceContext = createContext(null)

export function ThemePreferenceProvider({ children }) {
  const [themeMode, setThemeMode] = useState(getInitialTheme)
  const [hasUserPreference, setHasUserPreference] = useState(() => Boolean(getStoredTheme()))

  useIsomorphicLayoutEffect(() => {
    document.documentElement.dataset.theme = themeMode
    document.documentElement.style.colorScheme = themeMode
  }, [themeMode])

  useEffect(() => {
    if (!isBrowser || !window.matchMedia || hasUserPreference) {
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (event) => {
      setThemeMode(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [hasUserPreference])

  const value = useMemo(() => {
    const updateTheme = (nextTheme) => {
      if (!isTheme(nextTheme)) {
        return
      }

      setThemeMode(nextTheme)
      setHasUserPreference(true)
      persistTheme(nextTheme)
    }

    return {
      themeMode,
      isDarkTheme: themeMode === 'dark',
      setThemeMode: updateTheme,
      toggleTheme: () => updateTheme(themeMode === 'dark' ? 'light' : 'dark'),
    }
  }, [themeMode])

  return <ThemePreferenceContext.Provider value={value}>{children}</ThemePreferenceContext.Provider>
}

export function useThemePreference() {
  const context = useContext(ThemePreferenceContext)

  if (!context) {
    throw new Error('useThemePreference must be used within ThemePreferenceProvider.')
  }

  return context
}
