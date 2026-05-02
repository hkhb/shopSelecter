export default defineNuxtConfig({
  srcDir: 'app',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  runtimeConfig: {
    // サーバーのみ
    apiSecret: process.env.API_SECRET,
    lambdaBaseUrl: process.env.LAMBDA_URL,

    public: {
    }
  }
})