import { useState, useEffect, createContext, useContext, useCallback } from 'react'

interface ThemeContextType {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// ✅ FIXED: Prevents infinite loops and hydration issues
export const useThemeState = () => {
  const [darkMode, setDarkMode] = useState(true) // Default value for SSR
  const [mounted, setMounted] = useState(false)

  // Mount effect - runs once
  useEffect(() => {
    setMounted(true)
    
    // Only access localStorage after mounting
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kanban-theme')
        if (saved) {
          setDarkMode(JSON.parse(saved))
        }
      } catch (error) {
        console.warn('Failed to load theme:', error)
      }
    }
  }, []) // Empty deps - runs once only

  // Save theme when it changes (but only after mount)
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      try {
        localStorage.setItem('kanban-theme', JSON.stringify(darkMode))
      } catch (error) {
        console.warn('Failed to save theme:', error)
      }
    }
  }, [darkMode, mounted]) // Only when darkMode or mounted changes

  // ✅ Stable setter function to prevent unnecessary re-renders
  const setDarkModeStable = useCallback((newValue: boolean) => {
    setDarkMode(prevValue => {
      // Only update if value actually changed
      return prevValue !== newValue ? newValue : prevValue
    })
  }, [])

  return {
    darkMode: mounted ? darkMode : true, // Always return consistent value during SSR
    setDarkMode: setDarkModeStable
  }
}

export { ThemeContext }