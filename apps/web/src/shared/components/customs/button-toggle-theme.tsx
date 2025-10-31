'use client'

import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/app/providers/theme-provider'

import { Button } from '../primitives/button'

export const ButtonToggleTheme = () => {
  const { toggleTheme, isDark } = useTheme()

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="top-4 right-4 rounded-full border"
      aria-label={isDark ? 'Ativar modo escuro' : 'Ativar modo claro'}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
