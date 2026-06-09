import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemePreferenceProvider, useThemePreference } from './store/themePreference'
import { createAppTheme } from './styles/appTheme'
import Dashboard from './pages/dashboard/Dashboard'

function AppRoutes() {
  const { themeMode } = useThemePreference()
  const appTheme = useMemo(() => createAppTheme(themeMode), [themeMode])

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <ThemePreferenceProvider>
      <AppRoutes />
    </ThemePreferenceProvider>
  )
}
