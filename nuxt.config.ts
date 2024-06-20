export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    css: ['@/assets/css/tailwind.css'],
    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },
    router: {
        middleware: 'auth'
    },
    ssr: true,
    build: {
        postcss: {
            plugins: {
                autoprefixer: false,
                cssnano: process.env.NODE_ENV === 'production' ? {} : false
            }
        }
    }
})

