import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { STORAGE_KEYS } from '@/shared/constants/storage-keys'
import { LocalStorage } from '@/shared/helpers/local-storage'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const storedTheme = LocalStorage.get<Theme>(STORAGE_KEYS.THEME)
    const initialTheme = storedTheme || 'light'
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    LocalStorage.set(STORAGE_KEYS.THEME, newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const isDark = useMemo(() => theme === 'dark', [theme])

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
