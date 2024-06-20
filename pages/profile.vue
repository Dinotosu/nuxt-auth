<template>
    <div
        class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
        <div class="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
            <h1 class="text-2xl font-bold text-center">
                Добро пожаловать, {{ user?.username }}
            </h1>

            <p class="text-s font-bold text-center">
                Твой email: {{ user?.email }}
            </p>
            <button
                @click="logout"
                class="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
            >
                Выйти
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, type User } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
const user = ref<User | null>(null)

const logout = (): void => {
    userStore.clearUser()
    router.push('/')
}

onMounted((): void => {
    userStore.loadUserFromLocalStorage()
    if (!userStore.user) {
        router.push('/')
    }

    user.value = userStore.user
})
</script>
