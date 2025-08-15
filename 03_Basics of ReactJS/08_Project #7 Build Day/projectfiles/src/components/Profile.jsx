import { useUser } from '../contexts/UserContext.jsx'

export default function Profile() {
  const { user, updateUsername } = useUser()

  function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('username').toString().trim()
    if (name) updateUsername(name)
    e.currentTarget.reset()
  }

  return (
    <div className="card">
      <h2>Profile</h2>
      <p>Signed in as <strong>@{user.username}</strong></p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '.5rem', alignItems: 'center', marginTop: '.5rem' }}>
        <input name="username" className="input" placeholder="Change username…" aria-label="New username" />
        <button className="btn" type="submit">Save</button>
      </form>
    </div>
  )
}
