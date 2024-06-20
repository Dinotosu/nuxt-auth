<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
            <h2 class="text-2xl font-bold text-center">Вход</h2>
            <form @submit="onSubmit" class="space-y-4">
                <div>
                    <input
                        v-model="username"
                        type="text"
                        placeholder="Логин"
                        class="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="Пароль"
                        class="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Войти
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '../stores/user'

interface AuthResponse {
    token: string
    email: string
}

const router = useRouter()
const userStore = useUserStore()

const username = ref<string>('')
const password = ref<string>('')

const onSubmit = async (e: Event) => {
    e.preventDefault()
    try {
        const response = await axios.post<AuthResponse>(
            'http://127.0.0.1:8000/api/auth/',
            {
                username: username.value,
                password: password.value
            }
        )

        userStore.setUser({
            username: username.value,
            token: response.data.token,
            email: response.data.email
        })

        router.push('/profile')
    } catch (error) {
        console.error('Login failed', error)
    }
}
</script>
