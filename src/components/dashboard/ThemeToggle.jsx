import { useThemePreference } from '../../store/themePreference'

export default function ThemeToggle() {
  const { isDarkTheme, toggleTheme } = useThemePreference()
  const label = isDarkTheme ? 'Dark' : 'Light'
  const nextLabel = isDarkTheme ? 'light' : 'dark'

  return (
    <label className="theme-toggle">
      <span className="theme-toggle__label">{label}</span>
      <input
        type="checkbox"
        checked={isDarkTheme}
        onChange={toggleTheme}
        aria-label={`Switch to ${nextLabel} theme`}
      />
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
      </span>
    </label>
  )
}
