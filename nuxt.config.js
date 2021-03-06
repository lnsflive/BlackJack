import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // router: {
  //     base: '/games/blackjack/'
  //   },
  router: {
      base: '/BlackJack/'
    },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    //titleTemplate: '%s - BlackJack',
    title: 'BlackJack',
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
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', sizes: '16x16', href: 'favicon-16x16.ico' },
      { rel: 'icon', type: 'image/x-icon', sizes: '32x32', href: 'favicon-32x32.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'icon.png'},
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: 'android-chrome-192x192.png'},
      { rel: 'icon', type: 'image/png', sizes: '512x512', href: 'android-chrome-512x512.png'},
    ]
  },

  pwa: {
    manifest: {
      name: 'BlackJack',
      lang: 'en',
      title: 'BlackJack',
      useWebmanifestExtension: false,
      icons: [
        {
          src: "apple-touch-icon.png",
          size:"180x180",
          type:"image/png"
        },
        {
          src: "favicon.ico",
          size:"48x48",
          type:"image/x-icon"
        },
        {
          src: "favicon-16x16.ico",
          size:"16x16",
          type:"image/x-icon"
        },
        {
          src: "favicon-32x32.ico",
          size:"32x32",
          type:"image/x-icon"
        },
        {
          src: "android-chrome-512x512.png",
          size:"512x512",
          type:"image/png"
        },
        {
          src: "android-chrome-192x192.png",
          size:"192x192",
          type:"image/png"
        },
      ]
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: 'https://strapi.jaimegonzalezjr.com', // Used as fallback if no runtime config is provided
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
