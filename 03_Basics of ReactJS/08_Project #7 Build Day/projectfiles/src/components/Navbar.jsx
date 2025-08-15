import { useTheme } from '../contexts/ThemeContext.jsx'
import { useUser } from '../contexts/UserContext.jsx'

export default function Navbar() {
  const { theme } = useTheme()
  const { user } = useUser()

  return (
    <nav>
      <div>Context Demo • <small>Theme: <strong>{theme}</strong></small></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
        <img className="avatar" src={user.avatar} alt="avatar" />
        <span>@{user.username}</span>
      </div>
    </nav>
  )
}
