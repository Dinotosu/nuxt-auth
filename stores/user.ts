import axios, { type AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

export interface User {
    username: string
    token: string
    email: string
}

export interface UserState {
    user: User | null
    status: boolean
}

interface CheckAuthTokenResponse {
    status: boolean
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        user: null,
        status: false
    }),
    actions: {
        setUser(user: User) {
            this.user = user
            localStorage.setItem('user', JSON.stringify(user))
        },
        clearUser() {
            this.user = null
            localStorage.removeItem('user')
        },
        loadUserFromLocalStorage() {
            const user = localStorage.getItem('user')
            if (user) {
                this.user = JSON.parse(user)
            }
        },
        async checkAuthToken(token: string): Promise<boolean | undefined> {
            try {
                const response: AxiosResponse<CheckAuthTokenResponse> = await axios({
                    method: 'GET',
                    url: 'http://127.0.0.1:8000/api/check_token/',
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })

                this.status = !!response.data.status

                return this.status
            } catch (error) {
                console.error(error)
                return undefined
            }
        }
    }
})
