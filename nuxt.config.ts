// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: 'https://static.whatsapp.net/rsrc.php/v4/yz/r/ujTY9i_Jhs1.png' // use local file here
        }
      ],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        },
        {
          charset: 'utf-8'
        },
        {
          name: 'WhatsApp Group Invite',
          content: 'WhatsApp Group Invite'
        }
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: false,
  modules: ['@nuxt/icon', '@nuxt/image', '@nuxt/scripts']
})