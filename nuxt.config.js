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
    BASE_URL: process.env.NODE_ENV === 'development'
      ? process.env.VUE_APP_BASE_URL_DEV
      : process.env.VUE_APP_BASE_URL_PROD
  },

  css: [
    '~/scss/global',
    '~/scss/buefy',
    '~/scss/auth',
    '~/scss/uploader',
    '~/scss/datepicker',
    '~/scss/repeater',
    '~/scss/output',
    '~/scss/editor',
    '~/scss/print'
  ],

  plugins: [
    { src: '@/plugins/axios' }
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv'
  ],

  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: process.env.NODE_ENV === 'development'
      ? process.env.VUE_APP_BASE_URL_DEV
      : process.env.VUE_APP_BASE_URL_PROD
  },

  build: {}
}
