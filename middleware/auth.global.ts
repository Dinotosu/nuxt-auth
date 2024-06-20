import { defineNuxtPlugin, useRouter } from '#app'
import { useUserStore } from '../stores/user'

export default defineNuxtPlugin(async (to): Promise<void> => {
    if (typeof window !== 'undefined') {
        const userStore = useUserStore()
        const router = useRouter()

        userStore.loadUserFromLocalStorage()

        if (userStore.user?.token && to.path === '/') {
            const userStatus: boolean | undefined = await userStore.checkAuthToken(userStore.user.token)

            if (userStatus) {
                router.push('/profile')
            }
        }
    }
})

