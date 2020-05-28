require('dotenv').config()

export default {
  mode: 'universal',
  srcDir: 'src/',
  env: {
    CTF_PERSON_ID: process.env.CTF_PERSON_ID,
    CTF_PROFILE_ENTRY_ID: process.env.CTF_PROFILE_ENTRY_ID,
    CTF_WORKS_TYPE_ID: process.env.CTF_WORKS_TYPE_ID,
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    BLOG_URL: process.env.BLOG_URL,
    EMAIL: process.env.EMAIL,
    GITHUB: process.env.GITHUB
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'normalize.css',
    '~assets/scss/variables.scss',
    '~assets/scss/mixin.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/contentful'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/fontawesome'
  ],
  fontawesome: {
    icons: {
      solid: ['faBars', 'faTimes'],
      regular: ['faEnvelope'],
      brands: ['faGithub']
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@/modules/scrape'
  ],
  styleResources: {
    scss: ['~assets/scss/*.scss']
  },
  /*
   ** Build configuration
   */
  build: {
    babel: {
      presets() {
        return [['@nuxt/babel-preset-app', { loose: true }]]
      }
    },
    extend(config) {
      config.node = {
        fs: 'empty'
      }
    }
  }
}
