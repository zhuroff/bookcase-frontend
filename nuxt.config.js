export default {
  head: {
    title: 'bookcase-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  env: {
    HOST: process.env.HOST || 'http://localhost:8000'
  },

  css: [
    '~/scss/global',
    '~/scss/auth',
    '~/scss/uploader',
    '~/scss/datepicker'
  ],

  plugins: [
    { src: '@/plugins/axios' }
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build'
  ],

  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: 'http://localhost:8000'
  },

  build: {}
}
