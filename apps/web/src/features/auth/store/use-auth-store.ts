import type { User } from '@repo/types'
import { create } from 'zustand'

interface AuthState {
  user: User | null
  isAuthenticated: boolean

  setAuthData: (user: User) => void
  clearAuthData: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,

  setAuthData: (user) => {
    set({ user, isAuthenticated: true })
  },

  clearAuthData: () => {
    set({ user: null, isAuthenticated: false })
  },
}))
