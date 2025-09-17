import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const defaultTheme = {
    theme: "light",
    setTheme: () => {}
}

const ThemeContext = createContext(defaultTheme)

export function ThemeProvider({ children }) {
    // TODO: create a state theme setTheme with initial state () => localStorage.getItem('theme') || 'light'

  useEffect(() => {
    // TODO: call localStorage.setItem passing in 'theme' and theme
    document.documentElement.classList.remove('theme-light','theme-dark')
    document.documentElement.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light')
  }, [theme])

    // TODO: creat an arrow named toggleTheme that takes in nothing and calls setTheme passing in t => (t === 'light' ? 'dark' : 'light)


  const value = useMemo(() => ({ theme, toggleTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider.jsx')
  return ctx
}
