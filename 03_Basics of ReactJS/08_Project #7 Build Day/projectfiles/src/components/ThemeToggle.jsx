import { useTheme } from '../contexts/ThemeContext.jsx'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="card">
      <p>Current theme: <strong>{theme}</strong></p>
      <button className="btn" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  )
}
