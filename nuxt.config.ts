export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss'],

  tailwindcss: {
    viewer: false
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: {
        lang: 'es-CO'
      },
      title: 'Raza & Gourmet | Snacks naturales para mascotas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Raza & Gourmet ofrece snacks y productos naturales para mascotas con una experiencia visual cuidada y un proceso de pedido simple.'
        },
        { name: 'theme-color', content: '#c9a15d' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'es_CO' },
        { property: 'og:site_name', content: 'Raza & Gourmet' },
        {
          property: 'og:title',
          content: 'Raza & Gourmet | Snacks naturales para mascotas'
        },
        {
          property: 'og:description',
          content:
            'Descubre galletas, helados y otros productos para mascotas con pedido asistido por WhatsApp.'
        },
        { property: 'og:image', content: '/images/products/hero_dog.webp' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'Raza & Gourmet | Snacks naturales para mascotas'
        },
        {
          name: 'twitter:description',
          content:
            'Catálogo claro, diseño mobile-first y pedido simple por WhatsApp.'
        },
        { name: 'twitter:image', content: '/images/products/hero_dog.webp' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    salesEmail: process.env.SALES_EMAIL || '',
    fromEmail: process.env.FROM_EMAIL || 'Raza & Gourmet <onboarding@resend.dev>',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
      whatsappNumber: '573222070275',
      brandName: 'Raza & Gourmet',
      instagramUrl: '#',
      facebookUrl: '#'
    }
  },

  nitro: {
    preset: 'cloudflare_pages',
    prerender: {
      autoSubfolderIndex: false
    }
  },

  routeRules: {
    '/': { prerender: true }
  }
})
