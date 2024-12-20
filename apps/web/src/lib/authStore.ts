import { User } from '@myorg/types' // Import User type from your types package
import { logout } from '@myorg/api-client'
import axios, { AxiosError } from 'axios'


export const useAuthStore = {

    async getUserAsync() {
        try {
            const result = await axios.get('/api/auth/isLoggedIn')
            return result
        } catch (error) {
            if (error instanceof AxiosError && error.status === 403) {
                window.location.href = '/';
            }
        }
    },
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
}

