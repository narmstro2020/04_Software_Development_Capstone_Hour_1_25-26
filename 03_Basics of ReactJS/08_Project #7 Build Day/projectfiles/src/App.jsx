import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import Navbar from './components/Navbar.jsx'
import Profile from './components/Profile.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'

export default function App() {
    return (
        <ThemeProvider>
            <UserProvider>
                <div className="app">
                    <Navbar />
                    <main className="container">
                        <section>
                            <h1>useContext Solution App</h1>
                            <p>This app shares <strong>theme</strong> and <strong>user</strong> across components without prop drilling.</p>
                            <ThemeToggle />
                        </section>
                        <section>
                            <Profile />
                        </section>
                    </main>
                </div>
            </UserProvider>
        </ThemeProvider>
    )
}
