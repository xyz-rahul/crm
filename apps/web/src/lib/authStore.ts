import { User } from '@myorg/types' // Import User type from your types package
import { logout } from '@myorg/api-client'


export const useAuthStore = {
    getUser(): User | null {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    },

    setUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user))
    },

    logout() {
        localStorage.removeItem('user')
        logout()
    },

    isUserLoggedIn(): boolean {
        return !!this.getUser()
    },
}

