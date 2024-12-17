import { create } from 'zustand'
import { User } from '@myorg/types'

type AuthState = {
    user: User | null
    isLoggedIn: boolean
    setUser: (user: User) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => set({ user, isLoggedIn: true }),
    logout: () => set({ user: null, isLoggedIn: false }),
}))
