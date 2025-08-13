import {createContext, useContext, useState} from "react";

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {
    },
});

function ThemeProvider({children}) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

function Toolbar() {
    const {theme, toggleTheme} = useContext(ThemeContext);

    const [count, setCount] = useState(0);

    const divStyle = {
        padding: '1rem',
        backgroundColor: theme === 'light' ? '#eee' : '#333',
        color: theme === 'light' ? '#000' : '#fff'
    }

    const increment = () => setCount(count + 1);

    return (
        <div style={divStyle}>
            <p>Current theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <button onClick={increment}>Increment</button>
            <p>Count: {count}</p>
        </div>
    )
}

function App() {

    return (
        <>
            <ThemeProvider>
                <Toolbar/>
                <Toolbar/>
            </ThemeProvider>
            <ThemeProvider>
                <Toolbar/>
            </ThemeProvider>
        </>
    )
}

export default App
